// Member: メンバー情報
export interface Member {
  name: string;
  xId?: string; // X (Twitter) ID (オプション)
}

// Chair: 椅子
export interface Chair {
  id: string; // ユニークID
  member: Member | null; // 座っているメンバー（nullは空席）
}

// Table: テーブル
export interface Table {
  id: string; // ユニークID
  chairs: Chair[]; // 椅子の配列（最大8個）
  position?: {
    // テーブルの位置（将来の拡張用）
    x: number;
    y: number;
  };
}

// Venue: 会場
export interface Venue {
  tables: Table[]; // テーブルの配列（最大6個）
}

// AppState: アプリケーション全体の状態
export interface AppState {
  venue: Venue;
  selectedChair: string | null; // 選択中の椅子ID（編集用）
}
