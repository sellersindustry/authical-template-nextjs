import { Profile } from "@sellers-industry/authical-core";
import { Children } from "../../model";
import { Section } from "./abstact";
import React, { useContext, useEffect, useState } from "react";
import { AuthicalContext } from "../../AuthicalProvider";


export default class ProfileSection implements Section {
    
    isAdmin(): boolean {
        return false;
    }

    getID(): string {
        return "profile";
    }

    getIcon(): string {
        return "user";
    }

    getLabel(): string {
        return "Profile";
    }

    getPanel(): Children {
        return <Panel/>;
    }

}


const Panel = () => {
    const authical                  = useContext(AuthicalContext);
    const [profile, setProfile]     = useState(undefined as undefined|Profile);
    const [nameFirst, setNameFirst] = useState("");
    const [nameLast, setNameLast]   = useState("");
    const [avatar, setAvatar]       = useState("");


    useEffect(() => {
        (async () => {
            if (!await authical.Auth.active()) return;
            let _profile = await authical.Profile.get();
            setProfile(_profile);
            setNameFirst(_profile.name.first);
            setNameLast(_profile.name.last);
            setAvatar(_profile.avatar);
        })();
    }, []);


    const handleSubmit = () => {
        if (!profile) return;
        (async () => {
            await authical.Profile.set({
                ...profile,
                name: {
                    first: nameFirst,
                    last: nameLast
                },
                avatar: avatar
            });
            window.location.reload();
        })();
    };


    const convertBase64 = (file:File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const handleImage = (event:any) => {
        (async () => {
            setAvatar(await convertBase64(event.target.files[0]) as string);
        })();
    };
    

    if (!profile) return null;
    return (
        <div className="container small">
            <h1>Profile</h1>
            <h2>Manage your account information</h2>
            <div className="spacer--4"/>

            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                <img alt="preview image" src={avatar} className="user--avatar"/>
                <input
                    type="file" onChange={(e) => handleImage(e)}
                    accept="image/png, image/jpeg"/>
            </div>

            <div className="spacer--4"/>

            <label htmlFor="firstName" className="input--label">First Name</label>
            <br/>
            <input type="text" id="firstName" name="firstName"
                placeholder="Amy" className="input--text"
                value={nameFirst} onChange={(e) => setNameFirst(e.target.value)}/>

            <div className="spacer--1"/>

            <label htmlFor="lastName" className="input--label">Last Name</label>
            <br/>
            <input type="text" id="lastName" name="lastName"
                placeholder="Pond" className="input--text"
                value={nameLast} onChange={(e) => setNameLast(e.target.value)}/>

            <div className="spacer--2"/>

            <div className="input--button" onClick={() => handleSubmit()}>
                Save Profile
            </div>
        </div>
    );
};

