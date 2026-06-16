export interface ServiceResponse {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  provider: {
    name: string;
  };
}
