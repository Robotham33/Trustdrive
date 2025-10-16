import React, { useState } from "react";

export default function BookingForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickupAddress: "",
    dropoffAddress: "",
    note: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Détecte REACT_APP_API_BASE :
  // - si défini à une chaîne vide -> utiliser chemins relatifs ('' => '/api/bookings')
  // - si défini non vide -> l'utiliser comme base (sans slash final)
  // - sinon -> fallback pratique pour Codespaces : hostname:5000
  const rawEnv = process.env.REACT_APP_API_BASE;
  const apiBase = typeof rawEnv === 'string'
    ? rawEnv.replace(/\/$/, '') // autorise valeur vide ""
    : `${window.location.protocol}//${window.location.hostname}:5000`;

  const submitUrl = apiBase === '' ? '/api/bookings' : `${apiBase}/api/bookings`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Basic required fields check
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.date ||
      !form.time ||
      !form.pickupAddress ||
      !form.dropoffAddress
    ) {
      setMessage({
        type: "error",
        text: "Veuillez remplir les champs obligatoires.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur serveur");
      setMessage({
        type: "success",
        text: "Réservation enregistrée. En attente de confirmation.",
      });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        pickupAddress: "",
        dropoffAddress: "",
        note: "",
        date: "",
        time: "",
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Échec de l'envoi" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-neutral-900/70 border border-yellow-500/10 rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(255,215,0,0.15)] backdrop-blur-md">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-yellow-400 mb-2">
        Réservation en ligne
      </h2>
      <p className="text-center text-neutral-400 mb-10">
        Planifiez votre trajet en toute simplicité. Réponse rapide et
        confirmation par e-mail.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Prénom"
            required
            className="p-3 rounded-xl bg-neutral-800 w-full"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Nom"
            required
            className="p-3 rounded-xl bg-neutral-800 w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="p-3 rounded-xl bg-neutral-800 w-full"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Téléphone"
            className="p-3 rounded-xl bg-neutral-800 w-full"
          />
        </div>
        <input
          name="pickupAddress"
          value={form.pickupAddress}
          onChange={handleChange}
          placeholder="Adresse de prise en charge"
          required
          className="p-3 rounded-xl bg-neutral-800 w-full"
        />
        <input
          name="dropoffAddress"
          value={form.dropoffAddress}
          onChange={handleChange}
          placeholder="Adresse de destination"
          required
          className="p-3 rounded-xl bg-neutral-800 w-full"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-neutral-800 w-full"
          />
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-neutral-800 w-full"
          />
        </div>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Notes / info complémentaire"
          className="p-3 rounded-xl bg-neutral-800 w-full"
          rows={4}
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500"
          >
            {loading ? "Envoi..." : "Envoyer la demande"}
          </button>
          {message && (
            <p
              className={
                message.type === "error"
                  ? "text-red-400"
                  : "text-emerald-400"
              }
            >
              {message.text}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
