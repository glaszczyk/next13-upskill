import useSWRMutation from "swr/mutation";
import type { IProduct } from "@models/products";

export type ProductCartParams = Pick<IProduct, "productId">;

type AddProductRequestParams = {
	userId: number;
	product: ProductCartParams;
};

type Message =
	| {
			message: string;
	  }
	| undefined;

const addProductToCart = async (url: string, { arg }: { arg: AddProductRequestParams }) => {
	const {
		userId,
		product: { productId },
	} = arg;
	const body = {
		userId,
		cart: [{ productId, quantity: 1 }],
	};
	try {
		const r = await fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
		});
		return (await r.json()) as Message;
	} catch (error) {
		return error as Message;
	}
};

export const useAddProduct = () => {
	const {
		data,
		error,
		trigger: handleAddProductToCart,
	} = useSWRMutation<Message, Message, string, AddProductRequestParams>(
		`/api/user/cart`,
		(url: string, params) => addProductToCart(url, params),
		{
			revalidate: true,
		},
	);
	return {
		addProductSuccessMessage: data && data.message ? data.message : "",
		addProductErrorMessage: error && error.message ? error.message : "",
		handleAddProductToCart,
	};
};
