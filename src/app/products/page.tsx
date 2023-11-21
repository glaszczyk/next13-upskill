import { ProductsListItem } from "@src/components/ProductsListItem";

const productsListData = {
	products: [
		{
			productId: 1,
			title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
			price: 109.95,
			description:
				"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
			category: "men's clothing",
			image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
			stock: 3,
		},
		{
			productId: 3,
			title: "Mens Cotton Jacket",
			price: 55.99,
			description:
				"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
			category: "men's clothing",
			image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
			stock: 1,
		},
		{
			productId: 4,
			title: "Mens Casual Slim Fit",
			price: 15.99,
			description:
				"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
			category: "men's clothing",
			image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
			stock: 3,
		},
		{
			productId: 5,
			title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
			price: 695,
			description:
				"From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
			category: "jewelery",
			image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
			stock: 15,
		},
		{
			productId: 6,
			title: "Solid Gold Petite Micropave ",
			price: 168,
			description:
				"Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
			category: "jewelery",
			image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
			stock: 9,
		},
		{
			productId: 8,
			title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
			price: 10.99,
			description:
				"Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
			category: "jewelery",
			image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
			stock: 2,
		},
		{
			productId: 9,
			title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
			price: 64,
			description:
				"USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
			category: "electronics",
			image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
			stock: 5,
		},
	],
};

export default function Page() {
	return (
		<ul className="grid grid-cols-3 gap-4">
			{productsListData.products.map((product) => (
				<ProductsListItem key={product.productId} product={product} />
			))}
		</ul>
	);
}
