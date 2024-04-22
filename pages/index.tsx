import Link from "next/link";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { Layout } from "@/components/Layout";

const Page: NextPageWithLayout = () => (
	<div>
		<h1 className="pb-6 font-sans text-3xl font-bold text-gray-800 dark:text-white">Welcome </h1>
		<div className="my-9 flex w-full justify-center">
			<Link
				href="/products"
				className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-teal-500 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-600 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
			>
				Check our products
			</Link>
		</div>
	</div>
);

Page.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Page;
