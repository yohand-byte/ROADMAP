# 🚀 Setup Guide: Déployer la Roadmap sur GitHub Pages

## Prérequis
- Compte GitHub (gratuit)
- Git installé sur votre ordinateur ([git-scm.com](https://git-scm.com))
- Terminal/Command Prompt

## Étape 1: Créer le Repository sur GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. **Repository name**: `roadmapv2`
3. **Description** (optionnel): "Solaire Facile - Product Roadmap 2025"
4. **Public** (important pour GitHub Pages)
5. **Cochez**: Initialize with a README (optionnel, on peut overwrite)
6. Cliquez: **Create repository**

## Étape 2: Cloner le Repository

```bash
# En terminal, naviguez où vous voulez stocker le projet
cd ~/Projects  # ou votre dossier préféré

# Clonez le repo (remplacez USERNAME)
git clone https://github.com/USERNAME/roadmapv2.git

# Entrez dans le dossier
cd roadmapv2
```

## Étape 3: Copier les Fichiers

Si vous avez créé le repo avec GitHub initialized:

```bash
# Supprimez le README généré
rm README.md

# Copiez tous nos fichiers dans ce dossier
# Assurez-vous d'avoir:
# - index.html
# - README.md
# - .gitignore
# - docs/ (dossier avec 3 fichiers markdown)
# - schemas/ (dossier avec 2 fichiers markdown)
```

Structure finale:
```
roadmapv2/
├── index.html
├── README.md
├── .gitignore
├── docs/
│   ├── 00-overview.md
│   ├── 01-architecture.md
│   └── 02-features.md
└── schemas/
    ├── database-schema.md
    └── user-flows.md
```

## Étape 4: Ajouter les Fichiers à Git

```bash
# Vérifier le statut
git status

# Ajouter tous les fichiers
git add .

# Vérifier ce qui sera commité
git status

# Commiter
git commit -m "Initial commit: Solaire Facile roadmap v2"
```

## Étape 5: Pousser sur GitHub

```bash
# Envoyer vers GitHub
git push origin main

# Ou si la branche s'appelle master:
git push origin master
```

✅ Vos fichiers sont maintenant sur GitHub!

## Étape 6: Activer GitHub Pages

1. Allez sur votre repo: **https://github.com/USERNAME/roadmapv2**
2. Cliquez sur **Settings** (en haut à droite)
3. Allez dans **Pages** (menu de gauche)
4. **Source**: Selectionnez "Deploy from a branch"
5. **Branch**: Selectionnez `main` (ou `master`)
6. **Folder**: Selectionnez `/root`
7. Cliquez: **Save**

Attendez 1-2 minutes...

## Étape 7: Accéder à Votre Roadmap

✅ Votre roadmap sera accessible à:

```
https://USERNAME.github.io/roadmapv2/
```

Exemple: `https://yohan.github.io/roadmapv2/`

## 🔧 Commandes Git Utiles

### Vérifier le statut
```bash
git status
```

### Ajouter et commiter
```bash
git add .
git commit -m "Description du changement"
```

### Pousser les changements
```bash
git push origin main
```

### Voir l'historique
```bash
git log --oneline
```

### Revert un changement
```bash
git revert <commit-hash>
```

## 📝 Modification Futur

Quand vous voulez mettre à jour la roadmap:

```bash
# 1. Modifiez les fichiers localement
# 2. Puis:

git add .
git commit -m "Update: Description du changement"
git push origin main

# La roadmap se mettra à jour automatiquement!
```

## ❌ Troubleshooting

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/roadmapv2.git
```

### "Updates were rejected because the tip of your current branch is behind"
```bash
git pull origin main
git push origin main
```

### GitHub Pages ne s'affiche pas
1. Vérifiez que le repo est **Public**
2. Allez dans Settings → Pages
3. Vérifiez que Deploy from a branch est activé
4. Attendez 2-3 minutes
5. Actualisez la page (Ctrl+F5)

### Les liens de documentation ne marchent pas
- Assurez-vous que `/docs/` et `/schemas/` existent dans le repo
- Vérifiez l'orthographe des noms de fichiers
- Les noms sont case-sensitive!

## 📱 Tester Localement (Optionnel)

Pour voir votre roadmap en local AVANT de pousser sur GitHub:

```bash
# Installer Python (si vous l'avez pas)
# https://www.python.org/downloads/

# Dans le dossier du projet:
python -m http.server 8000

# Ouvrez: http://localhost:8000
```

## 🎯 Prochaines Étapes

1. ✅ GitHub Pages activé
2. 📊 Partagez le lien: `https://USERNAME.github.io/roadmapv2/`
3. 📝 Continuez à mettre à jour la roadmap
4. 🔄 Utilisez Git pour tracer les changements

## 💡 Tips Avancés

### Custom Domain (optionnel)
Si vous avez un domaine personnel:
1. Settings → Pages → Custom domain
2. Entrez votre domaine
3. Suivez les instructions DNS

### Ajouter des Badges
```markdown
![Status](https://img.shields.io/badge/Status-Active-green)
![Commits](https://img.shields.io/github/commit-activity/m/USERNAME/roadmapv2)
```

### Auto-update Date
```bash
# Ajouter ce script en bas de index.html:
<script>
document.getElementById('lastUpdate').textContent = new Date().toLocaleDateString('fr-FR');
</script>
```

## 📞 Besoin d'Aide?

- GitHub Docs: [pages.github.com](https://pages.github.com)
- Git Tutorial: [git-scm.com/book](https://git-scm.com/book)
- Stack Overflow: Tag "github-pages"

---

**Bonne chance! 🚀**
