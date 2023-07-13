export type ChatAction = 
  { type: 'CLEAR_MESSAGES' } | 
  { type: 'ADD_MESSAGE'; payload: string };

export interface Setting {
  name: string;
  value: string;
}