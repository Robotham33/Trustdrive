const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const XLSX = require('xlsx');
const nodemailer = require('nodemailer');


// Middleware admin token
const adminToken = "votre_token_admin";
function checkAdmin(req, res, next) {
    if (req.headers['x-admin-token'] !== adminToken) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
}

// POST /api/bookings
router.post('/', async (req, res) => {
    const { firstName, lastName, email, phone, pickupAddress, dropoffAddress, note, date, time } = req.body;
    // Refuse si créneau déjà confirmé
    const exists = await Booking.findOne({ date, time, status: 'confirmed' });
    if (exists) return res.status(400).json({ error: 'Slot already confirmed' });
    const booking = new Booking({ firstName, lastName, email, phone, pickupAddress, dropoffAddress, note, date, time });
    await booking.save();

// --- Email au client --- //
const clientMail = {
  from: `"TrustDrive - Réservation" <${process.env.MAIL_USER}>`,
  to: booking.email,
  subject: "Votre réservation TrustDrive est bien enregistrée",
  html: `
  <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; background-color: #0a0a0a; color: #f2f2f2; padding: 30px; border-radius: 12px; max-width: 600px; margin: auto;">
    <h2 style="color: #facc15; text-align: center;">Merci ${booking.firstName} 🙏</h2>
    <p style="font-size: 16px; line-height: 1.6; text-align: center;">
      Nous avons bien reçu votre demande de réservation.  
      Toute l’équipe <strong>TrustDrive</strong> vous remercie pour votre confiance.
    </p>

    <div style="background-color: #111; border: 1px solid #222; border-radius: 10px; padding: 20px; margin-top: 20px;">
      <h3 style="color: #facc15; margin-bottom: 10px;">📅 Détails de votre demande :</h3>
      <ul style="list-style: none; padding: 0; line-height: 1.7;">
        <li><b>Date :</b> ${booking.date}</li>
        <li><b>Heure :</b> ${booking.time}</li>
        <li><b>Adresse de prise en charge :</b> ${booking.pickupAddress}</li>
        <li><b>Destination :</b> ${booking.dropoffAddress}</li>
        ${booking.note ? `<li><b>Note :</b> ${booking.note}</li>` : ""}
      </ul>
    </div>

    <p style="margin-top: 25px; font-size: 15px; text-align: center;">
      ⏳ Vous recevrez un e-mail de confirmation dès que votre course sera validée par notre équipe.
    </p>

    <div style="margin-top: 30px; text-align: center;">
      <a href="https://trustdrive.fr" target="_blank"
         style="display: inline-block; background-color: #facc15; color: #111; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">
        Visiter notre site
      </a>
    </div>

    <p style="margin-top: 35px; text-align: center; font-size: 13px; color: #aaa;">
      TrustDrive — Chauffeur privé premium en Tesla Model 3<br/>
      Paris & Île-de-France · Service éco-responsable et haut de gamme
    </p>

    <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;">
    <p style="text-align: center; font-size: 12px; color: #666;">
      Cet e-mail a été généré automatiquement. Merci de ne pas y répondre.<br/>
      Pour toute demande, contactez-nous sur <a href="mailto:contact@trustdrive.fr" style="color:#facc15;">contact@trustdrive.fr</a>.
    </p>
  </div>
`

};

// --- Email interne (toi) --- //
const adminMail = {
  from: `"TrustDrive" <${process.env.MAIL_USER}>`,
  to: "trustdrivebyhamza@gmail.com",
  subject: "🆕 Nouvelle réservation TrustDrive",
  html: `
    <h2>Nouvelle demande :</h2>
    <ul>
      <li><b>Nom :</b> ${booking.lastName}</li>
      <li><b>Prénom :</b> ${booking.firstName}</li>
      <li><b>Email :</b> ${booking.email}</li>
      <li><b>Téléphone :</b> ${booking.phone}</li>
      <li><b>Départ :</b> ${booking.pickupAddress}</li>
      <li><b>Destination :</b> ${booking.dropoffAddress}</li>
      <li><b>Date :</b> ${booking.date}</li>
      <li><b>Heure :</b> ${booking.time}</li>
      <li><b>Note :</b> ${booking.note || "—"}</li>
    </ul>
  `
};

try {
  await transporter.sendMail(clientMail);
  await transporter.sendMail(adminMail);
  console.log("📩 Emails envoyés avec succès");
} catch (error) {
  console.error("Erreur envoi email :", error);
}

res.json(booking);

});

// GET /api/availability?date=YYYY-MM-DD
router.get('/availability', async (req, res) => {
    const { date } = req.query;
    const confirmed = await Booking.find({ date, status: 'confirmed' }).select('time -_id');
    res.json({ confirmed: confirmed.map(b => b.time) });
});

// PUT /api/bookings/:id/confirm
router.put('/:id/confirm', checkAdmin, async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Not found' });
    // Refuse si créneau déjà confirmé
    const exists = await Booking.findOne({ date: booking.date, time: booking.time, status: 'confirmed' });
    if (exists) return res.status(400).json({ error: 'Slot already confirmed' });
    booking.status = 'confirmed';
    await booking.save();
    res.json(booking);
});

// GET /api/bookings/export/excel
router.get('/export/excel', checkAdmin, async (req, res) => {
    const bookings = await Booking.find();
    const data = bookings.map(b => ({
        firstName: b.firstName,
        lastName: b.lastName,
        email: b.email,
        phone: b.phone,
        pickupAddress: b.pickupAddress,
        dropoffAddress: b.dropoffAddress,
        note: b.note,
        date: b.date,
        time: b.time,
        status: b.status
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', 'attachment; filename="bookings.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
});
// --- Configuration du mailer --- //
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, // ton adresse expéditeur (Gmail pro par ex)
    pass: process.env.MAIL_PASS  // mot de passe ou app password
  }
});

module.exports = router;
