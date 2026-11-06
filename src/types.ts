export type UserRole = 'renter' | 'owner';

export type ScreenId =
  | 'login'
  | 'renter_home'
  | 'renter_home_paid'
  | 'renter_bills'
  | 'payment'
  | 'payment_success'
  | 'owner_home'
  | 'owner_bills';

export interface Invoice {
  id: string;
  clientName: string;
  plate: string;
  vehicleModel: string;
  contractId: string;
  period: string;
  dueDate: string;
  amount: number;
  amountFormatted: string;
  status: 'aberta' | 'atrasada' | 'paga';
  type: 'Locação semanal' | 'Mensalidade';
  overdueText?: string;
  daysLate?: number;
  daysUntilDue?: number;
  paidAt?: string;
  transactionId?: string;
  phone?: string;
  agreementRate?: string;
}

export interface Vehicle {
  model: string;
  category: string;
  plate: string;
  transmission: string;
  odometer: string;
  status: string;
  imageUrl: string;
  weeklyRate: string;
  currentCycle: string;
}
