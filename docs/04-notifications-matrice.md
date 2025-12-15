# Matrice de notifications (free tier)

Version: 2.0 · Dernière mise à jour: 15 décembre 2025

## Principes
- Canaux: push FCM (gratuit), email SendGrid/Mailgun free, in-app (Firestore listeners).
- Fan-out: trigger Firestore → Cloud Tasks/Functions → envoi multi-canaux, retries exponentiels.
- Préférences: `userPrefs/{uid}` (bool par canal), fallback in-app si opt-out.

## Matrice événement → canal → template
| Événement | Payload clé | Push FCM | Email | In-app | Notes |
|-----------|-------------|----------|-------|--------|-------|
| lead.created | leadId, name | ✅ | ✅ | ✅ | Informer admin/installer qu’un lead est créé. |
| project.status.updated | projectId, newStatus, eta | ✅ | ✅ | ✅ | Statut DP/Consuel/Enedis; throttling 1/h. |
| document.requested | projectId, docType, deadline | ✅ | ✅ | ✅ | Demande de document manquant. |
| payment.intent.pending | paymentId, amount, dueDate | ✅ | ✅ | ✅ | Envoi PDF virement + IBAN. |
| payment.intent.paid | paymentId, amount | ✅ | ✅ | ✅ | Confirmation paiement enregistré. |
| message.new | threadId, sender | ✅ | (opt) | ✅ | Email seulement si user inactif >30 min. |

## Templates (placeholders mustaches)

### Email – payment.intent.pending (fr)
Sujet: `Votre règlement pour le projet {{projectName}}`
Corps:
```
Bonjour {{userName}},

Merci de votre confiance. Pour régler {{amount}} €, effectuez un virement avant le {{dueDate}}.
IBAN: {{iban}}
Référence à indiquer: {{paymentRef}}

Vous pouvez télécharger l’ordre de virement ici: {{paymentPdfUrl}}

— L’équipe Solaire Facile
```

### Push – project.status.updated
Titre: `Statut mis à jour`
Body: `{{projectName}} → {{newStatus}} (ETA {{eta}})`

### In-app banner – document.requested
`Document {{docType}} requis avant le {{deadline}}. Téléverser maintenant.`

## Stockage & préférences
- Collection `userPrefs/{uid}`: `{ push: true, email: true, inApp: true, locale: 'fr' }`.
- Localisation: templates clés `fr`, `en` (clé `locale`).

## Anti-spam & QoS
- Throttling par événement/utilisateur (ex: 1 statut/h, 1 doc/jour, 1 paiement actif).
- Dedup clé: `eventType + entityId + version`. Stocker `notificationsLog` 7 jours.
- Retries: max 5, backoff 2^n, abandon → log dans `deadletters` et alerte email admin.

## Implémentation rapide
1) Créer collection `notificationsLog` (ttl 7 jours) pour idempotence.
2) Cloud Function trigger sur writes `projects`, `payments`, `messages`.
3) Dispatcher par préférences; envoyer push via FCM, email via SendGrid/Mailgun API, in-app via doc Firestore.
4) Tests: stub APIs; vérifier throttling, opt-out, fallback in-app.
