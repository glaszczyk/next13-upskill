import { type IProduct } from "@models/products";

type CartTableItemRowProps = {
	item: Partial<IProduct & { quantity: number; message?: string }>;
	removeProduct: (id: number) => void;
};
export const CartTableItemRow = ({
	item: { productId, image, title, price, quantity },
	removeProduct,
}: CartTableItemRowProps) => {
	const handleRemoveProduct = () => {
		productId && removeProduct(productId);
	};
	return (
		<tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
			<td className="h-px w-px whitespace-nowrap align-middle">
				<a className="block p-6" href="#">
					<div className="flex items-center gap-x-4">
						<img
							className="h-[2.375rem] w-[2.375rem] flex-shrink-0 rounded-lg"
							src={image}
							alt={title}
						/>
						<div>
							<span className="block max-w-lg whitespace-pre-wrap text-sm font-semibold text-gray-800 dark:text-gray-200">
								{title} (id: {productId})
							</span>
						</div>
					</div>
				</a>
			</td>
			<td className="h-px w-px whitespace-nowrap align-middle">
				<a className="block p-6" href="#">
					<div className="flex justify-end gap-x-3">
						<span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
							{price}
						</span>
					</div>
				</a>
			</td>
			<td className="h-px align-middle">
				<div className="flex justify-end gap-x-3">
					<span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
						{quantity}
					</span>
				</div>
			</td>
			<td className="h-px w-px whitespace-nowrap align-middle">
				<div className="flex justify-end gap-x-3">
					<span className="text-sm text-gray-600 dark:text-gray-400">
						{quantity && price ? quantity * price : "-"}
					</span>
				</div>
			</td>
			<td>
				<div className="flex items-center justify-center gap-x-2">
					<button
						type="button"
						className="flex rounded-lg border border-blue-600 px-2 py-2 text-sm font-semibold hover:border-blue-500 hover:text-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
						onClick={handleRemoveProduct}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M3 6H21"
								className="stroke-blue-600"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6"
								className="stroke-blue-600"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6"
								className="stroke-blue-600"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M10 11V17"
								className="stroke-blue-600"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M14 11V17"
								className="stroke-blue-600"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</td>
		</tr>
	);
};
