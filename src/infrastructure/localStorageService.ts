import type { Workspace } from '../domain/entities';

const STORAGE_KEY = 'notitas_workspace';

export const LocalStorageService = {
  loadWorkspace: (): Workspace | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
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
