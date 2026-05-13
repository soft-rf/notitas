import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import type { Block } from '../../domain/entities';
import { BlockCard } from './BlockCard';

interface BlocksListProps {
  blocks: Block[];
  onReorder: (oldIndex: number, newIndex: number) => void;
  onUpdateBlock: (id: string, fields: Partial<Omit<Block, 'id'>>) => void;
  onDeleteBlock: (id: string) => void;
}

export const BlocksList: React.FC<BlocksListProps> = ({ blocks, onReorder, onUpdateBlock, onDeleteBlock }) => {
  if (blocks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 border-2 border-dashed border-dark-600 rounded-xl mt-4">
        Aún no hay bloques en esta pestaña.<br/>
        Haz clic en "Añadir Bloque" para empezar.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <ReactSortable
        list={blocks.map(b => ({ ...b, chosen: false }))}
        setList={() => {}}
        onEnd={(evt) => {
          if (evt.oldIndex !== undefined && evt.newIndex !== undefined && evt.oldIndex !== evt.newIndex) {
            onReorder(evt.oldIndex, evt.newIndex);
          }
        }}
        animation={200}
        ghostClass="opacity-50"
        handle=".drag-handle"
      >
        {blocks.map(block => (
          <div key={block.id} className="drag-handle cursor-grab active:cursor-grabbing">
            <BlockCard block={block} onUpdate={onUpdateBlock} onDelete={onDeleteBlock} />
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};
