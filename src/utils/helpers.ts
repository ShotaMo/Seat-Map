import { Venue, Table, Chair } from '../types';

/**
 * ユニークIDを生成
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 空の会場を作成
 */
export function createEmptyVenue(): Venue {
  return { tables: [] };
}

/**
 * 新しいテーブルを作成
 */
export function createNewTable(): Table {
  return {
    id: generateId(),
    chairs: [],
  };
}

/**
 * 新しい椅子を作成
 */
export function createNewChair(): Chair {
  return {
    id: generateId(),
    member: null,
  };
}
