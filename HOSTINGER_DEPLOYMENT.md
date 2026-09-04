# CARVED & CO. - Hostinger & GitHub Deployment Guide

This project is configured as a standard React 19 + Vite application. It generates a production-ready static bundle in the `dist` directory.

---

## Why "Unsupported framework or invalid project structure" Occurred & How It Is Solved

Hostinger's automated Git deployment requires:
1. `package.json` and `package-lock.json` directly at the repository root.
2. Standard Vite build scripts: `"build": "vite build"`.
3. An output directory of `dist`.
4. No conflicting backend/server entry points or locks from other runtimes (e.g. Bun).

All of these requirements are now satisfied.

---

## Deployment Options on Hostinger

### Option A: GitHub Actions to Hostinger (Fastest & 100% Automated)
*A ready-to-run GitHub workflow is included in `.github/workflows/deploy-hostinger.yml`.*

1. In Hostinger hPanel, go to **Websites** → **Manage** → **Files** → **FTP Accounts**.
2. Note your **FTP Host/IP**, **Username**, and **Password**.
3. In your GitHub repository:
   - Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
   - Add:
     - `HOSTINGER_FTP_SERVER`
     - `HOSTINGER_FTP_USERNAME`
     - `HOSTINGER_FTP_PASSWORD`
4. Every time you push to `main` or `master`, GitHub Actions automatically compiles the website and transfers the `dist` files into Hostinger's `public_html/`.

---

### Option B: Hostinger Git / Static Web App
If using Hostinger's built-in Git deployment or Static App interface:
- **Build command**: `npm run build`
- **Output directory / Publish directory**: `dist`
- **Node.js version**: 18+ or 20+

---

### Option C: Direct Upload via File Manager
1. Run `npm run build` locally.
2. Upload the contents of the generated `dist/` directory directly into Hostinger's `public_html/`.
3. The included `.htaccess` file will automatically configure URL rewrites, gzip/brotli compression, and caching on Hostinger's LiteSpeed/Apache servers.
