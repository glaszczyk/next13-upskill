import { unstable_cache } from "next/cache";
import { type IBlogPost } from "@models/blog";
import blog from "@services/blog";
import { BlogPostItem } from "@src/components/BlogPostItem";

type Slug = Pick<IBlogPost, "slug">;
type BlogPostPageProps = {
	params: Slug;
};

const revalidate = 84400;

const getBlogpostData = unstable_cache(
	async (slug: string) => blog.getSingeBlog(slug),
	["cached-blog-post"],
	{
		revalidate,
	},
);

const getBlogpostListData = unstable_cache(async () => blog.getBlogList(), ["cached-blog-list"], {
	revalidate,
});

export async function generateStaticParams(): Promise<Slug[]> {
	const staticBlogposts: Omit<IBlogPost, "content" | "createdAt">[] = await getBlogpostListData();

	return staticBlogposts.filter((_, i) => i < 3).map(({ slug }) => ({ slug }));
}

export default async function Page({ params: { slug } }: BlogPostPageProps) {
	const blogPostData = await getBlogpostData(slug);
	return <BlogPostItem post={blogPostData} />;
}
