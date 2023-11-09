import { TokenID, TokenStrictID, TokenStrictSecretAndID } from "@sellers-industry/authical-core";
import { Children } from "../../model";
import { Section } from "./abstact";
import React, { useContext, useEffect, useState } from "react";
import { AuthicalContext } from "../..";


export default class Tokens implements Section {
    
    isAdmin(): boolean {
        return true;
    }

    getID(): string {
        return "tokens";
    }

    getIcon(): string {
        return "key";
    }

    getLabel(): string {
        return "API Tokens";
    }

    getPanel(): Children {
        return <Panel/>;
    }

}


const Panel = () => {
    const authical                      = useContext(AuthicalContext);
    const [tokens, setTokens]           = useState([] as TokenStrictID[]);
    const [description, setDescription] = useState("");
    const [newToken, setNewToken] = useState(undefined as undefined|TokenStrictSecretAndID);


    function loadTokens() {
        (async () => {
            setTokens(await authical.Admin.Token.getAll());
        })();
    }


    useEffect(() => {
        loadTokens();
    }, []);


    function revolk(tokenID:TokenID) {
        (async () => {
            await authical.Admin.Token.delete(tokenID);
            loadTokens();
        })();
    }


    function add(description:string) {
        (async () => {
            setNewToken(await authical.Admin.Token.add({ description: description }));
            setDescription("");
            loadTokens();
        })();
    }


    return (
        <div className="container">
            <h1>API Tokens</h1>
            <h2>Manage Backend API Tokens</h2>
            <div className="spacer--4"/>

            {newToken ? 
                <div>
                    <div className="spacer--2"/>
                    <div className="alert--error">
                        <p><b>New Token Generated</b></p>
                        <p>
                            You will not able to be view the token secret again.
                            Please store the secret somewhere secure.
                        </p>
                        <p>
                            <b>TokenID: </b>{newToken.id}
                        </p>
                        <p>
                            <b>Secret: </b>{newToken.secret}
                        </p>
                    </div>
                    <div className="spacer--2"/>
                </div>    
            : null}
            
            <div className="list-container">
                {tokens.map((token:TokenStrictID, index) => {
                    return (
                        <div className="list" key={index}>
                            <div className="grow">
                                <p style={{ margin: "0.5rem 0" }}><b>
                                    {token.description}
                                </b></p>
                                <p className="text--muted" style={{ margin: "0.5rem 0" }}>
                                    {token.id}
                                </p>
                            </div>
                            <div className="input--button outline" onClick={() => revolk(token.id)}>
                                Revolk
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="spacer--4"/>

            <label htmlFor="addToken" className="input--label">Add Token</label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <input type="text" id="addToken" name="addToken"
                    placeholder="Description of API Token..." className="input--text"
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={(e) => { if (e.key == "Enter") add(description); }}/>
                <div className="input--button secondary" style={{ width: "100px" }} onClick={() => add(description)}>
                    Add Token
                </div>
            </div>

        </div>
    );
};

