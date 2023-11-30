import products from "@services/products";
import { Pagination } from "@src/components/index";
import { ProductsListItem } from "@src/components/ProductsListItem";

export const revalidate = 0;

type ProductsListPageProps = {
	params: {
		productsPage: string;
	};
};
export default function ProductsListPage({
	params: { productsPage = "1" },
}: ProductsListPageProps) {
	const pageNo = parseInt(productsPage);
	const { products: productList, meta } = products.getProducts(pageNo);
	return (
		<>
			<ul className="grid grid-cols-3 gap-4">
				{productList.map((product) => (
					<ProductsListItem key={product.productId} product={product} />
				))}
			</ul>
			<div className="container mx-auto flex justify-center py-4">
				<Pagination route={"/products"} meta={meta} />
			</div>
		</>
	);
}
