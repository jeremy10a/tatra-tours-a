# Tatra Tours - Professional Mountain Adventure Website

A fully responsive, professional website for tours in Slovakia's Tatra Mountains, featuring comprehensive booking management, customer testimonials, and admin functionality.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with beautiful natural mountain color palette
- **Professional Landing Page**: Hero banner, value proposition, call-to-action, feature highlights
- **Tour Showcase**: Mosaic layout displaying 5 comprehensive tour packages
- **Individual Tour Pages**: Rich visuals, descriptions, duration, difficulty, itineraries, and booking
- **Advanced Booking System**: Multi-step form with validation and real-time pricing
- **Trust Building Elements**: Customer testimonials, security badges, certifications
- **Complete Navigation**: Breadcrumbs, footer with legal links, consistent branding

### Tour Packages
1. **Winter Walking and Activity Holiday** (5 days, Poprad/High Tatras, ~$967)
2. **Winter Wellness Retreat** (5 days, Ždiar/High Tatras, ~$1,340)
3. **High Tatras Walking Holiday Mountain Escape** (6 days, €1,187)
4. **High Tatras Walking Holiday All Seasons** (7 days, €1,465)
5. **Hut-to-Hut Self-Guided Trek** (7+ days, contact for pricing)

### Backend Features
- **RESTful API**: Express.js server with comprehensive booking endpoints
- **Data Persistence**: JSON-based storage for booking management
- **Admin Dashboard**: Complete booking management interface
- **Real-time Updates**: Dynamic booking status management
- **Form Validation**: Server-side and client-side validation

### Pages Structure
- **Home**: Landing page with hero, features, testimonials
- **Tours**: Complete tour listing with filtering and details
- **Individual Tour Pages**: Detailed tour information with booking CTAs
- **Reservations**: Advanced booking form with validation
- **About**: Company story, team, sustainability, awards
- **Contact**: Multiple contact methods, FAQ section
- **Admin Dashboard**: Booking management interface
- **Legal Pages**: Privacy policy, terms & conditions

## 🚀 Quick Start

### Local Development
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   # or
   npm run dev
   ```

3. **Access the Website**:
   - Main Website: `http://localhost:3000`
   - Admin Dashboard: `http://localhost:3000/admin`

### Deploy to Vercel
1. **Push to GitHub**: Upload your project to a GitHub repository
2. **Connect to Vercel**: Import your repo at [vercel.com](https://vercel.com)
3. **Auto-Deploy**: Vercel automatically detects configuration and deploys
4. **Live Site**: Your website will be live with a `.vercel.app` domain

> 📖 **Detailed deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

## 📁 Project Structure

```
Website Aura/
├── index.html              # Homepage
├── server.js               # Express.js server
├── package.json            # Dependencies and scripts
├── css/
│   └── styles.css          # Complete responsive styling
├── js/
│   ├── main.js             # Main JavaScript functionality
│   └── booking.js          # Booking form handling
├── pages/
│   ├── tours.html          # Tours listing page
│   ├── reservations.html   # Booking form page
│   ├── about.html          # About company page
│   ├── contact.html        # Contact information page
│   ├── tour-*.html         # Individual tour detail pages
│   └── privacy-policy.html # Legal pages
├── admin/
│   ├── index.html          # Admin dashboard
│   └── admin.js            # Admin functionality
└── data/
    └── bookings.json       # Booking data storage
```

## 🎨 Design Features

### Color Palette
- **Primary Green**: #2c5530 (Mountain pine)
- **Forest Green**: #1a3f1a (Deep forest)
- **Sage Green**: #87a96b (Natural sage)
- **Mountain Blue**: #4a6b8a (Mountain sky)
- **Sky Blue**: #a8c5e0 (Alpine sky)
- **Stone Gray**: #6b7280 (Mountain stone)
- **Warm Gray**: #f5f5f4 (Natural stone)
- **Cream**: #fefdf9 (Mountain snow)

### Typography
- **Font**: Inter (professional, readable)
- **Responsive text scaling**
- **Accessible contrast ratios**

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Breakpoints**: 768px (tablet), 480px (mobile)
- **Flexible Grid**: CSS Grid and Flexbox layout
- **Touch-Friendly**: 44px minimum touch targets

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript (ES6+)**: Modern JavaScript features
- **Responsive Design**: Mobile-first approach

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **File-based Storage**: JSON data persistence
- **CORS**: Cross-origin resource sharing
- **Body Parser**: Request parsing middleware

## 🔧 API Endpoints

- `GET /api/bookings` - Retrieve all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

## 🎯 Key Features in Detail

### Advanced Booking System
- Multi-step form with progress indication
- Real-time form validation
- Dynamic pricing calculations
- Tour selection with detailed information
- Emergency contact collection
- Dietary and medical information capture
- Terms acceptance with legal links

### Admin Dashboard
- Booking overview with statistics
- Detailed booking management
- Status updates (pending, confirmed, cancelled)
- Customer information display
- Tour details and dates
- Responsive table design

### Trust & Security Elements
- SSL security badges
- Tourism association certifications
- Customer testimonials with ratings
- Professional certifications display
- Safety and insurance information

### SEO Optimized
- Semantic HTML structure
- Meta descriptions and titles
- Structured navigation
- Fast loading times
- Mobile-friendly design

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 📧 Contact & Support

For questions about the website or booking system:
- Email: info@tatratours.sk
- Phone: +421 xxx xxx xxx
- Address: Poprad, Slovakia

## 🏔️ About Tatra Tours

Professional mountain tour operator specializing in Slovakia's High Tatras region. Offering winter walking holidays, wellness retreats, mountain escapes, and challenging hut-to-hut treks since 2015.

---

**Built with ❤️ for mountain adventure enthusiasts worldwide**