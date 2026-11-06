import React, { useState } from 'react';
import { Invoice } from '../../types';
import { ReceiptModal } from '../ReceiptModal';

interface RenterBillsScreenProps {
  invoices: Invoice[];
  onPayInvoice: (invoice: Invoice) => void;
}

export const RenterBillsScreen: React.FC<RenterBillsScreenProps> = ({
  invoices,
  onPayInvoice,
}) => {
  const [selectedReceipt, setSelectedReceipt] = useState<Invoice | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'paid'>('all');

  const openReceipt = (inv: Invoice) => {
    setSelectedReceipt(inv);
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (filterMode === 'pending') return inv.status === 'aberta' || inv.status === 'atrasada';
    if (filterMode === 'paid') return inv.status === 'paga';
    return true;
  });

  const totalPending = invoices
    .filter((inv) => inv.status === 'aberta' || inv.status === 'atrasada')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const overdueCount = invoices.filter((inv) => inv.status === 'atrasada').length;

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-24 max-w-[430px] mx-auto select-none">
      {/* Executive Summary Card & Compact Status */}
      <section className="mt-2 bg-[#1f2022] rounded-xl p-4 flex flex-col gap-3 shadow-md border border-[#2A2E37]/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#d0f03b] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance_wallet
            </span>
            <h2 className="text-[16px] font-semibold text-white font-geist">
              Minhas Contas
            </h2>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#1F2228] text-[#c6c6c7] uppercase tracking-wider font-geist border border-[#2A2E37]/60">
            Locação #BC-8924
          </span>
        </div>

        {/* Micro Metrics / Financial Summary */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-[#181A1F] p-3 rounded-xl flex flex-col border border-[#2A2E37]/60">
            <span className="text-[11px] font-medium text-[#c6c6c7] font-body">
              Total Pendente
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[20px] font-semibold text-[#FACC15] font-geist tabular-nums">
                R$ {totalPending > 0 ? totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
              </span>
            </div>
            <span className="text-[12px] text-[#F87171] flex items-center gap-1 mt-0.5 font-body">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              {overdueCount} {overdueCount === 1 ? 'vencida' : 'vencidas'}
            </span>
          </div>

          <div className="bg-[#181A1F] p-3 rounded-xl flex flex-col justify-between border border-[#2A2E37]/60">
            <div>
              <span className="text-[11px] font-medium text-[#c6c6c7] font-body">
                Pontualidade
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[20px] font-semibold text-white font-geist">
                  94%
                </span>
              </div>
            </div>
            <span className="text-[12px] text-[#4ADE80] flex items-center gap-1 mt-0.5 font-body">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Nível Diamante
            </span>
          </div>
        </div>
      </section>

      {/* Filter Row */}
      <div className="flex items-center justify-between mt-6 mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-semibold text-white font-geist">
            Faturas Semanais
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#343537] text-white font-geist">
            {filteredInvoices.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (filterMode === 'all') setFilterMode('pending');
            else if (filterMode === 'pending') setFilterMode('paid');
            else setFilterMode('all');
          }}
          className="text-[13px] text-[#c6c6c7] hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-body"
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span>
            {filterMode === 'all'
              ? 'Filtrar (Todas)'
              : filterMode === 'pending'
              ? 'Pendentes'
              : 'Pagas'}
          </span>
        </button>
      </div>

      {/* Chronological List of Invoices */}
      <div className="flex flex-col gap-3">
        {filteredInvoices.map((inv) => {
          if (inv.status === 'aberta') {
            return (
              <article
                key={inv.id}
                className="bg-[#181A1F] rounded-xl p-4 shadow-sm flex flex-col gap-3 relative overflow-hidden border border-[#2A2E37]/80 active:scale-[0.99] transition-all"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FACC15]" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#2A2415] text-[#FACC15] uppercase tracking-wider flex items-center gap-1 font-geist border border-[#FACC15]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" />
                      Aberta
                    </span>
                    <span className="text-[13px] text-[#c6c6c7] font-body">{inv.period}</span>
                  </div>
                  <span className="text-[11px] text-[#c6c6c7] font-body">
                    Vence em {inv.dueDate}
                  </span>
                </div>

                <div className="flex items-end justify-between pt-1">
                  <div>
                    <span className="text-[11px] text-[#c6c6c7] block font-body">Valor Semanal</span>
                    <span className="text-[18px] font-semibold text-white font-geist tabular-nums">
                      {inv.amountFormatted}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPayInvoice(inv)}
                    className="min-h-[44px] px-4 bg-[#d0f03b] text-[#181e00] font-semibold text-[14px] rounded-lg flex items-center gap-1.5 shadow hover:bg-[#b4d418] transition-all active:scale-95 cursor-pointer font-geist"
                  >
                    <span>Pagar Fatura</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </article>
            );
          }

          if (inv.status === 'atrasada') {
            return (
              <article
                key={inv.id}
                onClick={() => onPayInvoice(inv)}
                className="cursor-pointer bg-[#181A1F] rounded-xl p-4 shadow-sm flex flex-col gap-3 relative overflow-hidden border border-[#2A2E37]/80 hover:bg-[#1F2228] active:scale-[0.99] transition-all"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F87171]" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#2E1517] text-[#F87171] uppercase tracking-wider flex items-center gap-1 font-geist border border-[#F87171]/20">
                      <span className="material-symbols-outlined text-[14px]">error</span>
                      Atrasada
                    </span>
                    <span className="text-[13px] text-[#c6c6c7] font-body">{inv.period}</span>
                  </div>
                  <span className="text-[11px] text-[#F87171] font-medium font-body">
                    Venceu em {inv.dueDate}
                  </span>
                </div>

                <div className="flex items-end justify-between pt-1">
                  <div>
                    <span className="text-[11px] text-[#c6c6c7] block font-body">Valor em Aberto</span>
                    <span className="text-[18px] font-semibold text-[#F87171] font-geist tabular-nums">
                      {inv.amountFormatted}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#F87171] text-[13px] font-medium bg-[#2E1517] px-3 py-1.5 rounded-lg border border-[#F87171]/20">
                    <span>Regularizar</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </div>
                </div>
              </article>
            );
          }

          // Paid invoice
          return (
            <article
              key={inv.id}
              onClick={() => openReceipt(inv)}
              className="cursor-pointer bg-[#1f2022] rounded-xl p-4 shadow-sm flex flex-col gap-2 opacity-90 hover:opacity-100 hover:bg-[#292a2c] active:scale-[0.99] transition-all border border-[#2A2E37]/60"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#12231A] text-[#4ADE80] uppercase tracking-wider flex items-center gap-1 font-geist border border-[#4ADE80]/20">
                    <span className="material-symbols-outlined text-[14px]">done_all</span>
                    Paga
                  </span>
                  <span className="text-[13px] text-[#c6c6c7] font-body">{inv.period}</span>
                </div>
                <span className="text-[11px] text-[#4ADE80] font-medium font-body">
                  Pago em {inv.paidAt || '18 out'}
                </span>
              </div>

              <div className="flex items-end justify-between pt-1">
                <div>
                  <span className="text-[11px] text-[#c6c6c7] block font-body">Total Quitado</span>
                  <span className="text-[18px] font-semibold text-[#e3e2e5] font-geist tabular-nums">
                    {inv.amountFormatted}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#c6c6c7] hover:text-white text-[13px] font-medium font-body">
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                  <span>Ver Comprovante</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty State / Peace of Mind Notice Card */}
      <section className="mt-6 bg-[#181A1F] rounded-xl p-4 flex items-center gap-3.5 shadow-sm border border-[#2A2E37]/60">
        <div className="w-12 h-12 rounded-full bg-[#12231A] border border-[#4ADE80]/20 flex items-center justify-center shrink-0">
          <span
            className="material-symbols-outlined text-[#4ADE80] text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            task_alt
          </span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-[15px] font-semibold text-white font-geist">
            Tudo sob controle!
          </h3>
          <p className="text-[12px] text-[#c6c6c7] font-body leading-relaxed">
            Seus comprovantes e recibos de pagamento com Pix ficam salvos e disponíveis para consulta a qualquer momento.
          </p>
        </div>
      </section>

      {/* Modal / Comprovante */}
      <ReceiptModal
        isOpen={Boolean(selectedReceipt)}
        onClose={() => setSelectedReceipt(null)}
        period={selectedReceipt?.period}
        amount={selectedReceipt?.amountFormatted}
        date={selectedReceipt?.paidAt || '18 out'}
        transactionId={selectedReceipt?.transactionId || 'E27491028472910'}
        vehicle={`${selectedReceipt?.vehicleModel || 'Fiat Cronos Drive 1.3'} (${selectedReceipt?.plate || 'BRA2E19'})`}
      />
    </div>
  );
};
