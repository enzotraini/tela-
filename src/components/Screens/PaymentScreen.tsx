import React, { useState, useEffect } from 'react';
import { Invoice } from '../../types';

interface PaymentScreenProps {
  invoice: Invoice;
  onPaymentComplete: (invoice: Invoice) => void;
  onBack: () => void;
}

type SimState = 'ready' | 'loading' | 'error' | 'paid';

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  invoice,
  onPaymentComplete,
  onBack,
}) => {
  const [simState, setSimState] = useState<SimState>('ready');
  const [copied, setCopied] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(29 * 60 + 45); // 29m 45s

  const rawPixCode = `00020126580014br.gov.bcb.pix01362e19b-blackcar-locacao-${invoice.contractId.replace('#', '')}-5204000053039865405${invoice.amount}.005802BR5925BLACKCAR LOCADORA S/A6009SAO PAULO62070503***6304E819`;

  // Countdown timer for Pix expiration
  useEffect(() => {
    if (simState !== 'ready') return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [simState]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(rawPixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleConfirmPay = () => {
    onPaymentComplete(invoice);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-16 max-w-[430px] mx-auto select-none space-y-4">
      {/* Status Feedback Banner with Simulation State Controls */}
      <div className="flex items-center justify-between bg-[#292a2c] px-3.5 py-1.5 rounded-full border border-[#2A2E37]/80">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-2 h-2 rounded-full ${
              simState === 'ready'
                ? 'bg-[#4ADE80] animate-pulse'
                : simState === 'loading'
                ? 'bg-[#FACC15] animate-ping'
                : simState === 'error'
                ? 'bg-[#F87171]'
                : 'bg-[#60A5FA]'
            }`}
          />
          <span
            className={`text-[11px] font-semibold uppercase tracking-wider truncate font-geist ${
              simState === 'ready'
                ? 'text-[#4ADE80]'
                : simState === 'loading'
                ? 'text-[#FACC15]'
                : simState === 'error'
                ? 'text-[#F87171]'
                : 'text-[#60A5FA]'
            }`}
          >
            {simState === 'ready' && 'Código pronto'}
            {simState === 'loading' && 'Carregando código...'}
            {simState === 'error' && 'Código indisponível'}
            {simState === 'paid' && 'Pagamento reconhecido'}
          </span>
        </div>

        {/* Discreet Simulation Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Simular Código Pronto"
            onClick={() => setSimState('ready')}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              simState === 'ready' ? 'bg-[#d0f03b] text-[#181e00]' : 'bg-[#1F2228] text-[#c6c6c7] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">qr_code_2</span>
          </button>
          <button
            type="button"
            title="Simular Carregamento"
            onClick={() => setSimState('loading')}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              simState === 'loading' ? 'bg-[#FACC15] text-[#181e00]' : 'bg-[#1F2228] text-[#c6c6c7] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">sync</span>
          </button>
          <button
            type="button"
            title="Simular Falha Bancária"
            onClick={() => setSimState('error')}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              simState === 'error' ? 'bg-[#F87171] text-white' : 'bg-[#1F2228] text-[#c6c6c7] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">error_outline</span>
          </button>
          <button
            type="button"
            title="Simular Pix Compensado"
            onClick={() => setSimState('paid')}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              simState === 'paid' ? 'bg-[#4ADE80] text-[#181e00]' : 'bg-[#1F2228] text-[#c6c6c7] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">verified</span>
          </button>
        </div>
      </div>

      {/* 1. Resumo Fixo / Card Superior do Contrato */}
      <div className="bg-[#181A1F] rounded-xl p-4 shadow-lg relative overflow-hidden border border-[#2A2E37]/80">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start justify-between pb-3 bg-[#1b1c1e]/60 rounded-lg p-3 border border-[#2A2E37]/40">
          <div className="flex flex-col space-y-1">
            <span className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body">
              Locação Semanal
            </span>
            <div className="flex items-center gap-1.5 text-white">
              <span className="material-symbols-outlined text-[16px] text-white">calendar_today</span>
              <span className="text-[14px] font-medium font-geist">{invoice.period}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <span className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body">
              Vencimento
            </span>
            <span className="bg-[#1F2228] text-[#FACC15] px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider font-geist border border-[#2A2E37]/60">
              {invoice.dueDate.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between pt-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#c6c6c7] mb-1 font-body">Veículo Alocado</span>
            <div className="flex items-center gap-1.5 bg-[#1F2228] px-3 py-1 rounded-lg border border-[#2A2E37]/60">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
              <span className="text-[16px] font-semibold text-white tracking-wider font-mono">
                {invoice.plate}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[11px] text-[#c6c6c7] font-body">Total a Pagar</span>
            <span className="text-[28px] font-semibold text-white tracking-tight font-geist tabular-nums">
              {invoice.amountFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Bloco Central de Cobrança Pix */}
      <div className="bg-[#181A1F] rounded-xl p-5 shadow-xl flex flex-col items-center text-center relative border border-[#2A2E37]/80">
        {simState === 'ready' && (
          <div className="w-full flex flex-col items-center">
            {/* QR Code Container */}
            <div className="relative group my-1">
              <div className="bg-[#e2e2e2] p-5 rounded-xl shadow-2xl flex flex-col items-center justify-center">
                <svg className="w-48 h-48 text-[#0B0C0E]" fill="currentColor" viewBox="0 0 160 160">
                  {/* Corner top-left */}
                  <rect fill="currentColor" height="40" rx="4" width="40" x="10" y="10" />
                  <rect fill="#E2E2E2" height="24" rx="2" width="24" x="18" y="18" />
                  <rect fill="currentColor" height="12" width="12" x="24" y="24" />
                  
                  {/* Corner top-right */}
                  <rect fill="currentColor" height="40" rx="4" width="40" x="110" y="10" />
                  <rect fill="#E2E2E2" height="24" rx="2" width="24" x="118" y="18" />
                  <rect fill="currentColor" height="12" width="12" x="124" y="24" />
                  
                  {/* Corner bottom-left */}
                  <rect fill="currentColor" height="40" rx="4" width="40" x="10" y="110" />
                  <rect fill="#E2E2E2" height="24" rx="2" width="24" x="18" y="118" />
                  <rect fill="currentColor" height="12" width="12" x="24" y="124" />
                  
                  {/* Data modules cluster */}
                  <rect fill="currentColor" height="20" width="8" x="60" y="15" />
                  <rect fill="currentColor" height="10" width="10" x="75" y="10" />
                  <rect fill="currentColor" height="25" width="10" x="90" y="25" />
                  <rect fill="currentColor" height="8" width="20" x="15" y="60" />
                  <rect fill="currentColor" height="15" width="10" x="25" y="75" />
                  <rect fill="currentColor" height="44" rx="4" width="44" x="58" y="58" />
                  <circle cx="80" cy="80" fill="#E2E2E2" r="14" />
                  <path
                    d="M74 80 L78 84 L86 76"
                    fill="none"
                    stroke="#0B0C0E"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3.5"
                  />
                  <rect fill="currentColor" height="10" width="30" x="115" y="60" />
                  <rect fill="currentColor" height="15" width="15" x="130" y="78" />
                  <rect fill="currentColor" height="30" width="12" x="60" y="115" />
                  <rect fill="currentColor" height="10" width="22" x="80" y="125" />
                  <rect fill="currentColor" height="18" width="18" x="115" y="115" />
                  <rect fill="currentColor" height="12" width="12" x="138" y="138" />
                </svg>
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#0B0C0E] px-3 py-0.5 rounded-full text-[#c6c6c7] text-[11px] font-semibold shadow-md whitespace-nowrap border border-[#2A2E37] font-geist">
                EXPIRA EM {formatTime(secondsRemaining)} MIN
              </div>
            </div>

            {/* Micro instruction tag */}
            <span className="text-[12px] text-[#c6c6c7] mt-5 mb-2 font-body">
              Aponte a câmera do aplicativo do seu banco
            </span>

            {/* Copia e Cola Field */}
            <div className="w-full mt-1 flex flex-col space-y-2">
              <div className="bg-[#1F2228] rounded-lg px-3.5 py-2.5 flex items-center justify-between w-full border border-[#2A2E37]/60">
                <span className="text-[12px] text-[#c6c6c7] truncate text-left mr-2 select-all font-mono">
                  {rawPixCode}
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#c6c6c7] flex-shrink-0">
                  vpn_key
                </span>
              </div>

              <button
                type="button"
                id="copy-btn"
                onClick={handleCopyPix}
                className={`w-full active:scale-[0.98] transition-all min-h-[48px] rounded-lg flex items-center justify-center gap-2 shadow-md cursor-pointer font-geist ${
                  copied
                    ? 'bg-[#4ADE80] text-[#0B0C0E] font-semibold'
                    : 'bg-white text-[#121315] hover:bg-white/95 font-semibold'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span className="text-[15px]">
                  {copied ? 'Código Pix copiado!' : 'Copiar código Pix'}
                </span>
              </button>
            </div>

            {/* Reassurance Message */}
            <div className="mt-4 bg-[#1b1c1e] px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 text-left border border-[#2A2E37]/60">
              <span className="material-symbols-outlined text-[22px] text-[#4ADE80] flex-shrink-0">
                bolt
              </span>
              <p className="text-[12px] text-[#e3e2e5] font-body leading-snug">
                O pagamento confirma sozinho quando o Pix cair.{' '}
                <span className="text-[#c6c6c7]">Não precisa enviar comprovante.</span>
              </p>
            </div>

            {/* Instant Simulation Action */}
            <button
              type="button"
              onClick={handleConfirmPay}
              className="mt-4 w-full py-2.5 px-3 rounded-lg bg-[#1f2022] hover:bg-[#292a2c] text-[#d0f03b] border border-[#d0f03b]/30 text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer font-geist"
            >
              <span className="material-symbols-outlined text-[16px]">touch_app</span>
              <span>Simular Compensação Bancária Imediata</span>
            </button>
          </div>
        )}

        {simState === 'loading' && (
          <div className="w-full flex flex-col items-center py-8">
            <div className="w-12 h-12 rounded-full border-4 border-[#1F2228] border-t-white animate-spin my-4" />
            <h3 className="text-[18px] font-semibold text-white font-geist">
              Gerando cobrança instantânea...
            </h3>
            <p className="text-[12px] text-[#c6c6c7] mt-1 max-w-xs font-body">
              Conectando ao Banco Central para emitir o QR Code Pix dinâmico.
            </p>
          </div>
        )}

        {simState === 'error' && (
          <div className="w-full flex flex-col items-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#2E1517] flex items-center justify-center mb-3 text-[#F87171] border border-[#F87171]/20">
              <span className="material-symbols-outlined text-[32px]">sync_problem</span>
            </div>
            <h3 className="text-[18px] font-semibold text-white font-geist">
              Código indisponível
            </h3>
            <p className="text-[12px] text-[#c6c6c7] mt-1 max-w-xs font-body leading-relaxed">
              Houve uma oscilação na rede bancária ao requisitar a chave dinâmica do veículo {invoice.plate}.
            </p>
            <button
              type="button"
              onClick={() => setSimState('ready')}
              className="mt-5 bg-[#1F2228] hover:bg-[#292a2c] text-white min-h-[46px] px-6 rounded-lg text-[14px] font-medium flex items-center gap-2 transition-transform active:scale-95 border border-[#2A2E37] cursor-pointer font-geist"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              <span>Tentar novamente</span>
            </button>
          </div>
        )}

        {simState === 'paid' && (
          <div className="w-full flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#12231A] flex items-center justify-center mb-3 text-[#4ADE80] border border-[#4ADE80]/30 animate-bounce">
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <h3 className="text-[20px] font-semibold text-white font-geist">
              Pagamento Reconhecido!
            </h3>
            <p className="text-[13px] text-[#e3e2e5] mt-1 max-w-xs font-body leading-relaxed">
              Seu Pix de <strong className="text-white">{invoice.amountFormatted}</strong> foi compensado. Sua locação está garantida para {invoice.period}.
            </p>
            
            <button
              type="button"
              onClick={handleConfirmPay}
              className="mt-4 w-full h-[50px] bg-[#d0f03b] text-[#181e00] font-semibold text-[15px] rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer font-geist"
            >
              <span>Ver Comprovante Oficial</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>

      {/* Security Info */}
      <div className="flex items-center justify-center gap-1.5 text-[#c6c6c7] opacity-80 pt-1">
        <span className="material-symbols-outlined text-[16px]">verified_user</span>
        <span className="text-[11px] tracking-wide font-body">
          Ambiente de Liquidação 100% Criptografado
        </span>
      </div>
    </div>
  );
};
