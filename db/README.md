# Workflows Drizzle-kit par Environnement

## 📖 Commandes Drizzle-kit

### 📝 **drizzle-kit generate**

Génère des fichiers de migration SQL basés sur votre schéma Drizzle.

- Analyse les changements dans votre schéma TypeScript
- Crée des fichiers `.sql` avec les commandes SQL nécessaires
- Les migrations sont versionnées et stockées dans `./drizzle`
- **Utilisation :** Quand vous modifiez votre schéma et voulez préparer les migrations

### ▶️ **drizzle-kit migrate**

Applique les migrations SQL générées à votre base de données.

- Exécute séquentiellement les fichiers de migration non appliqués
- Maintient un historique des migrations déjà exécutées
- **Utilisation :** Pour mettre à jour votre DB avec les changements de schéma

### ⬇️ **drizzle-kit pull**

Extrait le schéma existant de votre base de données et le convertit en code Drizzle.

- Lit la structure actuelle de votre DB
- Génère automatiquement les fichiers TypeScript Drizzle correspondants
- **Utilisation :** Quand vous avez une DB existante et voulez générer le code Drizzle

### ⬆️ **drizzle-kit push**

Pousse directement votre schéma Drizzle vers la base de données.

- Applique les changements SANS créer de fichiers de migration
- Plus rapide mais sans historique de versions
- **Utilisation :** En développement pour prototyper rapidement

### 🎨 **drizzle-kit studio**

Lance une interface graphique web pour explorer votre base de données.

- Interface visuelle pour voir/modifier les données
- Exécuter des requêtes SQL
- **Utilisation :** Pour débugger et explorer visuellement vos données

### ✅ **drizzle-kit check**

Vérifie les migrations pour détecter d'éventuels conflits.

- Analyse toutes les migrations générées
- Détecte les "race conditions" ou collisions possibles
- **Utilisation :** Avant d'appliquer des migrations en production

### 🔄 **drizzle-kit up**

Met à jour les snapshots des migrations précédemment générées.

- Utilisé lors de mises à jour majeures de Drizzle
- Assure la compatibilité des anciennes migrations
- **Utilisation :** Après une mise à jour de Drizzle ORM

---

## 🚧 **Environnement de Développement (Local)**

### Workflow rapide (recommandé en dev)

```bash
# 1. Modifier votre schéma dans schema.ts
# 2. Push direct sans migrations
npx drizzle-kit push

# 3. Vérifier les changements visuellement
npx drizzle-kit studio
```

### Workflow avec migrations (test du process complet)

```bash
# 1. Modifier votre schéma
# 2. Générer les migrations
npx drizzle-kit generate

# 3. Vérifier les migrations
npx drizzle-kit check

# 4. Appliquer les migrations
npx drizzle-kit migrate

# 5. Explorer la DB
npx drizzle-kit studio
```

### Reset complet de la DB

```bash
# Supprimer et recréer la DB
npx drizzle-kit push --force

# Ou drop toutes les tables et réappliquer
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
npx drizzle-kit push
```

---

## 🧪 **Environnement de Préprod/Staging**

### Workflow standard (simulation production)

```bash
# 1. Récupérer les migrations depuis Git
git pull

# 2. Vérifier l'état des migrations
npx drizzle-kit check

# 3. Voir les migrations en attente (dry-run)
npx drizzle-kit migrate --dry-run

# 4. Appliquer les migrations
npx drizzle-kit migrate

# 5. Vérifier que tout est OK
npx drizzle-kit studio  # Si accessible
```

### Synchronisation avec la production

```bash
# Optionnel : Pull le schéma de prod pour comparer
npx drizzle-kit pull --config=drizzle.config.prod.ts

# Comparer avec votre schéma local
# Générer les migrations nécessaires
npx drizzle-kit generate

# Tester les migrations
npx drizzle-kit migrate
```

---

## 🚀 **Environnement de Production**

### Workflow de déploiement

```bash
# 1. Les migrations sont dans le repo (déjà testées en staging)
# 2. Backup de la DB (CRUCIAL!)
pg_dump production_db > backup_$(date +%Y%m%d_%H%M%S).sql

# 3. Vérifier une dernière fois
npx drizzle-kit check

# 4. Appliquer les migrations
npx drizzle-kit migrate

# 5. Vérifier l'application
# Tests de santé, monitoring, etc.
```

### Pipeline CI/CD typique

```yaml
# .github/workflows/deploy.yml ou gitlab-ci.yml
deploy:
  steps:
    - name: Check migrations
      run: npx drizzle-kit check

    - name: Backup database
      run: ./scripts/backup-db.sh

    - name: Run migrations
      run: npx drizzle-kit migrate
      env:
        DATABASE_URL: ${{ secrets.PROD_DATABASE_URL }}

    - name: Verify migrations
      run: ./scripts/verify-migrations.sh
```

---

## 📋 **Bonnes Pratiques par Environnement**

### **Développement**

- ✅ Utiliser `push` pour itérer rapidement
- ✅ Reset la DB fréquemment
- ✅ Tester les migrations avant de commit
- ⚠️ Ne pas commit les données de test

### **Staging**

- ✅ Toujours utiliser `generate` + `migrate`
- ✅ Tester les rollbacks
- ✅ Utiliser les mêmes migrations qu'en prod
- ✅ Seed avec des données réalistes

### **Production**

- ✅ TOUJOURS faire un backup avant
- ✅ Migrations testées en staging
- ✅ Avoir un plan de rollback
- ✅ Monitoring des performances post-migration
- ❌ JAMAIS utiliser `push` en production
- ❌ JAMAIS utiliser `--force`

---

## 🔄 **Workflow d'Équipe**

### Création d'une nouvelle feature

```bash
# Développeur A
# 1. Créer une feature branch
git checkout -b feature/new-table

# 2. Modifier le schéma
# 3. Générer la migration
npx drizzle-kit generate

# 4. Commit schéma + migration
git add .
git commit -m "feat: add users table"
git push
```

### Récupération des changements

```bash
# Développeur B (après merge)
# 1. Pull les changements
git pull

# 2. Appliquer les nouvelles migrations
npx drizzle-kit migrate

# 3. Continuer le développement
```

---

## 🚨 **Gestion des Conflits de Migrations**

```bash
# Si deux devs créent des migrations en parallèle
# 1. Pull les migrations de main
git pull origin main

# 2. Vérifier les conflits
npx drizzle-kit check

# 3. Si conflit, régénérer
rm -rf drizzle/*_your_migration.sql
npx drizzle-kit generate

# 4. Tester et commit
npx drizzle-kit migrate
git add . && git commit -m "fix: resolve migration conflict"
```

---

## 🎯 **Résumé : Push vs Generate+Migrate**

| Aspect            | **Push**       | **Generate + Migrate** |
| ----------------- | -------------- | ---------------------- |
| **Vitesse**       | Rapide         | Plus lent              |
| **Historique**    | ❌ Aucun       | ✅ Versionné           |
| **Rollback**      | ❌ Impossible  | ✅ Possible            |
| **Utilisation**   | Dev uniquement | Staging & Prod         |
| **Collaboration** | ⚠️ Difficile   | ✅ Facile              |

---

## 💡 **Règle d'Or**

> **Développement = Rapidité** → `push`  
> **Staging = Test du process** → `generate` + `migrate`  
> **Production = Sécurité maximale** → `migrate` avec backup
