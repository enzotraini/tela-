import React, { useState } from 'react';
import { ScreenId, UserRole } from '../types';

interface QuickScreenSwitcherProps {
  currentScreen: ScreenId;
  userRole: UserRole;
  isMobileFrame: boolean;
  onSelectScreen: (screen: ScreenId) => void;
  onToggleRole: (role: UserRole) => void;
  onToggleFrame: () => void;
  onResetData: () => void;
}

export const QuickScreenSwitcher: React.FC<QuickScreenSwitcherProps> = ({
  currentScreen,
  userRole,
  isMobileFrame,
  onSelectScreen,
  onToggleRole,
  onToggleFrame,
  onResetData,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const screens: { id: ScreenId; label: string; icon: string; roleTag?: string }[] = [
    { id: 'login', label: '1. Login PWA', icon: 'lock' },
    { id: 'renter_home', label: '2. Renter Home (A Vencer)', icon: 'directions_car', roleTag: 'Locatário' },
    { id: 'renter_home_paid', label: '3. Renter Home (Tudo em Dia)', icon: 'check_circle', roleTag: 'Locatário' },
    { id: 'renter_bills', label: '4. Renter Bills (Contas)', icon: 'receipt_long', roleTag: 'Locatário' },
    { id: 'payment', label: '5. Pagamento Pix (QR Code)', icon: 'qr_code_2', roleTag: 'Locatário' },
    { id: 'payment_success', label: '6. Pagamento Confirmado', icon: 'verified', roleTag: 'Locatário' },
    { id: 'owner_home', label: '7. Owner Home (Visão Geral)', icon: 'monitoring', roleTag: 'Proprietário' },
    { id: 'owner_bills', label: '8. Owner Bills (A Receber)', icon: 'account_balance_wallet', roleTag: 'Proprietário' },
  ];

  return (
    <aside aria-label="Navegador de telas de demonstração" className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Mini pill bar */}
      <div className="max-w-xl mx-auto p-2 flex justify-center">
        <div className="bg-[#181A1F]/95 backdrop-blur-md border border-[#2A2E37] px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-[12px] font-medium text-white hover:text-[#d0f03b] transition-colors cursor-pointer font-geist"
          >
            <span className="w-2 h-2 rounded-full bg-[#d0f03b] animate-pulse" />
            <span className="font-semibold">BLACKCAR • TELAS</span>
            <span className="material-symbols-outlined text-[16px]">
              {isExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          <div className="h-4 w-px bg-[#2A2E37]" />

          {/* Quick role indicator */}
          <button
            type="button"
            onClick={() => onToggleRole(userRole === 'renter' ? 'owner' : 'renter')}
            className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1F2228] text-[#c6c6c7] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-geist border border-[#2A2E37]"
          >
            <span className="material-symbols-outlined text-[13px] text-[#d0f03b]">
              {userRole === 'renter' ? 'person' : 'admin_panel_settings'}
            </span>
            <span>{userRole === 'renter' ? 'Locatário' : 'Owner'}</span>
          </button>

          {/* Frame Toggle */}
          <button
            type="button"
            onClick={onToggleFrame}
            title={isMobileFrame ? 'Mudar para Tela Cheia' : 'Mudar para Modo Celular (390px)'}
            className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1F2228] text-[#c6c6c7] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-geist border border-[#2A2E37]"
          >
            <span className="material-symbols-outlined text-[13px]">
              {isMobileFrame ? 'smartphone' : 'desktop_windows'}
            </span>
            <span>{isMobileFrame ? '390px' : 'Cheia'}</span>
          </button>
        </div>
      </div>

      {/* Expanded drawer menu of all screens */}
      {isExpanded && (
        <div className="max-w-md mx-auto px-3 pointer-events-auto animate-in slide-in-from-top-2 duration-200">
          <div className="bg-[#181A1F] border border-[#2A2E37] rounded-2xl p-3 shadow-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F2228] px-1">
              <span className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body">
                Navegador Rápido de Telas (Design Obsidian Velocity)
              </span>
              <button
                type="button"
                onClick={onResetData}
                title="Restaurar dados originais"
                className="text-[11px] font-medium text-[#c6c6c7] hover:text-[#d0f03b] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">restart_alt</span>
                <span>Resetar Dados</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-72 overflow-y-auto pr-1">
              {screens.map((s) => {
                const isActive = currentScreen === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      onSelectScreen(s.id);
                      setIsExpanded(false);
                    }}
                    className={`p-2 rounded-xl text-left text-[12px] font-medium flex items-center gap-2 transition-all cursor-pointer font-geist ${
                      isActive
                        ? 'bg-[#d0f03b] text-[#181e00] font-semibold shadow-sm'
                        : 'bg-[#121316] text-[#e3e2e5] hover:bg-[#1F2228] border border-[#2A2E37]/50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] shrink-0">
                      {s.icon}
                    </span>
                    <span className="truncate">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
