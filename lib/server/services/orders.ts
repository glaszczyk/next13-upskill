import { ordersData } from "@/lib/server/data/orders";
import { type IOrder, type IOrderItem, type IOrderService } from "@/lib/server/models/orders";
import products from "@/lib/server/services/products";
import { type IProductService } from "@/lib/server/models/products";
import { type IGlobalInstance, initializeService } from "@/lib/server/utils/initializeService";

class OrdersService implements IOrderService {
	constructor(
		private orders: IOrder[],
		private productsService: IProductService,
	) {}

	getOrders(userId: number) {
		const ordersList = this.orders.filter((order) => order.userId === userId);

		if (ordersList.length === 0) {
			throw new Error("Orders not found");
		}

		return ordersList;
	}

	createOrder(userId: number, items: IOrderItem[]) {
		items.forEach((item) => {
			this.productsService.setStock(item.productId, item.quantity);
		});

		const orderId = this.orders.length + 1;
		const date = new Date().toISOString();

		this.orders.push({
			orderId,
			userId,
			date,
			items,
		});
	}
}

const globalOrders = global as unknown as IGlobalInstance<OrdersService>;

const orders = initializeService(
	OrdersService,
	ordersData,
	globalOrders,
	"ordersService",
	products,
);

export default orders;
