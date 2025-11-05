import { useState, useEffect } from 'react';
import { Member } from '../types';

interface MemberFormProps {
  member: Member | null;
  onSave: (member: Member) => void;
  onCancel: () => void;
  onClear: () => void;
}

export function MemberForm({ member, onSave, onCancel, onClear }: MemberFormProps) {
  const [name, setName] = useState('');
  const [xId, setXId] = useState('');

  useEffect(() => {
    if (member) {
      setName(member.name);
      setXId(member.xId || '');
    } else {
      setName('');
      setXId('');
    }
  }, [member]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({
        name: name.trim(),
        xId: xId.trim() || undefined,
      });
    }
  };

  const handleClear = () => {
    setName('');
    setXId('');
    onClear();
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>メンバー情報</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              名前 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田太郎"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="xId">X ID</label>
            <input
              type="text"
              id="xId"
              value={xId}
              onChange={(e) => setXId(e.target.value)}
              placeholder="yamada_taro"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={!name.trim()}>
              保存
            </button>
            <button type="button" className="btn-secondary" onClick={onCancel}>
              キャンセル
            </button>
            {member && (
              <button type="button" className="btn-danger" onClick={handleClear}>
                クリア
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
