import { type ReactNode } from "react";

import { type Metadata } from "next";
import PrelineLoader from "./prelineLoader";
import { AppFooter } from "@src/components/AppFooter";
import { AppHeader } from "@src/components/index";
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
			<body className="bg-gray-50">
				<PrelineLoader />
				<AppHeader />
				<div className="relative mx-auto flex h-full  max-w-[85rem] flex-col scroll-auto p-0">
					<main className="mt-20 min-h-max  pb-28">
						<div className="container mx-auto h-full pt-6 ">
							<div className="container mx-auto h-full">{children}</div>
						</div>
					</main>
				</div>
				<AppFooter />
			</body>
		</html>
	);
}
