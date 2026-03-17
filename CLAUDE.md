# ORDO — Récapitulatif Complet du Projet
## Dernière mise à jour : 15 mars 2026

---

## 1. VISION & POSITIONNEMENT

### Le produit
**Ordo** est un SaaS qui met les boutiques en ligne en conformité RGPD en 15 minutes. Il génère automatiquement tous les documents juridiques nécessaires (mentions légales, politique de confidentialité, registre de traitement, bandeau cookies, DPA sous-traitants) personnalisés à l'activité de l'utilisateur.

### Tagline
"Ordo, la conformité sans la complexité."

### Nom
Ordo — du latin "ordre, arrangement". Le nom évoque la mise en ordre, la structure.

### Cible actuelle (PIVOT MARS 2026)
**E-commerçants et boutiques en ligne** (Shopify, WooCommerce, PrestaShop, Etsy, Magento, Wix, Squarespace) qui collectent des données clients sans être conformes au RGPD.

**Profil type** : TPE/PME de 1 à 20 salariés, avec un site e-commerce, qui collectent des données personnelles (noms, adresses, emails, données bancaires) à chaque commande.

**Segment secondaire (à valider après)** : Commerçants physiques avec site web, cabinets et professions libérales, artisans avec devis en ligne.

### Cible initiale (ABANDONNÉE)
Freelances et micro-entrepreneurs. Abandonné après interviews terrain : willingness to pay trop faible, risque perçu trop bas. Les indépendants "s'en foutent" du RGPD et ne paieraient pas même 10€/mois.

### Pricing actuel
- **Gratuit** : Diagnostic RGPD, score de conformité, plan d'actions, mini-formation
- **Essentiel — 29€/mois** : Tous les documents générés, export PDF, bandeau cookies, audit sous-traitants
- **Pro — 49€/mois** : DPA auto, multi-boutiques, support prioritaire, certificat conformité, alertes légales

### Pricing initial (abandonné)
Gratuit → 9€/mois → 19€/mois (trop bas pour le nouveau segment)

---

## 2. BRANDING & DESIGN

### Identité visuelle
- **Couleur principale** : Indigo #2D3A8C
- **Couleur secondaire** : Navy #12152B (fonds sombres)
- **Accent** : Vert pastel #86C5A3 (le tick dans le logo)
- **Background** : Crème #FAFAF8
- **Surfaces** : Blanc #FFFFFF
- **Typography display** : Outfit (weight 600-700)
- **Typography body** : DM Sans (weight 400-500)
- **Tone** : Premium, minimaliste, Apple-like. Calme, précis, pas de jargon. Vouvoiement.

### Logo
Le logo est "Ordo." avec un checkmark vert pastel intégré dans le O.
- Fichiers disponibles : SVG et PNG en versions blanc, indigo, et navy
- Icône seule (O + tick) pour photo de profil LinkedIn
- Wordmark complet pour documents et site
- Bannière LinkedIn (1584x396) en navy

### Fichiers logo créés
- `ordo-icon-white.svg/png` — O + tick sur fond blanc
- `ordo-icon-indigo.svg/png` — O + tick sur fond indigo (RECOMMANDÉ pour LinkedIn)
- `ordo-wordmark-white.svg/png` — Wordmark complet sur blanc
- `ordo-linkedin-banner.svg/png` — Bannière LinkedIn navy

---

## 3. ANALYSE DE MARCHÉ

### Concurrents identifiés
- **Leto** (leto.legal) : 200€+/mois, cible PME/ETI, IA "Hari", sensibilisation, questionnaires sécurité, base 6000 sous-traitants
- **Mission RGPD** (mission-rgpd.com) : 95€+/mois, cible PME
- **Dastra** (dastra.eu) : Cible mid-market
- **OneTrust** : Enterprise, très cher
- **PIA (CNIL)** : Gratuit mais complexe, pas de génération de documents
- **RGPD Kit** (rgpdkit.fr) : Templates statiques
- **LegalPlace, Captain Contrat, Legalstart** : Générateurs ponctuels, pas de suivi
- **Axeptio, Didomi** : Bandeau cookies uniquement

