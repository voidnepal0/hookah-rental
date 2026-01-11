export interface Prodcut {
    id: number;
    name: string;
    description: string;
    price: {
        amount: number;
        duration: string;
    }[];
    image: string;
    tag: string;
    category: string;
    inStock: boolean;
    rating: number;
    reviews: number;
    features: string[];
    materials: string[]
}