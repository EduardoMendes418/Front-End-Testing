import { Product } from "../models/Product";

const API_URL = "https://jsonplaceholder.typicode.com";

interface ApiPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const transformPostToProduct = (post: ApiPost, index: number): Product => ({
  id: post.id,
  name: post.title || `Product ${post.id}`,
  category: index % 2 === 0 ? "Electronics" : "Clothing",
  price: parseFloat((Math.random() * 100).toFixed(2)),
  description: post.body,
  image: `https://picsum.photos/200/200?random=${post.id}`,
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts: ApiPost[] = await response.json();
    return posts.map((post, index) => transformPostToProduct(post, index));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: product.name,
        body: product.description,
        userId: 1, 
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const newPost: ApiPost = await response.json();
    
    return {
      ...product,
      id: newPost.id,
      image: product.image || `https://picsum.photos/200/200?random=${newPost.id}`,
    };
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};