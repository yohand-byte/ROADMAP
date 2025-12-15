import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, AlertCircle, Database, Users, FileText, Zap } from 'lucide-react';

export default function ConversionFlowSchema() {
  const [expandedStep, setExpandedStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: 'Prospect Arrive',
      description: 'Inscription via Landing Page',
      icon: Users,
      color: 'from-blue-600 to-blue-400',
      details: [
        'Rempli le formulaire',
        'Nom, Email, Téléphone',
        'Adresse, Description projet',
        'Clique "S\'inscrire"'
      ],
      output: 'Lead créé'
    },
    {
      id: 2,
      title: 'Lead Stocké',
      description: 'Base de données Firestore',
      icon: Database,
      color: 'from-purple-600 to-purple-400',
      details: [
        'Collection: leads',
        'Status: "nouveau"',
        'Timestamp: createdAt',
        'ID: auto-généré'
      ],
      output: 'Lead visible'
    },
    {
      id: 3,
      title: 'Table des Leads',
      description: 'Dashboard Admin',
      icon: FileText,
      color: 'from-indigo-600 to-indigo-400',
      details: [
        'Liste des leads (30j)',
        'Filtres par statut',
        'Recherche par nom/email',
        '🔴 Lignes CLIQUABLES'
      ],
      output: 'Tableau interactif'
    },
    {
      id: 4,
      title: 'Clic sur Lead',
      description: 'Navigue vers détail',
      icon: ChevronDown,
      color: 'from-cyan-600 to-cyan-400',
      details: [
        'Route: /leads/{leadId}',
        'Page détail complète',
        'Tous les champs visibles',
        'Voir le projet'
      ],
      output: 'Page détail ouverte'
    },
    {
      id: 5,
      title: 'Validation Données',
      description: 'Vérification champs',
      icon: AlertCircle,
      color: 'from-yellow-600 to-yellow-400',
      details: [
        '✓ Nom rempli?',
        '✓ Email valide?',
        '✓ Tel. > 9 chars?',
        '✓ Adresse remplie?',
        '✓ Description ok?'
      ],
      output: 'Validation réussie'
    },
    {
      id: 6,
      title: 'Auto-incrément ID',
      description: 'Génération numéro unique',
      icon: Zap,
      color: 'from-orange-600 to-orange-400',
      details: [
        'Lit compteur Firestore',
        'nextId: 42 → 43',
        'Format: DOS-2025-0043',
        'Garant: unicité'
      ],
      output: 'ID généré'
    },
    {
      id: 7,
      title: 'Dossier Créé',
      description: 'Nouvelle collection: files',
      icon: CheckCircle2,
      color: 'from-emerald-600 to-emerald-400',
      details: [
        'Collection: files',
        'Document: DOS-2025-0043',
        'Copie tous les champs',
        'Status: "nouveau"'
      ],
      output: 'Dossier en DB'
    },
    {
      id: 8,
      title: 'Lead Mis à Jour',
      description: 'Référence croisée',
      icon: CheckCircle2,
      color: 'from-rose-600 to-rose-400',
      details: [
        'Status → "converti"',
        'clientId → DOS-2025-0043',
        'updatedAt → timestamp',
        'Lien bidirectionnel'
      ],
      output: 'Lead converti'
    },
    {
      id: 9,
      title: 'Compteur Incrémenté',
      description: 'Mise à jour auto',
      icon: Zap,
      color: 'from-violet-600 to-violet-400',
      details: [
        'counters/dossiers',
        'nextId: 43 → 44',
        'lastUpdated: now',
        'Prêt pour le suivant'
      ],
      output: 'Compteur +1'
    },
    {
      id: 10,
      title: 'Success Toast',
      description: 'Confirmation visuelle',
      icon: CheckCircle2,
      color: 'from-green-600 to-green-400',
      details: [
        '✅ Message succès',
        'Montre le numéro DOS',
        'Durée: 2 secondes',
        'Auto-redirect'
      ],
      output: 'Feedback utilisateur'
    },
    {
      id: 11,
      title: 'Redirection',
      description: 'Page du dossier créé',
      icon: ChevronDown,
      color: 'from-sky-600 to-sky-400',
      details: [
        'Route: /dossiers/{dosId}',
        'Page détail dossier',
        'Voir toutes les étapes',
        'Ajouter infos (DP, Consuel, etc)'
      ],
      output: 'Dossier visible'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">
            Flux Complet Lead → Dossier
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            De l'inscription du prospect à la création du dossier en suivant 11 étapes automatisées et validées
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm">
            <div className="bg-blue-900/30 border border-blue-700 rounded-full px-4 py-2 text-blue-300 font-semibold">
              ⏱️ Durée: ~2-3 secondes
            </div>
            <div className="bg-emerald-900/30 border border-emerald-700 rounded-full px-4 py-2 text-emerald-300 font-semibold">
              ✅ 100% Automatisé
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isExpanded = expandedStep === step.id;

            return (
              <div key={step.id} className="relative">
                {/* Connecteur vertical */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 to-slate-700"></div>
                )}

                {/* Card */}
                <div
                  onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                  className={`relative z-10 cursor-pointer transition-all ${
                    isExpanded ? 'mb-6' : 'mb-2'
                  }`}
                >
                  {/* Main Card */}
                  <div
                    className={`bg-gradient-to-r ${step.color} rounded-xl p-6 text-white shadow-lg shadow-slate-900/50 hover:shadow-xl hover:shadow-slate-900/50 transition-all ${
                      isExpanded ? 'ring-2 ring-offset-2 ring-slate-400' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Numéro & Icon */}
                      <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-xs font-bold opacity-75">Étape</p>
                          <p className="text-2xl font-black">{step.id}</p>
                        </div>
                      </div>

                      {/* Contenu */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-1">{step.title}</h3>
                        <p className="text-sm opacity-90">{step.description}</p>
                      </div>

                      {/* Output Badge */}
                      <div className="flex-shrink-0 bg-white/10 rounded-lg px-4 py-2 text-sm font-semibold text-center">
                        <p className="opacity-75 text-xs mb-1">Résultat</p>
                        <p className="font-bold">{step.output}</p>
                      </div>

                      {/* Chevron */}
                      <ChevronDown
                        className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-4 ml-20 bg-slate-800/50 border-l-4 border-white rounded-lg p-6 backdrop-blur-sm">
                      <h4 className="text-white font-bold mb-4">📋 Détails de cette étape</h4>
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-300">
                            <span className="text-white font-bold mt-1">→</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistiques finales */}
        <div className="mt-20 grid md:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-slate-400 text-sm mb-2">ÉTAPES TOTALES</p>
            <p className="text-4xl font-black text-white">11</p>
            <p className="text-slate-500 text-xs mt-2">Étapes validées</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-slate-400 text-sm mb-2">DURÉE TOTALE</p>
            <p className="text-4xl font-black text-blue-400">~2-3s</p>
            <p className="text-slate-500 text-xs mt-2">Entièrement automatisé</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-slate-400 text-sm mb-2">VALIDATIONS</p>
            <p className="text-4xl font-black text-emerald-400">5</p>
            <p className="text-slate-500 text-xs mt-2">Vérifications champs</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-slate-400 text-sm mb-2">POINTS DE FAILURE</p>
            <p className="text-4xl font-black text-yellow-400">1</p>
            <p className="text-slate-500 text-xs mt-2">Si validation échoue</p>
          </div>
        </div>

        {/* Points clés */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border border-emerald-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎯 Points Clés du Processus</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-emerald-300 font-bold mb-2">✅ Automatisation</h3>
              <p className="text-slate-300">
                Tout est automatisé une fois le bouton "Convertir" cliqué. Zéro action manuelle requise.
              </p>
            </div>
            <div>
              <h3 className="text-cyan-300 font-bold mb-2">🔒 Validation</h3>
              <p className="text-slate-300">
                5 champs sont vérifiés avant la conversion. Impossible de créer un dossier incomplet.
              </p>
            </div>
            <div>
              <h3 className="text-purple-300 font-bold mb-2">🔢 Unicité</h3>
              <p className="text-slate-300">
                Chaque dossier reçoit un ID unique (DOS-2025-XXXX). Les transactions garantissent zéro doublon.
              </p>
            </div>
            <div>
              <h3 className="text-blue-300 font-bold mb-2">🔗 Traçabilité</h3>
              <p className="text-slate-300">
                Lead et Dossier sont liés. Vous savez toujours d'où vient chaque dossier.
              </p>
            </div>
          </div>
        </div>

        {/* Cas d'erreur */}
        <div className="mt-12 bg-red-900/20 border border-red-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-red-300 mb-6">⚠️ Gestion des Erreurs</h2>
          <div className="space-y-4">
            {[
              { error: 'Email invalide', action: 'Affiche message d\'erreur + reste sur la page' },
              { error: 'Téléphone vide', action: 'Validation échoue + highlight du champ' },
              { error: 'Adresse manquante', action: 'Bouton désactivé jusqu\'à remplissage' },
              { error: 'Compteur indisponible', action: 'Retry auto + notification admin' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-red-300 font-semibold">{item.error}</p>
                  <p className="text-red-200/70">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à Lancer?</h2>
          <p className="text-lg opacity-90 mb-6">
            Tous les fichiers sont prêts. Suivez le IMPLEMENTATION_GUIDE.md pour mettre en place ce flux.
          </p>
          <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition-all">
            📖 Voir le Guide d'Implémentation
          </button>
        </div>
      </div>
    </div>
  );
}