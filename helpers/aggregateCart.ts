import type { ICartItem } from "@models/carts";

export const aggregateCart = (userCart: ICartItem[], product: Pick<ICartItem, "productId">) => {
	const isInCart = userCart.some(({ productId }) => productId === product.productId);
	let updatedCart = [] as ICartItem[];
	if (isInCart) {
		updatedCart = userCart.reduce((acc, current) => {
			return current.productId === product.productId
				? [...acc, { productId: current.productId, quantity: current.quantity + 1 }]
				: [...acc, { productId: current.productId, quantity: current.quantity }];
		}, [] as ICartItem[]);
	} else {
		updatedCart = [...userCart, { productId: product.productId, quantity: 1 }];
	}
	return updatedCart;
};
