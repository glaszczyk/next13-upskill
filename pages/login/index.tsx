import {
	type GetServerSideProps,
	type GetServerSidePropsContext,
	type InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { type FormEvent, type ReactElement, useEffect, useRef, useState } from "react";
import { type ILoggedUser } from "@models/loggedUsers";
import { getUser } from "@/helpers/getUser";
import { Layout } from "@/components/index";

const LoginPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const loginFormRef = useRef<HTMLFormElement>(null);
	const [loginError, setLoginError] = useState<string>("");
	const [origin, setOrigin] = useState("");
	const [redirectUrl, setRedirectUrl] = useState("");
	const router = useRouter();
	useEffect(() => {
		setOrigin(window.location.origin);
		const searchParams = new URLSearchParams(window.location.search);
		setRedirectUrl(searchParams.get("from") || "");
	}, []);

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const login = formData.get("login");
		const password = formData.get("password");
		try {
			const response = await fetch(`${origin}/api/user/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ login, password }),
			});
			const responseJson = await response.json();
			if (!response.ok) {
				setLoginError(responseJson.message);
			} else {
				loginFormRef.current?.reset();
				if (redirectUrl) {
					void router.push(`${redirectUrl}`);
				}
				void router.push("/login");
			}
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
		}
	};

	const handleLogout = async () => {
		const response = await fetch(`${origin}/api/user/logout`);
		const responseJson = await response.json();
		console.log("Logout user", responseJson);
		void router.push("/login");
	};

	if (user) {
		return (
			<div className="flex w-full justify-center">
				<div className="mt-7 w-full max-w-xl rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
					<div className="p-4 sm:p-7">
						<div className="text-center">
							<h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
								Welcome {user.userId}
							</h1>
						</div>
						<div className="my-4">
							<button
								type="button"
								className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-blue-600 dark:hover:text-blue-500"
								onClick={handleLogout}
							>
								Sign out
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="flex w-full justify-center">
			<div className="mt-7 w-full max-w-xl rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
				<div className="p-4 sm:p-7">
					<div className="text-center">
						<h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
					</div>

					<div className="mt-5">
						<form onSubmit={handleLogin} ref={loginFormRef}>
							<div className="grid gap-y-4">
								<div>
									<label form="login" className="mb-2 block text-sm dark:text-white">
										Login / email address
									</label>
									<div className="relative">
										<input
											autoComplete="username"
											type="login"
											id="login"
											name="login"
											className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
											required
											aria-describedby="login-error"
										/>
										<div className="pointer-events-none absolute inset-y-0 end-0 hidden items-center pe-3">
											<svg
												className="h-5 w-5 text-red-500"
												width="16"
												height="16"
												fill="currentColor"
												viewBox="0 0 16 16"
												aria-hidden="true"
											>
												<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
											</svg>
										</div>
									</div>
									<p className="mt-2 hidden text-xs text-red-600" id="login-error">
										Please include a valid login address so we can get back to you
									</p>
								</div>
								<div>
									<div className="flex items-center justify-between">
										<label form="password" className="mb-2 block text-sm dark:text-white">
											Password
										</label>
										<Link
											shallow
											className="text-sm font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
											href="#"
										>
											Forgot password?
										</Link>
									</div>
									<div className="relative">
										<input
											type="password"
											id="password"
											name="password"
											className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
											required
											aria-describedby="password-error"
											autoComplete="current-password"
										/>
										<div className="pointer-events-none absolute inset-y-0 end-0 hidden items-center pe-3">
											<svg
												className="h-5 w-5 text-red-500"
												width="16"
												height="16"
												fill="currentColor"
												viewBox="0 0 16 16"
												aria-hidden="true"
											>
												<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
											</svg>
										</div>
									</div>
									<p className="mt-2 hidden text-xs text-red-600" id="password-error">
										8+ characters required
									</p>
								</div>
								<button
									type="submit"
									className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
								>
									Sign in
								</button>
								<button
									type="button"
									className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-blue-600 dark:hover:text-blue-500"
									onClick={handleLogout}
								>
									Sign out
								</button>
							</div>
						</form>
						<p>{loginError}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = (async ({ req }: GetServerSidePropsContext) => {
	const token = req?.cookies["access-token"];
	if (token) {
		const user = await getUser(token);
		console.log("Jesteś zalogowany");
		return {
			props: { user },
		};
	} else {
		console.log("Nie jesteś zalogowany");
		return {
			props: { user: null },
		};
	}
}) satisfies GetServerSideProps<{ user: ILoggedUser | null }>;

LoginPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default LoginPage;
