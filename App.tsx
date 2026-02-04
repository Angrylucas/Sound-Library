import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { SoundCard } from './components/SoundCard';
import { SOUND_LIBRARY } from './constants';
import { SoundCategory, ToastMessage } from './types';
import { Github, Info, CheckCircle, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SoundCategory | 'All'>('All');
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Filter Logic
  const filteredSounds = useMemo(() => {
    return SOUND_LIBRARY.filter(sound => {
      const matchesSearch = 
        sound.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sound.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sound.filename.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || sound.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Toast Logic
  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast('Direct link copied to clipboard!', 'success');
    } catch (err) {
      addToast('Failed to copy link.', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      
      <Header totalSounds={SOUND_LIBRARY.length} />

      <FilterBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        
        {filteredSounds.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
              <Info className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-200 mb-2">No sounds found</h3>
            <p className="text-slate-500 max-w-md">
              We couldn't find any sounds matching your search. Try adjusting your filters or search terms.
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-6 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSounds.map((sound) => (
              <SoundCard 
                key={sound.id} 
                sound={sound} 
                activeId={activeSoundId}
                onPlay={setActiveSoundId}
                onStop={() => setActiveSoundId(null)}
                onCopy={handleCopy}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer Instructions */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <div>
               <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">About SonicVault</h4>
               <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                 A static asset library designed to host custom sound files on GitHub/Vercel. 
                 Use the copy button to get direct URLs for use in your other applications, games, or prototypes.
               </p>
               <div className="mt-6 flex items-center gap-4">
                 <a href="#" className="text-slate-500 hover:text-white transition-colors">
                   <Github className="w-5 h-5" />
                 </a>
               </div>
             </div>
             
             <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
               <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                 <Info className="w-4 h-4 text-primary-500" />
                 How to add sounds
               </h4>
               <ol className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
                 <li>Add <span className="text-slate-300 font-mono text-xs bg-slate-800 px-1 py-0.5 rounded">.mp3</span> or <span className="text-slate-300 font-mono text-xs bg-slate-800 px-1 py-0.5 rounded">.wav</span> files to <span className="text-primary-400">public/sounds/</span></li>
                 <li>Open <span className="text-slate-300 font-mono text-xs bg-slate-800 px-1 py-0.5 rounded">constants.ts</span></li>
                 <li>Add a new entry to the <span className="text-primary-400">SOUND_LIBRARY</span> array</li>
                 <li>Commit and push to GitHub</li>
               </ol>
             </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
            &copy; {new Date().getFullYear()} SonicVault. Open Source Asset Library.
          </div>
        </div>
      </footer>

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border animate-[slideIn_0.3s_ease-out]
              ${toast.type === 'success' ? 'bg-slate-900/90 border-green-500/30 text-green-400' : 'bg-slate-900/90 border-red-500/30 text-red-400'}
            `}
          >
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-medium text-slate-200">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
