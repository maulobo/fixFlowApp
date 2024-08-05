export interface CaracteristicasTecnicas {
  diametro: number;
  tono: string[];
  watt: number;
  lumen: number;
  acabado: string;
  cantidad: number;
  incluyeLed: boolean;
}

export interface Product {
  _id: string;
  code: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  image: string;
  active: boolean;
  created: string;
  __v: number;
  destacado?: boolean;
  caracteristicasTecnicas: CaracteristicasTecnicas;
}

export interface ChartData {
  totalProducts: number;
  lastFiveProducts: Product[];
  featuredProducts: number;
  categoryCount: { [key: string]: number };
}
