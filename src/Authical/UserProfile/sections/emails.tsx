import { Children } from "../../model";
import { Section } from "./abstact";
import React, { useContext, useEffect, useState } from "react";
import { AuthicalContext } from "../../AuthicalProvider";
import { Email, Profile } from "@sellers-industry/authical-core";


export default class EmailSection implements Section {
    
    isAdmin(): boolean {
        return false;
    }

    getID(): string {
        return "emails";
    }

    getIcon(): string {
        return "at-sign";
    }

    getLabel(): string {
        return "Emails";
    }

    getPanel(): Children {
        return <Panel/>;
    }

}


const Panel = () => {
    const authical                = useContext(AuthicalContext);
    const [profile, setProfile]   = useState(undefined as Profile|undefined);
    const [email, setEmail]       = useState("");
    const [error, setError]       = useState(undefined as string|undefined);
    const [isLocked, setIsLocked] = useState(false);


    function loadProfile() {
        (async () => {
            setIsLocked(true);
            if (await authical.Auth.active()) {
                setProfile(await authical.Profile.get());
            }
            setIsLocked(false);
        })();
    }


    useEffect(() => {
        loadProfile();
    }, []);


    function addEmail(addedEmail:Email) {
        if (!profile) return;
        if (isLocked) return;
        (async () => {
            try {
                await authical.Profile.addEmail(addedEmail);
                setError(undefined);
                setEmail("");
                loadProfile();
            } catch (e:any) {
                setError(e.message);
            }
        })();
    }


    function removeEmail(removedEmail:Email) {
        if (!profile) return;
        if (isLocked) return;
        (async () => {
            try {
                await authical.Profile.removeEmail(removedEmail);
                setError(undefined);
                setEmail("");
                loadProfile();
            } catch (e:any) {
                setError(e.message);
            }
        })();
    }


    function setEmailPrimary(primaryEmail:Email) {
        if (!profile) return;
        if (isLocked) return;
        (async () => {
            try {
                await authical.Profile.setPrimaryEmail(primaryEmail);
                setError(undefined);
                setEmail("");
                loadProfile();
            } catch (e:any) {
                setError(e.message);
            }
        })();
    }


    if (!profile) return;
    if (isLocked) return;
    return (
        <div className="container">
            <h1>Email</h1>
            <h2>Manage your email addresses connected to your account</h2>
            <div className="spacer--4"/>

            <div className="list-container">
                {profile.email.active.map((cEmail:Email, index:number) => {
                    return (
                        <div className="list" key={index}>
                            <div className="grow">
                                <p style={{ margin: "0.5rem 0" }}>
                                    {cEmail}
                                    {(cEmail == profile.email.primary) ?
                                        <span className="text--badge" style={{ marginLeft: "0.5rem" }}>
                                            Primary
                                        </span>
                                    : null}
                                </p>
                            </div>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                {(cEmail != profile.email.primary) ?
                                    <>
                                        <div className="input--button outline" onClick={() => setEmailPrimary(cEmail)}>
                                            Set as Primary
                                        </div>
                                        <div className="input--button outline" onClick={() => removeEmail(cEmail)}>
                                            Remove
                                        </div>
                                    </>
                                : null}

                            </div>
                        </div>
                    );
                })}
                {profile.email.pending ? profile.email.pending.map((pendingEmail:any, index:number) => {
                    return (
                        <div className="list" key={index}>
                            <div className="grow">
                                <p style={{ margin: "0.5rem 0" }}>
                                    {pendingEmail.email}
                                    <span className="text--badge secondary" style={{ marginLeft: "0.5rem" }}>
                                        Pending
                                    </span>
                                </p>
                            </div>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <div className="input--button outline" onClick={() => removeEmail(pendingEmail.email)}>
                                    Remove
                                </div>
                            </div>
                        </div>
                    );
                }) : null}
            </div>

            <div className="spacer--4"/>

            <label htmlFor="addEmail" className="input--label">Add Email</label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <input type="email" id="addEmail" name="addEmail"
                    placeholder="amy.pond@tw.com" className="input--text"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key == "Enter") addEmail(email); }}/>
                <div className="input--button secondary" style={{ width: "100px" }} onClick={() => addEmail(email)}>
                    Add Email
                </div>
            </div>

            <div className="spacer--4"/>

            {error ?
                <div className="alert--error">
                    <p><b>Error - Unable to Save Profile</b></p>
                    <p>{error}</p>
                </div>
            : null}

        </div>
    );
};

