#!/bin/bash

# Git Setup Script for Tatra Tours Website
# Run this script to initialize Git and push to GitHub

echo "🚀 Setting up Git repository for Tatra Tours..."

# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Complete Tatra Tours website

✅ Features:
- Fully responsive design with natural mountain color palette
- Professional landing page with hero banner and testimonials
- 5 tour packages with detailed individual pages
- Advanced booking system with form validation
- Admin dashboard for booking management
- Contact, About, and legal pages
- Trust-building elements and security badges
- API endpoints for booking management
- Vercel deployment configuration

🏔️ Tours included:
- Winter Walking Holiday (5 days, $967)
- Winter Wellness Retreat (5 days, $1,340)  
- High Tatras Mountain Escape (6 days, €1,187)
- All Seasons Holiday (7 days, €1,465)
- Hut-to-Hut Trek (7+ days, contact for pricing)

🔧 Tech Stack:
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js, Express.js
- Storage: JSON-based with Vercel adaptation
- Deployment: Vercel-ready configuration

🌐 Ready for deployment to Vercel!"

# Add remote repository
git remote add origin https://github.com/jeremy10a/tatra-tours-a.git

# Push to GitHub
echo "📤 Pushing to GitHub repository..."
git branch -M main
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo "🌐 Repository: https://github.com/jeremy10a/tatra-tours-a.git"
echo ""
echo "Next steps:"
echo "1. Visit https://vercel.com to deploy"
echo "2. Import your GitHub repository"  
echo "3. Vercel will auto-deploy with zero configuration"
echo ""
echo "Your Tatra Tours website is ready for the world! 🏔️"