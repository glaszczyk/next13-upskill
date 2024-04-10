import type { ReactElement } from "react";
import { Layout } from "../../components/Layout";
import { type CartItem, CartTableItemRow } from "@/components/CartTableItemRow";

const cartItems: CartItem[] = [
	{
		price: 9,
		alt: "Great item",
		id: 1,
		image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
		quantity: 2,
		title: "Fjallraven - Foldsack No. 1 Backpack Fits 15 Laptops",
	},
	{
		id: 6,
		title: "Solid Gold Petite Micropave ",
		quantity: 1,
		price: 168,
		alt: "Satisfaction Guaranteed.",
		image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
	},
];

const CartPage = () => {
	return (
		<div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
			<div className="flex flex-col">
				<div className="-m-1.5 overflow-x-auto">
					<div className="inline-block min-w-full p-1.5 align-middle">
						<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead className="bg-gray-50 dark:bg-slate-800">
									<tr>
										<th scope="col" className="w-96 px-6 py-3 text-start">
											<div className="flex items-center gap-x-2">
												<span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
													Product
												</span>
											</div>
										</th>

										<th scope="col" className="w-36 px-6 py-3">
											<div className="flex items-center justify-center  gap-x-2">
												<span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
													Price per item
												</span>
											</div>
										</th>

										<th scope="col" className="w-36 px-6 py-3">
											<div className="flex items-center justify-center gap-x-2">
												<span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
													Quantity
												</span>
											</div>
										</th>

										<th scope="col" className="w-36 px-6 py-3">
											<div className="flex items-center justify-center  gap-x-2">
												<span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
													Product total
												</span>
											</div>
										</th>
										<th scope="col" className="px-6 py-3 text-start">
											<div className="flex items-center justify-center gap-x-2">
												<span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
													Delete product
												</span>
											</div>
										</th>
									</tr>
								</thead>

								<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
									{cartItems.map((item) => (
										<CartTableItemRow key={item.id} item={item} />
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CartPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default CartPage;
