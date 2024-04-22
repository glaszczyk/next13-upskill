import { type ReactNode } from "react";
import { FaqLayout } from "./FaqLayout";

type FaqLayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: FaqLayoutProps) => {
	return <FaqLayout>{children}</FaqLayout>;
};

export default Layout;
