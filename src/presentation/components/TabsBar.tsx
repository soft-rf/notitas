import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Edit2 } from 'lucide-react';
import type { Tab } from '../../domain/entities';
import clsx from 'clsx';

interface TabsBarProps {
  tabs: Tab[];
  activeTabId: string | null;
  onSelectTab: (id: string) => void;
  onAddTab: (title: string) => void;
  onDeleteTab: (id: string) => void;
  onRenameTab: (id: string, newTitle: string) => void;
}

export const TabsBar: React.FC<TabsBarProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onAddTab,
  onDeleteTab,
  onRenameTab
}) => {
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTabId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingTabId]);

  const handleEditStart = (tab: Tab, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTabId(tab.id);
    setEditValue(tab.title);
  };

  const handleEditSave = () => {
    if (editingTabId && editValue.trim()) {
      onRenameTab(editingTabId, editValue.trim());
    }
    setEditingTabId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') setEditingTabId(null);
  };

  return (
    <div className="flex items-center bg-dark-900 border-b border-dark-600 overflow-x-auto whitespace-nowrap hide-scrollbar px-2 pt-2">
      {tabs.map(tab => {
        const isActive = tab.id === activeTabId;
        const isEditing = tab.id === editingTabId;

        return (
          <div
            key={tab.id}
            onClick={() => !isEditing && onSelectTab(tab.id)}
            className={clsx(
              "group relative flex items-center gap-2 px-4 py-2 mx-1 rounded-t-lg border-b-2 cursor-pointer transition-colors min-w-fit",
              isActive 
                ? "bg-dark-800 border-primary-500 text-white" 
                : "bg-transparent border-transparent text-gray-400 hover:bg-dark-800 hover:text-gray-200"
            )}
          >
            {isEditing ? (
              <div className="flex items-center gap-1">
                <input
                  ref={inputRef}
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onBlur={handleEditSave}
                  onKeyDown={handleKeyDown}
                  className="bg-dark-700 text-white px-2 py-1 rounded outline-none w-32 focus:ring-1 focus:ring-primary-500 text-sm"
                />
              </div>
            ) : (
              <span className="text-sm font-medium select-none truncate max-w-[150px]">{tab.title}</span>
            )}

            {!isEditing && isActive && (
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => handleEditStart(tab, e)}
                  className="p-1 text-gray-400 hover:text-white"
                  title="Renombrar pestaña"
                >
                  <Edit2 size={14} />
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    if(confirm('¿Eliminar esta pestaña y todos sus bloques?')) onDeleteTab(tab.id); 
                  }}
                  className="p-1 text-gray-400 hover:text-red-400"
                  title="Eliminar pestaña"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        );
      })}
      
      <button
        onClick={() => onAddTab('Nueva Pestaña')}
        className="flex items-center justify-center p-2 mx-1 text-gray-400 hover:text-white hover:bg-dark-800 rounded-full transition-colors shrink-0"
        title="Agregar Pestaña"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};
