export type UserList = {
  name: string;
};

export interface User {
  lists: Record<string, UserList>;
}
