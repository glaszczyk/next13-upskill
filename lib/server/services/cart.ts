import { cartsData } from "@/lib/server/data/cart";
import { type ICart, type ICartItem, type ICartService } from "@/lib/server/models/carts";
import { type IGlobalInstance, initializeService } from "@/lib/server/utils/initializeService";

export class CartService implements ICartService {
	constructor(private carts: ICart[]) {}

	getCart(userId: number) {
		const cart = this.carts.find((cart) => cart.userId === userId);

		if (!cart) {
			throw new Error("Cart not found");
		}

		return cart.items;
	}

	updateCart(userId: number, cartItems: ICartItem[]) {
		const cart = this.carts.findIndex((cart) => cart.userId === userId);

		if (cart === -1) {
			this.carts.push({ userId, items: cartItems });
			return;
		}

		this.carts[cart].items = cartItems;
	}

	clearCart(userId: number) {
		const cart = this.carts.findIndex((cart) => cart.userId === userId);

		if (cart === -1) {
			throw new Error("Cart not found");
		}

		this.carts.splice(cart, 1);
	}
}

const globalCart = global as unknown as IGlobalInstance<CartService>;

const cart = initializeService(CartService, cartsData, globalCart, "cart");

export default cart;
