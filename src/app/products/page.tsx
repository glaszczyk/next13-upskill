import { redirect } from "next/navigation";

export default function ProductsListFallbackPage() {
	redirect("/products/1");
}
