import { Children } from "../../model";
import { Section } from "./abstact";
import React, { useContext, useState } from "react";
import { AuthicalContext } from "../..";


export default class DeleteSection implements Section {

    isAdmin(): boolean {
        return false;
    }

    getID(): string {
        return "delete";
    }

    getIcon(): string {
        return "trash";
    }

    getLabel(): string {
        return "Delete Account";
    }

    getPanel(): Children {
        return <Panel/>;
    }

}


const Panel = () => {
    const authical                = useContext(AuthicalContext);
    const [confirm, setConfirm]   = useState("");
    const [isLocked, setIsLocked] = useState(false);


    const handleSubmit = () => {
        if (isLocked) return;
        if (confirm != "DELETE") {
            alert("Account NOT deleted. Please type \"DELETE\" to confirm.");
            setConfirm("");
            return;
        }
        (async () => {
            setIsLocked(true);
            await authical.Profile.delete();
            window.location.reload();
        })();
    };


    if (isLocked)
        return (
            <div className="container">
                <p>Deleting...</p>
            </div>
        );
    return (
        <div className="container small">
            <h1>Delete Account</h1>
            <h2>Delete your account and remove all data</h2>
            <div className="spacer--2"/>

            <p>
                Deleting your account will remove all data and is a permanent
                action, <b>this cannot be undone</b>. Please type{" "}
                <u>DELETE</u> to confirm the deletion of your account.
            </p>

            <div className="spacer--2"/>

            <label htmlFor="confirm" className="input--label">Confirm Account Deletion</label>
            <br/>
            <input type="text" id="confirm" name="confirm"
                placeholder="DELETE" className="input--text"
                value={confirm} onChange={(e) => setConfirm(e.target.value)}/>

            <div className="spacer--2"/>

            <div className="input--button danger" onClick={() => handleSubmit()}>
                Delete Account
            </div>
        </div>
    );
};

