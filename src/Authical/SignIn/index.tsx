"use client";
import React, { useContext, useEffect, useState } from "react";
import Signin from "./stages/signin";
import Otp from "./stages/otp";
import Profile from "./stages/profile";
import { AuthicalContext } from "../AuthicalProvider";
import { useRouter } from "next/navigation";

export default () => {
    const router   = useRouter();
    const authical = useContext(AuthicalContext);
    const [stage, setStage] = useState(0);
    const [email, setEmail] = useState("");

    useEffect(() => {
        (async () => {
            if (await authical.Auth.active(true) && authical.config.paths?.onSignIn) {
                router.push(authical.config.paths?.onSignIn);
            }
        })();
    }, [router]);

    return (
        <div className="authical--component fullscreen">
            {authical.config.organization?.authicalBranding ?
                <div className="text--badge secured-by-authical">Secured By <b>Authical</b></div>
            : null}
            {(stage == 0) ? <Signin setStage={setStage} email={email} setEmail={setEmail}/> : null}
            {(stage == 1) ? <Otp setStage={setStage} email={email}/> : null}
            {(stage == 2) ? <Profile/> : null}
        </div>
    );
};
