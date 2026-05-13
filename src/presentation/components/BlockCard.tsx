import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, Trash2, Edit2 } from 'lucide-react';
import type { Block } from '../../domain/entities';
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
}

export const BlockCard: React.FC<BlockCardProps> = ({ block, onUpdate, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editTitle, setEditTitle] = useState(block.title);
  const [editContent, setEditContent] = useState(block.content);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(block.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleSave = () => {
    if (editTitle.trim() && editContent.trim()) {
      onUpdate(block.id, { title: editTitle.trim(), content: editContent.trim() });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-dark-800 border border-primary-500 rounded-xl p-4 shadow-lg mb-3">
        <input 
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full bg-dark-900 text-white font-bold px-3 py-2 rounded mb-3 outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="Título del bloque"
          onKeyDown={(e) => e.stopPropagation()} // Prevent drag and drop interference
        />
        <textarea 
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={4}
          className="w-full bg-dark-900 text-gray-300 px-3 py-2 rounded mb-3 outline-none focus:ring-1 focus:ring-primary-500 resize-none font-mono text-sm"
          placeholder="Contenido (usa **negritas**)"
          onKeyDown={(e) => e.stopPropagation()}
        />
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 rounded text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded transition-colors text-sm font-bold"
          >
            Guardar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-dark-800 border border-dark-600 hover:border-dark-500 rounded-xl p-4 shadow-md mb-3 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <h3 className="text-white font-bold text-lg">{block.title}</h3>
          <button className="text-gray-500 hover:text-gray-300 transition-colors">
            {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-dark-700"
            title="Editar bloque"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => { if(confirm('¿Eliminar este bloque?')) onDelete(block.id); }}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-dark-700"
            title="Eliminar bloque"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="mt-3">
          <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-[15px] mb-4">
            {parseContent(block.content)}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCopy}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200",
                copied 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-dark-700 hover:bg-primary-600 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              )}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? '¡Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
