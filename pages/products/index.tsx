import {
	type GetServerSideProps,
	type GetServerSidePropsContext,
	type InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import useSWR, { type Fetcher } from "swr";
import { Layout, Pagination } from "@/components/index";
import { type IProductResponse } from "@models/products";
import { ProductsListItem } from "@/components/ProductsListItem";

const fetcher: Fetcher<IProductResponse> = (url: string) => fetch(url).then((r) => r.json());

const ProductsListPage = ({
	products,
	meta,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const {
		query: { page },
	} = useRouter();

	const activePage = page && typeof page === "string" ? page : 1;

	const { data, isLoading, error } = useSWR(`/api/products?page=${activePage}`, fetcher, {
		fallbackData: { products, meta },
	});

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

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
	const activePage =
		context.query.page && typeof context.query.page === "string" ? context.query.page : "1";
	const response = await fetch(`${process.env["VERCEL_URL"]}/api/products?page=${activePage}`);
	const { meta, products } = await response.json();
	return {
		props: { products, meta },
	};
}) satisfies GetServerSideProps<IProductResponse>;

ProductsListPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default ProductsListPage;
