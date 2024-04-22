"use client";
import { type ReactNode } from "react";
import { AppFooter, AppHeader } from "@/components";

export function FaqLayout({ children }: { children: ReactNode }) {
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
