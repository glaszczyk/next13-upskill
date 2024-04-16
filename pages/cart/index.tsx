import {
	type GetServerSideProps,
	type GetServerSidePropsContext,
	type InferGetServerSidePropsType,
} from "next";
import type { ReactElement } from "react";
import { getQuantity } from "@/helpers/getQuantity";
import { getProductData } from "@/helpers/getProductData";
import { type IProduct } from "@models/products";
import { type ICartItem } from "@models/carts";
import { getLoggedUserId } from "@/lib/server/utils/getLoginStatus";
import { Layout } from "@/components/index";
import { CartTableItemRow } from "@/components/CartTableItemRow";

const CartPage = ({
	cartItems,
	message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
										<CartTableItemRow key={item.productId} item={item} />
									))}
								</tbody>
							</table>
							<p>{message}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
	const userId = await getLoggedUserId(context.req);
	if (userId) {
		try {
			const response = await fetch(`${process.env.API_URL}/api/user/cart?userId=${userId}`);
			const data: ICartItem[] = await response.json();
			const productsPromises = data.map(async ({ productId }: { productId: number }) =>
				getProductData(productId.toString()),
			);
			const allProducts = await Promise.all(productsPromises);
			const cartItems = allProducts.map((product) => {
				const quantity = getQuantity(data, product.productId);
				return { ...product, quantity };
			});
			return { props: { cartItems } };
		} catch (error) {
			if (error instanceof Error) {
				return { props: { cartItems: [], message: error.message } };
			}
		}
	}
	return { props: { cartItems: [], message: "User not logged in" } };
}) satisfies GetServerSideProps<{
	cartItems: Partial<IProduct & { quantity: number; message?: string }>[];
	message?: string;
}>;

CartPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default CartPage;
