// server.js
import "dotenv/config"; // ✅ charge .env automatiquement
import express from "express";
import path from "path";
import compression from "compression";
import history from "connect-history-api-fallback";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit"; // ✅ limiter
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.APP_PORT || process.env.PORT || 3000);
const dist = path.join(__dirname, "dist");

// Confi réseau
app.set("trust proxy", 1);

// Middlewares globaux
app.use(express.json({ limit: "200kb" }));

// ✅ Rate limit sur l'API contact (ex: 5 requêtes / 5 min / IP)
const contactLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de demandes, réessayez dans quelques minutes." },
});
app.use("/api/contact", contactLimiter);

// ---------- API CONTACT (doit être AVANT history) ----------
app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      company = "",
      message,
      website = "",
      startedAt,
    } = req.body || {};

    // Honeypot
    if (website) return res.status(400).json({ error: "Bot détecté." });

    // Temps minimal (ex: >= 4s depuis l’affichage du formulaire)
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

    // SMTP (Infomaniak)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const to = process.env.CONTACT_TO || "helpdesk@microinformatic.ch";
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER;

    const subject = `📩 Contact site — ${name} (${email})`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;color:#0f172a;">
        <h2 style="margin:0 0 8px">Nouveau message via le site</h2>
        <p style="margin:0 0 16px;color:#334155;">Vous avez reçu une demande de contact.</p>
        <table style="border-collapse:collapse;width:100%;max-width:640px">
          <tr><td style="padding:8px;width:140px;color:#64748b;">Nom</td><td style="padding:8px;font-weight:600;">${escapeHtml(
            name
          )}</td></tr>
          <tr><td style="padding:8px;color:#64748b;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(
            email
          )}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:8px;color:#64748b;">Société</td><td style="padding:8px;">${escapeHtml(
            company || "—"
          )}</td></tr>
        </table>
        <div style="margin-top:16px;padding:12px 14px;background:#f1f5f9;border-radius:12px;white-space:pre-wrap">${escapeHtml(
          message
        )}</div>
        <p style="margin-top:16px;font-size:12px;color:#64748b">Envoyé automatiquement depuis microinformatic.ch</p>
      </div>`;
    const text = `Nouveau message via le site

Nom     : ${name}
Email   : ${email}
Société : ${company || "—"}

Message :
${message}
`;

    await transporter.sendMail({
      to,
      from,
      replyTo: email,
      subject,
      text,
      html,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Contact error:", err);
    return res.status(500).json({ error: "Envoi impossible pour le moment." });
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

// ---------- SPA fallback + statiques ----------
app.use(
  history({
    rewrites: [{ from: /^\/api\/.*$/, to: (ctx) => ctx.parsedUrl.path }],
  })
);
app.use(compression());
app.use(express.static(dist, { index: "index.html", maxAge: "1y" }));

app.get("/health", (_, res) => res.status(200).send("OK"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Listening on http://0.0.0.0:${PORT}`);
});
