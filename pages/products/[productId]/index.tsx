import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { type ReactElement, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import type { ICartItem } from "@models/carts";
import { aggregateCart } from "@/helpers/aggregateCart";
import { getProductData } from "@/helpers/getProductData";
import { useAddProduct } from "@/helpers/useAddProduct";
import { getLoggedUserId } from "@/lib/server/utils/getLoginStatus";
import { CustomMeta, Layout } from "@/components/index";
import { type IProduct } from "@models/products";
import { ProductItem } from "@/components/ProductItem";

const fetcher: Fetcher<Partial<IProduct & { message?: string }>> = (url: string) =>
	fetch(url).then((r) => r.json());

const defaultMessage = "User not logged in";

const SingleProductPage = ({
	productData,
	userId,
	cart,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const {
		query: { productId },
	} = useRouter();
	const [userCart, setUserCart] = useState<ICartItem[]>(cart);
	const selectedProduct = productId && typeof productId === "string" ? productId : null;
	const { data, isLoading, error } = useSWR(`/api/products/${selectedProduct}`, fetcher, {
		fallbackData: { ...productData },
	});

	const { handleAddProductToCart, addProductErrorMessage, addProductSuccessMessage } =
		useAddProduct();

	const handleAddToCart = async (product: Pick<ICartItem, "productId">) => {
		if (userId && product) {
			const updatedCart = aggregateCart(userCart, product);
			setUserCart(updatedCart);
			await handleAddProductToCart({ userId, cart: [...updatedCart] });
		}
	};

	if (isLoading) return <p>Loading...</p>;
	if (data) {
		if (data.message) return <p>{data.message}</p>;
		return (
			<>
				<CustomMeta title={data.title || "ACME product"}>
					<meta name="description" content={data.description || "Meet our great products"} />
				</CustomMeta>
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
		const response = await fetch(`${process.env.API_URL}/api/user/cart?userId=${userId}`);
		const cart: Partial<IProduct & { message?: string }> = await response.json();
		try {
			const productData = await getProductData(productId);
			return {
				props: {
					productData,
					userId,
					cart: cart && typeof cart.message === "string" ? [] : (cart as ICartItem[]),
				},
			};
		} catch (errorMessage) {
			return {
				props: { productData: { message: "Something went wrong" }, userId, cart: [] },
			};
		}
	}
	return {
		props: { productData: { message: "Something went wrong" }, userId, cart: [] },
	};
}) satisfies GetServerSideProps<{
	productData: Partial<IProduct & { message?: string }>;
	userId: number | null;
	cart: ICartItem[];
}>;

export default SingleProductPage;
