import type {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { type ReactElement, useEffect } from "react";
import { getLoggedUserId } from "@/lib/server/utils/getLoginStatus";
import { Layout } from "@/components/index";

const CheckoutPage = ({ message }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	useEffect(() => {
		void router.push("/");
	});

	return (
		<div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
			<div className="flex flex-col">
				<div className="-m-1.5 overflow-x-auto">
					<div className="inline-block min-w-full p-1.5 align-middle">
						<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900">
							{message && <p>{message}</p>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
	const userId = await getLoggedUserId(context.req);
	if (userId) {
		try {
			const response = await fetch(`${process.env.API_URL}/api/user/cart?userId=${userId}`, {
				method: "DELETE",
			});

			const responseJson = await response.json();
			console.log(responseJson);
			return { props: { message: responseJson.message } };
		} catch (error) {
			if (error instanceof Error) {
				return { props: { message: error.message } };
			}
		}
	}
	return { props: { message: "User not logged in" } };
}) satisfies GetServerSideProps<{
	message: string;
}>;

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default CheckoutPage;
