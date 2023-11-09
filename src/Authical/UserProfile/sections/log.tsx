import { Log, Utility } from "@sellers-industry/authical-core";
import { Children } from "../../model";
import { Section } from "./abstact";
import React, { useContext, useEffect, useState } from "react";
import { AuthicalContext } from "../..";



export default class LogSection implements Section {
    
    isAdmin(): boolean {
        return true;
    }

    getID(): string {
        return "log";
    }

    getIcon(): string {
        return "archive";
    }

    getLabel(): string {
        return "Logs";
    }

    getPanel(): Children {
        return <Panel/>;
    }

}


const Panel = () => {
    const authical        = useContext(AuthicalContext);
    const [page, setPage] = useState(0);
    const [logs, setLogs] = useState([] as Log[]);


    useEffect(() => {
        authical.Admin.Log.get(page).then((logs) => {
            setLogs(logs);
        });
    }, [page]);


    return (
        <div className="container">
            <h1>System Logs</h1>
            <h2>View Authical Error Logs</h2>
            <div className="spacer--4"/>

            <div className="list-container" style={{ maxHeight: "800px", overflowY: "auto", overflowX: "hidden" }}>
                {logs.map((log:Log, index) => {
                    return (
                        <div className="list" key={index}>
                            <div>
                                <p className="text--muted" style={{ margin: "0.5rem 0" }}>
                                    {log.timestamp} ({Utility.timeago(log.timestamp)})
                                </p>
                                <p style={{ margin: "0.5rem 0" }}>
                                    {log.event}
                                </p>
                                <p style={{ margin: "0.5rem 0", fontSize: "0.8rem" }}>
                                    {log.message}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        
            <div className="spacer--2"/>

            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ minWidth: "100px" }}>
                    {(page != 0) ?
                        <div className="input--button" onClick={() => setPage(page - 1)}>Previous</div>
                    : null}
                </div>
                <div style={{ flexGrow: "1", textAlign: "center" }}>
                    <p>Page {page + 1}</p>
                </div>
                <div style={{ minWidth: "100px", display: "flex", justifyContent: "flex-end" }}>
                    <div className="input--button" onClick={() => setPage(page + 1)}>Next</div>
                </div>
            </div>
            

        </div>
    );
};

