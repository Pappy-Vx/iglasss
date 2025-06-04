export interface BannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  discount?: string;
}

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  discount?: number;
}

export interface CategoryCardProps {
  id: string;
  name: string;
  imageUrl: string;
  itemCount: number;
}
