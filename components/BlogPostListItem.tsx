import { type IBlogPost } from "@models/blog";

type BlogPostListItemProps = {
	post: Omit<IBlogPost, "content" | "createdAt">;
};

export const BlogPostListItem = ({ post: { author, slug, title } }: BlogPostListItemProps) => {
	const url = `/blog/${slug}`;
	return (
		<a
			className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-transparent hover:shadow-lg dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
			href={url}
		>
			<div className="my-6">
				<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
					{title}
				</h3>
			</div>
			<div className="mt-auto flex items-center gap-x-3">
				<div>
					<h5 className="text-sm text-gray-800 dark:text-gray-200">{author.name}</h5>
				</div>
			</div>
		</a>
	);
};
