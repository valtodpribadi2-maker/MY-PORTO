export interface Donation {
  id: string;
  sender: string;
  amount: number;
  message: string;
  paymentMethod: string;
  timestamp: Date;
}

export interface StreamerProfile {
  username: string;
  displayName: string;
  bio: string;
  balance: number;
  donations: Donation[];
}
