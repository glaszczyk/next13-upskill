import { type ReactNode } from "react";

import { type Metadata } from "next";
import PrelineLoader from "./prelineLoader";
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
			<body>
				<PrelineLoader />
				<div className="relative mx-auto flex  h-screen max-w-[85rem] flex-col p-0">
					<AppHeader />
					<main>
						<div className="container mx-auto h-full pt-20 ">
							<div className="container mx-auto h-full">{children}</div>
						</div>
					</main>
				</div>
			</body>
		</html>
	);
}
