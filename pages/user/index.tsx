import type { ReactElement } from "react";
import { Layout } from "@/components/index";

const UserPage = () => {
	return (
		<div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
			<div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900 sm:p-7">
				<div className="mb-8">
					<h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Profile</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Manage your name, password and account settings.
					</p>
				</div>

				<form>
					<div className="grid gap-2 sm:grid-cols-12 sm:gap-6">
						<div className="sm:col-span-3">
							<label
								form="af-account-full-name"
								className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
							>
								Full name
							</label>
							<div className="hs-tooltip inline-block">
								<button type="button" className="hs-tooltip-toggle ms-1">
									<svg
										className="inline-block h-3 w-3 text-gray-400 dark:text-gray-600"
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
									</svg>
								</button>
								<span
									className="hs-tooltip-content hs-tooltip-shown:visible hs-tooltip-shown:opacity-100 invisible absolute z-10 inline-block w-40 rounded bg-gray-900 px-2 py-1 text-center text-xs font-medium text-white opacity-0 shadow-sm transition-opacity dark:bg-slate-700"
									role="tooltip"
								>
									Displayed on public forums, such as Preline
								</span>
							</div>
						</div>

						<div className="sm:col-span-9">
							<div className="sm:flex">
								<input
									id="af-account-full-name"
									type="text"
									className="relative -ms-px -mt-px block w-full border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600 sm:mt-0 sm:first:ms-0 sm:first:rounded-s-lg sm:first:rounded-se-none sm:last:rounded-e-lg sm:last:rounded-es-none"
									placeholder="Maria"
								/>
								<input
									type="text"
									className="relative -ms-px -mt-px block w-full border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600 sm:mt-0 sm:first:ms-0 sm:first:rounded-s-lg sm:first:rounded-se-none sm:last:rounded-e-lg sm:last:rounded-es-none"
									placeholder="Boone"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								form="af-account-login"
								className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
							>
								Email
							</label>
						</div>

						<div className="sm:col-span-9">
							<input
								id="af-account-login"
								type="login"
								className="block w-full rounded-lg border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
								placeholder="maria@site.com"
							/>
						</div>

						<div className="sm:col-span-3">
							<label
								form="af-account-password"
								className="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
							>
								Password
							</label>
						</div>

						<div className="sm:col-span-9">
							<div className="space-y-2">
								<input
									id="af-account-password"
									type="text"
									className="block w-full rounded-lg border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
									placeholder="Enter current password"
								/>
								<input
									type="text"
									className="block w-full rounded-lg border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
									placeholder="Enter new password"
								/>
							</div>
						</div>
					</div>

					<div className="mt-5 flex justify-end gap-x-2">
						<button
							type="button"
							className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
						>
							Cancel
						</button>
						<button
							type="button"
							className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
						>
							Save changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

UserPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default UserPage;
