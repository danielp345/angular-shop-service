export interface HistoryItem {
  userId: number;
  date: Date;
  order: historyProduct[];
}

export interface HistoryItemWithId {
  id: number;
  userId: number;
  date: Date;
  order: historyProduct[];
}

interface historyProduct {
  title: string;
  amount: number;
  priceOfProduct: number;
}
