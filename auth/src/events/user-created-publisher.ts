import { Publisher, Subjects, UserCreatedEvent } from '@cmdevconnect/common';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
}
