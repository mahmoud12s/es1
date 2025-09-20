# ES1 Frontend

## Quick Start

```bash
# Serve locally for development
npm run serve

# Then visit: http://localhost:8000
```

## Deployment

1. Upload all files to your static hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting

2. Update `config.js` with your backend API URL

## Files Structure

- `index.html` - Homepage
- `login.html` - Login page
- `admin.html` - Admin panel
- `subject-detail.html` - Subject details
- `chapter-detail.html` - Chapter details
- `styles.css` - All styling
- `script.js` - JavaScript functionality
- `config.js` - API configuration

## Configuration

Edit `config.js` to set your backend API URL:

```javascript
// Production backend URL
return 'https://your-backend-url.com/api';
```
