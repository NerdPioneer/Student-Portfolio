# Student Portfolio Website

A modern, responsive portfolio website built with Tailwind CSS and React components. Perfect for showcasing student projects and skills.

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **React Components**: Modular, reusable components
- **Smooth Scrolling**: Enhanced user experience with smooth navigation
- **Interactive Elements**: Hover effects and animations

## 🛠️ Technologies Used

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- React 18
- PostCSS
- Autoprefixer

## 📁 Project Structure

```
student-portfolio/
├── index.html              # Main HTML file
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration  
├── package.json            # Node.js dependencies
├── public/                 # Static assets
│   ├── favicon.ico
│   └── images/
├── src/                    # Source files
│   ├── input.css          # Tailwind directives
│   ├── styles.css         # Custom CSS with @apply
│   ├── js/
│   │   └── main.js        # React components and main JS
│   └── components/        # HTML component templates
│       ├── navbar.html
│       ├── hero.html
│       └── project-card.html
├── dist/                  # Compiled output
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd student-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Build the CSS:
```bash
npm run build:css
```

4. Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build for production
- `npm run watch:css` - Watch for CSS changes
- `npm run build:css` - Build CSS for production
- `npm start` - Start live server

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your primary color palette
  },
  secondary: {
    // Your secondary color palette
  }
}
```

### Content
1. Update personal information in `index.html`
2. Replace project data in `src/js/main.js`
3. Add your images to `public/images/`

### Styling
- Use Tailwind utility classes for quick styling
- Add custom styles with `@apply` in `src/styles.css`
- Extend Tailwind configuration for custom utilities

## 📸 Adding Your Content

### Profile Image
Add your profile photo to `public/images/profile.jpg`

### Project Images
Add project screenshots to `public/images/` and update the image paths in the JavaScript file.

### Project Data
Update the projects array in `src/js/main.js`:
```javascript
const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    image: './public/images/your-project.jpg',
    technologies: ['Tech1', 'Tech2'],
    githubUrl: 'https://github.com/username/repo',
    liveUrl: 'https://your-demo.com'
  }
];
```

## 🌐 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Push to GitHub
3. Enable GitHub Pages in repository settings

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel
1. Import project to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to open an issue or contact me.

---

**1% Better Everyday**

If necessary i could explain what each framework does not but i feel like this will be enough. 