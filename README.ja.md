[English version](./README.md)

# Sousa - 捜査ボード

Sousa（ソウサ）は、警察の捜査支援ツールです。

容疑者・関係者の写真や状況証拠をキャンバス上に配置し、線で紐づけて関係性を整理・可視化できる「デジタル捜査ボード」です。

相関図とも呼ばれます。
英語では、「Investigation Board」、「Evidence Board」、「Crazy Board」、「Link Board」とも呼ばれます。

## デモ

こちらから Sousa を試せます。  
[https://apu-and-opu.github.io/sousa/](https://apu-and-opu.github.io/sousa/)

## ダウンロード

Windows 版アプリ（.exe）はこちらです。  
[https://github.com/apu-and-opu/sousa/releases/latest](https://github.com/apu-and-opu/sousa/releases/latest)

## 主な機能

- **人物・証拠・メモ** をカードとしてキャンバスに配置
- カード同士を **矢印で接続** し、関係性にラベルを付与
- 人物カードは役割（容疑者/被害者/関係者/目撃者）で **色分け表示**
- 写真の **自動圧縮**（最大800x800px）で大量の画像もスムーズに動作
- ボードの **JSON保存・読込** に対応
- **日本語 / 英語** 切り替え対応
- **Tauri** によるデスクトップアプリ（exe）配布に対応

詳細な操作説明は [docs/features.ja.md](./docs/features.ja.md) を参照してください。

## 技術スタック

| 技術 | 用途 |
|------|------|
| [React](https://react.dev/) + TypeScript | フロントエンドフレームワーク |
| [Vite](https://vite.dev/) | ビルドツール |
| [React Flow (@xyflow/react)](https://reactflow.dev/) | キャンバス・ノード配置・接続線 |
| [Tailwind CSS](https://tailwindcss.com/) | スタイリング |
| [Tauri](https://tauri.app/) | デスクトップアプリ化 |

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# Tauri デスクトップアプリのビルド
npm run tauri:build
```

開発サーバー起動後、ブラウザで http://localhost:5173/ を開いてください。

> **ポートについて:** 開発サーバーはポート `5173` に固定されています（`strictPort: true`）。
> これは Tauri の `devUrl` 設定と一致させるためです。
> ポートが既に使用中の場合、dev サーバーはエラーで起動します。
> なお、`npm run tauri:build` で生成した exe アプリはポートを一切使用しません。
> フロントエンドの資材はバイナリに埋め込まれ、カスタムプロトコル経由で読み込まれます。

## ライセンス

このプロジェクトは [GNU Affero General Public License v3 (AGPL-3.0)](./LICENSE) の下で公開されています。

改変・再配布を行う場合は、同ライセンスに基づきソースコードの公開が必要です。
