import React from 'react';
import { Database, Waves } from 'lucide-react';

interface HeaderProps {
  totalSounds: number;
}

export const Header: React.FC<HeaderProps> = ({ totalSounds }) => {
  return (
    <header className="py-8 md:py-12 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
            <Waves className="w-8 h-8 text-primary-500" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              SonicVault
            </h1>
            <p className="text-slate-400 text-sm">
              Open Asset Library
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-800 shadow-sm">
          <Database className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-300">
            {totalSounds} {totalSounds === 1 ? 'Asset' : 'Assets'} Available
          </span>
        </div>
      </div>
    </header>
  );
};
