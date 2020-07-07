import { Listener, UserCreatedEvent, Subjects } from '@cmdevconnect/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { User } from '../../models/user';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, email, name, username, createdAt } = data;
    const user = User.build({ id, email, name, username, createdAt });
    await user.save();
    msg.ack();
  }
}
