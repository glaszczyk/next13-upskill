import type { Metadata } from "next";
import HomePage from "./home-page";

export const metadata: Metadata = {
	title: "My Page Title",
	description: "Generated by create next app",
};

export default function Page() {
	return <HomePage />;
}
