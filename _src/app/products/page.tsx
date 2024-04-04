import products from "@services/products";
import { Pagination } from "@/components/index";
import { ProductsListItem } from "@/components/ProductsListItem";

export const revalidate = 0;

type ProductsListPageProps = {
	searchParams: {
		page?: string;
	};
};
export default function ProductsListPage({ searchParams: { page = "1" } }: ProductsListPageProps) {
	const pageNo = parseInt(page);
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
