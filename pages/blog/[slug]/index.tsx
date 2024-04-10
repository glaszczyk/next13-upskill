import { type GetStaticProps, type InferGetStaticPropsType } from "next";
import type { ReactElement } from "react";
import { Layout } from "@/components/index";
import { type IBlogPost } from "@models/blog";
import { BlogPostItem } from "@/components/BlogPostItem";

const BlogPost = ({ blogpostData }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return <BlogPostItem post={blogpostData} />;
};

export const getStaticProps = (async ({ params }) => {
	const slug = params && typeof params.slug === "string" ? params.slug : "";
	// Call an external API endpoint to get faq
	const endpointUrl =
		process.env.NODE_ENV === "development"
			? `http://${process.env["VERCEL_URL"]}/api/blog/${slug}`
			: `https://${process.env["VERCEL_URL"]}/api/blog/${slug}`;
	const res = await fetch(endpointUrl);
	const blogpostData = await res.json();

	// By returning { props: { blogpostListData } }, the BlogPostList component
	// will receive `blogpostListData` as a prop at build time
	return {
		props: {
			blogpostData,
		},
	};
}) satisfies GetStaticProps<{
	blogpostData: IBlogPost;
}>;

export const getStaticPaths = async () => {
	const endpointUrl =
		process.env.NODE_ENV === "development"
			? `http://${process.env["VERCEL_URL"]}/api/blog`
			: `https://${process.env["VERCEL_URL"]}/api/blog`;

	// Call an external API endpoint to get faq
	const res = await fetch(endpointUrl);
	const blogpostListData: IBlogPost[] = await res.json();

	const paths = blogpostListData
		.filter((post) => post.postId < 3)
		.map(({ slug }) => ({
			params: { slug },
		}));
	return { paths, fallback: "blocking" };
};

BlogPost.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default BlogPost;
