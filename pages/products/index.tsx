import {
	type GetServerSideProps,
	type GetServerSidePropsContext,
	type InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { type ReactElement, useState } from "react";
import useSWR, { type Fetcher } from "swr";
import { aggregateCart } from "@/helpers/aggregateCart";
import type { ICartItem } from "@models/carts";
import { getLoggedUserId } from "@/lib/server/utils/getLoginStatus";
import { useAddProduct } from "@/helpers/useAddProduct";
import { CustomMeta, Layout, Pagination } from "@/components/index";
import { type IProduct, type IProductResponse } from "@models/products";
import { ProductsListItem } from "@/components/ProductsListItem";

const fetcher: Fetcher<IProductResponse> = (url: string) => fetch(url).then((r) => r.json());

const defaultMessage = "User not logged in";

const ProductsListPage = ({
	products,
	meta,
	userId,
	cart,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [userCart, setUserCart] = useState<ICartItem[]>(cart);
	const {
		query: { page },
	} = useRouter();
	const activePage = page && typeof page === "string" ? page : 1;

	const { data, isLoading, error } = useSWR(`/api/products?page=${activePage}`, fetcher, {
		fallbackData: { products, meta },
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
	if (error) return <p>Error...</p>;
	if (data)
		return (
			<>
				<CustomMeta title="ACME products">
					<meta name="description" content="Meet our great products" />
				</CustomMeta>
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
	if (userId) {
		const response = await fetch(`${process.env.API_URL}/api/user/cart?userId=${userId}`);
		const cart: Partial<IProduct & { message?: string }> = await response.json();
		return {
			props: {
				products,
				meta,
				userId,
				cart: cart && typeof cart.message === "string" ? [] : (cart as ICartItem[]),
			},
		};
	}
	return {
		props: { products, meta, userId: null, cart: [] },
	};
}) satisfies GetServerSideProps<IProductResponse & { userId: number | null; cart: ICartItem[] }>;

ProductsListPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default ProductsListPage;
