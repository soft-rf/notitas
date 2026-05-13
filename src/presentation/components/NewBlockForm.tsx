import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface NewBlockFormProps {
  onAdd: (title: string, content: string) => void;
}

export const NewBlockForm: React.FC<NewBlockFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onAdd(title.trim(), content.trim());
      setTitle('');
      setContent('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 py-4 rounded-xl border-2 border-dashed border-dark-600 text-gray-400 hover:text-white hover:border-dark-500 hover:bg-dark-800 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={20} />
        Añadir Bloque
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-dark-800 border border-dark-600 rounded-xl p-4 shadow-lg">
      <h3 className="text-white font-bold mb-3">Nuevo Bloque</h3>
      <input 
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-dark-900 text-white px-3 py-2 rounded mb-3 outline-none focus:ring-1 focus:ring-primary-500"
        placeholder="Ej: Sobre mí"
        required
      />
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full bg-dark-900 text-gray-300 px-3 py-2 rounded mb-3 outline-none focus:ring-1 focus:ring-primary-500 resize-none font-mono text-sm"
        placeholder="Contenido (usa **negritas** para resaltar)"
        required
      />
      <div className="flex justify-end gap-2">
        <button 
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 rounded text-gray-400 hover:text-white transition-colors text-sm font-medium"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded transition-colors text-sm font-bold shadow-[0_0_10px_rgba(59,130,246,0.3)]"
        >
          Guardar Bloque
        </button>
      </div>
    </form>
  );
};
