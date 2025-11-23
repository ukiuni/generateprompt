# AI Image Prompt Builder

🎨 A powerful web-based tool for creating professional Midjourney prompts through an intuitive GUI.

[🚀 **Live Demo**](https://ukiuni.github.io/generateprompt/) • [🐛 Report Bug](https://github.com/ukiuni/generateprompt/issues)

![AI Image Prompt Builder](https://img.shields.io/badge/License-MIT-blue.svg)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)

## ✨ Features

- 🎯 **Intuitive Builder**: Select from 100+ options across 8 categories
- 🌐 **Bilingual**: Auto-detects language (English/Japanese)
- 📚 **Recipe Book**: 6 pre-configured prompt templates
- ⚡ **Real-time Preview**: See your prompt as you build it
- 📋 **One-Click Copy**: Instant clipboard integration
- 🎨 **Cyberpunk Design**: Premium glassmorphism UI
- 📱 **Responsive**: Works on desktop and mobile
- 🔒 **Privacy-First**: All data stored locally in your browser

## 🚀 Quick Start

Simply visit the [live demo](https://ukiuni.github.io/generateprompt/) and start creating prompts!

### Local Development

```bash
# Clone the repository
git clone git@github.com:ukiuni/generateprompt.git
cd generateprompt

# Install dependencies
npm install

# Start local server
npx http-server -p 8080

# Open http://localhost:8080
```

## 🧪 Testing

```bash
# Run E2E tests
npx playwright test

# View test report
npx playwright show-report
```

## 🛠️ Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- Playwright (E2E Testing)
- GitHub Actions (CI/CD)
- Google Analytics

## 📂 Project Structure

```
.
├── index.html              # Main application
├── terms.html              # Terms of Service
├── style.css               # Cyberpunk/Glassmorphism styles
├── script.js               # Core logic & i18n
├── recipes.js              # Prompt templates
├── tests/
│   └── e2e.spec.js        # Playwright tests
├── .github/
│   └── workflows/
│       └── deploy.yml     # Auto-deployment
└── package.json
```

## 🎨 Design Philosophy

The app features a **Cyberpunk / Glassmorphism** aesthetic:
- Dark backgrounds with neon accents
- Frosted glass panels with backdrop blur
- Smooth animations and transitions
- Vibrant cyan (#00f3ff) and purple (#bc13fe) highlights

## 🌍 Internationalization

The UI automatically detects your browser language:
- 🇬🇧 English
- 🇯🇵 日本語 (Japanese)

Generated prompts are always in English (as recommended for Midjourney).

## 📋 License

MIT License - feel free to use this project for any purpose!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 Terms of Service

Please see our [Terms of Service](terms.html) page.

---

**Made with ❤️ for Creators**
