import React from 'react';
import { BLACKCAR_LOGO_URL } from '../data/mockData';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onLogout: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  onLogout,
  onProfileClick,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0C0E]/85 backdrop-blur-xl border-b border-[#1F2228]/60 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-16 px-4 flex items-center justify-between max-w-[430px] mx-auto w-full">
        {showBack ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Voltar"
              onClick={onBack}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white -ml-2 transition-colors hover:text-[#c6c6c7] active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              <img
                src={BLACKCAR_LOGO_URL}
                alt="BLACKCAR Logo"
                className="h-7 w-auto object-contain"
              />
              <span className="text-[#c6c6c7] opacity-60 font-light">/</span>
              <h1 className="text-[16px] font-medium tracking-tight text-[#e3e2e5] font-headline">
                {title}
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={BLACKCAR_LOGO_URL}
              alt="BLACKCAR Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-[16px] font-medium tracking-wider text-white hidden uppercase font-headline">
              BLACKCAR
            </span>
            <h1 className="text-[16px] font-medium text-[#e3e2e5] font-headline">
              {title}
            </h1>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLogout}
            title="Sair da conta"
            className="min-h-[44px] px-2 flex items-center justify-center text-[12px] text-[#c6c6c7] hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] mr-1">logout</span>
            <span>Sair</span>
          </button>
          <button
            type="button"
            onClick={onProfileClick}
            aria-label="Perfil do usuário"
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#2b3400] text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
