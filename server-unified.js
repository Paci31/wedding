// ==========================================
// SERVEUR UNIFIÉ - Frontend + API RSVP
// Compatible Infomaniak
// ==========================================

import "dotenv/config";
import express from "express";
import path from "path";
import compression from "compression";
import history from "connect-history-api-fallback";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.APP_PORT || process.env.PORT || 3000);
const dist = path.join(__dirname, "dist");

// Chemins des fichiers RSVP
const DATA_DIR = path.join(__dirname, "data");
const RESPONSES_FILE = path.join(DATA_DIR, "responses.json");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");

// ==========================================
// CONFIGURATION
// ==========================================

app.set("trust proxy", 1);
app.use(express.json({ limit: "200kb" }));

// CORS pour l'API (si besoin en dev)
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, username, password");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(200);
  }
  next();
});

// ==========================================
// INITIALISATION DES DONNÉES RSVP
// ==========================================

async function initDataFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Fichier réponses
    try {
      await fs.access(RESPONSES_FILE);
    } catch {
      await fs.writeFile(RESPONSES_FILE, JSON.stringify([], null, 2));
      console.log("✅ Fichier responses.json créé");
    }

    // Fichier admin
    try {
      await fs.access(ADMIN_FILE);
    } catch {
      const defaultAdmin = {
        username: "admin",
        password: "wedding2026", // CHANGEZ EN PRODUCTION !
      };
      await fs.writeFile(ADMIN_FILE, JSON.stringify(defaultAdmin, null, 2));
      console.log("✅ Fichier admin.json créé");
    }
  } catch (error) {
    console.error("❌ Erreur initialisation:", error);
  }
}

// Fonctions de gestion des réponses
async function readResponses() {
  try {
    const data = await fs.readFile(RESPONSES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur lecture responses:", error);
    return [];
  }
}

async function saveResponses(responses) {
  try {
    await fs.writeFile(RESPONSES_FILE, JSON.stringify(responses, null, 2));
    return true;
  } catch (error) {
    console.error("Erreur sauvegarde responses:", error);
    return false;
  }
}

// Middleware d'authentification admin
function authenticateAdmin(req, res, next) {
  const { username, password } = req.headers;

  fs.readFile(ADMIN_FILE, "utf-8")
    .then((data) => {
      const admin = JSON.parse(data);
      if (username === admin.username && password === admin.password) {
        next();
      } else {
        res.status(401).json({ error: "Non autorisé" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Erreur serveur" });
    });
}

// ==========================================
// RATE LIMITERS
// ==========================================

const contactLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de demandes, réessayez dans quelques minutes." },
});

const rsvpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  standardHeaders: true,
  message: { error: "Trop de soumissions, réessayez plus tard." },
});

// ==========================================
// ROUTES API RSVP (AVANT history)
// ==========================================

