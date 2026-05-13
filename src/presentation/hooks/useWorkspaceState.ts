import { useState, useEffect, useCallback } from 'react';
import type { Workspace, Block } from '../../domain/entities';
import { LocalStorageService } from '../../infrastructure/localStorageService';
import * as UseCases from '../../use-cases/workspaceUseCases';

export const useWorkspaceState = () => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  // Initialize workspace
  useEffect(() => {
    let initialWorkspace = LocalStorageService.loadWorkspace();
    if (!initialWorkspace || initialWorkspace.tabs.length === 0) {
      initialWorkspace = UseCases.createDefaultWorkspace();
      LocalStorageService.saveWorkspace(initialWorkspace);
    }
    setWorkspace(initialWorkspace);
    if (initialWorkspace.tabs.length > 0) {
      setActiveTabId(initialWorkspace.tabs[0].id);
    }
  }, []);

  // Save on every change
  useEffect(() => {
    if (workspace) {
      LocalStorageService.saveWorkspace(workspace);
    }
  }, [workspace]);

  const addTab = useCallback((title: string) => {
    setWorkspace(prev => {
      if (!prev) return prev;
      const next = UseCases.addTabToWorkspace(prev, title);
      setActiveTabId(next.tabs[next.tabs.length - 1].id);
      return next;
    });
  }, []);

  const updateTabTitle = useCallback((tabId: string, title: string) => {
    setWorkspace(prev => prev ? UseCases.updateTabTitle(prev, tabId, title) : prev);
  }, []);

  const deleteTab = useCallback((tabId: string) => {
    setWorkspace(prev => {
      if (!prev) return prev;
      const next = UseCases.deleteTab(prev, tabId);
      if (activeTabId === tabId) {
        setActiveTabId(next.tabs.length > 0 ? next.tabs[0].id : null);
      }
      return next;
    });
  }, [activeTabId]);

  const addBlock = useCallback((tabId: string, block: Omit<Block, 'id'>) => {
    setWorkspace(prev => prev ? UseCases.addBlockToTab(prev, tabId, block) : prev);
  }, []);

  const updateBlock = useCallback((tabId: string, blockId: string, fields: Partial<Omit<Block, 'id'>>) => {
    setWorkspace(prev => prev ? UseCases.updateBlock(prev, tabId, blockId, fields) : prev);
  }, []);

  const deleteBlock = useCallback((tabId: string, blockId: string) => {
    setWorkspace(prev => prev ? UseCases.deleteBlock(prev, tabId, blockId) : prev);
  }, []);

  const reorderBlocks = useCallback((tabId: string, oldIndex: number, newIndex: number) => {
    setWorkspace(prev => prev ? UseCases.reorderBlocks(prev, tabId, oldIndex, newIndex) : prev);
  }, []);

  return {
    workspace,
    activeTabId,
    setActiveTabId,
    addTab,
    updateTabTitle,
    deleteTab,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks
  };
};
