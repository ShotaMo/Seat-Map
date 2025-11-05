import { Chair as ChairType } from '../types';

interface ChairProps {
  chair: ChairType;
  onSelect: () => void;
  onDelete: () => void;
}

export function Chair({ chair, onSelect, onDelete }: ChairProps) {
  const isEmpty = !chair.member;

  return (
    <div className={`chair ${isEmpty ? 'empty' : 'occupied'}`}>
      <button className="chair-content" onClick={onSelect}>
        {isEmpty ? (
          <span className="empty-seat">+</span>
        ) : (
          <div className="member-info">
            <div className="member-name">{chair.member.name}</div>
            {chair.member.xId && (
              <div className="member-xid">@{chair.member.xId}</div>
            )}
          </div>
        )}
      </button>
      <button className="btn-delete-chair" onClick={onDelete} title="椅子を削除">
        ×
      </button>
    </div>
  );
}
