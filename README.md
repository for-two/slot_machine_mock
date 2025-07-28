# 🎌 和風スロットマシン

Next.js + TypeScript で作られた美しい和風デザインのスロットマシンゲームです。

## 🌸 概要

日本の伝統的なシンボルと和の色彩を使用したスロットマシンゲームです。桜、竹、龍、鬼などの縁起の良いシンボルで大当たりを目指しましょう！

## ✨ 特徴

### 🎮 ゲーム機能
- **3リール式スロットマシン** - クラシックなスロット体験
- **個別リール停止** - 戦略的にリールを停止
- **段階的停止** - 0.5秒ずつずらして自動停止
- **当たり判定** - 3つ揃い＋2つ揃い（小当たり）
- **ジャックポット演出** - 鬼シンボル3つ揃いで大当たり

### 🎨 和風デザイン
- **和風シンボル**: 🌸桜 🎋竹 🐯虎 🦅鷹 🎌日の丸 ⛩️鳥居 🐉龍 👹鬼
- **和の配色**: 赤・金・琥珀色を基調とした美しいカラーパレット
- **特殊エフェクト**: 浮遊する桜の花びら、光るエフェクト
- **日本語UI**: 小判、賭け金、当たりなど和風の表現

### 🎯 配当システム
| シンボル | 配当 | 特徴 |
|---------|------|------|
| 👹 鬼 | 500倍 | ジャックポット |
| 🐉 龍 | 200倍 | バウンスアニメーション |
| ⛩️ 鳥居 | 100倍 | 輝きエフェクト |
| 🎌 日の丸 | 50倍 | - |
| 🦅 鷹 | 40倍 | - |
| 🐯 虎 | 30倍 | - |
| 🎋 竹 | 20倍 | - |
| 🌸 桜 | 10倍 | - |

※ 2つ揃いでも小当たり（ベット額の0.5倍）

## 🛠️ 技術スタック

- **フレームワーク**: [Next.js 15](https://nextjs.org/)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **アニメーション**: CSS Transitions + Tailwind Animation
- **状態管理**: React Hooks (useState, useCallback, useRef)

## 🚀 セットアップ

### 前提条件
- Node.js 18.0.0 以上
- npm, yarn, pnpm, または bun

### インストール

```bash
# リポジトリをクローン
git clone git@github.com:for-two/slot_machine_mock.git
cd slot_machine_mock

# 依存関係をインストール
npm install
# または
yarn install
# または
pnpm install
```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてゲームをお楽しみください。

## 🎮 使い方

1. **賭け金を選択** - 10両、20両、50両、100両から選択
2. **「回す」ボタンをクリック** - スロットが回転開始
3. **リールを停止** - 以下の方法で停止可能
   - 「全停止」ボタン - 自動で順次停止
   - 「1番目」「2番目」「3番目」ボタン - 個別に停止
4. **結果確認** - 当たりの場合は演出と配当が表示

## 📱 レスポンシブ対応

デスクトップ、タブレット、スマートフォンすべてのデバイスで快適にプレイできます。

## 🌐 デプロイ

### Vercel（推奨）
```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel
```

### Netlify
```bash
# ビルド
npm run build

# distフォルダをNetlifyにアップロード
```

### GitHub Pages
```bash
# static exportを有効化
npm run build
npm run export
```

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します。

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 🙏 謝辞

- [Next.js](https://nextjs.org/) - 素晴らしいReactフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - 美しいスタイリング
- [Unicode Emoji](https://unicode.org/emoji/) - 和風シンボル

---

🎌 **楽しい和風スロット体験をお楽しみください！** 🎌
