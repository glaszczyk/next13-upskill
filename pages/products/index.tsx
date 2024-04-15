import {
	type GetServerSideProps,
	type GetServerSidePropsContext,
	type InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { type ReactElement } from "react";
import useSWR, { type Fetcher } from "swr";
import { getLoggedUserId } from "@/lib/server/utils/getLoginStatus";
import { type ProductCartParams, useAddProduct } from "@/helpers/useAddProduct";
import { Layout, Pagination } from "@/components/index";
import { type IProductResponse } from "@models/products";
import { ProductsListItem } from "@/components/ProductsListItem";

const fetcher: Fetcher<IProductResponse> = (url: string) => fetch(url).then((r) => r.json());

const defaultMessage = "User not logged in";

const ProductsListPage = ({
	products,
	meta,
	userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const {
		query: { page },
	} = useRouter();
	const activePage = page && typeof page === "string" ? page : 1;

	const { data, isLoading, error } = useSWR(`/api/products?page=${activePage}`, fetcher, {
		fallbackData: { products, meta },
	});

	const { handleAddProductToCart, addProductErrorMessage, addProductSuccessMessage } =
		useAddProduct();

	const handleAddToCart = async (product: ProductCartParams) => {
		if (userId && product) {
			await handleAddProductToCart({ userId, product });
		}
	};

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;
	if (data)
		return (
			<>
				{addProductErrorMessage && <p>{addProductErrorMessage}</p>}
				{addProductSuccessMessage && <p>{addProductSuccessMessage}</p>}
				{!userId && <p>{defaultMessage}</p>}

				<ul className="grid grid-cols-3 gap-4">
					{data.products.map((product) => (
						<ProductsListItem
							key={product.productId}
							product={product}
							addToCart={handleAddToCart}
						/>
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
	const response = await fetch(`${process.env.API_URL}/api/products?page=${activePage}`);
	const { meta, products } = await response.json();
	const userId = await getLoggedUserId(context.req);
	return {
		props: { products, meta, userId },
	};
}) satisfies GetServerSideProps<IProductResponse & { userId: number | null }>;

ProductsListPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default ProductsListPage;
