export class DonationSummaryDto {
  total: {
    count: number;
    amount: number;
  };
  today: {
    count: number;
    amount: number;
  };
}

export class MonthlyDonationDto {
  month: number;
  count: number;
  totalAmount: number;
}

export class TopDonorDto {
  donorName: string;
  donorEmail: string;
  donationCount: number;
  totalAmount: number;
} 