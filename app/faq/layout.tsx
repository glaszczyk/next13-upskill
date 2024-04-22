import { type ReactNode } from "react";
import { FaqLayout } from "./FaqLayout";

type FaqLayoutProps = {
	children: ReactNode;
};

export default function Layout({ children }: FaqLayoutProps) {
	return <FaqLayout>{children}</FaqLayout>;
}
