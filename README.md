# GGS96 Website - Modern Blog Platform

A modern, responsive blog website built with HTML5, CSS3, and vanilla JavaScript. Features dark mode, smooth animations, and full accessibility support.

## Features

### Design & UX
- 🎨 Modern, clean design with CSS Grid and Flexbox
- 🌓 Dark mode support with localStorage persistence
- ✨ Smooth animations and transitions
- 📱 Fully responsive mobile-first design
- ♿ WCAG accessibility compliant

### Functionality
- 🔍 Blog post search functionality
- 🏷️ Category and tag filtering
- 📝 Newsletter subscription
- 💬 Comment system on blog posts
- 📬 Contact form with validation
- 🔝 Back to top button
- 🎯 Active navigation highlighting

### Technical
- 🚀 Optimized loading with defer/async scripts
- 🔒 Form validation
- 📊 SEO optimized with meta tags and OpenGraph
- 🗺️ Sitemap and robots.txt included
- 🎭 Semantic HTML5 markup

## Project Structure

```
ggs96-website-clone/
├── index.html          # Homepage
├── about.html          # About page
├── blog.html           # Blog listing page
├── post.html           # Single post template
├── contact.html        # Contact page
├── 404.html            # Error page
├── sitemap.xml         # Sitemap for SEO
├── robots.txt          # Robots file
├── favicon.svg         # Site icon
├── css/
│   └── style.css       # All styles with CSS variables
├── js/
│   └── script.js       # All JavaScript functionality
└── README.md           # This file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tonygeo10/ggs96-website-clone.git
cd ggs96-website-clone
```

2. Open the website:
   - **Option 1**: Simply open `index.html` in your web browser
   - **Option 2**: Use a local server for better experience

### Using a Local Server

#### Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Node.js (if installed):
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server
```

#### VS Code:
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

Then visit `http://localhost:8000` in your browser.

## Usage

### Customization

#### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #3498db;
    --secondary-color: #667eea;
    /* Add more custom colors */
}
```

#### Content
- Edit HTML files to update content
- Replace placeholder images with your own
- Update links in navigation and footer

#### Dark Mode
Dark mode is automatic based on user preference and can be toggled via the theme button in the header.

## Features Guide

### Navigation
- Responsive hamburger menu on mobile
- Active page highlighting
- Smooth scroll for anchor links

### Search
- Real-time search on the blog page
- Searches titles, content, and categories
- Shows "no results" message when needed

### Forms
- Contact form with validation
- Newsletter subscription
- Comment form on blog posts

### Accessibility
- Skip to main content link
- ARIA labels on interactive elements
- Keyboard navigation support
- Semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Minimal dependencies (no frameworks)
- Optimized CSS with variables
- Async JavaScript loading
- Efficient animations with CSS transforms

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**GGS96**
- Website: [ggs96.com](https://ggs96.com)
- GitHub: [@ggs96](https://github.com/ggs96)

## Acknowledgments

- Design inspired by modern blog platforms
- Icons from Unicode emoji
- Placeholder images from placeholder.com

---

**Note**: This is a static website template. For production use, consider:
- Implementing a backend for forms
- Adding a CMS for content management
- Setting up analytics
- Configuring a CDN for better performance

