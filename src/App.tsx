import React, { useState } from 'react';
import {
  DEFAULT_VEHICLE,
  INITIAL_OWNER_INVOICES,
  INITIAL_RENTER_INVOICES,
} from './data/mockData';
import { Invoice, ScreenId, UserRole } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OwnerInvoiceDrawer } from './components/OwnerInvoiceDrawer';
import { QuickScreenSwitcher } from './components/QuickScreenSwitcher';
import { LoginScreen } from './components/Screens/LoginScreen';
import { RenterHomeScreen } from './components/Screens/RenterHomeScreen';
import { RenterBillsScreen } from './components/Screens/RenterBillsScreen';
import { PaymentScreen } from './components/Screens/PaymentScreen';
import { PaymentSuccessScreen } from './components/Screens/PaymentSuccessScreen';
import { OwnerHomeScreen } from './components/Screens/OwnerHomeScreen';
import { OwnerBillsScreen } from './components/Screens/OwnerBillsScreen';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>('renter');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('login');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  // Data states
  const [renterInvoices, setRenterInvoices] = useState<Invoice[]>(INITIAL_RENTER_INVOICES);
  const [ownerInvoices, setOwnerInvoices] = useState<Invoice[]>(INITIAL_OWNER_INVOICES);

  // Navigation targets
  const [paymentInvoice, setPaymentInvoice] = useState<Invoice>(INITIAL_RENTER_INVOICES[0]);
  const [drawerInvoice, setDrawerInvoice] = useState<Invoice | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Active open invoice for renter
  const activeRenterInvoice = renterInvoices.find((i) => i.status === 'aberta') || null;

  // Handlers
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'renter') {
      setCurrentScreen('renter_home');
    } else {
      setCurrentScreen('owner_home');
    }
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const handleStartPayment = (invoice: Invoice) => {
    setPaymentInvoice(invoice);
    setCurrentScreen('payment');
  };

  const handlePaymentCompleted = (invoice: Invoice) => {
    // Update invoice status to 'paga'
    setRenterInvoices((prev) =>
      prev.map((item) =>
        item.id === invoice.id
          ? {
              ...item,
              status: 'paga',
              paidAt: '03 nov',
              transactionId: 'E92817401928',
            }
          : item
      )
    );

    // Also update owner invoices if plate matches
    setOwnerInvoices((prev) =>
      prev.map((item) =>
        item.plate === invoice.plate && item.status === 'aberta'
          ? { ...item, status: 'paga' }
          : item
      )
    );

    setPaymentInvoice({
      ...invoice,
      status: 'paga',
      transactionId: 'E92817401928',
    });

    setCurrentScreen('payment_success');
  };

  const handleReturnHomeAfterPayment = () => {
    setCurrentScreen('renter_home');
  };

  const handleSelectOwnerInvoice = (inv: Invoice) => {
    setDrawerInvoice(inv);
    setDrawerOpen(true);
  };

  const handleResetData = () => {
    setRenterInvoices(INITIAL_RENTER_INVOICES);
    setOwnerInvoices(INITIAL_OWNER_INVOICES);
    setPaymentInvoice(INITIAL_RENTER_INVOICES[0]);
    setDrawerOpen(false);
  };

  // Determine header title and back button
  let headerTitle = 'BLACKCAR';
  let showHeader = true;
  let showBackInHeader = false;
  let onBackAction: (() => void) | undefined = undefined;

  if (currentScreen === 'login') {
    showHeader = false;
  } else if (currentScreen === 'renter_home' || currentScreen === 'renter_home_paid') {
    headerTitle = 'Renter Home';
  } else if (currentScreen === 'renter_bills') {
    headerTitle = 'Renter Bills';
  } else if (currentScreen === 'payment') {
    headerTitle = 'Pagamento';
    showBackInHeader = true;
    onBackAction = () => setCurrentScreen('renter_home');
  } else if (currentScreen === 'payment_success') {
    showHeader = false;
  } else if (currentScreen === 'owner_home') {
    headerTitle = 'Owner Home';
  } else if (currentScreen === 'owner_bills') {
    headerTitle = 'Owner Bills';
  }

  // Active bottom navigation tab
  const activeNavTab: 'inicio' | 'contas' =
    currentScreen === 'renter_bills' || currentScreen === 'owner_bills'
      ? 'contas'
      : 'inicio';

  const handleTabChange = (tab: 'inicio' | 'contas') => {
    if (userRole === 'renter') {
      if (tab === 'inicio') setCurrentScreen('renter_home');
      else setCurrentScreen('renter_bills');
    } else {
      if (tab === 'inicio') setCurrentScreen('owner_home');
      else setCurrentScreen('owner_bills');
    }
  };

  const showBottomNav =
    currentScreen === 'renter_home' ||
    currentScreen === 'renter_home_paid' ||
    currentScreen === 'renter_bills' ||
    currentScreen === 'owner_home' ||
    currentScreen === 'owner_bills';

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#e3e2e5] font-body flex flex-col justify-center items-center relative overflow-x-hidden">
      {/* Dev / Quick Screen Switcher Banner */}
      <QuickScreenSwitcher
        currentScreen={currentScreen}
        userRole={userRole}
        isMobileFrame={isMobileFrame}
        onSelectScreen={(s) => {
          setCurrentScreen(s);
          if (s === 'owner_home' || s === 'owner_bills') {
            setUserRole('owner');
          } else if (s !== 'login') {
            setUserRole('renter');
          }
        }}
        onToggleRole={(role) => {
          setUserRole(role);
          if (role === 'owner') setCurrentScreen('owner_home');
          else setCurrentScreen('renter_home');
        }}
        onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        onResetData={handleResetData}
      />

      {/* Main Viewport Container: Styled Phone Shell on Desktop or Edge-to-Edge */}
      <div
        className={`w-full transition-all duration-300 relative min-h-screen flex flex-col justify-between ${
          isMobileFrame
            ? 'max-w-[420px] my-4 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_0_12px_#181A1F] overflow-hidden border border-[#2A2E37] bg-[#0B0C0E]'
            : 'max-w-xl mx-auto bg-[#0B0C0E]'
        }`}
      >
        {/* Dynamic Header */}
        {showHeader && (
          <Header
            title={headerTitle}
            showBack={showBackInHeader}
            onBack={onBackAction}
            onLogout={handleLogout}
            onProfileClick={() => {
              // Switch role on avatar tap for rapid demonstration
              setUserRole(userRole === 'renter' ? 'owner' : 'renter');
              setCurrentScreen(userRole === 'renter' ? 'owner_home' : 'renter_home');
            }}
          />
        )}

        {/* Dynamic Screen Contents */}
        <main className="flex-1 w-full flex flex-col">
          {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}

          {currentScreen === 'renter_home' && (
            <RenterHomeScreen
              vehicle={DEFAULT_VEHICLE}
              activeInvoice={activeRenterInvoice}
              onPayPix={handleStartPayment}
              onViewPaidHistory={() => setCurrentScreen('renter_bills')}
              isPaidStateOverride={false}
            />
          )}

          {currentScreen === 'renter_home_paid' && (
            <RenterHomeScreen
              vehicle={DEFAULT_VEHICLE}
              activeInvoice={activeRenterInvoice}
              onPayPix={handleStartPayment}
              onViewPaidHistory={() => setCurrentScreen('renter_bills')}
              isPaidStateOverride={true}
            />
          )}

          {currentScreen === 'renter_bills' && (
            <RenterBillsScreen
              invoices={renterInvoices}
              onPayInvoice={handleStartPayment}
            />
          )}

          {currentScreen === 'payment' && (
            <PaymentScreen
              invoice={paymentInvoice}
              onPaymentComplete={handlePaymentCompleted}
              onBack={() => setCurrentScreen('renter_home')}
            />
          )}

          {currentScreen === 'payment_success' && (
            <PaymentSuccessScreen
              invoice={paymentInvoice}
              onReturnHome={handleReturnHomeAfterPayment}
            />
          )}

          {currentScreen === 'owner_home' && (
            <OwnerHomeScreen
              overdueInvoices={ownerInvoices.filter((i) => i.status === 'atrasada')}
              onSelectInvoice={handleSelectOwnerInvoice}
              onNavigateToContas={() => setCurrentScreen('owner_bills')}
            />
          )}

          {currentScreen === 'owner_bills' && (
            <OwnerBillsScreen
              invoices={ownerInvoices}
              onSelectInvoice={handleSelectOwnerInvoice}
            />
          )}
        </main>

        {/* Dynamic Thumb-Zone Bottom Navigation */}
        {showBottomNav && (
          <BottomNav activeTab={activeNavTab} onTabChange={handleTabChange} />
        )}

        {/* Read-only Invoice Drawer for Owner Mode */}
        <OwnerInvoiceDrawer
          invoice={drawerInvoice}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </div>
  );
}
