import type { Workspace } from '../domain/entities';

const STORAGE_KEY = 'notitas_workspace';

export const LocalStorageService = {
  loadWorkspace: (): Workspace | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;

      const parsed = JSON.parse(data);
      
      // Auto-migrate old data structure
      if (parsed && Array.isArray(parsed.tabs)) {
        parsed.tabs.forEach((tab: any) => {
          if (Array.isArray(tab.blocks)) {
            tab.blocks.forEach((block: any) => {
              if (block.content !== undefined) {
                block.snippets = [{
                  id: crypto.randomUUID(),
                  content: block.content
                }];
                delete block.content;
              }
              if (!block.snippets) {
                block.snippets = [];
              }
            });
          }
        });
      }
      
      return parsed as Workspace;
    } catch (error) {
      console.error('Error loading workspace from local storage:', error);
      return null;
    }
  },

  saveWorkspace: (workspace: Workspace): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
    } catch (error) {
      console.error('Error saving workspace to local storage:', error);
    }
  }
};
