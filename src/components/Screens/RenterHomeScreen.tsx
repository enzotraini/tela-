import React, { useState } from 'react';
import { FIAT_CRONOS_IMAGE_URL } from '../../data/mockData';
import { Invoice, Vehicle } from '../../types';

interface RenterHomeScreenProps {
  vehicle: Vehicle;
  activeInvoice: Invoice | null;
  onPayPix: (invoice: Invoice) => void;
  onViewPaidHistory: () => void;
  isPaidStateOverride?: boolean;
}

export const RenterHomeScreen: React.FC<RenterHomeScreenProps> = ({
  vehicle,
  activeInvoice,
  onPayPix,
  onViewPaidHistory,
  isPaidStateOverride = false,
}) => {
  const [isSimulatingPaid, setIsSimulatingPaid] = useState(isPaidStateOverride);
  const [pixToastVisible, setPixToastVisible] = useState(false);
  const [supportToastVisible, setSupportToastVisible] = useState(false);

  // If there's no active invoice or toggle is set to paid:
  const isPaidView = isSimulatingPaid || !activeInvoice;

  const handleQuickPixClick = () => {
    if (activeInvoice) {
      onPayPix(activeInvoice);
    }
  };

  const handleSupportClick = () => {
    setSupportToastVisible(true);
    setTimeout(() => setSupportToastVisible(false), 3000);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-24 max-w-[430px] mx-auto select-none">
      {/* Driver Greeting and Active Contract Badge */}
      <section className="flex items-center justify-between mt-2 mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-[#c6c6c7] font-body">Bem-vindo de volta</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
          </div>
          <h2 className="text-[24px] font-semibold text-white tracking-tight font-geist">
            Olá, Gabriel
          </h2>
        </div>
        <div className="flex items-center gap-1.5 bg-[#181A1F] border border-[#2A2E37]/80 px-3 py-1.5 rounded-full shadow-sm">
          <span
            className="material-symbols-outlined text-[#4ADE80] text-[16px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span className="text-[11px] font-semibold text-[#e3e2e5] uppercase tracking-wider font-geist">
            Contrato Ativo
          </span>
        </div>
      </section>

      {/* Main Interactive Invoice Hero Card */}
      {!isPaidView && activeInvoice ? (
        /* STATE 1: Invoice Pending / A Vencer */
        <section className="relative w-full mb-4">
          <div
            id="invoice-pending-state"
            className="relative overflow-hidden rounded-xl bg-[#181A1F] p-4 shadow-xl flex flex-col justify-between border border-[#2A2E37]/80"
          >
            {/* Subtle Decorative Ambient Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#d0f03b]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-start justify-between relative z-10 mb-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-widest font-body">
                  Cobrança Semanal
                </span>
                <h3 className="text-[16px] font-semibold text-[#e3e2e5] font-geist">
                  Próxima Fatura
                </h3>
              </div>
              <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#2A2415] text-[#FACC15] uppercase tracking-wider flex items-center gap-1.5 font-geist border border-[#FACC15]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" />
                A Vencer
              </span>
            </div>

            {/* Impressive Value & Expiry Badges */}
            <div className="flex flex-col gap-2 relative z-10 mb-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[14px] text-[#c6c6c7] font-body">R$</span>
                <span className="text-[32px] font-semibold text-white tracking-tight font-geist tabular-nums">
                  550,00
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-[#1F2228] px-2.5 py-1 rounded-md border border-[#2A2E37]/60">
                  <span className="material-symbols-outlined text-[#c6c6c7] text-[16px]">
                    calendar_today
                  </span>
                  <span className="text-[12px] text-[#e3e2e5] font-medium font-body">
                    03 nov
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#2E1517] text-[#F87171] flex items-center gap-1 font-geist border border-[#F87171]/20">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  Vence hoje
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#1f2022] text-[#c6c6c7] tracking-widest uppercase font-mono border border-[#2A2E37]/60">
                  BRA2E19
                </span>
              </div>
            </div>

            {/* Dominant Action Button: Pay with Pix */}
            <div className="relative z-10 flex flex-col gap-1">
              <button
                type="button"
                id="btn-pay-pix"
                onClick={handleQuickPixClick}
                className="w-full h-[52px] bg-[#d0f03b] text-[#181e00] rounded-xl flex items-center justify-center gap-2 font-semibold text-[16px] active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(208,240,59,0.25)] hover:brightness-105 cursor-pointer font-geist"
              >
                {/* Pix official diamond SVG */}
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M407.5 352.5l-84.9 84.9c-36.6 36.6-96 36.6-132.6 0l-85.6-85.6c-36.6-36.6-36.6-96 0-132.6l85.6-85.6c36.6-36.6 96-36.6 132.6 0l84.9 84.9c13.7 13.7 35.9 13.7 49.6 0s13.7-35.9 0-49.6l-84.9-84.9c-64-64-167.8-64-231.8 0L24.8 169.6c-64 64-64 167.8 0 231.8l85.6 85.6c64 64 167.8 64 231.8 0l84.9-84.9c13.7-13.7 13.7-35.9 0-49.6-13.7-13.7-35.9-13.7-49.6 0z" />
                  <path d="M256 195.9l-60.1 60.1 60.1 60.1 60.1-60.1L256 195.9z" />
                </svg>
                <span>Pagar com Pix</span>
              </button>

              {pixToastVisible && (
                <p className="text-center text-[11px] font-medium text-[#d0f03b] animate-fadeIn mt-1 font-geist">
                  Código Pix Copia e Cola gerado com sucesso!
                </p>
              )}
            </div>
          </div>
        </section>
      ) : (
        /* STATE 2: All Cleared / Zero Invoices (Tudo em dia!) */
        <section className="relative overflow-hidden rounded-xl bg-[#181A1F] p-4 shadow-xl border border-[#2A2E37]/80 mb-4">
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#4ADE80]/10 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col gap-3">
            {/* Badge Row */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1F2228] text-[#4ADE80] text-[11px] font-semibold font-geist border border-[#2A2E37]/60">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  military_tech
                </span>
                PONTUALIDADE 100%
              </span>
              <span className="text-[11px] font-medium text-[#c6c6c7] tracking-wider uppercase font-body">
                STATUS SEMANAL
              </span>
            </div>

            {/* Icon & Headline Block */}
            <div className="flex items-start gap-3 pt-1">
              <div className="w-12 h-12 rounded-xl bg-[#12231A] text-[#4ADE80] flex items-center justify-center shrink-0 shadow-inner border border-[#4ADE80]/20">
                <span
                  className="material-symbols-outlined text-[26px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <h3 className="text-[18px] font-semibold text-white leading-tight font-geist">
                  Tudo em dia!
                </h3>
                <p className="text-[13px] text-[#c6c6c7] leading-snug font-body">
                  Nenhuma cobrança pendente para esta semana. Você está com histórico impecável.
                </p>
              </div>
            </div>

            {/* Micro Info Strip: Next Scheduled Charge */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0C0E] mt-1 border border-[#1F2228]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c6c6c7] text-[18px]">
                  calendar_today
                </span>
                <span className="text-[12px] text-[#c6c6c7] font-body">
                  Próxima fatura prevista
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-white font-geist">10 nov</span>
                <span className="text-[11px] text-[#c6c6c7] font-body">(Segunda)</span>
              </div>
            </div>

            {/* Secondary Action: View Paid History */}
            <button
              type="button"
              onClick={onViewPaidHistory}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg bg-[#1F2228] hover:bg-[#292a2c] active:scale-[0.99] transition-all text-left cursor-pointer border border-[#2A2E37]/60"
            >
              <div className="flex items-center gap-2 text-white text-[13px] font-medium font-body">
                <span className="material-symbols-outlined text-[#c6c6c7] text-[18px]">
                  receipt_long
                </span>
                <span>Ver histórico de faturas pagas</span>
              </div>
              <span className="material-symbols-outlined text-[#c6c6c7] text-[18px]">
                chevron_right
              </span>
            </button>
          </div>
        </section>
      )}

      {/* Contract Specs Strip */}
      <section className="w-full bg-[#181A1F]/70 backdrop-blur-sm rounded-xl px-4 py-2.5 mb-4 shadow-sm border border-[#2A2E37]/60">
        <div className="grid grid-cols-3 divide-x divide-[#1F2228] text-center items-center">
          <div className="flex flex-col px-1">
            <span className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body">
              Veículo
            </span>
            <span className="text-[13px] text-white font-semibold tracking-wider font-mono">
              {vehicle.plate}
            </span>
          </div>
          <div className="flex flex-col px-1">
            <span className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body">
              Ciclo
            </span>
            <span className="text-[13px] text-white font-medium font-body">
              {vehicle.currentCycle}
            </span>
          </div>
          <div className="flex flex-col px-1">
            <span className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body">
              Acordo
            </span>
            <span className="text-[13px] text-white font-medium truncate font-body">
              {vehicle.weeklyRate}
            </span>
          </div>
        </div>
      </section>

      {/* Allocated Vehicle Section with Photo Showcase */}
      <section className="flex flex-col gap-2 mb-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body">
            Veículo Alocado
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4ADE80] font-body">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" /> Em operação
          </span>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-[#181A1F] p-4 shadow-lg flex flex-col gap-3 border border-[#2A2E37]/80">
          {/* Top Car Info & Plate */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <h4 className="text-[16px] font-semibold text-white truncate font-geist">
                {vehicle.model}
              </h4>
              <span className="text-[12px] text-[#c6c6c7] font-body">
                {vehicle.category} • {vehicle.transmission}
              </span>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#0B0C0E] border border-[#2A2E37] text-white text-[11px] font-semibold tracking-widest shrink-0 uppercase shadow-sm font-mono">
              {vehicle.plate}
            </div>
          </div>

          {/* Vehicle Photograph Container */}
          <div className="relative w-full h-32 rounded-lg overflow-hidden bg-[#0B0C0E] flex items-center justify-center border border-[#1F2228]">
            <img
              src={FIAT_CRONOS_IMAGE_URL}
              alt="Fiat Cronos Drive 1.3"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              onError={(e) => {
                // Fallback elegant car silhouette in case network fails
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#0B0C0E]/80 backdrop-blur-md text-[#c6c6c7] text-[11px] font-medium font-body border border-[#2A2E37]/60">
              Odômetro: {vehicle.odometer}
            </div>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex flex-col p-2 rounded-lg bg-[#0B0C0E] border border-[#1F2228]">
              <span className="text-[11px] text-[#c6c6c7] uppercase font-body">Ciclo Atual</span>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="material-symbols-outlined text-[#c6c6c7] text-[14px]">
                  date_range
                </span>
                <span className="text-[13px] text-white font-medium font-body">01 - 08 nov</span>
              </div>
            </div>
            <div className="flex flex-col p-2 rounded-lg bg-[#0B0C0E] text-right items-end border border-[#1F2228]">
              <span className="text-[11px] text-[#c6c6c7] uppercase font-body">Valor Contratado</span>
              <div className="flex items-baseline gap-1 pt-0.5">
                <span className="text-[16px] font-semibold text-white font-geist">R$ 550</span>
                <span className="text-[12px] text-[#c6c6c7] font-body">/sem</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Support and Roadside Assistance Card */}
      <section className="flex items-center justify-between p-3.5 rounded-xl bg-[#181A1F] border border-[#2A2E37]/80 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1F2228] flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-medium text-white leading-tight font-geist">
              Suporte 24h & Guincho
            </span>
            <span className="text-[12px] text-[#c6c6c7] leading-tight font-body">
              Assistência rodoviária ativa
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSupportClick}
          className="px-3.5 py-1.5 rounded-full bg-[#1F2228] hover:bg-[#292a2c] active:scale-95 transition-all text-white text-[12px] font-medium flex items-center gap-1 border border-[#2A2E37] cursor-pointer font-body"
        >
          <span>Acionar</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </section>

      {/* Micro-callout / Flow Simulation State Toggle */}
      <section className="w-full bg-[#181A1F]/40 border border-[#2A2E37]/50 rounded-xl p-3.5 flex flex-col gap-1.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#d0f03b]">tune</span>
            <span className="text-[11px] font-medium text-[#c6c6c7] tracking-wider uppercase font-body">
              Simulação de Fluxo
            </span>
          </div>
          <button
            type="button"
            id="toggle-state-btn"
            onClick={() => setIsSimulatingPaid(!isPaidView)}
            className="text-[11px] font-semibold text-[#d0f03b] hover:underline flex items-center gap-1 cursor-pointer font-geist"
          >
            <span>Alternar estado</span>
            <span className="material-symbols-outlined text-[13px]">cached</span>
          </button>
        </div>
        <p className="text-[12px] text-[#c6c6c7] leading-relaxed font-body">
          {isPaidView
            ? 'Exibindo estado "Tudo em dia" com selo de pontualidade 100% e foto do veículo.'
            : 'Se não houver débitos, o cartão adota visual calmo com selo verde pastel e atalho para o recibo histórico.'}
        </p>
      </section>

      {/* Toast Feedback for Support */}
      {supportToastVisible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1F2228] border border-[#2A2E37] text-white px-4 py-2 rounded-full shadow-2xl text-[13px] flex items-center gap-2 animate-fadeIn font-body">
          <span className="material-symbols-outlined text-[#4ADE80] text-[18px]">phone_in_talk</span>
          <span>Central 24h acionada: 0800 770 2000</span>
        </div>
      )}
    </div>
  );
};
