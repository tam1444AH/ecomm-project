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
}