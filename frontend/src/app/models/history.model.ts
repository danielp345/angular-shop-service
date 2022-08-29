export interface HistoryItem {
  userId: string;
  date: Date;
  order: historyProduct[];
}

export interface HistoryItemWithId {
  id: string;
  userId: string;
  date: Date;
  order: historyProduct[];
}

interface historyProduct {
  title: string;
  amount: number;
  priceOfProduct: number;
}
