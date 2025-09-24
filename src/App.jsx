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
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-400 flex items-center justify-center shadow-md">
              <span className="text-neutral-900 font-semibold">TD</span>
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide">TrustDrive <span className="text-neutral-400 text-base font-light">by Hamza</span></p>
              <p className="text-xs text-neutral-400">Chauffeur privé — Tesla Model Y 100% électrique</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#tarifs" className="text-neutral-300 hover:text-white">Tarifs</a>
            <a href="#entreprises" className="text-neutral-300 hover:text-white">Packs Entreprises</a>
            <a href="#services" className="text-neutral-300 hover:text-white">Services</a>
            <a href="#contact" className="text-neutral-300 hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://wa.me/33666040473" target="_blank" rel="noreferrer" className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-white/90 text-neutral-900 hover:bg-white transition shadow">
              Réserver via WhatsApp
            </a>
            <a href="tel:+33666040473" className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition border border-neutral-700">Appeler</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-neutral-900/40 to-neutral-950" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Chauffeur privé premium, <br /> disponible matin & soir
            </h1>
            <p className="mt-6 text-neutral-300 text-lg md:text-xl max-w-2xl">
              Transferts aéroports, hôtels, business et événements. Confort silencieux de la Tesla Model Y, accueil personnalisé, eau & chargeurs à bord.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#tarifs" className="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition">Voir les tarifs</a>
              <a href="#contact" className="px-5 py-3 rounded-2xl bg-neutral-800 border border-neutral-700 hover:bg-neutral-700">Demander un devis</a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-neutral-400">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"/> Disponibilité : Paris & IDF</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"/> Paiement CB / Virement / Espèces</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950 rounded-3xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-semibold">Tarifs clairs & transparents</h2>
        <p className="mt-3 text-neutral-400 max-w-2xl">TVA non applicable — art. 293 B du CGI. Facture fournie pour chaque prestation.</p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">Transferts aéroports</h3>
            <ul className="space-y-2 text-neutral-300">
              <li>Orly ↔ Paris : <span className="font-medium">60 €</span></li>
              <li>CDG ↔ Paris : <span className="font-medium">85 €</span></li>
              <li>Beauvais ↔ Paris : <span className="font-medium">150 €</span></li>
              <li>Aéroport ↔ Aéroport : <span className="font-medium">100 €</span></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">Forfaits horaires</h3>
            <ul className="space-y-2 text-neutral-300">
              <li>À l’heure (min. 2 h) : <span className="font-medium">60 €/h</span></li>
              <li>½ journée (4 h) : <span className="font-medium">200 €</span></li>
              <li>Journée (8 h) : <span className="font-medium">400 €</span></li>
              <li>Soirée (17h–22h) : <span className="font-medium">250 €</span></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">Événements</h3>
            <ul className="space-y-2 text-neutral-300">
              <li>Mariage / Gala (jusqu’à 6 h) : <span className="font-medium">300 €</span></li>
              <li>Attente incluse, itinéraire flexible</li>
              <li>Option véhicule décoré sur demande</li>
              <li>Devis sous 1 h (jour ouvré)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Packs Entreprises */}
      <section id="entreprises" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950 rounded-3xl shadow-xl">
        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 md:p-12 shadow-xl">
          <div className="md:flex items-start justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-semibold">Packs Entreprises</h2>
              <p className="mt-3 text-neutral-300">Formules dédiées pour déplacements dirigeants, clients VIP, et navettes hôtels ↔ bureaux.</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-neutral-300">
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-white"/> Facturation mensuelle, récap détaillé</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-white"/> Accueil pancarte aéroports</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-white"/> Eau, Wi-Fi, chargeurs à bord</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-white"/> Tesla 100% électrique, image premium</li>
              </ul>
            </div>
            <div className="mt-8 md:mt-0 grid sm:grid-cols-3 gap-4 w-full max-w-3xl">
              {[
                {h:"Pack 20 h / mois", p:"900 €", s:"Soit 45 €/h", b:["Planification prioritaire","Support WhatsApp direct"]},
                {h:"Pack 40 h / mois", p:"1 680 €", s:"Soit 42 €/h", b:["Chauffeur dédié","Accès week-end prioritaire"]},
                {h:"Pack 80 h / mois", p:"3 200 €", s:"Soit 40 €/h", b:["Coordination événements","Facturation multi-sites"]},
              ].map((card, idx) => (
                <div key={idx} className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 shadow-lg hover:shadow-2xl transition">
                  <h3 className="text-lg font-semibold">{card.h}</h3>
                  <p className="mt-2 text-3xl font-semibold">{card.p}</p>
                  <p className="text-neutral-400">{card.s}</p>
                  <ul className="mt-4 text-sm text-neutral-300 space-y-2">
                    {card.b.map((x, i)=>(<li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-neutral-300"/>{x}</li>))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950 rounded-3xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-semibold">À bord & services</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {t:"Tesla Model Y – 100% électrique", d:"Silencieuse, spacieuse, idéale pour trajets business et familles."},
            {t:"Accueil premium", d:"Prise en charge aéroports/hôtels avec pancarte au nom du client."},
            {t:"Confort & connectivité", d:"Eau, chargeurs smartphone, Wi-Fi à bord."},
            {t:"Sécurité & assurance", d:"Professionnel VTC, assurance & facturation incluses."},
            {t:"Ponctualité", d:"Créneaux matin et fin de journée optimisés pour Paris/IDF."},
            {t:"Écoute & flexibilité", d:"Itinéraires personnalisés, arrêts sur demande, attentes incluses selon forfait."},
          ].map((item, i)=> (
            <div key={i} className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 shadow-lg hover:shadow-2xl transition">
              <h3 className="text-lg font-semibold">{item.t}</h3>
              <p className="mt-2 text-neutral-300">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950 rounded-3xl shadow-xl">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-8 shadow-lg hover:shadow-2xl transition">
          <h2 className="text-3xl md:text-4xl font-semibold">Contact & devis</h2>
          <p className="mt-2 text-neutral-300">Réponse rapide par WhatsApp, téléphone ou via ce formulaire.</p>

          <div className="mt-6 grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" onChange={handleChange} value={form.name} placeholder="Nom complet" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20" />
              <input name="email" onChange={handleChange} value={form.email} placeholder="Email" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20" />
            </div>
            <input name="phone" onChange={handleChange} value={form.phone} placeholder="Téléphone" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20" />
            <textarea name="message" onChange={handleChange} value={form.message} placeholder="Votre besoin (dates, horaires, itinéraire)" rows={5} className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20" />
            <div className="flex flex-wrap gap-3">
              <button onClick={handleMailto} className="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition">Envoyer la demande</button>
              <a href="https://wa.me/33666040473" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl bg-emerald-500/90 hover:bg-emerald-500 text-neutral-900 font-medium">WhatsApp direct</a>
              <a href="tel:+33666040473" className="px-5 py-3 rounded-2xl bg-neutral-800 border border-neutral-700 hover:bg-neutral-700">Appeler</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-10 text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400">© {new Date().getFullYear()} TrustDrive by Hamza — Tous droits réservés</p>
          <p className="text-neutral-500">SIRET : à venir • TVA non applicable — art. 293 B du CGI</p>
        </div>
      </footer>
    </div>
  );
}
