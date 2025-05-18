export interface signUp {
    name: string,
    email: string,
    password: string,
}

export interface Login {
    email: string,
    password: string,
}

export interface Product {
    id: string,
    name: string,
    price: number,
    category: string,
    color: string,
    image: string,
    description: string,
    quantity: number | undefined,
    productId: string | undefined,
}

export interface Cart {
    id: string | undefined,
    name: string,
    price: number,
    category: string,
    color: string,
    image: string,
    description: string,
    quantity: number | undefined,
    productId: string,
    userId: string,
}

export interface priceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number,
}

export interface Order {
    email: string,
    address: string,
    contact: string,
    totalPrice: number,
    userId: string;
    id: string | undefined,
}