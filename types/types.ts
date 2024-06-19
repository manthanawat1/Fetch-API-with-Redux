export interface IProduct {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  discountedPrice: number | null;
  rating?: number;
  thumbnail: string;
}

export interface IStateStore {
  products: IProduct[];
  productTotal: number;
}

export interface IFetchProducts {
  limit: number;
  skip: number;
}
