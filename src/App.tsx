import { useState } from 'react';
import { Venue as VenueType, Member } from './types';
import { createEmptyVenue, createNewTable, createNewChair } from './utils/helpers';
import { Header } from './components/Header';
import { Venue } from './components/Venue';
import { MemberForm } from './components/MemberForm';

const MAX_TABLES = 6;

function App() {
  const [venue, setVenue] = useState<VenueType>(createEmptyVenue());
  const [selectedChair, setSelectedChair] = useState<{
    tableId: string;
    chairId: string;
  } | null>(null);

  // テーブルを追加
  const handleAddTable = () => {
    if (venue.tables.length < MAX_TABLES) {
      setVenue({
        ...venue,
        tables: [...venue.tables, createNewTable()],
      });
    }
  };

  // テーブルを削除
  const handleDeleteTable = (tableId: string) => {
    setVenue({
      ...venue,
      tables: venue.tables.filter((table) => table.id !== tableId),
    });
  };

  // 椅子を追加
  const handleAddChair = (tableId: string) => {
    setVenue({
      ...venue,
      tables: venue.tables.map((table) => {
        if (table.id === tableId && table.chairs.length < 8) {
          return {
            ...table,
            chairs: [...table.chairs, createNewChair()],
          };
        }
        return table;
      }),
    });
  };

  // 椅子を削除
  const handleDeleteChair = (tableId: string, chairId: string) => {
    setVenue({
      ...venue,
      tables: venue.tables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            chairs: table.chairs.filter((chair) => chair.id !== chairId),
          };
        }
        return table;
      }),
    });
  };

  // 椅子を選択（編集モード）
  const handleSelectChair = (chairId: string) => {
    // chairIdからtableIdを見つける
    for (const table of venue.tables) {
      const chair = table.chairs.find((c) => c.id === chairId);
      if (chair) {
        setSelectedChair({ tableId: table.id, chairId });
        break;
      }
    }
  };

  // メンバー情報を保存
  const handleSaveMember = (member: Member) => {
    if (!selectedChair) return;

    setVenue({
      ...venue,
      tables: venue.tables.map((table) => {
        if (table.id === selectedChair.tableId) {
          return {
            ...table,
            chairs: table.chairs.map((chair) => {
              if (chair.id === selectedChair.chairId) {
                return { ...chair, member };
              }
              return chair;
            }),
          };
        }
        return table;
      }),
    });

    setSelectedChair(null);
  };

  // 編集をキャンセル
  const handleCancelEdit = () => {
    setSelectedChair(null);
  };

  // メンバー情報をクリア
  const handleClearMember = () => {
    if (!selectedChair) return;

    setVenue({
      ...venue,
      tables: venue.tables.map((table) => {
        if (table.id === selectedChair.tableId) {
          return {
            ...table,
            chairs: table.chairs.map((chair) => {
              if (chair.id === selectedChair.chairId) {
                return { ...chair, member: null };
              }
              return chair;
            }),
          };
        }
        return table;
      }),
    });

    setSelectedChair(null);
  };

  // 選択中の椅子のメンバー情報を取得
  const getSelectedMember = (): Member | null => {
    if (!selectedChair) return null;

    for (const table of venue.tables) {
      if (table.id === selectedChair.tableId) {
        const chair = table.chairs.find((c) => c.id === selectedChair.chairId);
        return chair?.member || null;
      }
    }

    return null;
  };

  return (
    <div className="app">
      <Header
        onAddTable={handleAddTable}
        canAddTable={venue.tables.length < MAX_TABLES}
      />
      <Venue
        venue={venue}
        onDeleteTable={handleDeleteTable}
        onAddChair={handleAddChair}
        onDeleteChair={handleDeleteChair}
        onSelectChair={handleSelectChair}
      />
      {selectedChair && (
        <MemberForm
          member={getSelectedMember()}
          onSave={handleSaveMember}
          onCancel={handleCancelEdit}
          onClear={handleClearMember}
        />
      )}
    </div>
  );
}

export default App;
