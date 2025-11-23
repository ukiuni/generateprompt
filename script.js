// State
const state = {
    subject: '',
    style: '',
    lighting: '',
    camera: '',
    color: '',
    mood: '',
    environment: '',
    ar: '',
    version: '',
    stylize: 0,
    params: {} // For other params if needed
};

// DOM Elements
const elements = {
    subject: document.getElementById('subject'),
    style: document.getElementById('style'),
    lighting: document.getElementById('lighting'),
    camera: document.getElementById('camera'),
    color: document.getElementById('color'),
    mood: document.getElementById('mood'),
    environment: document.getElementById('environment'),
    ar: document.getElementById('ar'),
    version: document.getElementById('version'),
    stylize: document.getElementById('stylize'),
    stylizeVal: document.getElementById('stylize-val'),
    finalPrompt: document.getElementById('final-prompt'),
    copyBtn: document.getElementById('copy-btn'),
    recipeGrid: document.getElementById('recipe-grid'),
    subjectTags: document.getElementById('subject-tags')
};

// Data Options (English values, keys for i18n)
const options = {
    style: [
        "Anime style", "Manga style", "1980s anime", "Studio Ghibli style",
        "Photorealistic", "Hyper realistic", "4k", "Ultra detailed", "National Geographic",
        "Dark fantasy", "Epic fantasy", "RPG game art", "Concept art",
        "Cyberpunk", "Futuristic city", "Neon lights", "High tech", "Vaporwave",
        "Oil painting", "Watercolor", "Ukiyo-e", "Renaissance painting", "Impressionism", "Pixel Art"
    ],
    lighting: [
        "Natural Lighting", "Cinematic Lighting", "Neon Lights", "Soft Lighting",
        "Rembrandt Lighting", "Volumetric Lighting", "Studio lighting"
    ],
    camera: [
        "Portrait", "Headshot", "Close-up", "Wide shot",
        "Bird's-eye view", "Low angle", "Dutch angle", "Macro", "Drone View"
    ],
    color: [
        "Vibrant", "Muted", "Bright", "Monochromatic",
        "Colorful", "Black & White", "Pastel colors"
    ],
    mood: [
        "Calm", "Serene", "Chaotic", "Energetic",
        "Mystical", "Gloomy", "Cheerful", "Ethereal"
    ],
    environment: [
        "Indoor", "Outdoor", "Moon surface", "Underwater",
        "Cyberpunk city", "Ancient ruins", "Forest", "Space"
    ]
};

const subjectTags = ["Cute", "Detailed", "Masterpiece", "Intricate details", "8k"];

// i18n Dictionary
const i18n = {
    ja: {
        subtitle: "プロフェッショナルなMidjourneyプロンプトを瞬時に作成。",
        builderTitle: "ビルダー",
        labelSubject: "主題 (Subject)",
        placeholderSubject: "例: 未来的な都市, 猫の魔法使い",
        labelStyle: "画風・媒体 (Style)",
        labelLighting: "照明 (Lighting)",
        labelCamera: "構図 (Camera)",
        labelColor: "色 (Color)",
        labelMood: "雰囲気 (Mood)",
        labelEnvironment: "環境 (Environment)",
        paramsTitle: "パラメータ",
        previewTitle: "プロンプト・プレビュー",
        btnCopy: "クリップボードにコピー",
        recipesTitle: "レシピ集",
        footerText: "クリエイターのために設計されました。",
        optionNone: "指定なし",
        termsLink: "利用規約"
    },
    en: {
        subtitle: "Create professional Midjourney prompts in seconds.",
        builderTitle: "Builder",
        labelSubject: "Subject",
        placeholderSubject: "e.g. A futuristic city, A cat wizard",
        labelStyle: "Style / Medium",
        labelLighting: "Lighting",
        labelCamera: "Camera / View",
        labelColor: "Colors",
        labelMood: "Mood",
        labelEnvironment: "Environment",
        paramsTitle: "Parameters",
        previewTitle: "Prompt Preview",
        btnCopy: "Copy to Clipboard",
        recipesTitle: "Recipe Book",
        footerText: "Designed for Creators.",
        optionNone: "None",
        termsLink: "Terms of Service"
    }
};

