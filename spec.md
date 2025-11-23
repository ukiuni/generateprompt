# AI Image Prompt Builder (AI画像生成プロンプト・ビルダー)

## 1. 概要 (Overview)
**AI Image Prompt Builder** は、Midjourneyなどの画像生成AIを使いこなすための「プロンプト（呪文）」を、直感的なGUI操作で作成できるWebツールです。
複雑なパラメータや英語の構文を覚える必要がなく、画風、照明、構図などの要素を選択肢から選ぶだけで、誰でもハイクオリティな画像を生成するためのプロンプトを作成できます。

## 2. 目的・提供価値 (Value Proposition)
*   **脱・初心者**: "呪文"がわからなくても、プロ並みの画像生成が可能に。
*   **試行錯誤の短縮**: 毎回手入力していたパラメータ指定をGUIで高速化。
*   **インスピレーション**: 豊富なスタイルや構図の選択肢から、新しいアイデアを得られる。
*   **レシピ活用**: 実績のあるプロンプト構成をワンクリックで呼び出し、自分好みにアレンジできる。

## 3. 機能要件 (Functional Requirements)

### A. Image Gen ビルダー (Main Feature)
以下の要素を組み合わせて、Midjourney等に最適なプロンプトを構築します。

1.  **Subject (主題)**:
    *   自由入力欄（例: "A cat", "A futuristic city"）
    *   補助キーワード選択: "Cute", "Detailed", "Masterpiece", "Intricate details"
    *   **Number/Action**: "Three female warriors", "Standing in a row", "Flying", "Walking"
2.  **Style / Medium (画風・媒体)**:
    *   **Anime/Manga**: "Anime style", "Manga style", "1980s anime", "Studio Ghibli style"
    *   **Photorealistic**: "Photorealistic", "Hyper realistic", "4k", "Ultra detailed", "National Geographic"
    *   **Fantasy/Game**: "Dark fantasy", "Epic fantasy", "RPG game art", "Concept art"
    *   **SF/Cyberpunk**: "Cyberpunk", "Futuristic city", "Neon lights", "High tech", "Vaporwave"
    *   **Traditional Art**: "Oil painting", "Watercolor", "Ukiyo-e", "Renaissance painting", "Impressionism"
3.  **Environment (環境)**:
    *   "Indoor", "Outdoor", "Moon surface", "Underwater", "Cyberpunk city", "Ancient ruins", "Forest", "Space"
4.  **Lighting (照明)**:
    *   "Natural Lighting", "Cinematic Lighting", "Neon Lights", "Soft Lighting", "Rembrandt Lighting", "Volumetric Lighting", "Studio lighting"
5.  **Color (色)**:
    *   "Vibrant", "Muted", "Bright", "Monochromatic", "Colorful", "Black & White", "Pastel colors"
6.  **Mood (気分)**:
    *   "Calm", "Serene", "Chaotic", "Energetic", "Mystical", "Gloomy", "Cheerful"
7.  **Composition (構図)**:
    *   "Portrait", "Headshot", "Close-up", "Wide shot", "Bird's-eye view (鳥瞰図)", "Low angle", "Dutch angle"
8.  **Parameters (パラメータ)**:
    *   **Aspect Ratio (`--ar`)**: "16:9", "9:16", "1:1", "4:3", "3:4", "21:9"
    *   **Model Version (`--v` / `--niji`)**: "v 6.0", "v 5.2", "Niji 6"
    *   **Stylize (`--s`)**: スライダー (0-1000)
    *   **Chaos (`--c`)**: スライダー (0-100)
    *   **Negative Prompt (`--no`)**: "text, watermark, low quality, ugly, deformed, extra fingers"

### B. レシピ集 (Recipe Book)
*   **カテゴリ別表示**:
    *   **Character**: "Cyberpunk Girl", "Fantasy Warrior", "Anime Portrait"
    *   **Scenery**: "Futuristic City", "Nature Landscape", "Interior Design"
    *   **Artistic**: "Ukiyo-e Style", "Abstract Art", "Logo Design"
*   **機能**:
    *   **ワンクリック適用**: レシピを選ぶと、ビルダーの方にその設定がコピーされ、そこから微調整が可能。
    *   **プレビュー画像**: (可能であれば) そのプロンプトで生成される画像のイメージを表示（プレースホルダー可）。

### C. その他の機能
*   **多言語対応 (Localization)**:
    *   ブラウザの言語設定（`navigator.language`）を検出し、UI（選択肢のラベル等）を自動でその言語（日本語/英語）で表示する。
    *   ※生成されるプロンプト自体は英語のまま（Midjourneyが英語推奨のため）。
*   **リアルタイムプレビュー**: 選択した項目が即座にプロンプト文字列として結合され表示される。
*   **コピー機能**: ワンクリックでクリップボードにコピー。
*   **履歴/保存 (Local Storage)**: 作成したプロンプトをブラウザ内に保存し、後で呼び出せる。
*   **アフィリエイト誘導**: 画像生成AIツールや関連サービスへの紹介リンク。

## 4. 技術スタック (Tech Stack)
*   **Frontend**: HTML5, CSS3, JavaScript (Vanilla ES6+)
*   **Styling**: CSS Variables, Flexbox/Grid
    *   **デザインテーマ**: "Cyberpunk / Glassmorphism" (暗色背景、ネオンカラー、すりガラス)
*   **Deployment**: GitHub Actionsを用いてGitHub Pagesへ自動デプロイ。
*   **Testing**: Playwrightを用いたE2Eテスト。
    *   簡易サーバを起動してテストを実行。
    *   テスト実行時の様子を動画として記録する。

## 5. UI/UX デザイン方針
*   **Visual First**: 画像生成ツールらしく、視覚的にインスピレーションを与えるデザイン。
*   **Interactive**: パラメータ変更時のフィードバックを明確に。
*   **Mobile Responsive**: スマホでの操作性を考慮。
