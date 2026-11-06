import React, { useState } from 'react';
import { Invoice } from '../../types';

interface OwnerBillsScreenProps {
  invoices: Invoice[];
  onSelectInvoice: (invoice: Invoice) => void;
}

export const OwnerBillsScreen: React.FC<OwnerBillsScreenProps> = ({
  invoices,
  onSelectInvoice,
}) => {
  const [activeTab, setActiveTab] = useState<'open' | 'overdue'>('open');

  const openInvoices = invoices.filter((i) => i.status === 'aberta' || i.status === 'atrasada');
  const overdueInvoices = invoices.filter((i) => i.status === 'atrasada');

  const displayedInvoices = activeTab === 'open' ? openInvoices : overdueInvoices;

  const totalReceivable = invoices
    .filter((i) => i.status === 'aberta' || i.status === 'atrasada')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col w-full px-4 pt-20 pb-24 max-w-[430px] mx-auto select-none">
      {/* Status KPI Ticker Card */}
      <div className="mt-2 mb-3 p-4 rounded-xl bg-[#181A1F] flex items-center justify-between shadow-md border border-[#2A2E37]/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1f2022] flex items-center justify-center text-[#d0f03b] border border-[#2A2E37]/60">
            <span className="material-symbols-outlined text-[22px]">payments</span>
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#c6c6c7] uppercase tracking-wider font-body">
              A Receber Total
            </p>
            <p className="text-[20px] font-semibold text-white font-geist tabular-nums">
              R$ {totalReceivable.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E1517] text-[#F87171] text-[11px] font-semibold font-geist border border-[#F87171]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F87171] animate-pulse" />
            {overdueInvoices.length} em atraso
          </div>
        </div>
      </div>

      {/* Segmented Control Navigation */}
      <div
        className="p-1 rounded-xl bg-[#1f2022] flex gap-1 mb-4 select-none shadow-sm border border-[#2A2E37]/60"
        role="tablist"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'open'}
          onClick={() => setActiveTab('open')}
          className={`flex-1 py-2 rounded-lg text-center font-medium text-[14px] transition-all flex items-center justify-center gap-2 cursor-pointer font-geist ${
            activeTab === 'open'
              ? 'bg-[#1F2228] text-white shadow-sm border border-[#2A2E37]'
              : 'text-[#c6c6c7] hover:text-white'
          }`}
        >
          <span>Abertas</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold font-geist ${
              activeTab === 'open'
                ? 'bg-[#292a2c] text-white'
                : 'bg-[#181A1F] text-[#c6c6c7]'
            }`}
          >
            {openInvoices.length}
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'overdue'}
          onClick={() => setActiveTab('overdue')}
          className={`flex-1 py-2 rounded-lg text-center font-medium text-[14px] transition-all flex items-center justify-center gap-2 cursor-pointer font-geist ${
            activeTab === 'overdue'
              ? 'bg-[#1F2228] text-white shadow-sm border border-[#2A2E37]'
              : 'text-[#c6c6c7] hover:text-white'
          }`}
        >
          <span>Atrasadas</span>
          <span className="px-2 py-0.5 rounded-full bg-[#2E1517] text-[#F87171] text-[11px] font-semibold font-geist border border-[#F87171]/20">
            {overdueInvoices.length}
          </span>
        </button>
      </div>

      {/* Billing List Container */}
      <div className="flex flex-col gap-2.5">
        {displayedInvoices.map((inv) => {
          const isOverdue = inv.status === 'atrasada';
          const isDueToday = inv.dueDate.toLowerCase().includes('03 nov');

          return (
            <div
              key={inv.id}
              onClick={() => onSelectInvoice(inv)}
              className="cursor-pointer p-4 rounded-xl bg-[#181A1F] hover:bg-[#1F2228] transition-all duration-200 active:scale-[0.99] shadow-sm flex flex-col gap-2.5 border border-[#2A2E37]/80"
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[15px] font-semibold text-white truncate font-geist">
                    {inv.clientName}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1f2022] text-[#c6c6c7] text-[10px] font-semibold tracking-wider font-mono border border-[#2A2E37]/60">
                    {inv.plate}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[16px] font-semibold text-white font-geist tabular-nums">
                    {inv.amountFormatted}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[#c6c6c7]">
                <div className="flex items-center gap-1.5 text-[12px] font-body">
                  <span className="material-symbols-outlined text-[15px] text-[#c6c6c7]">
                    {isDueToday ? 'schedule' : 'event'}
                  </span>
                  <span>
                    {isOverdue ? `Venceu em ${inv.dueDate}` : `Vence em ${inv.dueDate}`}
                  </span>
                </div>

                {isOverdue ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#2E1517] text-[#F87171] font-geist border border-[#F87171]/20">
                    {inv.overdueText || 'Atrasada'}
                  </span>
                ) : isDueToday ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#2A2415] text-[#FACC15] font-geist border border-[#FACC15]/20">
                    A vencer hoje
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#12231A] text-[#4ADE80] font-geist border border-[#4ADE80]/20">
                    {inv.overdueText || 'A vencer'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
