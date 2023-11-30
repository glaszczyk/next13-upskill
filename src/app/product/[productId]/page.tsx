import products from "@/lib/server/services/products";
import { ProductItem } from "@src/components/ProductItem";

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
