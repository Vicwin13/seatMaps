interface SeatingResponse {
  seating: {
    offers: Offer[];
    status: string;
    ttl: number;
  };
  session_id: string;
}

interface Offer {
  is_final: boolean;
  quick_options: QuickOption[];
  seatmap: SeatMap | null;
  segment_code: string;
}

interface QuickOption {
  option: string;
  price: Price;
}

interface Price {
  amount: string;
  currency: string;
  base: string;
  merchant: string;
  service: string;
  service_flat: string;
}

interface SeatMap {
  sections: Section[];
}

interface Section {
  deck: string;
  rows: Row[];
  section_class: string;
}

interface Row {
  row_number: number;
  seat_groups: SeatGroup[][];
}

interface SeatGroup {
  column: string;
  features: string[];
  name: string;
  price: Price;
  seat_class: string;
  state: string;
  type: string;
}

export type {
  SeatGroup,
  Row,
  Section,
  SeatMap,
  Price,
  Offer,
  QuickOption,
  SeatingResponse,
};
