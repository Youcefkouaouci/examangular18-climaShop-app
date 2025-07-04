import { Feature } from './feature';

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  fullPrice: number;
  discountPercent: number;
  category: string;
  features: Feature[];
}
