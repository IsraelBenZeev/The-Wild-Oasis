import type { ImageFileType } from './ImageFileType';

export type CabinType = {
  created_at: string;
  description: string;
  discount: number;
  id: number;
  // image: ImageFileType |string;
  image: File | string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
};
