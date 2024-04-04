import { type ReactNode } from "react";

import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

export default function Layout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="bg-gray-50">
			<AppHeader />
			<div className="relative mx-auto flex h-full  max-w-[85rem] flex-col scroll-auto p-0">
				<main className="mt-20 min-h-max  pb-28">
					<div className="container mx-auto h-full pt-6 ">
						<div className="container mx-auto h-full">{children}</div>
					</div>
				</main>
			</div>
			<AppFooter />
		</div>
	);
}
