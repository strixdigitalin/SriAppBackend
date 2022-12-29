export interface Plan {
  _id: string;
  planId: string;
  ItemId: string;
  interval: string;
  period: string;
  name: string;
  description: string;
  amount: number;
  unit_amount: number;
  currency: string;
  type: string;
  notes_key_1: string;
  notes_key_2: string;
}
