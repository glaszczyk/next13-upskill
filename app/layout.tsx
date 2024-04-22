import { type Metadata } from "next";
import { type ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Welcome to ACME store",
	description: "We're happy to meet you.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;
