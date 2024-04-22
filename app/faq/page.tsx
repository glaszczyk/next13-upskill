import { FaqItem } from "@/components/index";
import type { IFaq } from "@models/faq";

async function getFaqItems(): Promise<IFaq[]> {
	const res = await fetch(`${process.env.API_URL}/api/faq`);
	return res.json();
}

export default async function Page() {
	const faqItems = await getFaqItems();
	return (
		<>
			<div className="mx-auto mb-10 max-w-2xl lg:mb-14">
				<h2 className="text-2xl font-bold dark:text-white md:text-4xl md:leading-tight">
					You might be wondering if this page is served via App router...
				</h2>
			</div>
			<div className="mx-auto max-w-2xl divide-y divide-gray-200 dark:divide-gray-700">
				{faqItems.map((item) => (
					<FaqItem key={item.faqId} item={item} />
				))}
			</div>
		</>
	);
}
