"use client";

import { IsSignedIn, IsSignedOut } from "@/src/Authical";
import Navigation from "@/src/component/navigation";

export default function Home() {	
	return (
		<>
			<Navigation/>
			<div className="container" style={{ textAlign: "center", paddingTop: "10rem" }}>
				<h1 style={{ fontSize: "5rem", margin: 0 }}>Authical</h1>
				<p style={{ fontSize: "1.8rem", color: "grey", marginTop: "1rem" }}>OTP Authenication</p>
				<br/>
				<br/>
				<IsSignedIn>
					You are currently signed in...
				</IsSignedIn>
				<IsSignedOut>
					You are currently not signed in...	
				</IsSignedOut>
				<p><a href="/dashboard">Dashboard</a> (Users Only)</p>
			</div>
		</>
	);
}
