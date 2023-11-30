import { redirect } from "next/navigation";

export default function ProductDetailsFallbackPage() {
	redirect("/products/1");
}
