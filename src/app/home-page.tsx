"use client";

import { ProductsListItem } from "@src/components/index";

const productsListData = {
	products: [
		{
			productId: 1,
			title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
			price: 109.95,
			description:
				"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
			category: "men's clothing",
			image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
			stock: 3,
		},
		{
			productId: 3,
			title: "Mens Cotton Jacket",
			price: 55.99,
			description:
				"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
			category: "men's clothing",
			image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
			stock: 1,
		},
		{
			productId: 4,
			title: "Mens Casual Slim Fit",
			price: 15.99,
			description:
				"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
			category: "men's clothing",
			image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
			stock: 3,
		},
	],
};

export default function HomePage() {
	return (
		<>
			<div>
				<h1 className="pb-6 font-sans text-3xl font-bold text-gray-800 dark:text-white">
					Our fresh products!
				</h1>
				<ul className="grid grid-cols-3 gap-4">
					{productsListData.products.map((product) => (
						<ProductsListItem key={product.productId} product={product} />
					))}
				</ul>
				<div className="my-9 flex w-full justify-center">
					<a
						href="/products"
						className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-teal-500 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-600 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
					>
						Check more
					</a>
				</div>
			</div>
		</>
	);
}
