import { FaqItem } from "@src/components";

export default function Page() {
	const faqData = [
		{
			faqId: 5,
			question: "How to place the order?",
			answer: "Click on the Pay button on the checkout page",
		},
	];
	return (
		<>
			<div className="mx-auto mb-10 max-w-2xl lg:mb-14">
				<h2 className="text-2xl font-bold dark:text-white md:text-4xl md:leading-tight">
					You might be wondering...
				</h2>
			</div>
			<div className="mx-auto max-w-2xl divide-y divide-gray-200 dark:divide-gray-700">
				{faqData.map((item) => (
					<FaqItem key={item.faqId} item={item} />
				))}
			</div>
		</>
	);
}
