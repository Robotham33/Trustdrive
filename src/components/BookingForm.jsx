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
    <section className="bg-black text-white py-10 px-6 md:px-20">
      <div className="max-w-lg mx-auto bg-neutral-900/80 border border-neutral-800 rounded-3xl shadow-[0_0_25px_rgba(255,215,0,0.15)] p-6 sm:p-8 backdrop-blur-md">
  <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-yellow-400">
    Réserver votre course
  </h2>
  <form className="space-y-4">
    <div className="grid sm:grid-cols-2 gap-4">
      <input type="text" placeholder="Prénom" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/30 outline-none transition-all" />
      <input type="text" placeholder="Nom" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/30 outline-none transition-all" />
    </div>
    <input type="email" placeholder="Adresse e-mail" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/30 outline-none transition-all" />
    <input type="tel" placeholder="Téléphone" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/30 outline-none transition-all" />
    <input type="text" placeholder="Adresse de prise en charge" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/30 outline-none transition-all" />
    <input type="text" placeholder="Destination" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/30 outline-none transition-all" />
    <div className="grid sm:grid-cols-2 gap-4">
      <input type="date" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/30 outline-none transition-all" />
      <input type="time" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/30 outline-none transition-all" />
    </div>
    <textarea placeholder="Informations complémentaires..." rows={4} className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 focus:ring-2 focus:ring-yellow-400/30 outline-none transition-all" />
    <button type="submit" className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-semibold rounded-2xl shadow-lg hover:shadow-yellow-400/30 transition-all">
      Envoyer la demande
    </button>
  </form>
</div>

    </section>
  );
};

export default BookingForm;
