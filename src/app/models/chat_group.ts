import { ChatMessage } from './chat_message';
import { User } from './user';

export interface ChatGroup {
  id: string;
  users: User[];
  chat_messages: ChatMessage[];
  created_date: Date;
}
