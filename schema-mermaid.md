graph TD
    A["👤 Prospect Arrive<br/>Landing Page"] -->|Remplit formulaire| B["📝 Lead Créé<br/>Status: 'nouveau'"]
    
    B -->|POST /api/leads| C["🗄️ Firestore Collection<br/>leads/"]
    
    C -->|Stocké en DB| D["📊 Dashboard Admin<br/>Table des Leads"]
    
    D -->|30 derniers jours| E["🔴 Leads Récents Cliquables"]
    
    E -->|Click sur lead| F["📄 Page Détail Lead<br/>/leads/:leadId"]
    
    F -->|Voir infos complètes| G["👁️ Affiche<br/>✓ Nom<br/>✓ Email<br/>✓ Téléphone<br/>✓ Adresse<br/>✓ Description"]
    
    G -->|Clique bouton| H["🟢 Convertir en Dossier"]
    
    H -->|Déclenche| I["✔️ Validation<br/>Champs obligatoires"]
    
    I -->|Si OK| J["🔢 Auto-incrément<br/>Compteur Firestore"]
    
    J -->|nextId+1| K["📋 Génère ID<br/>DOS-2025-XXXX"]
    
    K -->|Crée document| L["📑 Dossier Créé<br/>Collection: files"]
    
    L -->|Copie données| M["📦 Initialise Champs<br/>status: 'nouveau'<br/>dpStatus: 'attente'<br/>consuelStatus: 'attente'<br/>enedisStatus: 'attente'<br/>edfStatus: 'attente'"]
    
    M -->|Met à jour| N["🔗 Lead Référencé<br/>status → 'converti'<br/>clientId → DOS-XXXX"]
    
    N -->|+1| O["⚙️ Compteur +1<br/>nextId: 43 → 44"]
    
    O -->|Succès| P["✨ Toast de Confirmation<br/>'Dossier créé: DOS-2025-0043'"]
    
    P -->|Auto-redirect 2s| Q["🎯 Page du Dossier<br/>/dossiers/DOS-2025-0043"]
    
    Q -->|✅ Fin du flux| R["🎉 Dossier Prêt<br/>Ajouter DP, Consuel, etc."]
    
    I -->|Si ERREUR| S["❌ Validation Échouée<br/>Affiche erreur"]
    S -->|Reste sur page| F
    
    style A fill:#3b82f6,stroke:#1e40af,color:#fff
    style B fill:#a855f7,stroke:#6d28d9,color:#fff
    style C fill:#06b6d4,stroke:#0891b2,color:#fff
    style D fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style E fill:#ec4899,stroke:#be185d,color:#fff
    style F fill:#06b6d4,stroke:#0891b2,color:#fff
    style G fill:#0891b2,stroke:#0e7490,color:#fff
    style H fill:#10b981,stroke:#047857,color:#fff
    style I fill:#f59e0b,stroke:#d97706,color:#fff
    style J fill:#f59e0b,stroke:#d97706,color:#fff
    style K fill:#f59e0b,stroke:#d97706,color:#fff
    style L fill:#10b981,stroke:#047857,color:#fff
    style M fill:#10b981,stroke:#047857,color:#fff
    style N fill:#ec4899,stroke:#be185d,color:#fff
    style O fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style P fill:#06b6d4,stroke:#0891b2,color:#fff
    style Q fill:#10b981,stroke:#047857,color:#fff
    style R fill:#10b981,stroke:#047857,color:#fff
    style S fill:#ef4444,stroke:#991b1b,color:#fff