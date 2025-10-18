# Scotland NA Beer Finder 🍺

Find non-alcoholic beers at supermarkets across Scotland with distance tracking and store locations.

## Features

- 🗺️ Interactive map of Scotland showing supermarket locations
- 📍 Distance calculation from your location
- 🔍 Search by beer name, store, or city
- 🏪 Filter by supermarket chain
- 📊 Sort by distance, selection, or name

## Deployment Instructions

### Prerequisites
- Node.js (v16 or higher)
- Git
- GitHub account
- Vercel account (free at vercel.com)

### Step 1: Set Up Git Repository

1. Create a new folder for your project:
```bash
mkdir scotland-na-beer-finder
cd scotland-na-beer-finder
```

2. Initialize git:
```bash
git init
```

3. Create all the project files (package.json, vite.config.js, etc.) in this folder

4. Install dependencies:
```bash
npm install
```

5. Test locally:
```bash
npm run dev
```

### Step 2: Push to GitHub

1. Create a new repository on GitHub (don't initialize with README)

2. Add and commit your files:
```bash
git add .
git commit -m "Initial commit"
```

3. Connect to GitHub and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/scotland-na-beer-finder.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

**Option A: Via Vercel Website (Easiest)**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

**Option B: Via Vercel CLI**
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts (accept defaults)

### Step 4: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain and follow DNS instructions

## Project Structure

```
scotland-na-beer-finder/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── .gitignore          # Git ignore rules
```

## Technologies Used

- React 18
- Vite (build tool)
- Tailwind CSS
- Lucide React (icons)
- Geolocation API

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT