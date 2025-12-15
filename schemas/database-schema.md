# Database Schema Diagram

## Collections Firestore

```
USERS
├── uid (PK)
├── email
├── name
├── role (admin|installer|client)
├── company
├── profile_picture_url
├── phone
├── address
├── createdAt
├── updatedAt
├── isActive
└── settings {
    notifications_enabled
    language
    timezone
}

PROJECTS
├── id (PK)
├── clientId (FK→USERS)
├── installerId (FK→USERS)
├── adminId (FK→USERS)
├── title
├── description
├── address
├── city
├── zipcode
├── latitude
├── longitude
├── installationType (residential|commercial|industrial)
├── powerOutput (kWc)
├── status (draft|active|completed|archived)
├── budget
├── cost_actual
├── startDate
├── expectedCompletionDate
├── actualCompletionDate
├── createdAt
├── updatedAt
└── tags []

DOCUMENTS
├── id (PK)
├── projectId (FK→PROJECTS)
├── uploadedById (FK→USERS)
├── filename
├── fileType (pdf|image|document|technical)
├── fileSize
├── fileUrl (Cloud Storage)
├── mimeType
├── uploadedAt
├── expiresAt
├── isPublic
├── accessibleBy []
└── metadata {
    width
    height
    pages
    thumbnail_url
}

WORKFLOWS
├── id (PK)
├── projectId (FK→PROJECTS)
├── type (dp|consuel|enedis|custom)
├── name
├── status (pending|in_progress|completed|failed)
├── progress (0-100)
├── startedAt
├── completedAt
├── error_message
├── result {}
├── steps [] {
    step_id
    name
    status
    completedAt
    result
}
├── createdBy (FK→USERS)
└── updatedAt

WORKFLOW_TEMPLATES
├── id (PK)
├── name
├── type (dp|consuel|enedis)
├── steps []
├── fields_mapping {}
├── description
├── isActive
├── createdBy (FK→USERS)
└── updatedAt

MESSAGES
├── id (PK)
├── projectId (FK→PROJECTS)
├── senderId (FK→USERS)
├── recipientId (FK→USERS)
├── content
├── attachments []
├── isRead
├── createdAt
└── deletedAt

NOTIFICATIONS
├── id (PK)
├── userId (FK→USERS)
├── type (project_update|message|workflow_complete)
├── title
├── message
├── relatedId (projectId|workflowId)
├── isRead
├── createdAt
└── actionUrl

INVOICES
├── id (PK)
├── projectId (FK→PROJECTS)
├── installerId (FK→USERS)
├── clientId (FK→USERS)
├── amount
├── currency
├── status (draft|sent|paid|overdue)
├── issueDate
├── dueDate
├── paidDate
├── items [] {
    description
    quantity
    unit_price
    total
}
├── notes
├── createdAt
└── updatedAt

AUDIT_LOGS
├── id (PK)
├── userId (FK→USERS)
├── action (create|update|delete|access)
├── entity_type (project|workflow|document)
├── entity_id
├── changes {}
├── timestamp
├── ip_address
└── user_agent
```

## Relations entre Collections

```
Users (1) ──────→ (Many) Projects (1:Many)
        (1) ──────→ (Many) Workflow (1:Many)
        (1) ──────→ (Many) Messages (1:Many)
        (1) ──────→ (Many) Notifications (1:Many)
        (1) ──────→ (Many) Invoices (1:Many)

Projects (1) ──────→ (Many) Documents (1:Many)
         (1) ──────→ (Many) Workflows (1:Many)
         (1) ──────→ (Many) Messages (1:Many)
         (1) ──────→ (Many) Invoices (1:Many)

Workflows (1) ──────→ (1) WorkflowTemplates
          (1) ──────→ (Many) AuditLogs (1:Many)

WorkflowTemplates (1) ──────→ (Many) Workflows (1:Many)
```

## Indexes Firestore (Performance)

```
USERS
├── Index 1: role, isActive
├── Index 2: company, createdAt
└── Index 3: email (unique)

PROJECTS
├── Index 1: installerId, status
├── Index 2: clientId, createdAt (desc)
├── Index 3: status, expectedCompletionDate
└── Index 4: city, installationType

WORKFLOWS
├── Index 1: projectId, status
├── Index 2: type, completedAt (desc)
└── Index 3: createdBy, status

DOCUMENTS
├── Index 1: projectId, uploadedAt (desc)
└── Index 2: fileType, isPublic

MESSAGES
├── Index 1: projectId, createdAt (desc)
└── Index 2: senderId, recipientId, isRead

NOTIFICATIONS
├── Index 1: userId, isRead, createdAt (desc)
└── Index 2: userId, type

INVOICES
├── Index 1: installerId, status, createdAt (desc)
└── Index 2: clientId, dueDate
```

## Data Validation Rules

```
USERS
├── email: required, unique, valid format
├── name: required, min 2 chars, max 100
├── role: required, enum (admin|installer|client)
├── phone: optional, valid format
└── password: required, min 8 chars, strong

PROJECTS
├── title: required, max 200
├── clientId: required, exists in USERS
├── installerId: required, exists in USERS
├── address: required, min 5 chars
├── powerOutput: required, numeric, > 0
├── budget: optional, numeric, >= 0
└── status: required, enum (draft|active|...)

WORKFLOWS
├── projectId: required, exists in PROJECTS
├── type: required, enum (dp|consuel|...)
├── status: required, enum (pending|...)
└── steps: optional, max 20 items

DOCUMENTS
├── projectId: required, exists in PROJECTS
├── filename: required, max 500
├── fileSize: required, < 100MB
└── fileUrl: required, valid GCS URL
```

## Firestore Security Rules (Excerpt)

```typescript
// Users can read/write their own document
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

// Installers can read projects they own
match /projects/{projectId} {
  allow read: if request.auth.uid == resource.data.installerId;
  allow write: if request.auth.uid == resource.data.installerId && 
               request.resource.data.status != 'completed';
}

// Clients can only read their projects
match /projects/{projectId} {
  allow read: if request.auth.uid == resource.data.clientId;
}

// Documents inherently secure via project permissions
match /documents/{documentId} {
  allow read, write: if get(/databases/$(database)/documents/projects/
                        $(resource.data.projectId)).data.installerId 
                        == request.auth.uid;
}

// Audit logs are append-only
match /audit_logs/{logId} {
  allow create: if request.resource.data.userId == request.auth.uid;
  allow read: if request.auth.token.role == 'admin';
}
```
