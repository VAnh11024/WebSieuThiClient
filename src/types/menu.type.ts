export interface MenuCombo {
  id: number;
  name: string;
  description: string;
  price: number;
  status: number; // 1 = đang bán, 0 = ngừng bán
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  price: number;
  image_url: string;
  available: boolean;
}

export interface MenuComboWithIngredients extends MenuCombo {
  ingredients?: Ingredient[];
  isLoadingIngredients?: boolean;
}
