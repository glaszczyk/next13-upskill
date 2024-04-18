import Head from "next/head";
import { type ReactNode } from "react";

type CustomMetaProps = {
	title: string;
	children?: ReactNode;
};

export const CustomMeta = ({ title, children }: CustomMetaProps) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta property={"og:title"} />
			<meta property={"og:description"} />
			{children}
		</Head>
	);
};