### Opportunité
Aucune solution abordable (<50€/mois) n'existe pour les e-commerçants. Le segment est vide entre les outils gratuits/basiques et les solutions enterprise à 200€+/mois.

### Chiffres clés
- 200K+ boutiques en ligne en France
- ~78% non conformes au RGPD
- Amende CNIL procédure simplifiée : jusqu'à 20 000€
- TAM e-commerce France : 200K boutiques × 29€/mois × 12 = ~70M€/an
- SOM Y1 réaliste : 500 clients × 29€ × 12 = 174K€

---

## 4. ÉTAT TECHNIQUE ACTUEL

### Stack déployé
- **Frontend** : HTML/CSS statique (fichier unique index.html)
- **Backend** : Vercel serverless function (api/subscribe.js) — Node.js CommonJS
- **Email** : Brevo API (collecte d'emails liste d'attente)
- **Hosting** : Vercel (free tier)
- **Repo** : github.com/sashaprs/ordo-landing
- **Domaine** : getordo.fr (OVH)

### Structure du repo GitHub
```
ordo-landing/
├── api/
│   └── subscribe.js    ← Handler Brevo API (CommonJS, module https natif)
├── index.html          ← Landing page complète
├── vercel.json         ← Config Vercel {"functions": {"api/*.js": {"runtime": "@vercel/node@3"}}}
└── Ordo_Checklist_RGPD_Ecommerce.pdf  ← Lead magnet (à uploader)
```

### Configuration DNS (OVH → Vercel)
- **A record** : @ → 216.198.79.1
- **CNAME** : www → c87fd578cf8404fa.vercel-dns-017.com.
- Note : Il a fallu supprimer le TXT record OVH par défaut "www: 3|welcome" avant d'ajouter le CNAME

### Variables d'environnement Vercel
- `BREVO_API_KEY` : Clé API Brevo
- `BREVO_LIST_ID` : ID de la liste "Ordo - Early Access"
- ⚠️ Il faut redéployer après modification des env vars

### Problèmes résolus lors du déploiement
1. DNS conflict : TXT record OVH par défaut bloquait le CNAME
2. Serverless function non détectée : subscribe.js était à la racine au lieu de api/
3. Function ne marchait pas : Converti de ES modules à CommonJS + utilisé https natif au lieu de fetch
4. Env vars : Nécessitent un redeploy après ajout

### API subscribe.js (code actuel)
Le fichier api/subscribe.js utilise :
- `module.exports = async (req, res)` (CommonJS)
- Module `https` natif de Node.js (pas fetch)
- Envoie un POST à `api.brevo.com/v3/contacts` avec l'email et le list ID
- Retourne `{success: true}` ou `{success: false, error: "..."}`

---

## 5. VERSION ACTUELLE DU SITE (v5 — e-commerce)

### Sections de la landing page
1. **Nav** : Logo Ordo. + liens Fonctionnalités, Tarifs, CTA "Accès anticipé"
2. **Hero** : "Votre boutique conforme au RGPD en 15 minutes" + formulaire email + mockup dashboard
3. **Stats bar** : 200K+ boutiques, 78% non conformes, 20 000€ amende, 15 min
4. **Problème** : "Chaque commande collecte des données personnelles" + mockup diagnostic score 23%
5. **Comment ça marche** : 3 étapes (Décrivez, Tout est généré, Intégrez et oubliez) — fond navy
6. **Feature: Documents** : Split layout avec mockup liste de documents (terminé/en cours/à faire)
7. **Feature: Sous-traitants** : Split layout avec mockup Shopify/Stripe/Mailchimp/Analytics/Colissimo
8. **Grille fonctionnalités** : 9 cards (mentions légales, politique confidentialité, registre, cookies, DPA, alertes, certificat, formation, score)
9. **Réassurance** : Validé par avocats, 10 min chrono, toujours à jour
10. **Pricing** : Gratuit / 29€ Essentiel / 49€ Pro
11. **FAQ** : 6 questions spécifiques e-commerce (accordéon JS)
12. **CTA final** : "Votre boutique mérite d'être conforme" + formulaire email — fond navy
13. **Footer** : Logo + liens

