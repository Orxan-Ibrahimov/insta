import { ChatGroup } from './chat_group';
import { Emotion } from './emotion';
import { User } from './user';

export interface ChatMessage {
  id: string;
  message: string;
  sender: User;
  chat_group: ChatGroup;
  created_date: Date;
  emotion:string;
}
