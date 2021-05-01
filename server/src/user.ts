interface UserInterface {
  id: string;
  name: string;
  room: string;
}

const users: UserInterface[] = [];

export const addUser = ({
  id,
  name,
  room,
}: UserInterface): { user?: UserInterface; error?: string } => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

export const removeUser = (id: string): UserInterface | undefined => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUser = (id: string): UserInterface | undefined =>
  users.find((user) => user.id === id);

export const getUsersInRoom = (room: string): UserInterface[] =>
  users.filter((user) => user.room === room);
