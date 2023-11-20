"use client";

import { BlogPostItem } from "@src/components/BlogPostItem";

export type BlogPost = {
	postId: number;
	title: string;
	slug: string;
	content: string;
	createdAt: string;
	author: {
		name: string;
	};
};

type BlogPostPageProps = {
	params: BlogPost;
};

const blogPostData = {
	postId: 34,
	title: "Mauris pellentesque lobortis nisl eu tempus.",
	slug: "mauris-pellentesque-lobortis-nisl-eu-tempus",
	content:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu enim auctor, euismod neque sed, hendrerit eros. Nulla semper consequat molestie. Quisque non ligula accumsan, vestibulum ipsum ac, ultricies ex. Quisque vel pellentesque ex, vel posuere nisi. Aliquam velit sem, pharetra sit amet risus nec, hendrerit dictum arcu. Nulla facilisi. Pellentesque egestas ultricies ligula eget gravida. Aenean laoreet est id nisi commodo, sed scelerisque risus aliquam. Sed vitae interdum ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis auctor vestibulum velit nec interdum. Duis et placerat libero. Sed at velit fringilla, tempor quam at, feugiat lorem.",
	createdAt: "2023-02-10",
	author: {
		name: "Mauris Pellentesque",
	},
};
export default function Page({ params }: BlogPostPageProps) {
	const { slug: _, ...restOfBlogPostData } = blogPostData;
	return <BlogPostItem post={{ ...params, ...restOfBlogPostData }} />;
}
