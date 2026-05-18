import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, Trash2, Edit2, Plus } from 'lucide-react';
import type { Block, Snippet } from '../../domain/entities';
import clsx from 'clsx';

const parseContent = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

interface BlockCardProps {
  block: Block;
  onUpdate: (id: string, fields: Partial<Omit<Block, 'id'>>) => void;
  onDelete: (id: string) => void;
  onAddSnippet: (blockId: string, content: string) => void;
  onUpdateSnippet: (blockId: string, snippetId: string, content: string) => void;
  onDeleteSnippet: (blockId: string, snippetId: string) => void;
}

export const BlockCard: React.FC<BlockCardProps> = ({ 
  block, 
  onUpdate, 
  onDelete,
  onAddSnippet,
  onUpdateSnippet,
  onDeleteSnippet
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(block.title);
  const [newSnippetContent, setNewSnippetContent] = useState('');
  const [isAddingSnippet, setIsAddingSnippet] = useState(false);

  const handleSaveTitle = () => {
    if (editTitle.trim()) {
      onUpdate(block.id, { title: editTitle.trim() });
      setIsEditingTitle(false);
    }
  };

  const handleAddSnippet = () => {
    if (newSnippetContent.trim()) {
      onAddSnippet(block.id, newSnippetContent.trim());
      setNewSnippetContent('');
      setIsAddingSnippet(false);
    }
  };

  return (
    <div className="group bg-dark-800 border border-dark-600 hover:border-dark-500 rounded-xl p-4 shadow-md mb-3 transition-colors">
      {/* HEADER: TITLE AND BLOCK ACTIONS */}
      <div className="flex justify-between items-start mb-2">
        {isEditingTitle ? (
          <div className="flex-1 mr-4">
            <input 
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-dark-900 text-white font-bold px-3 py-2 rounded outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="Título del bloque"
              onKeyDown={(e) => e.stopPropagation()}
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button onClick={() => setIsEditingTitle(false)} className="text-xs text-gray-400 hover:text-white">Cancelar</button>
              <button onClick={handleSaveTitle} className="text-xs text-primary-500 hover:text-primary-400 font-bold">Guardar</button>
            </div>
          </div>
        ) : (
          <div 
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <h3 className="text-white font-bold text-lg">{block.title}</h3>
            <button className="text-gray-500 hover:text-gray-300 transition-colors">
              {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>
          </div>
        )}

        {!isEditingTitle && (
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsEditingTitle(true)}
              className="p-2 text-amber-500 hover:text-amber-400 transition-colors rounded-lg hover:bg-dark-700"
              title="Editar título del bloque"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => { if(confirm('¿Eliminar este bloque completo?')) onDelete(block.id); }}
              className="p-2 text-red-500 hover:text-red-400 transition-colors rounded-lg hover:bg-dark-700"
              title="Eliminar bloque completo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* SNIPPETS LIST */}
      {!isCollapsed && (
        <div className="mt-3 space-y-3">
          {(block.snippets || []).map(snippet => (
            <SnippetItem 
              key={snippet.id} 
              snippet={snippet} 
              onUpdate={(newContent) => onUpdateSnippet(block.id, snippet.id, newContent)}
              onDelete={() => onDeleteSnippet(block.id, snippet.id)}
            />
          ))}

          {/* ADD SNIPPET BUTTON */}
          {(block.snippets || []).length < 10 && (
            isAddingSnippet ? (
              <div className="bg-dark-900 border border-dark-600 rounded-xl p-3 mt-2">
                <textarea 
                  value={newSnippetContent}
                  onChange={(e) => setNewSnippetContent(e.target.value)}
                  rows={3}
                  className="w-full bg-dark-800 text-gray-300 px-3 py-2 rounded mb-2 outline-none focus:ring-1 focus:ring-primary-500 resize-none font-mono text-sm"
                  placeholder="Contenido (usa **negritas**)"
                  onKeyDown={(e) => e.stopPropagation()}
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => {
                      setIsAddingSnippet(false);
                      setNewSnippetContent('');
                    }}
                    className="px-3 py-1.5 rounded text-gray-400 hover:text-white transition-colors text-xs font-medium"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleAddSnippet}
                    className="px-3 py-1.5 bg-primary-600 hover:bg-primary-500 text-white rounded transition-colors text-xs font-bold"
                  >
                    Guardar Texto
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAddingSnippet(true)}
                className="w-full mt-2 py-2 rounded-lg border border-dashed border-dark-600 text-gray-400 hover:text-white hover:border-dark-500 hover:bg-dark-700 transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Plus size={16} />
                Añadir texto ({10 - (block.snippets || []).length} restantes)
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

// Subcomponent for individual snippet
interface SnippetItemProps {
  snippet: Snippet;
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

const SnippetItem: React.FC<SnippetItemProps> = ({ snippet, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(snippet.content);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleSave = () => {
    if (editContent.trim()) {
      onUpdate(editContent.trim());
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-dark-900 border border-primary-500 rounded-lg p-3">
        <textarea 
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={3}
          className="w-full bg-dark-800 text-gray-300 px-3 py-2 rounded mb-2 outline-none focus:ring-1 focus:ring-primary-500 resize-none font-mono text-sm"
          onKeyDown={(e) => e.stopPropagation()}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 rounded text-gray-400 hover:text-white transition-colors text-xs font-medium">Cancelar</button>
          <button onClick={handleSave} className="px-3 py-1.5 bg-primary-600 hover:bg-primary-500 text-white rounded transition-colors text-xs font-bold">Guardar</button>
        </div>
      </div>
    );
  }

  // Visual limitation of the texts, with background and border so they look separate from each other
  return (
    <div className="bg-dark-900 border border-dark-700 rounded-lg p-3 relative group/snippet min-h-[105px]">
      <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-[14px] pr-10">
        {parseContent(snippet.content)}
      </div>
      
      {/* Actions container for each individual text */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-100 sm:opacity-0 sm:group-hover/snippet:opacity-100 transition-opacity bg-dark-900/80 p-1 rounded-md">
        <button onClick={() => setIsEditing(true)} className="p-1.5 text-amber-500 hover:text-amber-400 hover:bg-dark-700 rounded-md transition-colors" title="Editar texto">
          <Edit2 size={14} />
        </button>
        <button onClick={() => { if(confirm('¿Eliminar este texto?')) onDelete(); }} className="p-1.5 text-red-500 hover:text-red-400 hover:bg-dark-700 rounded-md transition-colors" title="Eliminar texto">
          <Trash2 size={14} />
        </button>
        <button onClick={handleCopy} className={clsx("p-1.5 rounded-md hover:bg-dark-700 transition-colors", copied ? "text-green-400" : "text-blue-500 hover:text-blue-400")} title="Copiar texto">
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
};
