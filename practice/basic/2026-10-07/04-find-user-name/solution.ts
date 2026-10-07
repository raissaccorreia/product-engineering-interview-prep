export type User = {
  id: string;
  name: string;
};

export function findUserName(users: readonly User[], targetId: string): string | undefined {
  const index = users.findIndex((user) => user.id === targetId);

  if (index === -1) {
    return undefined;
  }

  // The guard handles the runtime case; `!` only informs TypeScript that the index is valid.
  return users[index]!.name;
}
