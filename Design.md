# 座席表作成アプリケーション - 設計書

## 1. 技術スタック

### 1.1 フロントエンド
- **フレームワーク**: React 18+ with TypeScript
- **ビルドツール**: Vite
- **スタイリング**: CSS Modules または Tailwind CSS
- **状態管理**: React Hooks (useState, useReducer)

### 1.2 開発ツール
- **パッケージマネージャー**: npm
- **リンター**: ESLint
- **フォーマッター**: Prettier
- **型チェック**: TypeScript

## 2. アーキテクチャ

### 2.1 アプリケーション構造
```
src/
├── components/           # Reactコンポーネント
│   ├── Venue.tsx        # 会場コンポーネント
│   ├── Table.tsx        # テーブルコンポーネント
│   ├── Chair.tsx        # 椅子コンポーネント
│   ├── MemberForm.tsx   # メンバー情報入力フォーム
│   └── Header.tsx       # ヘッダーコンポーネント
├── types/               # TypeScript型定義
│   └── index.ts         # 共通型定義
├── App.tsx              # ルートコンポーネント
├── main.tsx             # エントリーポイント
└── index.css            # グローバルスタイル
```

## 3. データモデル

### 3.1 型定義

```typescript
// Member: メンバー情報
interface Member {
  name: string;
  xId?: string;  // X (Twitter) ID (オプション)
}

// Chair: 椅子
interface Chair {
  id: string;           // ユニークID
  member: Member | null;  // 座っているメンバー（nullは空席）
}

// Table: テーブル
interface Table {
  id: string;           // ユニークID
  chairs: Chair[];      // 椅子の配列（最大8個）
  position?: {          // テーブルの位置（将来の拡張用）
    x: number;
    y: number;
  };
}

// Venue: 会場
interface Venue {
  tables: Table[];      // テーブルの配列（最大6個）
}

// AppState: アプリケーション全体の状態
interface AppState {
  venue: Venue;
  selectedChair: string | null;  // 選択中の椅子ID（編集用）
}
```

## 4. コンポーネント設計

### 4.1 App
- **責務**: アプリケーション全体の状態管理とルートレイアウト
- **状態**:
  - `venue: Venue` - 会場データ
  - `selectedChair: string | null` - 選択中の椅子ID
- **主要機能**:
  - テーブルの追加・削除
  - 椅子の追加・削除
  - メンバー情報の更新

### 4.2 Header
- **責務**: アプリケーションのタイトル表示
- **Props**: なし

### 4.3 Venue
- **責務**: 会場全体の表示とテーブル管理UI
- **Props**:
  - `venue: Venue` - 会場データ
  - `onAddTable: () => void` - テーブル追加ハンドラー
  - `onDeleteTable: (tableId: string) => void` - テーブル削除ハンドラー
  - `onAddChair: (tableId: string) => void` - 椅子追加ハンドラー
  - `onDeleteChair: (tableId: string, chairId: string) => void` - 椅子削除ハンドラー
  - `onSelectChair: (chairId: string) => void` - 椅子選択ハンドラー

### 4.4 Table
- **責務**: 個別のテーブルと所属する椅子の表示
- **Props**:
  - `table: Table` - テーブルデータ
  - `onDelete: () => void` - 削除ハンドラー
  - `onAddChair: () => void` - 椅子追加ハンドラー
  - `onDeleteChair: (chairId: string) => void` - 椅子削除ハンドラー
  - `onSelectChair: (chairId: string) => void` - 椅子選択ハンドラー

### 4.5 Chair
- **責務**: 個別の椅子とメンバー情報の表示
- **Props**:
  - `chair: Chair` - 椅子データ
  - `onSelect: () => void` - 選択ハンドラー
  - `onDelete: () => void` - 削除ハンドラー

### 4.6 MemberForm
- **責務**: メンバー情報の入力・編集フォーム
- **Props**:
  - `member: Member | null` - 編集対象のメンバー情報
  - `onSave: (member: Member) => void` - 保存ハンドラー
  - `onCancel: () => void` - キャンセルハンドラー
  - `onClear: () => void` - クリアハンドラー

## 5. 状態管理

