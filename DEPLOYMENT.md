# Vercel Deployment Guide

This project is configured for seamless deployment to Vercel with both static files and API endpoints.

## 🚀 Quick Deployment

### Option 1: Deploy from GitHub (Recommended)
1. Push your code to a GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project" and import your repository
5. Vercel will automatically detect the configuration and deploy

### Option 2: Deploy with Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project directory:
   ```bash
   vercel
   ```

4. Follow the prompts and your site will be live!

## 📁 Deployment Configuration

The project includes these Vercel-specific files:

- **`vercel.json`**: Main configuration file
- **`.vercelignore`**: Files to exclude from deployment
- **`public/`**: Static assets (HTML, CSS, JS, images)
- **`server.js`**: API endpoints and backend logic

## 🔧 How It Works

### Static Files
- All frontend files are served from the `public/` directory
- HTML, CSS, JavaScript, and images are served directly by Vercel's CDN
- Lightning-fast loading with global edge network

### API Endpoints
- Express.js server runs as Vercel serverless functions
- All `/api/*` routes are handled by `server.js`
- Automatic scaling and zero cold starts

### Data Storage
- Development: Uses local `data/bookings.json` file
- Production (Vercel): Uses temporary `/tmp` directory
- **Note**: For production, consider upgrading to a persistent database (see below)

## 🔧 Environment Variables

No environment variables are required for basic functionality, but you can add:

```bash
# Optional: Custom port for local development
PORT=3000

# Optional: Database connection (for future upgrades)
DATABASE_URL=your_database_url
```

## 📊 Production Database (Recommended Upgrade)

For production use, consider upgrading from file-based storage to:

### Option 1: Vercel KV (Redis)
```bash
npm install @vercel/kv
```

### Option 2: PlanetScale (MySQL)
```bash
npm install @planetscale/database
```

### Option 3: MongoDB Atlas
```bash
npm install mongodb
```

## 🌐 Custom Domain

After deployment, you can add a custom domain:

1. Go to your project dashboard on Vercel
2. Navigate to "Settings" → "Domains"  
3. Add your custom domain
4. Update DNS records as instructed

## 📈 Performance Features

- **Static Optimization**: Automatic static file optimization
- **Edge Functions**: API routes run at edge locations globally
- **Automatic HTTPS**: SSL certificates automatically provisioned
- **CDN**: Global content delivery network
- **Compression**: Automatic gzip/brotli compression

## 🔍 Monitoring

Access built-in analytics:
- **Real-time**: Function invocations and performance
- **Analytics**: Page views, unique visitors, top pages
- **Speed Insights**: Core Web Vitals and performance metrics

## 🛠️ Local Development

The project works seamlessly in both local and Vercel environments:

```bash
# Local development
npm start              # Serves from current directory
open http://localhost:3000

# Vercel development (optional)
vercel dev            # Simulates Vercel environment locally
```

## 📁 File Structure After Deployment

```
tatra-tours/
├── vercel.json           # Vercel configuration
├── .vercelignore        # Deployment exclusions
├── server.js            # API functions
├── package.json         # Dependencies
├── DEPLOYMENT.md        # This guide
├── README.md           # Project documentation
└── public/             # Static files served by CDN
    ├── index.html      # Homepage
    ├── css/
    ├── js/
    ├── pages/
    ├── admin/
    └── data/           # Local development only
```

## 🚨 Important Notes

1. **Data Persistence**: Current setup uses temporary storage on Vercel. Booking data will reset on each deployment. Upgrade to a database for production use.

2. **File Uploads**: If adding file upload functionality, use Vercel Blob or external storage service.

3. **Environment**: The app automatically detects Vercel environment and adjusts file paths accordingly.

4. **Limits**: Free Vercel accounts have limits on function execution time and invocations. Monitor usage.

## 🎯 Deployment Checklist

- [ ] Code pushed to GitHub repository
- [ ] Vercel project created and connected
- [ ] Environment variables configured (if any)
- [ ] Custom domain added (optional)
- [ ] Database upgraded for production (recommended)
- [ ] Analytics and monitoring enabled
- [ ] Performance optimization reviewed

Your Tatra Tours website is now ready for the world! 🏔️