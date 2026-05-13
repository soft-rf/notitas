import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Layout } from './presentation/components/Layout';
import { BlocksList } from './presentation/components/BlocksList';
import { NewBlockForm } from './presentation/components/NewBlockForm';
import { useWorkspaceState } from './presentation/hooks/useWorkspaceState';
import clsx from 'clsx';

function App() {
  const {
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
  } = useWorkspaceState();

  const [copiedAll, setCopiedAll] = useState(false);

  if (!workspace) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Cargando...</div>;

  const activeTab = workspace.tabs.find(t => t.id === activeTabId);

  const handleCopyAll = async () => {
    if (!activeTab || activeTab.blocks.length === 0) return;
    const textToCopy = activeTab.blocks.map(b => b.content).join('\n\n');
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy all', err);
    }
  };

  const headerActions = (
    <button
      onClick={handleCopyAll}
      disabled={!activeTab || activeTab.blocks.length === 0}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200",
        copiedAll 
          ? "bg-green-500/20 text-green-400" 
          : "bg-primary-600 hover:bg-primary-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      )}
    >
      {copiedAll ? <Check size={18} /> : <Copy size={18} />}
      <span className="hidden sm:inline">{copiedAll ? '¡Pestaña Copiada!' : 'Copiar Pestaña'}</span>
    </button>
  );

  return (
    <Layout
      headerActions={headerActions}
      tabsProps={{
        tabs: workspace.tabs,
        activeTabId,
        onSelectTab: setActiveTabId,
        onAddTab: addTab,
        onDeleteTab: deleteTab,
        onRenameTab: updateTabTitle
      }}
    >
      {activeTab ? (
        <div className="animate-in fade-in duration-300">
          <BlocksList 
            blocks={activeTab.blocks}
            onReorder={(oldIndex, newIndex) => reorderBlocks(activeTab.id, oldIndex, newIndex)}
            onUpdateBlock={(blockId, fields) => updateBlock(activeTab.id, blockId, fields)}
            onDeleteBlock={(blockId) => deleteBlock(activeTab.id, blockId)}
          />
          <NewBlockForm 
            onAdd={(title, content) => addBlock(activeTab.id, { title, content })}
          />
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-dark-600 rounded-xl mt-4">
          Crea o selecciona una pestaña para comenzar.
        </div>
      )}
    </Layout>
  );
}

export default App;
