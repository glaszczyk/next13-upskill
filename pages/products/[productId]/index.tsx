import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { ReactElement } from "react";
import Layout from "../../../components/Layout";
import { type IProduct, type IProductResponse } from "@models/products";
import { ProductItem } from "@/components/ProductItem";

const SingleProductPage = ({ productData }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return <ProductItem product={productData} />;
};

SingleProductPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export const getStaticProps = (async ({ params }) => {
	const productId = params && typeof params.productId === "string" ? params.productId : "";
	// Call an external API endpoint to get faq
	const res = await fetch(`${process.env["APP_URL"]}/api/products/${productId}`);
	const productData = await res.json();

	// By returning { props: { blogpostListData } }, the BlogPostList component
	// will receive `blogpostListData` as a prop at build time
	return {
		props: {
			productData,
		},
	};
}) satisfies GetStaticProps<{
	productData: IProduct;
}>;

export const getStaticPaths = async () => {
	// Call an external API endpoint to get faq
	const res = await fetch(`${process.env["APP_URL"]}/api/products?page=1`);
	const productsData: IProductResponse = await res.json();

	const paths = productsData.products.map(({ productId }) => ({
		params: { productId: productId.toString() },
	}));
	return { paths, fallback: "blocking" };
};

export default SingleProductPage;
