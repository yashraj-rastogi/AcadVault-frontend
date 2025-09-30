# 🚨 404 NOT_FOUND Fix Guide

## Quick Diagnosis

Your site is showing 404 errors. Here are the most common causes and fixes:

## 🔧 Immediate Fixes

### Fix 1: Vercel Deployment Issues

If deployed on **Vercel**, create this file:

**Create: `vercel.json`**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### Fix 2: Static Export Issues (Netlify/GitHub Pages)

If you need static export, update `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

### Fix 3: Netlify Specific

**Create: `public/_redirects`**
```
/*    /index.html   200
```

**Create: `netlify.toml`**
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Fix 4: GitHub Pages

**Create: `.github/workflows/deploy.yml`**
```yaml
name: Deploy Next.js to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 🚀 Step-by-Step Fix

### Step 1: Identify Your Platform
Which platform did you deploy to?
- [ ] Vercel
- [ ] Netlify  
- [ ] GitHub Pages
- [ ] Railway
- [ ] Other: ___________

### Step 2: Apply Platform-Specific Fix

**For Vercel:**
1. Create `vercel.json` (see Fix 1 above)
2. Redeploy

**For Netlify:**
1. Update `next.config.mjs` for static export (Fix 2)
2. Create `public/_redirects` (Fix 3)
3. Rebuild and redeploy

**For GitHub Pages:**
1. Update `next.config.mjs` for static export (Fix 2)
2. Create GitHub Action (Fix 4)
3. Push to trigger deployment

### Step 3: Test Locally First

```bash
# For static export
npm run build
npm run start

# Check if these URLs work:
# http://localhost:3000/
# http://localhost:3000/auth/login
# http://localhost:3000/student
```

## 🔍 Common Issues & Solutions

### Issue: "404 - This page could not be found"
**Solution:** App Router routing issue
- Ensure all pages have `page.tsx` files
- Check folder structure in `app/` directory

### Issue: Blank page or loading forever
**Solution:** JavaScript/hydration issue
- Check browser console for errors
- Verify all imports are correct

### Issue: CSS not loading
**Solution:** Static asset issue
- Ensure Tailwind CSS is properly configured
- Check `globals.css` is imported in layout.tsx

### Issue: Images not showing
**Solution:** Image optimization issue
- Already fixed with `unoptimized: true` in config

## 🛠 Debug Steps

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **Verify Build Locally**
   ```bash
   npm run build
   npm run start
   ```

3. **Check Deployment Logs**
   - Look for build errors in platform dashboard
   - Verify all files were uploaded correctly

## 📞 Platform-Specific Help

### Vercel
- Check deployment logs at vercel.com/dashboard
- Verify domain settings
- Check function logs

### Netlify
- Check build logs in Netlify dashboard
- Verify deploy settings
- Check site settings > Build & deploy

### GitHub Pages
- Check Actions tab for deployment status
- Verify Pages settings in repository
- Ensure branch is set correctly

## ✅ Quick Test

After applying fixes, test these URLs:
- [ ] Homepage: `your-domain.com/`
- [ ] Login: `your-domain.com/auth/login`
- [ ] Student: `your-domain.com/student`
- [ ] Faculty: `your-domain.com/faculty`

## 🆘 Still Having Issues?

If none of these fixes work:

1. **Share Details:**
   - Which platform you're using
   - Exact error message
   - Browser console errors
   - Deployment logs

2. **Temporary Workaround:**
   - Deploy to Vercel (usually most reliable for Next.js)
   - Use the exact configuration provided above

**Most likely fix needed:** Create the appropriate config file for your platform and redeploy.