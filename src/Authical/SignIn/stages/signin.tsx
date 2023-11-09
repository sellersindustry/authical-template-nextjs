"use client";
import { useContext, useEffect, useState } from "react";
import { AuthicalContext } from "../../AuthicalProvider";
import { useSearchParams } from "next/navigation";
import React from "react";


export default (props: {
    setStage: React.Dispatch<React.SetStateAction<number>>,
    email:string,
    setEmail:React.Dispatch<React.SetStateAction<string>>
}) => {
    const searchParams              = useSearchParams();
    const authical                  = useContext(AuthicalContext);
    const [isSignIn, setIsSignIn]   = useState(true);
    const [error, setError]         = useState(undefined as string|undefined);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsSignIn(!searchParams.has("signup"));
    }, [searchParams]);


    async function handleSubmit() {
        try {
            setIsLoading(true);
            await authical.Auth.requestSignIn(props.email);
            setIsLoading(false);
            setError(undefined);
            props.setStage(1);
        } catch (error:any) {
            setIsLoading(false);
            setError(error.message);
        }
    }

    return (
        <div className="component--signin">
            <div className="company-logo">
                <img src={authical.branding?.logo}/>
            </div>
            <div>
                <div className="text--title">{isSignIn ? "Sign In" : "Create your account"}</div>
                <div className="text--subtitle">to continue to {authical.branding?.product}</div>
            </div>
            <div>
                <div>
                    <label htmlFor="email" className="label">Email Address</label>
                    <br/>
                    <input type="email" id="email" name="email" autoFocus
                        placeholder="kevin@acme.com" className="input--text"
                        value={props.email} onChange={(e) => props.setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key == "Enter")
                                (async () => { await handleSubmit(); })();
                        }}
                    />
                    <div className="spacer--1"/>
                    <div className="input--button grow" onClick={() => { (async () => { await handleSubmit(); })(); }}>
                        {isLoading ? "Loading..." : "Continue"}
                    </div>
                </div>
            </div>
            {error ?
                <div className="alert--error">
                    <p><b>Error - Unable to {isSignIn? "Sign In" : "Sign Up"}</b></p>
                    <p>{error}</p>
                </div>
            : null}
            <div>
                {isSignIn ? 
                    <p className="text--muted">
                        No account?{" "}
                        <a className="text--link" onClick={() => setIsSignIn(false)} style={{ cursor: "pointer" }}>Sign up</a>
                    </p>
                :
                    <p className="text--muted">
                        Have an account?{" "}
                        <a className="text--link" onClick={() => setIsSignIn(true)} style={{ cursor: "pointer" }}>Sign In</a>
                    </p>
                }
                
            </div>
        </div>
    );
};
