import { type IBlogPost } from "@models/blog";

type BlogPostProps = {
	post: IBlogPost;
};
export const BlogPostItem = ({ post }: BlogPostProps) => {
	return (
		<div className="mx-auto max-w-3xl px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-10">
			<div className="max-w-2xl">
				<div className="mb-6 flex items-center justify-between">
					<div className="flex w-full gap-x-5 sm:items-center sm:gap-x-3">
						<div className="grow">
							{post.author.name}
							<div className="flex items-center justify-between gap-x-2">
								<div>
									<ul className="text-xs text-gray-500">
										<li className="relative inline-block pe-6 before:absolute before:end-2 before:top-1/2 before:h-1 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-gray-300 last:pe-0 last-of-type:before:hidden dark:text-gray-400 dark:before:bg-gray-600">
											{post.createdAt}
										</li>
										<li className="relative inline-block pe-6 before:absolute before:end-2 before:top-1/2 before:h-1 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-gray-300 last:pe-0 last-of-type:before:hidden dark:text-gray-400 dark:before:bg-gray-600">
											{`${Math.ceil(post.content.length / 200)} min read`}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-5 md:space-y-8">
					<div className="space-y-3">
						<h2 className="text-2xl font-bold dark:text-white md:text-3xl">{post.title}</h2>

						<p className="text-lg text-gray-800 dark:text-gray-200">{post.content}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
