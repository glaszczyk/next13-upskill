import { cache } from "react";
import { type IBlogPost } from "@models/blog";
import blog from "@services/blog";
import { BlogPostItem } from "@src/components/BlogPostItem";

type Slug = Pick<IBlogPost, "slug">;
type BlogPostPageProps = {
	params: Slug;
};

export const revalidate = 84400;

export function generateStaticParams(): Slug[] {
	const staticBlogposts = cache(() => blog.getBlogList());

	return staticBlogposts()
		.filter((_, i) => i < 3)
		.map(({ slug }) => ({ slug }));
}

export default function Page({ params: { slug } }: BlogPostPageProps) {
	const blogPostData = blog.getSingeBlog(slug);
	return <BlogPostItem post={blogPostData} />;
}
