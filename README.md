# Azumaya Recovery Pod — 静的サイト

既存 Wix サイト（https://www.azumayapod.com/）を、純粋な HTML / CSS / Vanilla JS で再構築したもの。Netlify でのホスティングを前提としています。

## ファイル構成

```
index.html            日本語トップページ
en/index.html         英語トップページ（内容は日本語版と同一）
privacy-policy.html   プライバシーポリシー
css/style.css         スタイル（モバイルファースト）
js/main.js            ナビ・ドロワー・スクロールアニメ
images/               画像を手動配置する場合のフォルダ
netlify.toml          Netlify 設定（キャッシュ・セキュリティヘッダ）
```

## 技術仕様

- フレームワーク不使用（HTML / CSS / Vanilla JS のみ）
- 外部依存はフォントのみ（Google Fonts: Noto Sans JP）
- スクロールアニメーション：IntersectionObserver API
- モバイルファースト（320px〜）／ ブレークポイント 768px・1200px
- タップターゲット最小 44px
- `prefers-reduced-motion` 対応

## 画像について

現状、画像は Wix の CDN（`static.wixstatic.com`）の URL を直接参照しています。
そのまますぐ表示できますが、Wix 依存を切りたい場合は以下の手順でローカル化できます。

1. 各画像を `images/` フォルダにダウンロード配置
2. HTML / CSS 内の `https://static.wixstatic.com/media/...` を
   `images/ファイル名.png` に置換

| 用途 | Wix URL のファイル名 |
|------|----------------------|
| ヒーロー／メインポッド | `55a92c_ea0e6db3184445ac958518afda0f0424~mv2.png` |
| 設置場所①（オフィス） | `55a92c_bd57afc8ef4a4c719cb93c7b3aab2615~mv2.png` |
| 設置場所②（公共空間） | `55a92c_983414842b934d388b3a773ee8e1e876~mv2.png` |
| CTA 背景 | `55a92c_ae32476a72574ce0be07a82c018c792d~mv2.png` |

## 差し替えポイント

- **Testimonials セクション**：現在はダミーテキスト。`index.html` / `en/index.html` の
  `.testimonial` カード（企業名・コメント・業種タグ）を実際の事例に差し替え可能。
- **お問い合わせ先**：全 CTA は Google フォーム（https://forms.gle/HsSoGKHqhkhACeSGA）にリンク。

## ローカル確認

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## デプロイ（Netlify）

リポジトリを Netlify に接続するだけ。ビルドコマンドは不要、publish ディレクトリはルート（`.`）。
