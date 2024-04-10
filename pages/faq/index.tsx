import type { ReactElement } from "react";
import { Layout } from "../../components/Layout";
import { FaqItem } from "@/components/FaqItem";
import { type IFaq } from "@models/faq";

const Faq = ({ faq }: { faq: IFaq[] }) => (
	<>
		<div className="mx-auto mb-10 max-w-2xl lg:mb-14">
			<h2 className="text-2xl font-bold dark:text-white md:text-4xl md:leading-tight">
				You might be wondering...
			</h2>
		</div>
		<div className="mx-auto max-w-2xl divide-y divide-gray-200 dark:divide-gray-700">
			{faq.map((item) => (
				<FaqItem key={item.faqId} item={item} />
			))}
		</div>
	</>
);

export async function getStaticProps() {
	// Call an external API endpoint to get faq
	const res = await fetch(`${process.env["VERCEL_URL"]}/api/faq`);
	const faq = await res.json();

	// By returning { props: { faq } }, the Faq component
	// will receive `faq` as a prop at build time
	return {
		props: {
			faq,
		},
	};
}

Faq.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Faq;
