import { App } from '../../app';
import { MessageInterface } from './message.interface';

export const MESSAGES = App.createCollection<MessageInterface>();
