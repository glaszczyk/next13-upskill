import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import useSWR, { type Fetcher } from "swr";
import { type ProductCartParams, useAddProduct } from "@/helpers/useAddProduct";
import { getLoggedUserId } from "@/lib/server/utils/getLoginStatus";
import { Layout } from "@/components/index";
import { type IProduct } from "@models/products";
import { ProductItem } from "@/components/ProductItem";

const fetcher: Fetcher<Partial<IProduct & { message?: string }>> = (url: string) =>
	fetch(url).then((r) => r.json());

const defaultMessage = "User not logged in";

const SingleProductPage = ({
	productData,
	userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const {
		query: { productId },
	} = useRouter();

	const selectedProduct = productId && typeof productId === "string" ? productId : null;
	const { data, isLoading, error } = useSWR(`/api/products/${selectedProduct}`, fetcher, {
		fallbackData: { ...productData },
	});

	const { handleAddProductToCart, addProductErrorMessage, addProductSuccessMessage } =
		useAddProduct();

	const handleAddToCart = async (product: ProductCartParams) => {
		if (userId && product) {
			await handleAddProductToCart({ userId, product });
		}
	};

	if (isLoading) return <p>Loading...</p>;
	if (data) {
		if (data.message) return <p>{data.message}</p>;
		return (
			<>
				{addProductErrorMessage && <p>{addProductErrorMessage}</p>}
				{addProductSuccessMessage && <p>{addProductSuccessMessage}</p>}
				{!userId && <p>{defaultMessage}</p>}
				<ProductItem product={data as IProduct} addToCart={handleAddToCart} />
			</>
		);
	}
	return <p>{error}</p>;
};

SingleProductPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
	const productId = context.query.productId;
	const userId = await getLoggedUserId(context.req);
	if (userId && productId && typeof productId === "string") {
		try {
			const response = await fetch(`${process.env.API_URL}/api/products/${productId}`);
			const result: Partial<IProduct & { message?: string }> = await response.json();
			return {
				props: {
					productData: { ...result },
					userId,
				},
			};
		} catch (errorMessage) {
			return {
				props: { productData: { message: "Something went wrong" }, userId },
			};
		}
	}
	return {
		props: { productData: { message: "Something went wrong" }, userId },
	};
}) satisfies GetServerSideProps<{
	productData: Partial<IProduct & { message?: string }>;
	userId: number | null;
}>;

export default SingleProductPage;
