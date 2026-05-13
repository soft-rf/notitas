export interface Block {
  id: string;
  title: string;
  content: string;
}

export interface Tab {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Workspace {
  tabs: Tab[];
}
