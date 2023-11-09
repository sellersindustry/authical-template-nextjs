"use client";
import React, { useContext, useEffect, useState } from "react";
// @ts-ignore
import FeatherIcon from "feather-icons-react";
import { AuthicalContext } from "..";
import { Profile } from "@sellers-industry/authical-core";
import { Section } from "./sections/abstact";
import ProfileSection from "./sections/profile";
import SecuritySection from "./sections/security";
import EmailSection from "./sections/emails";
import DeleteSection from "./sections/delete";
import SettingsSection from "./sections/settings";
import LogSection from "./sections/log";
import TokenSection from "./sections/token";
import UsersSection from "./sections/users";



const DEFAULT_SECTIONS = [
    new ProfileSection(),
    new EmailSection(),
    new SecuritySection(),
    new DeleteSection(),
    new SettingsSection(),
    new UsersSection(),
    new TokenSection(),
    new LogSection()
];


export default ({ sections = DEFAULT_SECTIONS }:{ sections?:Section[] }) => {
    const [selected, setSelected] = useState(-1);
    const [profile, setProfile]   = useState(undefined as Profile|undefined);
    const authical                = useContext(AuthicalContext);


    useEffect(() => {
        let params = new URL(window.location.href).searchParams;
        if (params.has("section")) {
            let hasFound = false;
            for (let i = 0; i < sections.length; i++) {
                if (sections[i].getID() == params.get("section")) {
                    setSelected(i);
                    hasFound = true;
                    break;
                }
            }
            if (!hasFound)
                setSelected(0); 
        } else {
            setSelected(0);
        }            
        (async () => {
            if (await authical.Auth.active()) {
                setProfile(await authical.Profile.get());
            }
        })();
    }, []);


    useEffect(() => {
        if (selected == -1) return;
        let url = new URL(window.location.href);
        url.searchParams.set("section", sections[selected].getID());
        window.history.pushState({}, "", url);
    }, [selected]);
    

    if (!profile) return null;
    if (selected == -1) return null;
    return (
        <div className="authical--component">
            <div className="component--user-profile">
                <div className="menu">
                    <div className="user--details">
                        <div className="user--avatar large">
                            <img src={profile.avatar}/>
                        </div>
                        <div>
                            <p className="text--title">{profile.name.first}{" "}{profile.name.last}</p>
                            <p className="text--subtitle">{profile.email.primary}</p>
                        </div>
                    </div>
                    {sections.map((section:Section, index:number) => {
                        if (section.isAdmin()) return null;
                        return (
                            <div className="menu-item" onClick={() => setSelected(index)} key={index}>
                                <div className="icon">
                                    <FeatherIcon icon={section.getIcon()} size="1.2rem"/>
                                </div>
                                <div className="label">
                                    {section.getLabel()}
                                </div>
                            </div>
                        );
                    })}
                    <div className="spacer--2"/>

                    {profile.isAdmin ? 
                        <>
                            <p style={{ marginLeft: "2rem" }} className="text--muted">
                                Administration
                            </p>
                            <div className="spacer--1"/>

                            {sections.map((section:Section, index:number) => {
                                if (!section.isAdmin()) return null;
                                return (
                                    <div className="menu-item" onClick={() => setSelected(index)} key={index}>
                                        <div className="icon">
                                            <FeatherIcon icon={section.getIcon()} size="1.2rem"/>
                                        </div>
                                        <div className="label">
                                            {section.getLabel()}
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    : null}

                </div>
                <div className="view">
                    {sections[selected].getPanel()}
                </div>
            </div>
        </div>
    );
};
