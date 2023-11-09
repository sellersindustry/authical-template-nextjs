"use client";
import { useContext, useState } from "react";
import { AuthicalContext } from "../../AuthicalProvider";
import React from "react";
import { Profile } from "@sellers-industry/authical-core";
import { useRouter } from "next/navigation";


export default () => {
    const router                    = useRouter();
    const authical                  = useContext(AuthicalContext);
    const [first, setFirst]         = useState("");
    const [last, setLast]           = useState("");
    const [error, setError]         = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    async function handleSubmit() {
        if (first == "" || last == "") {
            setError(true);
            return;
        }
        try {
            setIsLoading(true);
            let profile:Profile = {
                ...await authical.Profile.get(),
                name: {
                    first: first,
                    last: last
                },
            };
            await authical.Profile.set(profile);
            setIsLoading(false);
            setError(false);
            if (authical.config.paths?.signIn) {
                router.push(authical.config.paths?.onSignIn);
            }
        } catch (error:any) {
            setIsLoading(false);
            setError(true);
        }
    }

    return (
        <div className="component--signin">
            <div className="company-logo">
                <img src={authical.config?.organization?.logo}/>
            </div>
            <div>
                <div className="text--title">Finish your profile</div>
                <div className="text--subtitle">we just need to know a bit more about you</div>
            </div>
            <div>
                <div>
                    <label htmlFor="firstName" className="input--label">First Name</label>
                    <br/>
                    <input type="text" id="firstName" name="firstName"
                        placeholder="Amy" className="input--text"
                        value={first} onChange={(e) => setFirst(e.target.value)}/>
                    <div className="spacer--1"/>
                    <label htmlFor="lastName" className="input--label">Last Name</label>
                    <br/>
                    <input type="text" id="lastName" name="lastName"
                        placeholder="Pond" className="input--text"
                        value={last} onChange={(e) => setLast(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key == "Enter")
                                (async () => { await handleSubmit(); })();
                        }}/>
                    <div className="spacer--1"/>
                    <div className="input--button" onClick={() => { (async () => { await handleSubmit(); })(); }}>
                        {isLoading ? "Loading..." : "Continue"}
                    </div>
                </div>
            </div>
            {error ?
                <div className="alert--error">
                    <p><b>Unable to Save Profile</b></p>
                    <p>Please enter your name and try again.</p>
                </div>
            : null}
        </div>
    );
};
