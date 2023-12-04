import Link from "next/link";
import { type IProductResponse } from "@/lib/server/models/products";

type Route = `/${string}`;
type PaginationProps = Pick<IProductResponse, "meta"> & { route: Route };

export const Pagination = ({ route, meta }: PaginationProps) => {
	const nextPage = meta.page === meta.totalPages ? null : meta.page + 1;
	const prevPage = meta.page === 1 ? null : meta.page - 1;
	const navigation = {
		next: nextPage,
		prev: prevPage,
	};

	const pageUrl = (navigation: number | null): Route =>
		navigation ? `${route}?page=${navigation}` : "/#";

	return (
		<nav className="flex items-center gap-x-1">
			{navigation.prev && (
				<Link
					shallow
					className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
					href={pageUrl(navigation.prev)}
				>
					<svg
						className="h-3.5 w-3.5 flex-shrink-0"
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
						<path d="m15 18-6-6 6-6" />
					</svg>
					<span aria-hidden="true" className="sr-only">
						Previous
					</span>
				</Link>
			)}
			<div className="flex items-center gap-x-1">
				<span className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:text-white dark:focus:bg-white/10">
					{meta.page}
				</span>
				<span className="flex min-h-[38px] items-center justify-center px-1.5 py-2 text-sm text-gray-500 dark:text-gray-500">
					of
				</span>
				<span className="flex min-h-[38px] items-center justify-center px-1.5 py-2 text-sm text-gray-500 dark:text-gray-500">
					{meta.totalPages}
				</span>
			</div>
			{navigation.next && (
				<a
					className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-2 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
					href={pageUrl(navigation.next)}
				>
					<span aria-hidden="true" className="sr-only">
						Next
					</span>
					<svg
						className="h-3.5 w-3.5 flex-shrink-0"
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
						<path d="m9 18 6-6-6-6" />
					</svg>
				</a>
			)}
		</nav>
	);
};
