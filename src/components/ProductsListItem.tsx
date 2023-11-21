export type ProductsListItem = {
	productId: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	stock: number;
};

export type ProductsListItemProps = {
	product: ProductsListItem;
};

export const ProductsListItem = ({
	product: { category, description, productId, image, price, stock, title },
}: ProductsListItemProps) => {
	return (
		<li className="flex flex-col rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:shadow-slate-700/[.7]">
			<div className="mb-6 flex justify-start">
				<span className="inline-flex max-w-max items-center gap-x-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white dark:bg-blue-500">
					{category}
				</span>
			</div>
			<a href={`/products/${productId}`}>
				<img
					className="aspect-square h-auto  w-full rounded-t-xl object-contain"
					src={image}
					alt={description}
				/>
			</a>
			<div className="mt-6">
				<h2 className="mb-3 text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
				<p className="mt-1 text-gray-500 dark:text-gray-400">{description}</p>
				<p className="my-2 dark:text-white">
					<strong>{price}</strong>
				</p>
				<p className="my-3 dark:text-white">Available: {stock}</p>
				<button
					type="button"
					className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
				>
					Add to cart {productId}
				</button>
			</div>
		</li>
	);
};
