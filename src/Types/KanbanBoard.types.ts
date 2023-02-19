export type Item = {
  id: string;
  priority: number;
  title: string;
  chat: number;
  attachment: number;
  assignees: {
    avatar: string;
  }[];
};

export type Board = {
  name: string;
  items: Item[];
};
