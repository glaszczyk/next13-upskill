import { type ReactNode } from "react";

import { type Metadata } from "next";
import PrelineLoader from "./prelineLoader";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Home",
	description: "Welcome to Next.js",
};

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<PrelineLoader />
				{children}
			</body>
		</html>
	);
}
