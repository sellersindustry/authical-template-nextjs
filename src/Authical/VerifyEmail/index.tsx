"use client";
import { useContext, useEffect, useState } from "react";
import { AuthicalContext } from "../AuthicalProvider";
import { useSearchParams } from "next/navigation";
// @ts-ignore
import FeatherIcon from "feather-icons-react";


enum STATE {
    LOADING,
    SUCCESS,
    ERROR
}

export default () => {
    const authical          = useContext(AuthicalContext);
    const searchParams      = useSearchParams();
    const [state, setState] = useState(STATE.LOADING);

    useEffect(() => {
        if (state != STATE.LOADING) return;
        (async () => {
            try {
                let userID = searchParams.get("user");
                let secret = searchParams.get("secret");
                if (!userID || !secret)
                    throw new Error();
                await authical.Profile.verifyEmail(userID, secret);
                setState(STATE.SUCCESS);
            } catch {
                setState(STATE.ERROR);
            }
        })();
    }, [searchParams]);

    if (state == STATE.LOADING)
        return (
            <div className="authical--component">
                <div style={{ display: "flex", padding: "10rem 0", margin: "auto", maxWidth: "800px", flexDirection: "column", alignItems: "center" }}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    if (state == STATE.SUCCESS)
        return (
            <div className="authical--component">
                <div style={{ display: "flex", padding: "10rem 0", margin: "auto", maxWidth: "800px", flexDirection: "column", alignItems: "center" }}>
                    <FeatherIcon icon="check-circle" size="48"/>
                    <h2>Your email is now validated!</h2>
                    <p className="text--muted" style={{ fontSize: "1rem" }}>You can now login to {authical.branding?.product} using this new email address.</p>
                </div>
            </div>
        );
    return (
        <div className="authical--component">
            <div style={{ display: "flex", padding: "10rem 0", margin: "auto", maxWidth: "800px", flexDirection: "column", alignItems: "center" }}>
                <FeatherIcon icon="alert-circle" size="48"/>
                <h2>Unable to validate your email.</h2>
                <p className="text--muted" style={{ fontSize: "1rem" }}>We seem to be unable to validate this email address. Please try again.</p>
            </div>
        </div>
    );
};
