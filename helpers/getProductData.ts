import type { IProduct } from "@models/products";

export const getProductData = async (productId: string) => {
	const response = await fetch(`${process.env.API_URL}/api/products/${productId}`);
	const result: Partial<IProduct & { message?: string }> = await response.json();
	return result;
};
