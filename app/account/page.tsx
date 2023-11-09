"use client";
import { UserProfile } from "@/src/Authical";
import Navigation from "@/src/component/navigation";

export default function Page() {	
	return (
		<>
			<Navigation/>
			<div className="container">
				<UserProfile/>
			</div>
		</>
	);
}
