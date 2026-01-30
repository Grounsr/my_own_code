# SiteForge - No-Code Website Builder

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## Description

SiteForge is a professional no-code website builder with an intuitive drag-and-drop interface. Create stunning websites without writing a single line of code.

**Live Demo:** [https://grounsr.github.io/my_own_code/](https://grounsr.github.io/my_own_code/)

## Features

- Drag & Drop builder interface
- 20+ pre-built blocks (navigation, hero, features, pricing, etc.)
- Real-time preview on different devices (desktop, tablet, mobile)
- Export to clean HTML/CSS
- Local storage for projects
- Dark theme UI
- Undo/Redo support
- Keyboard shortcuts (Ctrl+S, Ctrl+Z, Ctrl+C, Ctrl+V)

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid
- **JavaScript** - Vanilla JS, ES6+
- **Font Awesome** - Icons
- **LocalStorage** - Data persistence

## Project Structure

```
my_own_code/
|-- index.html          # Dashboard page
|-- builder.html        # Builder page
|-- css/
|   |-- dashboard.css   # Dashboard styles
|   |-- builder.css     # Builder styles
|-- js/
|   |-- storage.js      # LocalStorage module
|   |-- dashboard.js    # Dashboard functionality
|   |-- builder.js      # Builder functionality
|   |-- blocks.js       # Blocks library
|-- .gitignore
|-- LICENSE
|-- README.md
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Grounsr/my_own_code.git
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

3. Navigate to `http://localhost:8000`

## Usage

1. **Dashboard** - Manage your projects, templates, and media files
2. **Builder** - Drag blocks from the left panel to the canvas
3. **Preview** - Test your site on different screen sizes
4. **Export** - Download your site as clean HTML/CSS

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + S` | Save project |
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |
| `Ctrl + C` | Copy block |
| `Ctrl + V` | Paste block |
| `Delete` | Delete selected block |
| `Escape` | Deselect / Close modal |

## Screenshots

### Dashboard
Project management with templates and media library.

### Builder
Drag-and-drop interface with real-time preview.

## Roadmap

- [ ] User authentication
- [ ] Cloud storage integration
- [ ] Custom CSS editor
- [ ] Animation support
- [ ] Multi-language support
- [ ] Collaborative editing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Author

**Grounsr** - [GitHub Profile](https://github.com/Grounsr)

## Acknowledgments

- Font Awesome for icons
- Inter font family
- Inspiration from modern website builders

---

Made with love in Tajikistan
