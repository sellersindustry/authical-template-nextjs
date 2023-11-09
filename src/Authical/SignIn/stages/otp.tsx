"use client";
import { useContext, useState } from "react";
import { AuthicalContext } from "../../AuthicalProvider";
import { useRouter } from "next/navigation";
import React from "react";


export default (props: {
    setStage: React.Dispatch<React.SetStateAction<number>>,
    email: string
}) => {
    const router                    = useRouter();
    const authical                  = useContext(AuthicalContext);
    const [otp, setOTP]             = useState("");
    const [error, setError]         = useState(undefined as string|undefined);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        try {
            setIsLoading(true);
            await authical.Auth.verifySignIn(otp.trim());
            setIsLoading(false);
            setError(undefined);
            let _profile = await authical.Profile.get();
            if (_profile.name.first == "" || _profile.name.last == "") {
                props.setStage(2);
            } else {
                if (authical.config.paths?.signIn) {
                    router.push(authical.config.paths?.onSignIn);
                }
            }
        } catch (error:any) {
            setIsLoading(false);
            if (error.message == "OTP Invalid") {
                setError("Error - Invalid Password\nPlease verify your password and try again.");
            } else {
                setError("Error - Login Request Not Found\nPlease request resend and try again.");
            }
            
        }
    }

    return (
        <div className="component--signin">
            <div className="company-logo">
                <img src={authical.config?.organization?.logo}/>
            </div>
            <div>
                <div className="text--title">Check your email</div>
                <div className="text--subtitle">we've sent a code to {props.email}</div>
            </div>
            <div>
                <div>
                    <input type="text" id="number" name="number" autoFocus
                        className="input--text input--otp" placeholder="0000"
                        required value={otp} onChange={(e) => setOTP(e.target.value)}
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
                    <p><b>{error.split("\n")[0]}</b></p>
                    <p>{error.split("\n")[1]}</p>
                </div>
            : null}
            <div>
                <p className="text--muted">
                    Didn't get a code?{" "}
                    <a className="text--link" onClick={() => props.setStage(0)} style={{ cursor: "pointer" }}>Resend</a>
                </p>
            </div>
        </div>
    );
};
