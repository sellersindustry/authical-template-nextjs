
import "./globals.css";
import "../src/Authical/style.css";
import type { Metadata } from "next";
import { AuthicalProvider } from "@/src/Authical";
import { DefaultSettings } from "@sellers-industry/authical-core";

export const metadata: Metadata = {
    title: "Authical NextJS Template",
    description: "Authical NextJS Template",
};

export default function RootLayout({children}:{children: React.ReactNode}) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<AuthicalProvider config={{
				authicalServerURL: "/auth-api", // talks to nextjs re-route to prevent cors error
				organization: DefaultSettings.branding,
				paths: {
					onSignIn: "/dashboard",
					onSignOut: "/",
					signIn: "/signin"
				}
			}}>
				<body>
					<div className="authical--root theme--dark">
						{children}
					</div>
				</body>
			</AuthicalProvider>
		</html>
	);
}
