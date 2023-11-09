import { Settings, SettingsValidator } from "@sellers-industry/authical-core";
import { Children } from "../../model";
import { Section } from "./abstact";
import React, { useContext, useEffect, useState } from "react";
import { AuthicalContext } from "../..";



export default class SettingsSection implements Section {
    
    isAdmin(): boolean {
        return true;
    }

    getID(): string {
        return "settings";
    }

    getIcon(): string {
        return "sliders";
    }

    getLabel(): string {
        return "Settings";
    }

    getPanel(): Children {
        return <Panel/>;
    }

}


const Panel = () => {
    const authical                = useContext(AuthicalContext);
    const [isLocked, setIsLocked] = useState(false);
    const [value, setValue]       = useState("");
    const [settings, setSettings] = useState(undefined as Settings|undefined);
    const [error, setError]       = useState(undefined as undefined|string);

    useEffect(() => {
        (async () => {
            setIsLocked(true);
            if (await authical.Auth.active()) {
                let settings = await authical.Admin.Settings.get();
                setSettings(settings);
                setValue(JSON.stringify(settings, null, 4));
            }
            setIsLocked(false);
        })();
    }, []);


    useEffect(() => {
        let res = true;
        try {
            let settings = JSON.parse(value);
            res = SettingsValidator(settings);
            if (!res && SettingsValidator.errors) {
                setError(SettingsValidator.errors.map((o:any) => {
                    let path:string = o.instancePath.replace("/", ".");
                    return `${(path == "") ? "." : path}: ${(o.message) ? o.message : o.keyword}`;
                }).join("\n"));
            } else {
                setSettings(settings);
                setError(undefined);
            }
        } catch {
            setError("Invalid JSON");
        }
    }, [value]);


    const handleSubmit = () => {
        if (!settings) return;
        if (isLocked) return;
        (async () => {
            setIsLocked(true);
            try {
                await authical.Admin.Settings.set(settings);
                setError(undefined);
                window.location.reload();
            } catch (e:any) {
                setError(e.message);
            }
            setIsLocked(true);
        })();
    };



    if (!settings) return;
    return (
        <div className="container">
            <h1>Settings</h1>
            <h2>Manage Authical Settings</h2>
            <div className="spacer--4"/>

            <textarea
                value={value}
                style={{ width: "800px", height: "800px" }}
                onChange={(e) => setValue(e.target.value)}
            />

            <div className="spacer--2"/>

            {error ? 
                <div className="alert--error">
                    {error}
                </div>
            : 
                <div className="input--button" onClick={() => handleSubmit()}>
                    Save Settings
                </div>
            }
            

        </div>
    );
};

