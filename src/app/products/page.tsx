import products from "@/lib/server/services/products";
import { ProductsListItem } from "@src/components/ProductsListItem";

export const revalidate = 0;

export default function Page() {
	const productsListData = products.getProducts(1);
	return (
		<ul className="grid grid-cols-3 gap-4">
			{productsListData.products.map((product) => (
				<ProductsListItem key={product.productId} product={product} />
			))}
		</ul>
	);
}
