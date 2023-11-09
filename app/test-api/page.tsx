"use client";

import { AuthicalContext } from "@/src/Authical";
import Navigation from "@/src/component/navigation";
import { useContext, useState } from "react";

export default function Page() {

    const authical            = useContext(AuthicalContext);
    const [body, setBody]     = useState("");
    const [status, setStatus] = useState(-1);

    function get() {
        (async () => {
            let response:Response = await fetch("/test-api/call", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authical.Auth.getBearer()}`
                }
            });
            setStatus(response.status);
            setBody(await response.text());
        })();
    }


	return (
		<>
			<Navigation/>
            <div className="container">
                <p>{body}</p>
                <p>{status}</p>
                <div className="input--button" onClick={() => get()}>Request</div>
            </div>
		</>
	);
}
