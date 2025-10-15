import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        "https://trustdrive-backend.onrender.com/api/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de réservation");

      setMessage({
        type: "success",
        text: "Votre demande de réservation a bien été envoyée. Vous recevrez une confirmation rapidement.",
      });
      setFormData({
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
      setMessage({ type: "error", text: `❌ ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="px-4 sm:px-6 lg:px-8 py-16 bg-neutral-950 text-neutral-100">
      <div className="max-w-3xl mx-auto bg-neutral-900/70 border border-yellow-500/10 rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(255,215,0,0.15)] backdrop-blur-md">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-yellow-400 mb-2">Réservation en ligne</h2>
        <p className="text-center text-neutral-400 mb-10">
          Planifiez votre trajet en toute simplicité. Réponse rapide et confirmation par e-mail.
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Prénom"
              className="w-full rounded-xl bg-neutral-800/80 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/40 outline-none transition-all"
            />
            <input
              type="text"
              placeholder="Nom"
              className="w-full rounded-xl bg-neutral-800/80 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/40 outline-none transition-all"
            />
          </div>

          <input
            type="email"
            placeholder="Adresse e-mail"
            className="w-full rounded-xl bg-neutral-800/80 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/40 outline-none transition-all"
          />

          <input
            type="tel"
            placeholder="Téléphone"
            className="w-full rounded-xl bg-neutral-800/80 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/40 outline-none transition-all"
          />

          <input
            type="text"
            placeholder="Adresse de prise en charge"
            className="w-full rounded-xl bg-neutral-800/80 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/40 outline-none transition-all"
          />

          <input
            type="text"
            placeholder="Destination"
            className="w-full rounded-xl bg-neutral-800/80 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/40 outline-none transition-all"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              className="w-full rounded-xl bg-neutral-800/80 border border-neutral-700 px-4 py-3 text-neutral-400 focus:ring-2 focus:ring-yellow-400/40 outline-none transition-all"
            />
            <input
              type="time"
              className="w-full rounded-xl bg-neutral-800/80 border border-neutral-700 px-4 py-3 text-neutral-400 focus:ring-2 focus:ring-yellow-400/40 outline-none transition-all"
            />
          </div>

          <textarea
            placeholder="Informations complémentaires..."
            rows={4}
            className="w-full rounded-xl bg-neutral-800/80 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/40 outline-none transition-all"
          />

          <button
            type="submit"
            className="w-full py-4 mt-4 bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.4)] transition-all active:scale-[0.98]"
          >
            Envoyer la demande
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
