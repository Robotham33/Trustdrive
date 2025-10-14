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
      <div className="max-w-2xl mx-auto bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-700">
        <h2 className="text-1xl md:text-2xl font-semibold text-center mb-6 text-green-400">
         
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              className="p-3 rounded bg-black border border-zinc-700 text-white"
              required
            />
            <input
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleChange}
              className="p-3 rounded bg-black border border-zinc-700 text-white"
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-zinc-700 text-white"
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-zinc-700 text-white"
            required
          />

          <input
            name="pickupAddress"
            placeholder="Adresse de prise en charge"
            value={formData.pickupAddress}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-zinc-700 text-white"
            required
          />

          <input
            name="dropoffAddress"
            placeholder="Destination"
            value={formData.dropoffAddress}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-zinc-700 text-white"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="p-3 rounded bg-black border border-zinc-700 text-white"
              required
            />
            <input
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className="p-3 rounded bg-black border border-zinc-700 text-white"
              required
            />
          </div>

          <textarea
            name="note"
            placeholder="Informations complémentaires..."
            value={formData.note}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black border border-zinc-700 text-white"
            rows="3"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-400 text-black font-semibold hover:bg-green-500 transition"
          >
            {loading ? "Envoi en cours..." : "Envoyer la demande"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
