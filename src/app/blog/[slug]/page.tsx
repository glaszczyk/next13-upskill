import { type IBlogPost } from "@/lib/server/models/blog";
import blog from "@/lib/server/services/blog";
import { BlogPostItem } from "@src/components/BlogPostItem";

type BlogPostPageProps = {
	params: Pick<IBlogPost, "slug">;
};

export const dynamicParams = true;

export function generateStaticParams() {
	const staticBlogposts = blog.getBlogList();

	return staticBlogposts.filter((_, i) => i < 3).map(({ slug }) => ({ slug }));
}

export default function Page({ params }: BlogPostPageProps) {
	const { slug } = params;
	const blogPostData = blog.getSingeBlog(slug);
	return <BlogPostItem post={blogPostData} />;
}
