import { Profile } from "@sellers-industry/authical-core";
import { Children } from "../../model";
import { Section } from "./abstact";
import React, { useContext, useState } from "react";
import { AuthicalContext } from "../..";



export default class UsersSection implements Section {
    
    isAdmin(): boolean {
        return true;
    }

    getID(): string {
        return "users";
    }

    getIcon(): string {
        return "users";
    }

    getLabel(): string {
        return "Users";
    }

    getPanel(): Children {
        return <Panel/>;
    }

}


const Panel = () => {
    const authical                              = useContext(AuthicalContext);
    const [userInput, setUserInput]             = useState("");
    const [profile, setProfile]                 = useState(undefined as undefined|Profile);
    const [profileInput, setProfileInput]       = useState("");
    const [error, setError]                     = useState(undefined as undefined|string);


    function viewUser(userID:string|undefined) {
        if (userID == undefined) {
            setError(undefined);
            setProfile(undefined);
            setProfileInput("");
        } else {
            authical.Admin.User.get(userID).then((profile) => {
                setError(undefined);
                setProfile(profile);
                setProfileInput(JSON.stringify(profile, null, 4));
            }).catch((error) => {
                setError(error.message);
            });
        }
    }


    function saveUser() {
        try {
            authical.Admin.User.set(userInput, JSON.parse(profileInput)).then(() => {
                viewUser(userInput);
            }).catch((error) => {
                setError(error.message);
            });
        } catch {
            setError("Unable to parse JSON");
        }
    }

    function deleteUser() {
        let confirm = prompt("Please type \"DELETE\" to confirm the deletion of this account.");
        if (confirm != "DELETE") {
            alert("Account was NOT deleted");
        } else {
            authical.Admin.User.delete(userInput).then(() => {
                window.location.reload();
            });
        }
    }


    if (profile) {
        return (
            <div className="container">
                <p className="text--link" onClick={() => viewUser(undefined)}>{"<"} Back</p>
                <div style={{ display: "flex", gap: "2rem" }}>
                    <div>
                        <img alt="preview image" src={profile.avatar} className="user--avatar large"/>
                    </div>
                    <div>
                        <h1>{profile.name.first} {profile.name.last}</h1>
                        <h2>{profile.id}</h2>
                    </div>
                </div>

                <div className="spacer--4"/>
                
                <textarea
                    value={profileInput}
                    style={{ width: "800px", height: "800px" }}
                    onChange={(e) => setProfileInput(e.target.value)}
                />

                <div className="spacer--2"/>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <div className="input--button" onClick={() => saveUser()}>Save</div>
                    <div className="input--button danger" onClick={() => deleteUser()}>Delete Account</div>
                </div>

                <div className="spacer--2"/>

                {error ? 
                    <div className="alert--error">
                        {error}
                    </div>
                : null}
    
            </div>
        );
    } else {
        return (
            <div className="container">
                <h1>Users</h1>
                <h2>Manage User Accounts</h2>
                <div className="spacer--4"/>
                
                <label htmlFor="addEmail" className="input--label">Email/UserID</label>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <input type="email" id="addEmail" name="addEmail"
                        placeholder="amy.pond@tw.com" className="input--text"
                        value={userInput} onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key == "Enter") viewUser(userInput); }}/>
                    <div className="input--button secondary" style={{ width: "100px" }} onClick={() => viewUser(userInput)}>
                        View User
                    </div>
                </div>

                {error ? 
                    <div className="alert--error">
                        {error}
                    </div>
                : null }
    
            </div>
        );
    }    
};