// Initialize
function init() {
    setupI18n();
    populateSelects();
    populateTags();
    setupEventListeners();
    renderRecipes();
    updatePrompt();
}

// i18n Setup
function setupI18n() {
    const lang = navigator.language.startsWith('ja') ? 'ja' : 'en';
    const dict = i18n[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.placeholder = dict[key];
    });
}

// Populate Select Options
function populateSelects() {
    Object.keys(options).forEach(key => {
        const select = elements[key];
        if (!select) return;

        options[key].forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        });
    });
}

// Populate Subject Tags
function populateTags() {
    subjectTags.forEach(tag => {
        const chip = document.createElement('div');
        chip.className = 'tag-chip';
        chip.textContent = tag;
        chip.addEventListener('click', () => {
            const current = elements.subject.value;
            elements.subject.value = current ? current + `, ${tag}` : tag;
            updateState('subject', elements.subject.value);
        });
        elements.subjectTags.appendChild(chip);
    });
}

// Event Listeners
function setupEventListeners() {
    // Inputs
    Object.keys(elements).forEach(key => {
        const el = elements[key];
        if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT')) {
            el.addEventListener('input', (e) => {
                updateState(key, e.target.value);
            });
        }
    });

    // Copy Button
    elements.copyBtn.addEventListener('click', () => {
        const text = elements.finalPrompt.value;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = elements.copyBtn.querySelector('span:last-child').textContent;
            elements.copyBtn.querySelector('span:last-child').textContent = "Copied!";
            setTimeout(() => {
                elements.copyBtn.querySelector('span:last-child').textContent = originalText;
            }, 2000);
        });
    });
}

// Update State
function updateState(key, value) {
    state[key] = value;
    if (key === 'stylize') {
        elements.stylizeVal.textContent = value;
    }
    updatePrompt();
}

// Generate Prompt
function updatePrompt() {
    const parts = [];

    // 1. Subject (Most important)
    if (state.subject) parts.push(state.subject);

    // 2. Style & Medium
    if (state.style) parts.push(state.style);

    // 3. Details (Environment, Lighting, etc.)
    if (state.environment) parts.push(state.environment);
    if (state.lighting) parts.push(state.lighting);
    if (state.color) parts.push(state.color + " colors");
    if (state.mood) parts.push(state.mood + " mood");
    if (state.camera) parts.push(state.camera);

    // Join main parts
    let prompt = parts.join(", ");

    // 4. Parameters (Append at the end)
    if (state.ar) prompt += ` ${state.ar}`;
    if (state.version) prompt += ` ${state.version}`;
    if (state.stylize > 0) prompt += ` --s ${state.stylize}`;

    // Update Textarea
    elements.finalPrompt.value = prompt ? `/imagine prompt: ${prompt}` : '';
}

// Render Recipes
function renderRecipes() {
    // Assuming recipes are loaded from recipes.js via global variable 'recipes'
    if (typeof recipes === 'undefined') return;

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <div class="recipe-title">${recipe.name}</div>
            <div class="recipe-desc">${recipe.category}</div>
        `;
        card.addEventListener('click', () => loadRecipe(recipe));
        elements.recipeGrid.appendChild(card);
    });
}

// Load Recipe
function loadRecipe(recipe) {
    // Update State
    state.subject = recipe.params.subject || '';
    state.style = recipe.params.style || '';
    state.lighting = recipe.params.lighting || '';
    state.camera = recipe.params.camera || '';
    state.color = recipe.params.color || '';
    state.mood = recipe.params.mood || '';
    state.environment = recipe.params.environment || '';
    state.ar = recipe.params.ar || '';
    state.version = recipe.params.version || '';
    state.stylize = recipe.params.stylize || 0;

    // Update UI
    elements.subject.value = state.subject;
    elements.style.value = state.style;
    elements.lighting.value = state.lighting;
    elements.camera.value = state.camera;
    elements.color.value = state.color;
    elements.mood.value = state.mood;
    elements.environment.value = state.environment;
    elements.ar.value = state.ar;
    elements.version.value = state.version;
    elements.stylize.value = state.stylize;
    elements.stylizeVal.textContent = state.stylize;

    updatePrompt();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Run
document.addEventListener('DOMContentLoaded', init);
