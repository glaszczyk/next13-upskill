import { type IFaq } from "@/lib/server/models/faq";

type FaqItemProps = {
	item: IFaq;
};

export const FaqItem = ({ item: { question, answer } }: FaqItemProps) => {
	return (
		<div className="py-8 first:pt-0 last:pb-0">
			<div className="flex gap-x-5">
				<svg
					className="mt-1 h-6 w-6 flex-shrink-0 text-gray-500"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
					<path d="M12 17h.01" />
				</svg>

				<div>
					<h3 className="font-semibold text-gray-800 dark:text-gray-200 md:text-lg">{question}</h3>
					<p className="mt-1 text-gray-500">{answer}</p>
				</div>
			</div>
		</div>
	);
};
