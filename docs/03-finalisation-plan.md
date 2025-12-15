# Plan de finalisation (Phases 4 & 5) – coût 0 €

Version: 2.0 · Dernière mise à jour: 15 décembre 2025

## Objectifs
- Clore la Phase 4 (Client Portal) sans PSP payant.
- Atteindre les cibles Phase 5: perf ≥90 Lighthouse, SLA 99,9 % (cible), conformité GDPR-ready, capacité 100k utilisateurs avec free tiers.

## 1. Paiement « promesse » (sans PSP)
- Mode de paiement: virement/SEPA affiché; aucun encaissement in-app.
- Flux: création `paymentIntent` → génération PDF récap + IBAN → statut `pending` → validation manuelle en back-office → `paid` (idempotent).
- Stockage: collection Firestore `payments` (champs: `id`, `projectId`, `amount`, `dueDate`, `status`, `evidenceUrl`, `updatedAt`).
- Idempotence: refuser doublons sur `paymentIntentId`.
- Sécurité: mise à jour du statut uniquement via fonction Cloud Run/Firebase Admin avec rôle `admin`.

## 2. Notifications (free)
- Canaux: FCM (push), email SendGrid/Mailgun free tier, in-app (Firestore listeners).
- Matrice: événement → canal → template → préférence utilisateur (collection `userPrefs/{uid}`).
- Pipeline: Firestore trigger → Pub/Sub/Cloud Tasks → fan-out vers canaux; retries exponentiels.

## 3. Client Portal – finitions
- Dashboard statut projet, liste documents (Storage URLs signées), messagerie `threads/{projectId}/messages`.
- Paiement: page "Règlement" affichant IBAN + téléchargement du PDF d’ordre de virement.
- Accessibilité: audit axe-core + Lighthouse; corriger contrastes et focus.

## 4. Règles de sécurité Firestore (MVP)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner(projectId) {
      return request.auth != null &&
             projectId in request.auth.token.projects;
    }

    match /projects/{projectId} {
      allow read: if isOwner(projectId);
      allow update: if isOwner(projectId);
      allow create: if request.auth != null;
      allow delete: if false;
    }

    match /projects/{projectId}/messages/{msgId} {
      allow read, create: if isOwner(projectId);
      allow update, delete: if false;
    }

    match /payments/{paymentId} {
      allow read: if isOwner(resource.data.projectId);
      allow create: if isOwner(request.resource.data.projectId);
      allow update: if false; // statut modifié seulement côté admin backend
      allow delete: if false;
    }
  }
}
```

## 5. Performance (cible ≥90)
- Front: split par routes, images WebP, prefetch léger, cache CDN (Pages/Hosting gratuit), gzip/brotli activé.
- Backend: index Firestore ciblés, éviter sur-lecture, cold starts masqués via pre-warm ping planifié (Cloud Scheduler free tier).
- Mesure: Lighthouse CI sur PR; alerte si score <90.

## 6. Fiabilité & observabilité (SLA cible 99,9 %)
- Health checks Cloud Run + retries client (exponential backoff, idempotent).
- Monitoring: log-based metrics 5xx, latence p95; alertes email gratuites.
- Sauvegardes: export Firestore/Storage mensuel vers bucket même région (ingress/egress free intra-région).

## 7. Conformité (GDPR-ready)
- Registre PII: champs, base légale, durée; conserver 3 ans après clôture.
- Chiffrement: par défaut GCP; pour documents sensibles, chiffrer côté client avant upload (ex: AES-256 via Web Crypto) et stocker IV dans metadata.
- Audit: collection `audit` append-only avec TTL 365 jours sur traces courantes; conserver événements critiques 3 ans (export mensuel).

## 8. Scalabilité (cible 100k utilisateurs)
- Partitionner collections: sharding sur IDs (`project-{shard}-{uuid}`) pour limiter 1k writes/s par doc.
- Messagerie: paginer et indexer par `projectId+createdAt`.
- Tests de charge: k6 local (gratuit) scénarios lecture/paiement/notifications; suivre p95/p99.

## 9. Plans de test
- E2E (Playwright/Cypress): lead → création projet → upload doc → message → paiement promesse → notification → validation admin.
- Accessibilité: axe-core sur pages Dashboard/Docs/Paiement.
- Charge: scripts k6 pour 3 scénarios (dashboard read, message send, paiement promesse).

## 10. Déploiement gratuit (référence)
- Front: GitHub Pages ou Firebase Hosting free tier (cache activé, headers stricts).
- Backend: Cloud Run min instances 0, VPC egress off; triggers Firestore natifs pour notifications.
- Clés: stocker dans Secret Manager (free jusqu'à 10 versions), jamais en repo.

## 11. Playbook incident (résumé)
- Détection: alerte latence/5xx → confirmer sur dashboard Cloud Monitoring.
- Réponse: activer mode dégradé (désactiver uploads lourds, geler paiements), vider cache CDN si besoin.
- Restauration: rollback dernière release (Pages/Hosting versioned), réimport Firestore depuis dernier export.
- Post-mortem: RCA en 5 bullet points, actions préventives planifiées.

---
À faire en priorité: (1) implémenter flux paiement promesse + PDF, (2) matrice de notifications + triggers, (3) sécuriser règles Firestore et tests E2E.
