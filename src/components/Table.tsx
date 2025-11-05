import { Table as TableType } from '../types';
import { Chair } from './Chair';

interface TableProps {
  table: TableType;
  onDelete: () => void;
  onAddChair: () => void;
  onDeleteChair: (chairId: string) => void;
  onSelectChair: (chairId: string) => void;
}

export function Table({
  table,
  onDelete,
  onAddChair,
  onDeleteChair,
  onSelectChair,
}: TableProps) {
  const canAddChair = table.chairs.length < 8;

  return (
    <div className="table">
      <div className="table-header">
        <h3>テーブル</h3>
        <button className="btn-delete" onClick={onDelete} title="テーブルを削除">
          削除
        </button>
      </div>
      <div className="table-controls">
        <button
          onClick={onAddChair}
          disabled={!canAddChair}
          className="btn-secondary"
          title={!canAddChair ? '椅子は最大8個までです' : '椅子を追加'}
        >
          椅子を追加
        </button>
        <span className="chair-count">
          {table.chairs.length} / 8 席
        </span>
      </div>
      <div className="chairs-grid">
        {table.chairs.map((chair) => (
          <Chair
            key={chair.id}
            chair={chair}
            onSelect={() => onSelectChair(chair.id)}
            onDelete={() => onDeleteChair(chair.id)}
          />
        ))}
      </div>
    </div>
  );
}
