# Plan de tests Phases 4 & 5

Version: 2.0 · Dernière mise à jour: 15 décembre 2025

## 1. End-to-End (Playwright/Cypress)
- Scénario complet: lead → création projet → upload doc → message → paiement promesse → notification → validation admin.
- Contrôles: statuts affichés, règles Firestore respectées (403 si mauvais projet), messages temps réel, paiement marqué paid par admin.
- Accessibilité: axe-core sur Dashboard, Documents, Paiement (contraste, focus, aria-label).

## 2. Notifications
- Idempotence: même événement rejoué ≠ double envoi (clé `eventType+entityId+version`).
- Throttling: statut projet limité à 1/h; doc.requested 1/jour.
- Opt-out: désactiver email/push dans `userPrefs` → fallback in-app uniquement.
- Fallback: échec FCM/email → message in-app loggué.

## 3. Paiement « promesse »
- Création `paymentIntent` → PDF généré → statut `pending`.
- Refus doublon `paymentIntentId`.
- Mise à jour statut réservée au rôle admin (403 sinon).
- Journaux: trace `audit` créée pour chaque changement de statut.

## 4. Performance (Lighthouse ≥90)
- Exécuter Lighthouse CI sur pages principales (Dashboard, Docs, Paiement) en mobile/desktop.
- Échec si score <90 en Perf ou Accessibilité.

## 5. Charge (k6 – local, gratuit)
Scripts cibles: `scripts/k6/`
```js
// scripts/k6/dashboard.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { vus: 50, duration: '2m' };

export default function () {
  const res = http.get(`${__ENV.API}/projects?uid=tester`);
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}
```

À ajouter: `messages.js` (POST message), `payments.js` (POST paymentIntent + GET status).

## 6. Sécurité / Règles Firestore
- Tests unitaires rules (Emulator):
  - propriétaire peut lire/écrire son projet, pas celui des autres.
  - messages: create/read OK si owner; update/delete refusés.
  - payments: create/read OK pour owner; update refusée (sauf backend admin mocké).

## 7. Observabilité / Résilience
- Simuler échecs FCM/SendGrid: vérifier retries exponentiels puis deadletter.
- Chaos léger: couper API backend pendant 30s → vérifier backoff côté front et reprise.

## 8. Checklists de sortie
- Tous les tests E2E passent.
- Lighthouse ≥90 (perf + a11y).
- k6: p95 < 300 ms lecture dashboard, p95 < 800 ms création message.
- Aucune règle Firestore permissive détectée (tests emulator).
