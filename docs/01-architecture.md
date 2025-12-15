# Architecture Technique Solaire Facile

## 🏗️ Architecture Globale

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT APPLICATIONS                       │
│  Web App (React) | Mobile (React Native) | Admin Panel      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    API GATEWAY                               │
│  REST API | WebSocket | GraphQL (future)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│              BUSINESS LOGIC LAYER                            │
│  Auth Service | User Service | Project Service | Workflow   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                DATA LAYER                                    │
│  Firestore | Cloud Storage | Cloud Functions               │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Stack Technologique

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **State Management**: Redux Toolkit / Zustand
- **UI Library**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios / TanStack Query

### Backend
- **Platform**: Google Cloud Platform (Firebase)
- **Database**: Firestore (NoSQL)
- **Authentication**: Firebase Authentication
- **Hosting**: Cloud Run / App Engine
- **Storage**: Cloud Storage
- **Functions**: Cloud Functions (TypeScript)

### DevOps
- **Version Control**: Git (GitHub)
- **CI/CD**: GitHub Actions
- **Hosting Frontend**: Vercel / Cloud Storage
- **Monitoring**: Google Cloud Monitoring

## 📦 Structure des Données

### Collections Firestore

#### users
```
{
  uid: string (PK)
  email: string
  name: string
  role: "admin" | "installer" | "client"
  company: string
  createdAt: timestamp
  updatedAt: timestamp
  isActive: boolean
}
```

#### projects
```
{
  id: string (PK)
  clientId: string (FK)
  installerId: string (FK)
  title: string
  address: string
  status: "draft" | "pending" | "active" | "completed"
  dp_status: "pending" | "approved" | "rejected"
  consuel_status: "pending" | "approved"
  createdAt: timestamp
  updatedAt: timestamp
  documents: {
    dp_file_url: string
    consuel_file_url: string
  }
}
```

#### workflows
```
{
  id: string (PK)
  projectId: string (FK)
  type: "dp" | "consuel" | "enedis"
  status: "pending" | "in_progress" | "completed" | "failed"
  steps: []
  result: {}
  createdAt: timestamp
  updatedAt: timestamp
}
```

## 🔐 Sécurité

### Authentification
- Firebase Authentication (Email/Password, Google OAuth)
- JWT tokens avec expiration
- 2FA pour les admins

### Autorisation
- Role-based Access Control (RBAC)
- Field-level security rules
- Firestore security rules

### Données Sensibles
- Chiffrement des données PII
- Audit logs pour tous les accès
- RGPD compliance
- Backups réguliers

## 🔄 Workflows Automatisés

### DP (Déclaration Préalable)
1. Collecte des informations
2. Validation des données
3. Génération du document
4. Signature électronique
5. Envoi à la commune
6. Suivi de l'approbation

### Consuel
1. Saisie des caractéristiques installateur
2. Validation technique
3. Génération du bordereau
4. Envoi automatique
5. Récupération du numéro d'agrément

### Enedis
1. Demande de raccordement
2. Suivi du dossier
3. Validation technique
4. Notification du client

## 📡 API REST (Endpoints Clés)

### Auth
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Déconnexion

### Users
- `GET /api/users/me` - Profil actuel
- `GET /api/users` - Liste (admin)
- `PUT /api/users/:id` - Modification
- `DELETE /api/users/:id` - Suppression (admin)

### Projects
- `GET /api/projects` - Liste des projets
- `POST /api/projects` - Créer un projet
- `GET /api/projects/:id` - Détails
- `PUT /api/projects/:id` - Modifier
- `DELETE /api/projects/:id` - Supprimer

### Workflows
- `POST /api/workflows/:projectId/dp` - Démarrer DP
- `POST /api/workflows/:projectId/consuel` - Démarrer Consuel
- `GET /api/workflows/:id` - Statut workflow
- `GET /api/workflows/:projectId/history` - Historique

### Documents
- `GET /api/documents/:projectId` - Lister documents
- `POST /api/documents/:projectId/upload` - Upload
- `GET /api/documents/:id/download` - Télécharger
- `DELETE /api/documents/:id` - Supprimer

## 🔗 Intégrations Tierces

### Actuelles
- Firebase (Auth + Database)
- Google Cloud Storage
- Email service (SendGrid/Firebase)

### Prévues
- Solartraders (Import/Export)
- Enedis API
- Mairie (DP digitale)
- Solutions de paiement

## 📊 Scalabilité

- **Firestore**: Auto-scaling jusqu'à millions d'opérations/jour
- **Cloud Functions**: Auto-scaling basé sur les requêtes
- **Storage**: Illimité avec CDN
- **Current Capacity**: 10k utilisateurs simultanés
- **Target (Year 1)**: 100k utilisateurs actifs

## 🧪 Testing Strategy

- **Unit Tests**: Jest (80% couverture)
- **Integration Tests**: React Testing Library
- **E2E Tests**: Cypress/Playwright
- **Load Tests**: k6 / Apache JMeter
- **Security Tests**: OWASP Top 10

## 📈 Monitoring & Logs

- Google Cloud Logging
- Performance Monitoring (Sentry)
- Real User Monitoring (Google Analytics)
- Error tracking et alerting
- Dashboards custom
