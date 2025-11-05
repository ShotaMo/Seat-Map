interface HeaderProps {
  onAddTable: () => void;
  canAddTable: boolean;
}

export function Header({ onAddTable, canAddTable }: HeaderProps) {
  return (
    <header className="header">
      <h1>座席表作成アプリ</h1>
      <button
        onClick={onAddTable}
        disabled={!canAddTable}
        className="btn-primary"
        title={!canAddTable ? 'テーブルは最大6個までです' : 'テーブルを追加'}
      >
        テーブルを追加
      </button>
    </header>
  );
}
