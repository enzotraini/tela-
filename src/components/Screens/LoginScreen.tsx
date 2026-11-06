import React, { useState } from 'react';
import { BLACKCAR_LOGO_URL } from '../../data/mockData';
import { UserRole } from '../../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleIdentityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Apply CPF mask if numbers only
    if (!val.includes('@')) {
      const numbers = val.replace(/\D/g, '').slice(0, 11);
      if (numbers.length > 9) {
        val = numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      } else if (numbers.length > 6) {
        val = numbers.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
      } else if (numbers.length > 3) {
        val = numbers.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      } else {
        val = numbers;
      }
    }
    setIdentity(val);
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.trim() || !password.trim()) {
      setErrorMessage('Credenciais inválidas. Verifique os dados informados.');
      return;
    }

    // Smart route based on input or default to renter
    if (identity.toLowerCase().includes('owner') || identity.toLowerCase().includes('admin')) {
      onLogin('owner');
    } else {
      onLogin('renter');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pb-8 max-w-[410px] mx-auto min-h-screen justify-between">
      <div>
        {/* Subtle decorative ambient spotlight behind logo */}
        <div className="relative w-full flex flex-col items-center pt-8 pb-4">
          <div className="absolute -top-10 w-44 h-44 rounded-full bg-[#d0f03b]/5 blur-3xl pointer-events-none" />
          
          {/* Brand Header */}
          <div className="relative flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-[#181A1F] border border-[#2A2E37]/60 flex items-center justify-center p-2.5 mb-3 shadow-md">
              <img
                src={BLACKCAR_LOGO_URL}
                alt="BLACKCAR Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="font-semibold text-[24px] text-white tracking-tight flex items-center gap-1.5 justify-center font-geist">
              BLACKCAR
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d0f03b]" />
            </h1>
            <p className="text-[12px] text-[#c6c6c7] tracking-widest uppercase mt-1 font-body">
              Locadora de Veículos
            </p>
          </div>
        </div>

        {/* Status / Security Pill */}
        <div className="w-full flex justify-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1c1e] border border-[#2A2E37]/60 text-[#c6c6c7]">
            <span className="material-symbols-outlined text-[14px] text-[#4ADE80]">lock</span>
            <span className="text-[11px] font-semibold text-[#c6c6c7] tracking-wider uppercase font-geist">
              Ambiente Seguro PWA
            </span>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="w-full bg-[#181A1F] rounded-xl p-4 shadow-xl relative overflow-hidden border border-[#2A2E37]/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2A2E37] to-transparent" />
          
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {/* User Identification Field */}
            <div className="flex flex-col gap-1">
              <label
                className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body"
                htmlFor="user-identity"
              >
                CPF ou E-mail
              </label>
              <div className="relative flex items-center rounded-lg bg-[#121316] border border-[#2A2E37] transition-all duration-200 focus-within:border-[#d0f03b]/70">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-[#c6c6c7]">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </div>
                <input
                  id="user-identity"
                  type="text"
                  autoComplete="username"
                  placeholder="000.000.000-00"
                  value={identity}
                  onChange={handleIdentityChange}
                  className="w-full h-12 pl-11 pr-4 bg-transparent text-[14px] text-[#e3e2e5] placeholder:text-[#5e6473] focus:outline-none transition-colors font-body"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body"
                  htmlFor="user-password"
                >
                  Senha
                </label>
                <span className="text-[11px] text-[#c6c6c7]/60 font-body">6+ dígitos</span>
              </div>
              <div className="relative flex items-center rounded-lg bg-[#121316] border border-[#2A2E37] transition-all duration-200 focus-within:border-[#d0f03b]/70">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-[#c6c6c7]">
                  <span className="material-symbols-outlined text-[18px]">key</span>
                </div>
                <input
                  id="user-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full h-12 pl-11 pr-12 bg-transparent text-[14px] text-[#e3e2e5] placeholder:text-[#5e6473] focus:outline-none transition-colors font-body"
                />
                <button
                  type="button"
                  aria-label="Alternar visibilidade da senha"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 p-2 rounded-md text-[#c6c6c7] hover:text-white active:scale-95 transition-all flex items-center justify-center focus:outline-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Primary Action CTA */}
            <button
              id="submitBtn"
              type="submit"
              className="mt-1 w-full h-[52px] rounded-lg bg-[#d0f03b] text-[#181e00] font-semibold text-[16px] tracking-tight flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md hover:brightness-105 cursor-pointer font-geist"
            >
              <span>Entrar</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            {/* Quick Demo Access Bar */}
            <div className="pt-2 flex flex-col gap-2">
              <span className="text-[11px] text-center text-[#c6c6c7]/80 uppercase tracking-wider font-body">
                Acesso Rápido de Demonstração:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onLogin('renter')}
                  className="py-2 px-3 rounded-lg bg-[#1f2022] hover:bg-[#292a2c] text-[#e3e2e5] text-[12px] font-medium transition-all active:scale-95 border border-[#2A2E37] flex items-center justify-center gap-1.5 cursor-pointer font-geist"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#d0f03b]">badge</span>
                  <span>Locatário</span>
                </button>
                <button
                  type="button"
                  onClick={() => onLogin('owner')}
                  className="py-2 px-3 rounded-lg bg-[#1f2022] hover:bg-[#292a2c] text-[#e3e2e5] text-[12px] font-medium transition-all active:scale-95 border border-[#2A2E37] flex items-center justify-center gap-1.5 cursor-pointer font-geist"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#60A5FA]">analytics</span>
                  <span>Proprietário</span>
                </button>
              </div>
            </div>

            {/* Feedback / Error Notification */}
            {errorMessage && (
              <div
                id="authErrorBadge"
                role="alert"
                className="flex items-start gap-2.5 p-3 rounded-lg bg-[#2E1517] text-[#F87171] border border-[#F87171]/20 transition-opacity duration-300 mt-1"
              >
                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">
                  error_outline
                </span>
                <p className="text-[12px] leading-snug font-body">
                  {errorMessage}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Key Specs / Fleet Highlight Preview Card */}
        <div className="w-full mt-4 p-3.5 rounded-xl bg-[#0d0e10] border border-[#2A2E37]/60 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#181A1F] flex items-center justify-center text-[#d0f03b]">
              <span className="material-symbols-outlined text-[20px]">directions_car</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-medium text-[#e3e2e5] font-geist">Frota Premium</span>
              <span className="text-[12px] text-[#c6c6c7] font-body">Acesso exclusivo sob autenticação</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#c6c6c7]">
            <span className="material-symbols-outlined text-[18px]">shield</span>
          </div>
        </div>
      </div>

      {/* Operational Footer */}
      <div className="w-full flex flex-col items-center text-center mt-8 pt-2 gap-2">
        <div className="w-8 h-px bg-[#343537]" />
        <p className="text-[11px] text-[#c6c6c7]/80 max-w-[280px] font-body">
          Acesso restrito para clientes e administradores.
        </p>
        <p className="text-[11px] font-semibold text-[#8e9080] tracking-wider uppercase font-geist">
          BLACKCAR MOBILITY PLATFORM • V2.4
        </p>
      </div>
    </div>
  );
};
