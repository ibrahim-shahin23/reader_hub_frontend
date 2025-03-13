import { faker } from '@faker-js/faker';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
  }
  return users;
};