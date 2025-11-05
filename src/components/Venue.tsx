import { Venue as VenueType } from '../types';
import { Table } from './Table';

interface VenueProps {
  venue: VenueType;
  onDeleteTable: (tableId: string) => void;
  onAddChair: (tableId: string) => void;
  onDeleteChair: (tableId: string, chairId: string) => void;
  onSelectChair: (chairId: string) => void;
}

export function Venue({
  venue,
  onDeleteTable,
  onAddChair,
  onDeleteChair,
  onSelectChair,
}: VenueProps) {
  return (
    <div className="venue">
      {venue.tables.length === 0 ? (
        <div className="empty-venue">
          <p>テーブルを追加して座席表を作成しましょう</p>
        </div>
      ) : (
        <div className="tables-grid">
          {venue.tables.map((table) => (
            <Table
              key={table.id}
              table={table}
              onDelete={() => onDeleteTable(table.id)}
              onAddChair={() => onAddChair(table.id)}
              onDeleteChair={(chairId) => onDeleteChair(table.id, chairId)}
              onSelectChair={onSelectChair}
            />
          ))}
        </div>
      )}
    </div>
  );
}
