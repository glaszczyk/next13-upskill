import type { ICartItem } from "@models/carts";

export const getQuantity = (data: ICartItem[], id?: number) =>
	data.find(({ productId }) => productId === id)?.quantity;
