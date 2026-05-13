import React from 'react';

export const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-dark-900 border-b border-dark-600">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          N
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">Notitas</h1>
      </div>
      <div className="flex items-center gap-3">
        {children}
      </div>
    </header>
  );
};
