import products from "@services/products";
import { ProductItem } from "@/components/ProductItem";

type ProductDetailsPageProps = {
	params: {
		productId: string;
	};
};
export const revalidate = 0;

export default function ProductDetailsPage({ params: { productId } }: ProductDetailsPageProps) {
	const productData = products.getSingleProduct(Number.parseInt(productId));
	return <ProductItem product={productData} />;
}
