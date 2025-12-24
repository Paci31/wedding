import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(cors());
app.use(express.json());

// Chemins des fichiers
const DATA_DIR = path.join(__dirname, "data");
const RESPONSES_FILE = path.join(DATA_DIR, "responses.json");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");

// Initialiser les fichiers de données
async function initDataFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Initialiser le fichier des réponses s'il n'existe pas
    try {
      await fs.access(RESPONSES_FILE);
    } catch {
      await fs.writeFile(RESPONSES_FILE, JSON.stringify([], null, 2));
    }

    // Initialiser le fichier admin s'il n'existe pas
    try {
      await fs.access(ADMIN_FILE);
    } catch {
      // Mot de passe par défaut: "wedding2026" (à changer en production!)
      const defaultAdmin = {
        username: "admin",
        password: "wedding2026", // En production, utilisez bcrypt pour hasher!
      };
      await fs.writeFile(ADMIN_FILE, JSON.stringify(defaultAdmin, null, 2));
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation des fichiers:", error);
  }
}

// Lire les réponses
async function readResponses() {
  try {
    const data = await fs.readFile(RESPONSES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur lecture responses:", error);
    return [];
  }
}

// Sauvegarder les réponses
async function saveResponses(responses) {
  try {
    await fs.writeFile(RESPONSES_FILE, JSON.stringify(responses, null, 2));
    return true;
  } catch (error) {
    console.error("Erreur sauvegarde responses:", error);
    return false;
  }
}

// Middleware d'authentification simple
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

// Routes API

// POST - Soumettre un nouveau RSVP
app.post("/api/rsvp", async (req, res) => {
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

// GET - Obtenir les statistiques (authentifié)
app.get("/api/admin/stats", authenticateAdmin, async (req, res) => {
  try {
    const responses = await readResponses();

    // Calculer les statistiques
    const stats = {
      total: responses.length,
      attending: {
        yes: responses.filter((r) => r.attending === "yes").length,
        no: responses.filter((r) => r.attending === "no").length,
        maybe: responses.filter((r) => r.attending === "maybe").length,
      },
      guests: {
        totalAdults: responses.reduce(
          (sum, r) => sum + (parseInt(r.adults) || 0),
          0
        ),
        totalChildren: responses.reduce(
          (sum, r) => sum + (parseInt(r.children) || 0),
          0
        ),
        total: responses.reduce(
          (sum, r) =>
            sum + (parseInt(r.adults) || 0) + (parseInt(r.children) || 0),
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
        needed: responses.filter(
          (r) =>
            r.hotelRoomType &&
            r.hotelRoomType !== "" &&
            r.hotelRoomType !== "none"
        ).length,
        notNeeded: responses.filter(
          (r) =>
            !r.hotelRoomType ||
            r.hotelRoomType === "" ||
            r.hotelRoomType === "none"
        ).length,
        totalPeople: responses.reduce((sum, r) => {
          if (
            r.hotelRoomType &&
            r.hotelRoomType !== "" &&
            r.hotelRoomType !== "none"
          ) {
            const adults = parseInt(r.adults) || 0;
            const children = parseInt(r.children) || 0;
            return sum + adults + children;
          }
          return sum;
        }, 0),
        roomTypes: responses.reduce((acc, r) => {
          if (
            r.hotelRoomType &&
            r.hotelRoomType !== "" &&
            r.hotelRoomType !== "none"
          ) {
            // Convertir les codes en noms lisibles
            const roomNames = {
              single: "Chambre Simple",
              double: "Chambre Double/Twin",
              triple: "Chambre Triple",
              quadruple: "Chambre Quadruple",
              larger: "Chambre Plus Grande",
            };
            const roomName = roomNames[r.hotelRoomType] || r.hotelRoomType;
            acc[roomName] = (acc[roomName] || 0) + 1;
          }
          return acc;
        }, {}),
        byDate: responses.reduce((acc, r) => {
          if (
            r.hotelRoomType &&
            r.hotelRoomType !== "" &&
            r.hotelRoomType !== "none" &&
            r.hotelCheckIn &&
            r.hotelCheckOut
          ) {
            // Convertir au format suisse DD.MM.YYYY
            const formatSwissDate = (dateStr) => {
              const d = new Date(dateStr);
              const day = String(d.getDate()).padStart(2, "0");
              const month = String(d.getMonth() + 1).padStart(2, "0");
              const year = d.getFullYear();
              return `${day}.${month}.${year}`;
            };
            
            const checkIn = formatSwissDate(r.hotelCheckIn);
            const checkOut = formatSwissDate(r.hotelCheckOut);
            const key = `${checkIn} → ${checkOut}`;
            acc[key] = (acc[key] || 0) + 1;
          }
          return acc;
        }, {}),
        totalNights: responses.reduce((sum, r) => {
          if (
            r.hotelRoomType &&
            r.hotelRoomType !== "" &&
            r.hotelRoomType !== "none" &&
            r.hotelCheckIn &&
            r.hotelCheckOut
          ) {
            const checkIn = new Date(r.hotelCheckIn);
            const checkOut = new Date(r.hotelCheckOut);
            const nights = Math.round(
              (checkOut - checkIn) / (1000 * 60 * 60 * 24)
            );
            return sum + (nights > 0 ? nights : 0);
          }
          return sum;
        }, 0),
      },
      dinner: {
        attending: responses.filter((r) => r.dinnerAttending === "yes").length,
        notAttending: responses.filter((r) => r.dinnerAttending === "no")
          .length,
        totalPeople: responses.reduce((sum, r) => {
          if (r.dinnerAttending === "yes") {
            const adults = parseInt(r.adults) || 0;
            const children = parseInt(r.children) || 0;
            return sum + adults + children;
          }
          return sum;
        }, 0),
        adults: responses.reduce((sum, r) => {
          if (r.dinnerAttending === "yes") {
            return sum + (parseInt(r.adults) || 0);
          }
          return sum;
        }, 0),
        children: responses.reduce((sum, r) => {
          if (r.dinnerAttending === "yes") {
            return sum + (parseInt(r.children) || 0);
          }
          return sum;
        }, 0),
      },
      brunch: {
        attending: responses.filter((r) => r.brunchAttending === "yes").length,
        notAttending: responses.filter((r) => r.brunchAttending === "no")
          .length,
        totalPeople: responses.reduce((sum, r) => {
          if (r.brunchAttending === "yes") {
            const adults = parseInt(r.adults) || 0;
            const children = parseInt(r.children) || 0;
            return sum + adults + children;
          }
          return sum;
        }, 0),
        adults: responses.reduce((sum, r) => {
          if (r.brunchAttending === "yes") {
            return sum + (parseInt(r.adults) || 0);
          }
          return sum;
        }, 0),
        children: responses.reduce((sum, r) => {
          if (r.brunchAttending === "yes") {
            return sum + (parseInt(r.children) || 0);
          }
          return sum;
        }, 0),
      },
      transport: {
        bus1: responses.filter((r) => r.transportChoice === "bus1").length,
        bus2: responses.filter((r) => r.transportChoice === "bus2").length,
        own: responses.filter((r) => r.transportChoice === "own").length,
        bus1People: responses.reduce((sum, r) => {
          if (r.transportChoice === "bus1") {
            const adults = parseInt(r.adults) || 0;
            const children = parseInt(r.children) || 0;
            return sum + adults + children;
          }
          return sum;
        }, 0),
        bus2People: responses.reduce((sum, r) => {
          if (r.transportChoice === "bus2") {
            const adults = parseInt(r.adults) || 0;
            const children = parseInt(r.children) || 0;
            return sum + adults + children;
          }
          return sum;
        }, 0),
        ownPeople: responses.reduce((sum, r) => {
          if (r.transportChoice === "own") {
            const adults = parseInt(r.adults) || 0;
            const children = parseInt(r.children) || 0;
            return sum + adults + children;
          }
          return sum;
        }, 0),
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
        // En production, retournez un vrai token JWT ici
        token: Buffer.from(`${username}:${password}`).toString("base64"),
      });
    } else {
      res
        .status(401)
        .json({ success: false, error: "Identifiants incorrects" });
    }
  } catch (error) {
    console.error("Erreur POST /api/admin/login:", error);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

// Route de santé
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Démarrer le serveur
async function startServer() {
  await initDataFiles();
  app.listen(PORT, () => {
    console.log(`🎉 Serveur API Wedding démarré sur le port ${PORT}`);
    console.log(`📊 Dashboard admin: http://localhost:${PORT}/admin`);
    console.log(`🔐 Identifiants par défaut: admin / wedding2026`);
  });
}

startServer();
