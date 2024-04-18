import Image from "next/image";
import { type ICartItem } from "@models/carts";
import { type IProduct } from "@models/products";

type ProductItemProps = {
	product: IProduct;
	addToCart: (product: Pick<ICartItem, "productId">) => void;
};

export const ProductItem = ({
	product: { category, description, image, price, productId, stock, title },
	addToCart,
}: ProductItemProps) => {
	return (
		<div className="rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:shadow-slate-700/[.7] sm:flex">
			<div className="relative w-full flex-shrink-0 overflow-hidden rounded-t-xl sm:max-w-[15rem] sm:rounded-s-xl md:max-w-md md:rounded-se-none">
				<Image
					className="start-0 top-0 aspect-square object-contain p-6"
					src={image}
					alt={description}
					width={500}
					height={500}
				/>
			</div>
			<div className="flex flex-wrap">
				<div className="flex h-full flex-col p-4 sm:p-7">
					<h3 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h3>
					<p className="mb-3 dark:text-white">
						<small>Catalog number: {productId}</small>
					</p>
					<p className="mt-1 text-gray-500 dark:text-gray-400">{description}</p>
					<p className="my-2 dark:text-white">
						<strong>{price}</strong>
					</p>
					<button
						type="button"
						className="mb-2 mt-6 inline-flex w-fit items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
						onClick={() => addToCart({ productId })}
					>
						Add to cart
					</button>
					<div className="mb-3">
						<p className="text-xs text-gray-500 dark:text-gray-500">Available: {stock}</p>
					</div>
					<div className="mt-6 flex justify-start">
						<span className="inline-flex max-w-max items-center gap-x-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white dark:bg-blue-500">
							{category}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
