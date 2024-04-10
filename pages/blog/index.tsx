import type { ReactElement } from "react";
import { Layout } from "@/components/index";
import { type IBlogPost } from "@models/blog";
import { BlogPostListItem } from "@/components/BlogPostListItem";

const BlogPostList = ({
	blogpostListData,
}: {
	blogpostListData: Omit<IBlogPost, "content" | "createdAt">[];
}) => {
	return (
		<div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
			<div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
				<h2 className="text-2xl font-bold dark:text-white md:text-4xl md:leading-tight">
					The Blog
				</h2>
				<p className="mt-1 text-gray-600 dark:text-gray-400">
					See how game-changing companies are making the most of every engagement with us.
				</p>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{blogpostListData.map((post) => (
					<BlogPostListItem post={post} key={post.postId} />
				))}
			</div>
			<div className="mt-12 text-center">
				<a
					className="inline-flex items-center gap-x-1 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-blue-600 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-blue-500 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
					href="#"
				>
					Read more
					<svg
						className="h-4 w-4 flex-shrink-0"
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
			</div>
		</div>
	);
};

export async function getStaticProps() {
	const endpointUrl =
		process.env.NODE_ENV === "development"
			? `http://${process.env["VERCEL_URL"]}/api/blog`
			: `https://${process.env["VERCEL_URL"]}/api/blog`;
	// Call an external API endpoint to get faq
	const res = await fetch(endpointUrl);
	const blogpostListData = await res.json();

	// By returning { props: { blogpostListData } }, the BlogPostList component
	// will receive `blogpostListData` as a prop at build time
	return {
		props: {
			blogpostListData,
		},
		revalidate: 3600,
	};
}

BlogPostList.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default BlogPostList;
