
import React, { useState } from "react";

export default function TrustDriveVitrine() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleMailto = () => {
    const to = "contact@trustdrive.fr";
    const subject = encodeURIComponent("Demande TrustDrive — Réservation / Devis");
    const body = encodeURIComponent(
      `Nom: ${form.name}\nEmail: ${form.email}\nTéléphone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      {/* Entire site layout code here */}
      {/* ... */}
    </div>
  );
}