### 5.1 状態フロー
```
App (Root State)
  ↓
  ├─ venue: Venue
  │   └─ tables: Table[]
  │       └─ chairs: Chair[]
  │           └─ member: Member | null
  └─ selectedChair: string | null
```

### 5.2 主要なアクション
1. **ADD_TABLE**: 新しいテーブルを追加
2. **DELETE_TABLE**: テーブルを削除
3. **ADD_CHAIR**: テーブルに椅子を追加
4. **DELETE_CHAIR**: 椅子を削除
5. **UPDATE_MEMBER**: 椅子のメンバー情報を更新
6. **SELECT_CHAIR**: 椅子を選択（編集モード）
7. **DESELECT_CHAIR**: 椅子の選択を解除

## 6. UI/UXデザイン

### 6.1 レイアウト
- **ヘッダー**: タイトルとテーブル追加ボタン
- **メインエリア**: テーブルと椅子を表示する会場
- **モーダル/サイドバー**: メンバー情報入力フォーム

### 6.2 視覚的デザイン
- **テーブル**:
  - 長方形または円形のカード
  - 削除ボタンと椅子追加ボタンを配置
  - ボーダーで明確に区別
- **椅子**:
  - 円形または正方形のアイコン
  - メンバーがいる場合は名前を表示
  - 空席の場合は「+」または空アイコン
  - ホバー時にハイライト
  - 削除ボタン（×）を表示
- **カラースキーム**:
  - プライマリ: #3B82F6 (青)
  - セカンダリ: #10B981 (緑)
  - 背景: #F3F4F6 (グレー)
  - テキスト: #1F2937 (ダークグレー)

### 6.3 インタラクション
- テーブル追加: ヘッダーのボタンをクリック → 会場に新規テーブル追加
- テーブル削除: テーブルの削除ボタンをクリック → 確認なしで削除
- 椅子追加: テーブルの椅子追加ボタンをクリック → テーブルに新規椅子追加
- 椅子削除: 椅子の削除ボタンをクリック → 確認なしで削除
- メンバー編集: 椅子をクリック → モーダルでメンバー情報入力

## 7. バリデーション

### 7.1 入力バリデーション
- **テーブル数**: 最大6個まで（追加ボタンを無効化）
- **椅子数**: テーブルごとに最大8個まで（追加ボタンを無効化）
- **メンバー名**: 必須入力（空の場合は保存不可）
- **X ID**: オプション（空でも保存可能）

### 7.2 エラーハンドリング
- バリデーションエラー時にフォーム内にエラーメッセージを表示
- 上限に達した場合はボタンを無効化し、ツールチップで理由を表示

## 8. ユーティリティ関数

### 8.1 ID生成
```typescript
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

### 8.2 初期データ生成
```typescript
function createEmptyVenue(): Venue {
  return { tables: [] };
}

function createNewTable(): Table {
  return {
    id: generateId(),
    chairs: []
  };
}

function createNewChair(): Chair {
  return {
    id: generateId(),
    member: null
  };
}
```

## 9. テスト戦略

### 9.1 ユニットテスト
- コンポーネントの個別動作確認
- ユーティリティ関数のテスト
- バリデーションロジックのテスト

### 9.2 結合テスト
- コンポーネント間の連携確認
- 状態管理の動作確認

### 9.3 E2Eテスト（将来の拡張）
- ユーザーシナリオの自動テスト

## 10. パフォーマンス最適化

### 10.1 最適化ポイント
- `React.memo`を使用して不要な再レンダリングを防止
- 大量の椅子がある場合の仮想化は不要（最大48個: 6テーブル × 8椅子）
- イベントハンドラーの`useCallback`によるメモ化

### 10.2 初期表示
- 初期状態は空の会場（テーブル0個）
- 最小限のコードで高速起動

## 11. アクセシビリティ

### 11.1 基本要件
- セマンティックHTMLの使用
- キーボード操作のサポート（Tab、Enter、Escape）
- ARIA属性の適切な使用
- 十分なコントラスト比

### 11.2 具体的な実装
- ボタンには適切なaria-labelを設定
- フォームには適切なlabelを設定
- モーダルはフォーカストラップを実装
