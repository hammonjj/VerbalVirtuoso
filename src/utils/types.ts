export type SubmissionType = "BOT" | "USER";

export type ChatAction = 
  { type: 'CLEAR_MESSAGES' } | 
  { type: 'ADD_MESSAGE'; payload: { message: string, submission: SubmissionType }};

export type SettingsAccordionAction = 
  { type: 'GENERAL'} |
  { type: 'PREFERENCES'} |
  { type: 'ACCOUNT'} | 
  { type: 'NONE'}; 

export interface Setting {
  name: string;
  value: string;
}

export type ChatGPTModel = 
  "" |
  "gpt-4" | 
  "gpt-4-32k" | 
  "gpt-3.5-turbo" | 
  "gpt-3.5-turbo-16k";

export const ChatGPTModelValues = [
  "gpt-4",
  "gpt-4-32k",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
] as const;

export interface ChatGPTPrompt {
  model?: ChatGPTModel;
  preprompt?: string;
  prompt: string;
  temperature?: number;
}

export interface ChatMessage {
  message: string;
  submission: SubmissionType;
}