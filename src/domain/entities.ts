export interface Snippet {
  id: string;
  content: string;
}

export interface Block {
  id: string;
  title: string;
  snippets: Snippet[];
}

export interface Tab {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Workspace {
  tabs: Tab[];
}
