import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import useSWR, { type Fetcher } from "swr";
import { Layout } from "../../../components/Layout";
import { type IProduct } from "@models/products";
import { ProductItem } from "@/components/ProductItem";

const fetcher: Fetcher<Partial<IProduct & { message?: string }>> = (url: string) =>
	fetch(url).then((r) => r.json());

const SingleProductPage = ({
	productData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const {
		query: { productId },
	} = useRouter();
	const selectedProduct = productId && typeof productId === "string" ? productId : null;
	const { data, isLoading, error } = useSWR(`/api/products/${selectedProduct}`, fetcher, {
		fallbackData: { ...productData },
	});
	if (isLoading) return <p>Loading...</p>;
	if (data) {
		if (data.message) return <p>{data.message}</p>;
		return <ProductItem product={data as IProduct} />;
	}
	return <p>{error}</p>;
};

SingleProductPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
	const productId = context.query.productId;
	if (productId && typeof productId === "string") {
		try {
			const response = await fetch(`${process.env["VERCEL_URL"]}/api/products/${productId}`);
			const result: Partial<IProduct & { message?: string }> = await response.json();
			return {
				props: {
					productData: { ...result },
				},
			};
		} catch (errorMessage) {
			return {
				props: { productData: { message: "Something went wrong" } },
			};
		}
	}
	return {
		props: { productData: { message: "Something went wrong" } },
	};
}) satisfies GetServerSideProps<{ productData: Partial<IProduct & { message?: string }> }>;

export default SingleProductPage;
