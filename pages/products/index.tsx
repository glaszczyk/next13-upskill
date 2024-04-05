import { useRouter } from "next/router";
import type { ReactElement } from "react";
import useSWR, { type Fetcher } from "swr";
import Layout from "../../components/Layout";
import { type IProductResponse } from "@models/products";
import { Pagination } from "@/components/index";
import { ProductsListItem } from "@/components/ProductsListItem";

const fetcher: Fetcher<IProductResponse> = (url: string) => fetch(url).then((r) => r.json());

const ProductsListPage = () => {
	const {
		query: { page },
	} = useRouter();

	const activePage = page && typeof page === "string" ? page : 1;

	const { data, isLoading, error } = useSWR(`/api/products?page=${activePage}`, fetcher);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;
	if (data)
		return (
			<>
				<ul className="grid grid-cols-3 gap-4">
					{data.products.map((product) => (
						<ProductsListItem key={product.productId} product={product} />
					))}
				</ul>
				<div className="container mx-auto flex justify-center py-4">
					<Pagination route={"/products"} meta={data.meta} />
				</div>
			</>
		);
};

ProductsListPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default ProductsListPage;
