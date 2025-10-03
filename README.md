# Medula AI - Company Website

## Overview
Professional website for Medula AI, an IT company specializing in building intelligent AI agents for businesses.

## Features
- Modern, responsive design with dark theme
- Smooth animations and transitions
- Mobile-friendly navigation
- Service showcase
- Industry solutions
- Contact form
- Newsletter subscription

## File Structure
```
medula-website/
├── index.html      # Main HTML file
├── styles.css      # Complete styling
├── script.js       # JavaScript functionality
├── CNAME          # Custom domain configuration
└── README.md      # Documentation
```

## Deployment Instructions

### Step 1: Upload to GitHub
1. Go to your `medula` repository on GitHub
2. Click "Add file" → "Upload files"
3. Upload all files from this folder
4. Commit the changes

### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages section
3. Select source as "Deploy from a branch"
4. Choose "main" branch
5. Save

### Step 3: Configure Custom Domain
1. The CNAME file is already included
2. Update it with your actual domain name
3. Configure DNS settings in GoDaddy as mentioned in previous instructions

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --dark-bg: #0f0f1e;
    --card-bg: #1a1a2e;
}
```

### Content
- Update company information in `index.html`
- Modify contact details
- Add your social media links
- Update service descriptions

### Images
Currently using placeholder icons. You can:
- Add company logo
- Include team photos
- Add service illustrations
- Include client logos

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used
- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter)

## Performance Optimization
- Minimal JavaScript
- CSS animations for smooth performance
- Lazy loading ready
- Mobile-first responsive design

## SEO Ready
- Semantic HTML structure
- Meta tags included
- Fast loading times
- Mobile responsive

## Contact Form
Currently logs data to console. To make it functional:
1. Set up a backend service (Node.js, Python, etc.)
2. Or use services like Formspree, EmailJS
3. Update the form submission handler in `script.js`

## License
© 2024 Medula AI. All rights reserved.

## Support
For any issues or customization needs, please contact the development team.