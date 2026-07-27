/* AIM Landing — static server + demo-request endpoint */
const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8930;
const LEADS_FILE = path.join(__dirname, "leads.jsonl");
const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:4810";
const BACKEND_KEY = process.env.BACKEND_INTERNAL_KEY || "proxy-internal-key";

const app = express();
app.use(express.json({ limit: "50kb" }));

app.post("/api/demo-request", async (req, res) => {
  const { name, email, company, message } = req.body || {};
  if (!name || !email) return res.status(400).json({ ok: false, error: "name and email required" });

  const lead = {
    ts: new Date().toISOString(),
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    company: String(company || "").slice(0, 200),
    message: String(message || "").slice(0, 2000),
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
  };

  // 1. Persist (source of truth)
  fs.appendFileSync(LEADS_FILE, JSON.stringify(lead) + "\n");

  // 2. Notify via interactive card (best-effort)
  try {
    await fetch(`${BACKEND_URL}/api/conversations`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Internal-Key": BACKEND_KEY },
      body: JSON.stringify({
        pid: "system",
        model: "claude-sonnet-4-20250514",
        initiated_by: "proxy",
        first_message: {
          content: `🎯 Nouvelle demande de démo AIM — ${lead.name}`,
          interactive: {
            body: [
              { type: "text", text: `**${lead.name}** (${lead.email})`, weight: "bold" },
              { type: "text", text: `Entreprise : ${lead.company || "—"}` },
              { type: "text", text: `Contexte : ${lead.message || "—"}` },
            ],
            actions: [
              { id: "ack", label: "Vu", style: "primary", action: { type: "resolve" } },
            ],
          },
        },
      }),
    });
  } catch (e) {
    console.error("card notify failed:", e.message);
  }

  res.json({ ok: true });
});

app.use(express.static(path.join(__dirname, "dist")));
app.get("/{*any}", (_, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));

app.listen(PORT, "0.0.0.0", () => console.log(`aim-landing on :${PORT}`));
