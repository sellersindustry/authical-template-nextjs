"use client";

import { RequireSignedIn } from "@/src/Authical";
import Navigation from "@/src/component/navigation";

export default function Page() {
	return (
		<>
			<Navigation/>
			<RequireSignedIn>
				<p>Hello World - Dashboard</p>
			</RequireSignedIn>
		</>
	);
}
