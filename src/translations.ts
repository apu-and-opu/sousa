import { createContext, useContext } from 'react';
import { RELATIONSHIP_PRESETS } from './constants';

export type Language = 'ja' | 'en';

export type TranslationMap = Record<string, string>;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export const STORAGE_KEY = 'sousa-lang';

export function detectLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'ja' || stored === 'en') return stored;
  return navigator.language.startsWith('ja') ? 'ja' : 'en';
}

/** If the label is a known preset key, return its translated display name; otherwise return as-is. */
export function translateEdgeLabel(label: string, t: (key: string) => string): string {
  if ((RELATIONSHIP_PRESETS as readonly string[]).includes(label)) {
    return t(`rel.${label}`);
  }
  return label;
}

/** If the display text matches a translated preset name, return the key; otherwise return the text as-is. */
export function displayToPresetKey(display: string, t: (key: string) => string): string {
  for (const preset of RELATIONSHIP_PRESETS) {
    if (t(`rel.${preset}`) === display) return preset;
  }
  return display;
}

export const translations: Record<Language, TranslationMap> = {
  ja: {
    // App
    'app.title': 'Sousa',
    'app.subtitle': '捜査ボード',
    'app.deleteSelected': '🗑️ 選択削除 (Delete)',
    'app.canvasHint': 'ダブルクリックで編集 | ノード端をドラッグして接続 | Shift+クリックで複数選択',

    // Sidebar
    'sidebar.helpGuide': '❓ 使い方ガイド',
    'tab.person': '人物',
    'tab.evidence': '証拠',
    'tab.comment': 'メモ',
    'form.nameTitle': '名前・タイトル',
    'form.placeholder.person': '氏名',
    'form.placeholder.evidence': '証拠名',
    'form.placeholder.comment': 'メモタイトル',
    'form.role': '役割',
    'form.evidenceType': '証拠種別',
    'form.comment': 'コメント',
    'form.commentPlaceholder': 'メモ・コメントを入力...',
    'form.photo': '写真',
    'form.description': '説明',
    'form.descriptionPlaceholder': '詳細情報...',
    'form.addToBoard': '+ ボードに追加',
    'action.save': '💾 保存',
    'action.load': '📂 読込',
    'action.clearBoard': '🗑️ ボードをクリア',

    // Edit Modal
    'edit.person': '👤 人物を編集',
    'edit.evidence': '🔍 証拠を編集',
    'edit.comment': '📝 メモを編集',
    'edit.save': '保存',
    'edit.cancel': 'キャンセル',
    'edit.alertName': '名前・タイトルを入力してください。',
    'edit.alertComment': 'コメントを入力してください。',

    // Edge Label Modal
    'edge.editTitle': '🔗 関係性を編集',
    'edge.label': 'ラベル',
    'edge.placeholder': '関係性を入力...',
    'edge.presets': 'プリセット',
    'edge.save': '保存',
    'edge.direction': '矢印の向き',
    'edge.forward': '→ 片方向',
    'edge.reverse': '← 逆方向',
    'edge.both': '↔ 双方向',
    'edge.none': '― なし',
    'edge.delete': '削除',

    // File IO
    'fileio.loadError': 'ファイルの読み込みに失敗しました。',
    'fileio.invalidFormat': 'ファイル形式が正しくありません。nodes/edges が配列ではありません。',
    'fileio.corruptFile': 'ファイルの内容が壊れています。正しい捜査ボードファイルを選択してください。',
    'fileio.confirmClear': 'ボードの内容をすべて削除しますか？',
    'fileio.saved': '保存しました: {path}',
    'fileio.saveError': 'ファイルの保存に失敗しました。',

    // Image
    'image.loadError': '画像ファイルの読み込みに失敗しました。',
    'image.compressError': '画像の圧縮に失敗しました。別の画像をお試しください。',
    'image.select': '画像を選択',
    'image.change': '変更',
    'image.remove': '削除',

    // Crop
    'crop.title': '画像の切り抜き',
    'crop.confirm': '確定',
    'crop.cancel': 'キャンセル',
    'crop.processing': '処理中...',
    'crop.zoom': 'ズーム',
    'crop.dragHint': 'ドラッグで位置を調整',
    'crop.reset': 'リセット',

    // Roles
    'role.suspect': '容疑者',
    'role.victim': '被害者',
    'role.person_of_interest': '関係者',
    'role.witness': '目撃者',

    // Evidence Types
    'evidence.physical': '物証',
    'evidence.photo': '写真',
    'evidence.video': '映像',
    'evidence.document': '文書',
    'evidence.weapon': '凶器',
    'evidence.dna': 'DNA',
    'evidence.fingerprint': '指紋',

    // Relationship Presets
    'rel.accomplice': '共犯',
    'rel.acquaintance': '知人',
    'rel.relative': '親族',
    'rel.colleague': '同僚',
    'rel.partner': '恋人',
    'rel.superior': '上司',
    'rel.subordinate': '部下',
    'rel.witnessed': '目撃',
    'rel.possessed': '所持',
    'rel.found_at': '発見場所',
    'rel.call_history': '通話履歴',
    'rel.alibi': 'アリバイ',
    'rel.related': '関連',
    'rel.contradiction': '矛盾',
    'rel.corroboration': '裏付け',

    // Help - Page
    'help.title': '❓ 使い方ガイド',
    'help.close': '閉じる',
    'help.section.overview': 'はじめに',
    'help.section.add': 'カードを追加する',
    'help.section.connect': '線でつなげる',
    'help.section.edit': '編集・削除する',
    'help.section.canvas': '画面の操作',
    'help.section.save': '保存と読み込み',
    'help.section.shortcut': 'キーボード操作',

    // Help - Overview
    'help.overview.intro': '捜査ボードは、捜査に関わる人物・証拠・メモをひとつの画面上に並べて、それぞれの関係を線で結んで整理するためのツールです。',
    'help.overview.screenLayout': '画面の構成',
    'help.overview.sidebarTitle': '左：サイドバー',
    'help.overview.sidebarItem1': '人物・証拠・メモの追加',
    'help.overview.sidebarItem2': '保存・読込・クリア',
    'help.overview.sidebarItem3': 'ヘルプ表示',
    'help.overview.boardTitle': '右：ボード（キャンバス）',
    'help.overview.boardItem1': 'カードの配置と移動',
    'help.overview.boardItem2': '線の接続',
    'help.overview.boardItem3': '拡大縮小・スクロール',
    'help.overview.cardTypes': 'ボードに置けるカードの種類',
    'help.overview.personCard': '人物カード',
    'help.overview.personCardDesc': '容疑者・被害者・関係者・目撃者',
    'help.overview.evidenceCard': '証拠カード',
    'help.overview.evidenceCardDesc': '物証・写真・映像・DNA 等',
    'help.overview.commentCard': 'メモカード',
    'help.overview.commentCardDesc': '自由なコメント・メモ',
    'help.overview.colorCoding': '人物カードの色分け',
    'help.overview.suspectRed': '容疑者 = 赤',
    'help.overview.victimBlue': '被害者 = 青',
    'help.overview.poiYellow': '関係者 = 黄',
    'help.overview.witnessGreen': '目撃者 = 緑',

    // Help - Add
    'help.add.intro': '画面左のサイドバーから、ボードに新しいカードを追加します。',
    'help.add.addPerson': '人物を追加する場合',
    'help.add.step1Title': '「人物」タブを選ぶ',
    'help.add.step1Desc': 'サイドバー上部の「👤 人物」タブをクリックします。',
    'help.add.step2Title': '情報を入力する',
    'help.add.step2Name': '名前 - 人物の氏名（必須）',
    'help.add.step2Role': '役割 - 容疑者・被害者・関係者・目撃者 から選択',
    'help.add.step2Photo': '写真 - 「ファイルを選択」をクリックして画像を選ぶ（任意）',
    'help.add.step2Desc': '説明 - 住所や特徴などの補足情報（任意）',
    'help.add.step3Title': '「ボードに追加」を押す',
    'help.add.step3Desc': '青い「+ ボードに追加」ボタンを押すと、ボード上にカードが現れます。',
    'help.add.compressionTitle': '写真の自動圧縮について',
    'help.add.compressionDesc': '追加した写真は、自動的に最大 800x800 ピクセルにリサイズされ、ファイルサイズが小さくなるよう圧縮されます（1枚あたり約50〜100KB）。これにより、大量の写真を貼り付けてもボードの動作が重くならず、保存ファイルのサイズも小さく抑えられます。カード上の表示には十分な画質が保たれるため、見た目への影響はありません。',
    'help.add.addEvidence': '証拠を追加する場合',
    'help.add.addEvidenceDesc': '「🔍 証拠」タブに切り替え、証拠名と種別（物証・写真・映像・文書・凶器・DNA・指紋）を選択して追加します。写真や説明も同様に設定できます。',
    'help.add.addComment': 'メモを追加する場合',
    'help.add.addCommentDesc': '「📝 メモ」タブに切り替え、タイトルとコメント本文を入力して追加します。捜査上の仮説や気づきなどを自由に書き込めます。',

    // Help - Connect
    'help.connect.intro': 'カード同士を線（矢印）で結んで、人物と証拠の関係性を視覚的に表現できます。',
    'help.connect.step1Title': 'カードの丸印を見つける',
    'help.connect.step1Desc': '各カードの上下左右に、小さな丸印（ハンドル）が表示されています。どの丸印からでも線を出したり、受けたりできます。',
    'help.connect.step2Title': '丸印からドラッグする',
    'help.connect.step2Desc': 'つなぎ元カードの丸印にカーソルを合わせ、マウスの左ボタンを押したまま、接続先カードの丸印までドラッグします。',
    'help.connect.step3Title': '矢印が引かれる',
    'help.connect.step3Desc': 'マウスボタンを離すと、ドラッグした方向に矢印付きの線が引かれます。矢印の向きで「どちらからどちらへ」の関係がわかります。',
    'help.connect.diagramPerson1': '👤 山田太郎',
    'help.connect.diagramLabel': '共犯',
    'help.connect.diagramPerson2': '👤 鈴木次郎',
    'help.connect.labelTitle': '線にラベル（関係名）を付ける',
    'help.connect.labelStep1Title': '線をダブルクリック',
    'help.connect.labelStep1Desc': 'ボード上の矢印線をダブルクリックすると、ラベル編集画面が開きます。',
    'help.connect.labelStep2Title': '関係名を入力または選択',
    'help.connect.labelStep2Desc': '自分で文字を入力するか、あらかじめ用意された候補（「共犯」「知人」「目撃」など）から選んで「保存」を押します。',
    'help.connect.directionTitle': '矢印の向きを変更する',
    'help.connect.directionDesc': '同じ編集画面で「矢印の向き」を変更できます。「→ 片方向」「← 逆方向」「↔ 双方向」「― なし」の4種類から選べます。「なし」を選ぶと矢印のない線になります。',
    'help.connect.reconnectTitle': '線の接続先を付け替える',
    'help.connect.reconnectStep1Title': '線の端をつかむ',
    'help.connect.reconnectStep1Desc': '付け替えたい線の端（矢印の先端、または根元）にカーソルを合わせ、マウスの左ボタンを押します。',
    'help.connect.reconnectStep2Title': '別のカードにドラッグする',
    'help.connect.reconnectStep2Desc': 'そのまま別のカードの丸印（ハンドル）までドラッグしてマウスボタンを離すと、接続先が変更されます。ラベルや矢印の設定はそのまま引き継がれます。',
    'help.connect.presetsLabel': '用意されている関係名の候補：',

    // Help - Edit
    'help.edit.changeTitle': 'カードの内容を変更する',
    'help.edit.step1Title': 'カードをダブルクリック',
    'help.edit.step1Desc': '変更したいカードをすばやく2回クリック（ダブルクリック）すると、編集画面が開きます。',
    'help.edit.step2Title': '内容を修正して「保存」',
    'help.edit.step2Desc': '名前・役割・写真・説明などを変更し、「保存」ボタンを押します。',
    'help.edit.moveTitle': 'カードを移動する',
    'help.edit.moveDesc': 'カードをマウスの左ボタンで押したまま動かす（ドラッグ）と、好きな位置に移動できます。',
    'help.edit.deleteTitle': 'カードや線を削除する',
    'help.edit.deleteSingleLabel': '単体削除：',
    'help.edit.deleteSingleDesc': '削除したいカードまたは線をクリックで選択し、キーボードの Delete キーを押す',
    'help.edit.deleteMultiLabel': 'まとめて削除：',
    'help.edit.deleteMultiDesc': 'Shift を押しながら複数のカードをクリックして選択し、画面右上の「選択削除」ボタンまたは Delete キー',
    'help.edit.deleteLineLabel': '線だけ削除：',
    'help.edit.deleteLineDesc': '線をダブルクリック → ラベル編集画面の「削除」ボタン',

    // Help - Canvas
    'help.canvas.zoom': '画面を拡大・縮小する',
    'help.canvas.zoomHow': 'マウスのホイール（スクロール）を前後に回す',
    'help.canvas.scroll': '画面をスクロール（移動）する',
    'help.canvas.scrollHow': 'ボードの何もない場所をマウスで押したまま動かす',
    'help.canvas.fitView': '全体表示に戻す',
    'help.canvas.fitViewHow': '画面左下のコントロールにある「枠に収める」ボタンをクリック',
    'help.canvas.zoomIn': '拡大する',
    'help.canvas.zoomInHow': '画面左下の「＋」ボタンをクリック',
    'help.canvas.zoomOut': '縮小する',
    'help.canvas.zoomOutHow': '画面左下の「−」ボタンをクリック',
    'help.canvas.minimapTitle': 'ミニマップ（全体図）',
    'help.canvas.minimapDesc': '画面右下に小さな全体図が表示されています。ボード上のカードがどの位置にあるか一目でわかります。色で種類を区別できます。',
    'help.canvas.minimapPerson': '人物',
    'help.canvas.minimapEvidence': '証拠',
    'help.canvas.minimapComment': 'メモ',

    // Help - Save
    'help.save.saveTitle': 'ボードを保存する',
    'help.save.saveStep1Title': '「保存」ボタンを押す',
    'help.save.saveStep1Desc': 'サイドバー下部の「💾 保存」ボタンをクリックします。',
    'help.save.saveStep2Title': 'ファイルがダウンロードされる',
    'help.save.saveStep2Desc': 'sousa-2026-01-02.json のようなファイル名で保存されます。このファイルをわかりやすい場所に保管してください。',
    'help.save.sizeTitle': '保存ファイルのサイズについて',
    'help.save.sizeDesc': '写真はボードに追加した時点で自動的に圧縮（最大800x800px、JPEG品質80%）されているため、保存ファイルのサイズは小さく抑えられます。写真100枚程度でも約10MB以下のファイルサイズに収まります。',
    'help.save.loadTitle': '保存したボードを開く',
    'help.save.loadStep1Title': '「読込」ボタンを押す',
    'help.save.loadStep1Desc': 'サイドバー下部の「📂 読込」ボタンをクリックします。',
    'help.save.loadStep2Title': 'ファイルを選択する',
    'help.save.loadStep2Desc': 'ファイル選択画面が開くので、以前保存した .json ファイルを選びます。ボードの内容が復元されます。',
    'help.save.clearTitle': 'ボードをクリア（全削除）する',
    'help.save.clearDesc': 'サイドバー下部の「🗑️ ボードをクリア」を押すと、確認メッセージが出ます。「OK」を押すとボード上のすべてのカードと線が削除されます。',
    'help.save.clearWarningTitle': '注意',
    'help.save.clearWarningDesc': 'クリア操作はやり直せません。大切なデータは事前に「保存」しておいてください。',

    // Help - Shortcuts
    'help.shortcut.intro': 'マウスだけでも操作できますが、キーボードを使うとより素早く操作できます。',
    'help.shortcut.delete': '選択中のカード・線を削除する',
    'help.shortcut.multiSelect': '複数のカードをまとめて選択する',
    'help.shortcut.escape': '編集画面を閉じる',
    'help.shortcut.enter': '線のラベル編集を保存して閉じる',
    'help.shortcut.wheel': 'ボードの拡大・縮小',
    'help.shortcut.click': 'クリック',
    'help.shortcut.wheelKey': 'ホイール',
  },

  en: {
    // App
    'app.title': 'Sousa',
    'app.subtitle': 'Sousa',
    'app.deleteSelected': '🗑️ Delete Selected',
    'app.canvasHint': 'Double-click to edit | Drag from node edge to connect | Shift+click to multi-select',

    // Sidebar
    'sidebar.helpGuide': '❓ User Guide',
    'tab.person': 'Person',
    'tab.evidence': 'Evidence',
    'tab.comment': 'Memo',
    'form.nameTitle': 'Name / Title',
    'form.placeholder.person': 'Full name',
    'form.placeholder.evidence': 'Evidence name',
    'form.placeholder.comment': 'Memo title',
    'form.role': 'Role',
    'form.evidenceType': 'Evidence Type',
    'form.comment': 'Comment',
    'form.commentPlaceholder': 'Enter a memo or comment...',
    'form.photo': 'Photo',
    'form.description': 'Description',
    'form.descriptionPlaceholder': 'Details...',
    'form.addToBoard': '+ Add to Board',
    'action.save': '💾 Save',
    'action.load': '📂 Load',
    'action.clearBoard': '🗑️ Clear Board',

    // Edit Modal
    'edit.person': '👤 Edit Person',
    'edit.evidence': '🔍 Edit Evidence',
    'edit.comment': '📝 Edit Memo',
    'edit.save': 'Save',
    'edit.cancel': 'Cancel',
    'edit.alertName': 'Please enter a name or title.',
    'edit.alertComment': 'Please enter a comment.',

    // Edge Label Modal
    'edge.editTitle': '🔗 Edit Relationship',
    'edge.label': 'Label',
    'edge.placeholder': 'Enter relationship...',
    'edge.presets': 'Presets',
    'edge.save': 'Save',
    'edge.direction': 'Arrow Direction',
    'edge.forward': '→ Forward',
    'edge.reverse': '← Reverse',
    'edge.both': '↔ Both',
    'edge.none': '― None',
    'edge.delete': 'Delete',

    // File IO
    'fileio.loadError': 'Failed to load the file.',
    'fileio.invalidFormat': 'Invalid file format. nodes/edges must be arrays.',
    'fileio.corruptFile': 'The file is corrupted. Please select a valid Sousa board file.',
    'fileio.confirmClear': 'Delete all items on the board?',
    'fileio.saved': 'Saved: {path}',
    'fileio.saveError': 'Failed to save the file.',

    // Image
    'image.loadError': 'Failed to load the image file.',
    'image.compressError': 'Failed to compress the image. Please try another image.',
    'image.select': 'Select image',
    'image.change': 'Change',
    'image.remove': 'Remove',

    // Crop
    'crop.title': 'Crop Image',
    'crop.confirm': 'Confirm',
    'crop.cancel': 'Cancel',
    'crop.processing': 'Processing...',
    'crop.zoom': 'Zoom',
    'crop.dragHint': 'Drag to adjust position',
    'crop.reset': 'Reset',

    // Roles
    'role.suspect': 'Suspect',
    'role.victim': 'Victim',
    'role.person_of_interest': 'Person of Interest',
    'role.witness': 'Witness',

    // Evidence Types
    'evidence.physical': 'Physical',
    'evidence.photo': 'Photo',
    'evidence.video': 'Video',
    'evidence.document': 'Document',
    'evidence.weapon': 'Weapon',
    'evidence.dna': 'DNA',
    'evidence.fingerprint': 'Fingerprint',

    // Relationship Presets
    'rel.accomplice': 'Accomplice',
    'rel.acquaintance': 'Acquaintance',
    'rel.relative': 'Relative',
    'rel.colleague': 'Colleague',
    'rel.partner': 'Partner',
    'rel.superior': 'Superior',
    'rel.subordinate': 'Subordinate',
    'rel.witnessed': 'Witnessed',
    'rel.possessed': 'Possessed',
    'rel.found_at': 'Found at',
    'rel.call_history': 'Call History',
    'rel.alibi': 'Alibi',
    'rel.related': 'Related',
    'rel.contradiction': 'Contradiction',
    'rel.corroboration': 'Corroboration',

    // Help - Page
    'help.title': '❓ User Guide',
    'help.close': 'Close',
    'help.section.overview': 'Overview',
    'help.section.add': 'Adding Cards',
    'help.section.connect': 'Connecting Cards',
    'help.section.edit': 'Editing & Deleting',
    'help.section.canvas': 'Canvas Controls',
    'help.section.save': 'Save & Load',
    'help.section.shortcut': 'Keyboard Shortcuts',

    // Help - Overview
    'help.overview.intro': 'Sousa is a tool for organizing people, evidence, and memos related to an investigation on a single canvas, connecting them with lines to visualize relationships.',
    'help.overview.screenLayout': 'Screen Layout',
    'help.overview.sidebarTitle': 'Left: Sidebar',
    'help.overview.sidebarItem1': 'Add people, evidence, and memos',
    'help.overview.sidebarItem2': 'Save, load, and clear',
    'help.overview.sidebarItem3': 'Help display',
    'help.overview.boardTitle': 'Right: Board (Canvas)',
    'help.overview.boardItem1': 'Place and move cards',
    'help.overview.boardItem2': 'Connect with lines',
    'help.overview.boardItem3': 'Zoom and scroll',
    'help.overview.cardTypes': 'Types of Cards',
    'help.overview.personCard': 'Person Card',
    'help.overview.personCardDesc': 'Suspect, Victim, Person of Interest, Witness',
    'help.overview.evidenceCard': 'Evidence Card',
    'help.overview.evidenceCardDesc': 'Physical, Photo, Video, DNA, etc.',
    'help.overview.commentCard': 'Memo Card',
    'help.overview.commentCardDesc': 'Free-form comments and notes',
    'help.overview.colorCoding': 'Person Card Color Coding',
    'help.overview.suspectRed': 'Suspect = Red',
    'help.overview.victimBlue': 'Victim = Blue',
    'help.overview.poiYellow': 'Person of Interest = Yellow',
    'help.overview.witnessGreen': 'Witness = Green',

    // Help - Add
    'help.add.intro': 'Add new cards to the board from the sidebar on the left.',
    'help.add.addPerson': 'Adding a Person',
    'help.add.step1Title': 'Select the "Person" tab',
    'help.add.step1Desc': 'Click the "👤 Person" tab at the top of the sidebar.',
    'help.add.step2Title': 'Enter information',
    'help.add.step2Name': 'Name - Full name of the person (required)',
    'help.add.step2Role': 'Role - Choose from Suspect, Victim, Person of Interest, or Witness',
    'help.add.step2Photo': 'Photo - Click "Choose File" to select an image (optional)',
    'help.add.step2Desc': 'Description - Additional details such as address or characteristics (optional)',
    'help.add.step3Title': 'Click "Add to Board"',
    'help.add.step3Desc': 'Click the blue "+ Add to Board" button to place the card on the board.',
    'help.add.compressionTitle': 'About Auto Image Compression',
    'help.add.compressionDesc': 'Added photos are automatically resized to a maximum of 800x800 pixels and compressed to reduce file size (approximately 50-100KB per image). This ensures the board remains responsive even with many photos, and keeps save file sizes small. Image quality remains sufficient for card display with no visible impact.',
    'help.add.addEvidence': 'Adding Evidence',
    'help.add.addEvidenceDesc': 'Switch to the "🔍 Evidence" tab, select the evidence name and type (Physical, Photo, Video, Document, Weapon, DNA, Fingerprint), and add it. You can also set a photo and description.',
    'help.add.addComment': 'Adding a Memo',
    'help.add.addCommentDesc': 'Switch to the "📝 Memo" tab, enter a title and comment text, and add it. Use it to freely write investigation hypotheses and observations.',

    // Help - Connect
    'help.connect.intro': 'Connect cards with lines (arrows) to visually represent relationships between people and evidence.',
    'help.connect.step1Title': 'Find the handle dots',
    'help.connect.step1Desc': 'Small circular handles are displayed on the top, bottom, left, and right of each card. You can create or receive connections from any handle.',
    'help.connect.step2Title': 'Drag from a handle',
    'help.connect.step2Desc': 'Hover over a handle on the source card, hold down the left mouse button, and drag to a handle on the target card.',
    'help.connect.step3Title': 'An arrow is drawn',
    'help.connect.step3Desc': 'When you release the mouse button, an arrow line is drawn in the direction you dragged. The arrow direction shows the relationship flow.',
    'help.connect.diagramPerson1': '👤 John Doe',
    'help.connect.diagramLabel': 'Accomplice',
    'help.connect.diagramPerson2': '👤 Jane Smith',
    'help.connect.labelTitle': 'Adding Labels to Lines',
    'help.connect.labelStep1Title': 'Double-click a line',
    'help.connect.labelStep1Desc': 'Double-click an arrow line on the board to open the label editor.',
    'help.connect.labelStep2Title': 'Enter or select a relationship',
    'help.connect.labelStep2Desc': 'Type your own text or choose from preset options (e.g., "Accomplice", "Acquaintance", "Witnessed") and click "Save".',
    'help.connect.directionTitle': 'Change arrow direction',
    'help.connect.directionDesc': 'In the same editor, you can change the arrow direction. Choose from "→ Forward", "← Reverse", "↔ Both", or "― None". Selecting "None" draws a plain line without arrows.',
    'help.connect.reconnectTitle': 'Reconnecting a Line',
    'help.connect.reconnectStep1Title': 'Grab the end of a line',
    'help.connect.reconnectStep1Desc': 'Hover over the end of the line you want to change (the arrowhead or the base) and press the left mouse button.',
    'help.connect.reconnectStep2Title': 'Drag to another card',
    'help.connect.reconnectStep2Desc': 'Drag to a handle on a different card and release the mouse button to change the connection. The label and arrow settings are preserved.',
    'help.connect.presetsLabel': 'Available relationship presets:',

    // Help - Edit
    'help.edit.changeTitle': 'Editing Card Content',
    'help.edit.step1Title': 'Double-click a card',
    'help.edit.step1Desc': 'Quickly double-click the card you want to edit to open the editing dialog.',
    'help.edit.step2Title': 'Edit and click "Save"',
    'help.edit.step2Desc': 'Modify the name, role, photo, description, etc., and click the "Save" button.',
    'help.edit.moveTitle': 'Moving Cards',
    'help.edit.moveDesc': 'Click and hold a card with the left mouse button and drag it to move it to any position.',
    'help.edit.deleteTitle': 'Deleting Cards and Lines',
    'help.edit.deleteSingleLabel': 'Single delete:',
    'help.edit.deleteSingleDesc': 'Click to select a card or line, then press the Delete key on your keyboard',
    'help.edit.deleteMultiLabel': 'Bulk delete:',
    'help.edit.deleteMultiDesc': 'Hold Shift and click multiple cards to select them, then use the "Delete Selected" button at the top-right or press Delete',
    'help.edit.deleteLineLabel': 'Delete line only:',
    'help.edit.deleteLineDesc': 'Double-click a line → click the "Delete" button in the label editor',

    // Help - Canvas
    'help.canvas.zoom': 'Zoom in/out',
    'help.canvas.zoomHow': 'Scroll the mouse wheel forward and backward',
    'help.canvas.scroll': 'Pan the canvas',
    'help.canvas.scrollHow': 'Click and drag on an empty area of the board',
    'help.canvas.fitView': 'Fit to view',
    'help.canvas.fitViewHow': 'Click the "Fit view" button in the bottom-left controls',
    'help.canvas.zoomIn': 'Zoom in',
    'help.canvas.zoomInHow': 'Click the "+" button at the bottom-left',
    'help.canvas.zoomOut': 'Zoom out',
    'help.canvas.zoomOutHow': 'Click the "−" button at the bottom-left',
    'help.canvas.minimapTitle': 'Minimap',
    'help.canvas.minimapDesc': 'A small overview map is displayed in the bottom-right corner. It shows the positions of all cards on the board at a glance. Colors distinguish the types.',
    'help.canvas.minimapPerson': 'Person',
    'help.canvas.minimapEvidence': 'Evidence',
    'help.canvas.minimapComment': 'Memo',

    // Help - Save
    'help.save.saveTitle': 'Saving the Board',
    'help.save.saveStep1Title': 'Click the "Save" button',
    'help.save.saveStep1Desc': 'Click the "💾 Save" button at the bottom of the sidebar.',
    'help.save.saveStep2Title': 'A file is downloaded',
    'help.save.saveStep2Desc': 'The file is saved with a name like sousa-2026-01-02.json. Keep this file in an easy-to-find location.',
    'help.save.sizeTitle': 'About Save File Size',
    'help.save.sizeDesc': 'Photos are automatically compressed (max 800x800px, JPEG quality 80%) when added to the board, so save file sizes are kept small. Even with about 100 photos, the file size stays under approximately 10MB.',
    'help.save.loadTitle': 'Opening a Saved Board',
    'help.save.loadStep1Title': 'Click the "Load" button',
    'help.save.loadStep1Desc': 'Click the "📂 Load" button at the bottom of the sidebar.',
    'help.save.loadStep2Title': 'Select a file',
    'help.save.loadStep2Desc': 'A file selection dialog opens. Choose a previously saved .json file. The board content will be restored.',
    'help.save.clearTitle': 'Clearing the Board',
    'help.save.clearDesc': 'Click "🗑️ Clear Board" at the bottom of the sidebar. A confirmation message will appear. Click "OK" to delete all cards and lines from the board.',
    'help.save.clearWarningTitle': 'Warning',
    'help.save.clearWarningDesc': 'The clear operation cannot be undone. Please save important data beforehand.',

    // Help - Shortcuts
    'help.shortcut.intro': 'The board can be operated with just a mouse, but keyboard shortcuts make it faster.',
    'help.shortcut.delete': 'Delete selected cards/lines',
    'help.shortcut.multiSelect': 'Select multiple cards at once',
    'help.shortcut.escape': 'Close the editing dialog',
    'help.shortcut.enter': 'Save and close the line label editor',
    'help.shortcut.wheel': 'Zoom in/out on the board',
    'help.shortcut.click': 'Click',
    'help.shortcut.wheelKey': 'Wheel',
  },
};
