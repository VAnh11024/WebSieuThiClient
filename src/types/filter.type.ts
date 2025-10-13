export interface Filter {
  id: string;
  value: string;
  label: string;
  options: Option[];
}

export interface Option {
  value: string;
  label: string;
}
