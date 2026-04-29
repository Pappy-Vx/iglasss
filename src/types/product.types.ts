export interface AllProduct {
  id: number;
  name: string;
  category: string;
  image: string;
  new_price: number;
  old_price: number;
}

export interface GlassProduct {
    id: number;
    name: string;
    image: string;
    new_price: number;
    old_price: number;
    description?: string;
    brand?: string;
    type?: string;
}