### Animations
- Reveal on scroll via IntersectionObserver (classe `.r` → `.v`)
- Délais d'animation via `.rd1` à `.rd4`
- FAQ accordéon avec transition max-height

---

## 6. BREVO (EMAIL MARKETING)

### Configuration
- Plateforme : app.brevo.com
- Liste : "Ordo - Early Access"
- Automation : "Ordo - Welcome + Checklist"
  - Trigger : Contact ajouté à la liste
  - Action : Envoi email avec lien vers checklist PDF

### Email automatique actuel
- **Objet** : "Votre checklist RGPD e-commerce est prête."
- **Contenu** : Remerciement + lien téléchargement checklist + annonce 29€/mois + T2 2026
- **Lien checklist** : https://getordo.fr/Ordo_Checklist_RGPD_Ecommerce.pdf

---

## 7. LIVRABLES CRÉÉS

### Documents stratégie
- `ConformIA_MVP.pptx` — Pitch deck 14 slides (TAM/SAM/SOM, SWOT, roadmap, DCF)
- `ConformIA_Roadmap.xlsx` — Roadmap 75 tâches, 6 phases, budget, outils, SEO, KPI

### Marketing
- `Ordo_Posts_LinkedIn.md` — 3 posts LinkedIn (Le Constat, La Checklist, L'Annonce) — VERSION FREELANCE, à refaire pour e-commerce
- `Ordo_Checklist_RGPD_Independants.pdf` — Lead magnet freelances (ANCIENNE VERSION)
- `Ordo_Checklist_RGPD_Ecommerce.pdf` — Lead magnet e-commerce (VERSION ACTUELLE) — 20 points, 4 sections

### Validation pivot
- `Ordo_Interview_Kit_Ecommerce.xlsx` — 3 onglets : Script interview (18 questions), Grille analyse (10 interviews, scoring /20), Messages type (DM LinkedIn, post Facebook, email)

### Logos
- SVG et PNG en multiple versions (voir section 2)
- Bannière LinkedIn

### Site web
- `index.html` — Landing page v5 e-commerce (version actuelle déployée)

---

## 8. HISTORIQUE DES DÉCISIONS

### 13 mars 2026 — Idéation
- Brainstorm de 8 idées SaaS
- Choix : Planificateur de conformité RGPD pour freelances (#7)

### 13-14 mars 2026 — Branding & MVP
- Nom choisi : Ordo (latin "ordre")
- Domaine : getordo.fr (OVH)
- Analyse concurrentielle complète
- Pitch deck + roadmap Excel
- Landing page v1 → v2 → v3
- Déploiement Vercel + GitHub + DNS

### 15 mars 2026 — Logos & marketing
- Création logos (O avec tick vert)
- Checklist RGPD indépendants (lead magnet)
- Posts LinkedIn
- Guide configuration Brevo

### 15 mars 2026 — PIVOT
- **Feedback terrain** : Freelances ne veulent pas payer pour le RGPD
- **Décision** : Pivoter vers les e-commerçants
- **Nouveau pricing** : 29€/49€ au lieu de 10€/19€
- **Nouveau positionnement** : "Votre boutique conforme au RGPD en 15 minutes"
- Refonte complète du site (v5)
- Nouveau lead magnet (checklist e-commerce 20 points)
- Kit d'interview pour validation du nouveau segment

---

## 9. PHASE ACTUELLE — VALIDATION E-COMMERCE

### Objectif
Valider le segment e-commerçants avec 10 interviews en 7 jours.

### Critère GO/NO-GO
- **GO** : 6+ interviews sur 10 avec score ≥ 12/20 ET prix 29-39€/mois accepté
- **NO-GO** : Moins de 6 → Pivoter vers commerçants physiques ou cabinets

### Canaux de prospection
- Groupes Facebook : Shopify France, E-commerce Nation, PrestaShop France, WooCommerce France, Vendre sur Etsy France
- LinkedIn : DM directs aux fondateurs e-commerce
- Referrals : Demandés à chaque interview

### Planning sprint
- Lundi : Déploiement site + 3 posts Facebook + 10 DM LinkedIn
- Mardi : Relances + interviews #1-2
- Mercredi : Interviews #3-5
- Jeudi : 10 nouveaux DM + interviews #6-7
- Vendredi : Interviews #8-9 + analyse
- Samedi : Interview #10 + scoring
- Dimanche : Verdict GO/NO-GO

### Signaux à surveiller
- **Fort GO** : "J'ai eu une plainte/email CNIL", "Combien ça coûte ? Je prends", "39€ c'est rien"
- **NO-GO** : "Bof j'ai jamais eu de problème", "39€ c'est trop", "J'ai copié les mentions d'un concurrent"

---

## 10. PROCHAINES ÉTAPES (APRÈS VALIDATION)

### Si GO → Construction du SaaS
**Stack prévue :**
- Frontend : Next.js ou React
- Backend : Node.js / Vercel serverless
- Base de données : Supabase (PostgreSQL)
- Auth : Supabase Auth
- Paiements : Stripe (abonnements)
- Email : Brevo
- Hosting : Vercel
- Analytics : PostHog
- Support : Crisp

**Fonctionnalités MVP :**
1. Inscription / connexion
2. Questionnaire diagnostic par métier/plateforme
3. Score de conformité avec feuille de route
4. Génération automatique des documents (mentions légales, politique confidentialité, registre, bandeau cookies)
5. Dashboard avec suivi progression
6. Audit des sous-traitants (détection outils, vérification UE/hors UE, génération DPA)
7. Export PDF
8. Intégration Stripe (abonnements mensuels)
9. Alertes réglementaires

**Budget estimé :** ~1,870€ (dev freelance 1,200€ + domaine 25€ + legal 200€ + réserve)

### Si NO-GO → Pivot
Tester les sous-segments : commerçants physiques, cabinets/professions libérales, artisans.
Même méthode : 10 interviews, grille de scoring, critère GO/NO-GO.

---

## 11. SEO & KEYWORDS CIBLES

### Mots-clés prioritaires (à adapter pour e-commerce)
- "rgpd e-commerce" / "rgpd boutique en ligne"
- "mentions légales site e-commerce"
- "politique de confidentialité shopify"
- "rgpd shopify france"
- "conformité rgpd woocommerce"
- "bandeau cookies e-commerce"
- "registre de traitement e-commerce"
- "rgpd prestashop"
- "logiciel rgpd pas cher"
- "générateur mentions légales e-commerce"

---

## 12. URLS & COMPTES

- **Site live** : https://getordo.fr
- **GitHub** : https://github.com/sashaprs/ordo-landing
- **Vercel** : vercel.com (projet: ordo-landing)
- **Brevo** : app.brevo.com (liste: "Ordo - Early Access")
- **OVH DNS** : ovhcloud.com/fr/domains/
- **INPI** : https://data.inpi.fr/recherche_marques (vérifier marque "Ordo" classes 9 et 42)

---

## 13. NOTES POUR CLAUDE CODE

Si ce fichier est utilisé comme CLAUDE.md pour Claude Code :
- Le repo est `sashaprs/ordo-landing`
- Le site est un fichier HTML unique (`index.html`) avec CSS inline et JS en bas de page
- L'API est dans `api/subscribe.js` (CommonJS, module https natif Node.js)
- Vercel config dans `vercel.json`
- Fonts : Outfit (display) et DM Sans (body) via Google Fonts CDN
- Couleurs CSS variables dans `:root` en haut du fichier
- Toutes les classes CSS sont minifiées (`.s` = section, `.sd` = section dark, etc.)
- Le formulaire email envoie un POST à `/api/subscribe` avec `{email: "..."}` 
- L'API ajoute le contact à Brevo via leur API v3
- Variables d'environnement Vercel : BREVO_API_KEY, BREVO_LIST_ID

---

## 14. SKILL FRONTEND DESIGN

name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.