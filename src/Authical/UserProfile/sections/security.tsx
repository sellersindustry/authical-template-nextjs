import { Session, SessionID, Utility } from "@sellers-industry/authical-core";
import { Children } from "../../model";
import { Section } from "./abstact";
import React, { useContext, useEffect, useState } from "react";
import { AuthicalContext } from "../..";


export default class SecuritySection implements Section {
    
    isAdmin(): boolean {
        return false;
    }

    getID(): string {
        return "security";
    }

    getIcon(): string {
        return "shield";
    }

    getLabel(): string {
        return "Security";
    }

    getPanel(): Children {
        return <Panel/>;
    }

}


const Panel = () => {
    const authical                  = useContext(AuthicalContext);
    const [sessions, setSessions]   = useState([] as Session[]);
    const [sessionID, setSessionID] = useState(undefined as undefined|string);
    const [isLocked, setIsLocked]   = useState(false);


    function loadSessions() {
        (async () => {
            setIsLocked(true);
            if (await authical.Auth.active()) {
                setSessions(await authical.Session.getAll());
                setSessionID(authical.Session.getCurrentID());
            }
            setIsLocked(false);
        })();
    }
    

    useEffect(() => {
        loadSessions();
    }, []);


    function revolk(session:SessionID) {
        if (isLocked) return;
        (async () => {
            try {
                await authical.Session.revolk(session);
            } catch (e:any) {
                console.error(`Authical Client UI - ${e.message}`);
            }
            loadSessions();
        })();
    }


    function revolkAll() {
        if (isLocked) return;
        (async () => {
            try {
                await authical.Session.revolkAll();
            } catch (e:any) {
                console.error(`Authical Client UI - ${e.message}`);
            }
        })();
    }


    if (!sessionID) return;
    return (
        <div className="container">
            <h1>Security</h1>
            <h2>Manage your device sessions</h2>
            <div className="spacer--4"/>

            <div className="list-container">

                {sessions.map((session:Session, index) => {
                    return (
                        <div className="list" key={index}>
                            <div className="grow">
                                <p style={{ margin: "0.5rem 0" }}><b>
                                    {session.device.os}
                                    <p>{JSON.stringify(session)}</p>
                                    <p>{sessionID}</p>
                                    {session.id == sessionID ?
                                        <span className="text--badge" style={{ marginLeft: "0.5rem" }}>
                                            Current Device
                                        </span>
                                    : null}
                                </b></p>
                                <p className="text--muted" style={{ margin: "0.5rem 0" }}>
                                    {session.device.browser} - {session.device.ip}
                                </p>
                                {session.device.location ?
                                    <p className="text--muted" style={{ margin: "0.5rem 0" }}>
                                        {session.device.location}
                                    </p>
                                : null}
                                <p className="text--muted" style={{ margin: "0.5rem 0" }}>
                                    {Utility.timeago(session.updated)}
                                </p>
                            </div>
                            {session.id == sessionID ?
                                <div className="input--button outline" onClick={() => revolk(session.id as string)}>
                                    Sign Out
                                </div>
                            :
                                <div className="input--button outline" onClick={() => revolk(session.id as string)}>
                                    Revolk
                                </div>
                            }
                        </div>
                    );
                })}
                

            </div>

            <div className="spacer--4"/>

            <div className="input--button danger grow" onClick={() => revolkAll()}>
                Revolk All (Sign Out)
            </div>
        </div>
    );
};