// POST - Soumettre un nouveau RSVP
app.post("/api/rsvp", rsvpLimiter, async (req, res) => {
  try {
    const response = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...req.body,
    };

    const responses = await readResponses();
    responses.push(response);

    const saved = await saveResponses(responses);

    if (saved) {
      res.status(201).json({
        success: true,
        message: "Réponse enregistrée avec succès",
        id: response.id,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Erreur lors de la sauvegarde",
      });
    }
  } catch (error) {
    console.error("Erreur POST /api/rsvp:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
});

// GET - Récupérer toutes les réponses (authentifié)
app.get("/api/admin/responses", authenticateAdmin, async (req, res) => {
  try {
    const responses = await readResponses();
    res.json({ success: true, data: responses });
  } catch (error) {
    console.error("Erreur GET /api/admin/responses:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

// GET - Statistiques (authentifié)
app.get("/api/admin/stats", authenticateAdmin, async (req, res) => {
  try {
    const responses = await readResponses();

    const stats = {
      total: responses.length,
      attending: {
        yes: responses.filter((r) => r.attending === "yes").length,
        no: responses.filter((r) => r.attending === "no").length,
        maybe: responses.filter((r) => r.attending === "maybe").length,
      },
      guests: {
        totalAdults: responses.reduce((sum, r) => sum + (parseInt(r.adults) || 0), 0),
        totalChildren: responses.reduce((sum, r) => sum + (parseInt(r.children) || 0), 0),
        total: responses.reduce(
          (sum, r) => sum + (parseInt(r.adults) || 0) + (parseInt(r.children) || 0),
          0
        ),
      },
      dietary: responses
        .filter((r) => r.dietary && r.dietary.trim() !== "")
        .map((r) => ({ name: r.name, dietary: r.dietary })),
      childrenByAge: responses.reduce((acc, r) => {
        if (r.childrenAges && r.childrenAges.trim() !== "") {
          const ages = r.childrenAges
            .split(",")
            .map((age) => age.trim())
            .filter((age) => age !== "");
          ages.forEach((age) => {
            acc[age] = (acc[age] || 0) + 1;
          });
        }
        return acc;
      }, {}),
      byDate: responses.reduce((acc, r) => {
        const d = new Date(r.timestamp);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        const date = `${day}.${month}.${year}`;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {}),
      hotel: {
        needed: responses.filter((r) => r.hotelNeeded === "yes").length,
        notNeeded: responses.filter((r) => r.hotelNeeded === "no").length,
        roomTypes: responses.reduce((acc, r) => {
          if (r.hotelNeeded === "yes" && r.hotelRoomType) {
            acc[r.hotelRoomType] = (acc[r.hotelRoomType] || 0) + 1;
          }
          return acc;
        }, {}),
        totalNights: responses.reduce((sum, r) => {
          if (r.hotelNeeded === "yes" && r.hotelNights) {
            return sum + (parseInt(r.hotelNights) || 0);
          }
          return sum;
        }, 0),
      },
      dinner: {
        attending: responses.filter((r) => r.dinnerAttending === "yes").length,
        notAttending: responses.filter((r) => r.dinnerAttending === "no").length,
      },
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error("Erreur GET /api/admin/stats:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

// DELETE - Supprimer une réponse (authentifié)
app.delete("/api/admin/responses/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const responses = await readResponses();
    const filtered = responses.filter((r) => r.id !== id);

    if (filtered.length === responses.length) {
      res.status(404).json({ success: false, error: "Réponse non trouvée" });
      return;
    }

    await saveResponses(filtered);
    res.json({ success: true, message: "Réponse supprimée" });
  } catch (error) {
    console.error("Erreur DELETE /api/admin/responses/:id:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

// POST - Login admin
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminData = await fs.readFile(ADMIN_FILE, "utf-8");
    const admin = JSON.parse(adminData);

    if (username === admin.username && password === admin.password) {
      res.json({
        success: true,
        message: "Connexion réussie",
        token: Buffer.from(`${username}:${password}`).toString("base64"),
      });
    } else {
      res.status(401).json({ success: false, error: "Identifiants incorrects" });
    }
  } catch (error) {
    console.error("Erreur POST /api/admin/login:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

// ==========================================
// API CONTACT (ancien système)
// ==========================================

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, company = "", message, website = "", startedAt } = req.body || {};

    // Honeypot
    if (website) return res.status(400).json({ error: "Bot détecté." });

    // Temps minimal
    const now = Date.now();
    const started = Number(startedAt || 0);
    if (!started || now - started < 4000) {
      return res.status(400).json({ error: "Envoi trop rapide." });
    }

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Champs manquants." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email invalide." });
    }

    // SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const to = process.env.CONTACT_TO || "helpdesk@microinformatic.ch";
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER;
    const subject = `📩 Contact site — ${name} (${email})`;
    const html = `<div style="font-family:system-ui;line-height:1.6;color:#0f172a;">
      <h2>Nouveau message via le site</h2>
      <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Société:</strong> ${escapeHtml(company || "—")}</p>
      <p><strong>Message:</strong></p>
      <div style="background:#f1f5f9;padding:12px;border-radius:8px">${escapeHtml(message)}</div>
    </div>`;
    const text = `Nouveau message\nNom: ${name}\nEmail: ${email}\nSociété: ${company || "—"}\n\nMessage:\n${message}`;

    await transporter.sendMail({ to, from, replyTo: email, subject, text, html });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Contact error:", err);
    return res.status(500).json({ error: "Envoi impossible." });
  }
});

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/health", (_, res) => res.status(200).send("OK"));

// ==========================================
// SPA FALLBACK + STATIQUES
// (DOIT ÊTRE À LA FIN !)
// ==========================================

app.use(
  history({
    rewrites: [{ from: /^\/api\/.*$/, to: (ctx) => ctx.parsedUrl.path }],
  })
);

app.use(compression());
app.use(express.static(dist, { index: "index.html", maxAge: "1y" }));

// ==========================================
// DÉMARRAGE DU SERVEUR
// ==========================================

async function startServer() {
  await initDataFiles();
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log("╔══════════════════════════════════════════════════╗");
    console.log("║   🎉 SERVEUR MARIAGE DÉMARRÉ                     ║");
    console.log("╚══════════════════════════════════════════════════╝");
    console.log("");
    console.log(`🌐 Site web:        http://0.0.0.0:${PORT}`);
    console.log(`📊 Dashboard admin: http://0.0.0.0:${PORT}/admin`);
    console.log(`🔐 Identifiants:    admin / wedding2026`);
    console.log("");
    console.log("✅ Frontend statique : PRÊT");
    console.log("✅ API RSVP          : PRÊT");
    console.log("✅ API Contact       : PRÊT");
    console.log("✅ Données RSVP      : data/responses.json");
    console.log("");
  });
}

startServer();

