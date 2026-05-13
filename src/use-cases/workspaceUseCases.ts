import type { Workspace, Block } from '../domain/entities';

export const createDefaultWorkspace = (): Workspace => ({
  tabs: [
    {
      id: crypto.randomUUID(),
      title: 'Bienvenida',
      blocks: [
        {
          id: crypto.randomUUID(),
          title: '¡Bienvenido a Notitas!',
          content: 'Aquí puedes guardar todos tus **snippets**. Usa el botón de copiar para llevar este texto al portapapeles.\n\nTambién puedes colapsar esta tarjeta o arrastrarla.'
        }
      ]
    }
  ]
});

export const addTabToWorkspace = (workspace: Workspace, title: string): Workspace => {
  return {
    ...workspace,
    tabs: [...workspace.tabs, { id: crypto.randomUUID(), title, blocks: [] }]
  };
};

export const updateTabTitle = (workspace: Workspace, tabId: string, newTitle: string): Workspace => {
  return {
    ...workspace,
    tabs: workspace.tabs.map(tab => tab.id === tabId ? { ...tab, title: newTitle } : tab)
  };
};

export const deleteTab = (workspace: Workspace, tabId: string): Workspace => {
  return {
    ...workspace,
    tabs: workspace.tabs.filter(tab => tab.id !== tabId)
  };
};

export const addBlockToTab = (workspace: Workspace, tabId: string, block: Omit<Block, 'id'>): Workspace => {
  return {
    ...workspace,
    tabs: workspace.tabs.map(tab => 
      tab.id === tabId 
        ? { ...tab, blocks: [...tab.blocks, { ...block, id: crypto.randomUUID() }] } 
        : tab
    )
  };
};

export const updateBlock = (workspace: Workspace, tabId: string, blockId: string, updatedFields: Partial<Omit<Block, 'id'>>): Workspace => {
  return {
    ...workspace,
    tabs: workspace.tabs.map(tab => 
      tab.id === tabId 
        ? { 
            ...tab, 
            blocks: tab.blocks.map(block => block.id === blockId ? { ...block, ...updatedFields } : block) 
          } 
        : tab
    )
  };
};

export const deleteBlock = (workspace: Workspace, tabId: string, blockId: string): Workspace => {
  return {
    ...workspace,
    tabs: workspace.tabs.map(tab => 
      tab.id === tabId 
        ? { ...tab, blocks: tab.blocks.filter(block => block.id !== blockId) } 
        : tab
    )
  };
};

export const reorderBlocks = (workspace: Workspace, tabId: string, oldIndex: number, newIndex: number): Workspace => {
  return {
    ...workspace,
    tabs: workspace.tabs.map(tab => {
      if (tab.id !== tabId) return tab;
      const newBlocks = Array.from(tab.blocks);
      const [movedBlock] = newBlocks.splice(oldIndex, 1);
      newBlocks.splice(newIndex, 0, movedBlock);
      return { ...tab, blocks: newBlocks };
    })
  };
};
