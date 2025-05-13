import { Product } from "../models/Product";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    category: "Electronics",
    price: 99.99,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://picsum.photos/200/200?random=1",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Clothing",
    price: 49.99,
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://picsum.photos/200/200?random=2",
  },
];