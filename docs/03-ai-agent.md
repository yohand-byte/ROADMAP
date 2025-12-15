# AI Landing Page Agent (Option)

## Objectif
Chatbot IA d’accueil 24/7 sur la landing page pour qualifier automatiquement les leads, capturer emails et répondre aux FAQ.

## Fonctionnalités
- Chat IA 24/7 (LLM) avec ton de marque Solaire Facile.
- Qualification des leads (budget, puissance, adresse, délai).
- Capture email / téléphone + opt-in RGPD.
- Intégration CRM (webhook `/webhook/crm` ou `/leads`).
- FAQ dynamique (docs markdown importées).
- Analytics (taux de capture, intents, transcripts exportables).

## Architecture
- Front : widget JS injecté (iframe ou web component).
- Backend : endpoint webhook (POST /webhook/crm) et POST /leads pour créer/mettre à jour le lead.
- LLM Provider : OpenAI / HuggingFace / Mistral (configurable).
- Storage : Firestore pour transcripts optionnels (TTL 30 j).

## Implémentation rapide
1. Widget : script async qui charge le bundle du chatbot et monte un bouton flottant.
2. Flux : Intent -> collecte champs -> POST /leads (payload: name, email, phone, address, power, source="ai_agent").
3. Sécurité : rate limit IP, désactivation PII dans logs LLM, clé API dans Secret Manager.
4. RGPD : consentement explicite, page mentions légales, purge transcripts >30j.

## Timeline
- Setup & branding : 1-2 jours
- Flows & intents : 2-3 jours
- Intégration CRM + tests : 2-3 jours
- Total : 1-2 semaines

## Coûts (indicatif)
- LLM : €20-50/mois (selon volume)
- Hébergement widget : CDN existant
- Monitoring : gratuit (Cloud Logging) ou low-cost (Posthog)

## KPI & ROI
- +40-60% de capture lead
- Temps de réponse < 2s
- Taux complétion formulaire > 30%

## Checklist de déploiement
- [ ] Clé LLM en secret
- [ ] Webhook /leads testé (201)
- [ ] Consentement RGPD affiché
- [ ] Logs sans PII longue durée
- [ ] Tracking events (open, msg, submit)
