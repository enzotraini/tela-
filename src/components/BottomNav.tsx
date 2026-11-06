import React from 'react';

interface BottomNavProps {
  activeTab: 'inicio' | 'contas';
  onTabChange: (tab: 'inicio' | 'contas') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom,0px)] bg-[#121316]/90 backdrop-blur-xl border-t border-[#1F2228]/80 shadow-[0_-1px_12px_rgba(0,0,0,0.6)]">
      <div className="flex justify-center items-center gap-6 h-16 px-4 max-w-[390px] mx-auto">
        <button
          type="button"
          onClick={() => onTabChange('inicio')}
          className={`flex-1 flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === 'inicio'
              ? 'text-white bg-[#1F2228]/90 font-medium shadow-sm'
              : 'text-[#c6c6c7] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span className="text-[14px] tracking-wide font-body">Início</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('contas')}
          className={`flex-1 flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === 'contas'
              ? 'text-white bg-[#1F2228]/90 font-medium shadow-sm'
              : 'text-[#c6c6c7] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
          <span className="text-[14px] tracking-wide font-body">Contas</span>
        </button>
      </div>
    </nav>
  );
};
