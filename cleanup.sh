#!/bin/bash
set -e

INFO="ℹ️"
OK="✅"
WARN="⚠️"
Q="❓"

# Vérification racine repo
if [ ! -f ".git/config" ] || [ ! -f "README.md" ]; then
  echo "$WARN Ce script doit être lancé depuis la racine du repo ROADMAP."
  exit 1
fi
echo "$OK Repo détecté."

read -p "$Q Continuer le nettoyage et les suppressions ? (y/N) " ans
[[ "$ans" =~ ^[Yy]$ ]] || { echo "$WARN Annulé."; exit 0; }

echo "$INFO Copie v2 -> racine..."
cp v2/index.html ./index.html
mkdir -p docs schemas
cp -R v2/docs/. ./docs/
cp -R v2/schemas/. ./schemas/
echo "$OK Copie effectuée."

echo "$INFO Suppression anciens fichiers V1..."
rm -f schemas-complets.html schema-mermaid.md schema-visuel.svg conversion-flow-schema.jsx QUICK_START.md
echo "$OK Fichiers V1 supprimés."

echo "$INFO Suppression dossier v2..."
rm -rf v2
echo "$OK v2 supprimé."

echo "$INFO Création .gitignore..."
cat > .gitignore <<'EOF2'
node_modules/
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF2
echo "$OK .gitignore mis à jour."

echo "$INFO Structure finale :"
find . -maxdepth 2 -type d | sed 's|^\./||'
find . -maxdepth 1 -type f

read -p "$Q Lancer git add/commit/push ? (y/N) " pushans
if [[ "$pushans" =~ ^[Yy]$ ]]; then
  git add .
  git commit -m "Merge: Move v2 to root"
  git push origin main
  echo "$OK Push effectué."
else
  echo "$WARN Push annulé, changements en staging."
fi

echo "$OK Nettoyage terminé."
