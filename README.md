# 静的サイトボイラープレート

Astro + React + TailwindCSS + Cloudflare Workers を使用した静的サイト開発のためのボイラープレートです。

## 🛠️ 技術スタック

- **フレームワーク**: Astro 5.11.0
- **UI ライブラリ**: React 19.1.0
- **CSS フレームワーク**: TailwindCSS 4.1.11
- **デプロイ**: Cloudflare Workers
- **TypeScript**: 完全対応
- **開発ツール**: Prettier, Wrangler

## 🏗️ 特徴

- 静的サイト生成（SSG）に最適化
- React コンポーネントの使用が可能
- TailwindCSS による高速なスタイリング
- Cloudflare Workers へのデプロイ対応
- TypeScript 完全サポート
- 日本語対応（lang="ja"）

## 📁 プロジェクト構造

```text
/
├── public/                  # 静的ファイル
│   └── favicon.svg
├── src/                     # ソースファイル
│   ├── assets/              # アセット（画像など）
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/          # Astro コンポーネント
│   │   └── Welcome.astro
│   ├── layouts/             # レイアウトコンポーネント
│   │   └── Layout.astro
│   ├── pages/               # ページファイル
│   │   └── index.astro
│   └── global.css           # グローバル CSS
├── astro.config.mjs         # Astro 設定
├── tsconfig.json           # TypeScript 設定
├── wrangler.jsonc          # Cloudflare Workers 設定
├── worker-configuration.d.ts # Workers 型定義
└── package.json
```

## 🧞 コマンド

すべてのコマンドは、プロジェクトのルートディレクトリから実行してください：

| コマンド                   | 説明                                           |
| :------------------------ | :----------------------------------------------- |
| `npm run init`            | プロジェクトを初期化（名前・Cloudflare設定）      |
| `npm run dev`             | 開発サーバーを起動（`localhost:4321`）      |
| `npm run build`           | 本番用サイトを `./dist/` にビルド          |
| `npm run preview`         | ビルドしたサイトをローカルでプレビュー     |
| `npm run astro ...`       | Astro CLI コマンドを実行 |
| `npm run cf-typegen`      | Cloudflare Workers の型定義を生成                     |

## 🚀 使用方法

### 1. プロジェクトの初期化
```bash
npm run init
```
対話形式でプロジェクト名とCloudflareアカウントIDを設定し、依存関係をインストールします。

### 2. 開発サーバーの起動
```bash
npm run dev
```

### 3. 本番用ビルド
```bash
npm run build
```

### 4. Cloudflare Workers へのデプロイ
```bash
npm run build
npm run deploy
```

## 📚 参考リンク

- [Astro Documentation](https://docs.astro.build)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)