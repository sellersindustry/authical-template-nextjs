"use client";
import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
// @ts-ignore
import FeatherIcon from "feather-icons-react";
import { AuthicalContext } from "..";
import { Profile } from "@sellers-industry/authical-core";


export type UserButtonItem = {
    icon:string;
    label:string;
    href:string;
}


const DEFAULT_ITEMS:UserButtonItem[] = [
    {
        icon: "settings",
        label: "Manage Account",
        href: "/account"
    },
    {
        icon: "log-out",
        label: "Sign Out",
        href: "/signout"
    },
];


export default ({ items = DEFAULT_ITEMS }:{ items?:UserButtonItem[] }) => {
    const authical                  = useContext(AuthicalContext);
    const activator                 = useRef() as MutableRefObject<HTMLDivElement>;
    const menu                      = useRef() as MutableRefObject<HTMLDivElement>;
    const [isOpen, setIsOpen]       = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition]   = useState([0, 0]);
    const [profile, setProfile]     = useState(undefined as Profile|undefined);


    useEffect(() => {
        (async () => {
            if (await authical.Auth.active(true)) {
                setProfile(await authical.Profile.get());
            }
        })();
    }, []);

    
    useEffect(() => {
        if (!activator.current || !menu.current) return;
        if (isOpen) {
            let activatorBBox:DOMRect = activator.current.getBoundingClientRect();
            let menuBBox:DOMRect      = menu.current.getBoundingClientRect();
            setPosition([
                Math.max(0, activatorBBox.x + activatorBBox.width - menuBBox.width),
                activatorBBox.y + activatorBBox.height
            ]);
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);


    if (!profile) return null;
    return (
        <div className="authical--component">
            <div className="component--user-button">
                <div className="user--avatar activator" ref={activator} onClick={() => setIsOpen(!isOpen)}>
                    <img src={profile.avatar}/>
                </div>
                <div className="menu" ref={menu} style={{
                    visibility: isVisible ? "visible" : "hidden",
                    position: "fixed",
                    left: position[0],
                    top: position[1]
                }}>
                    <div className="user--details">
                        <div className="user--avatar">
                            <img src={profile.avatar}/>
                        </div>
                        <div>
                            <p className="text--title">{profile.name.first}{" "}{profile.name.last}</p>
                            <p className="text--subtitle">{profile.email.primary}</p>
                        </div>
                    </div>
                    {items.map((item, index) => {
                        return (
                            <a href={item.href} style={{ color: "unset", textDecoration: "none" }} key={index}>
                                <div className="menu-item">
                                    <div className="icon">
                                        <FeatherIcon icon={item.icon} size="1.2rem" color="grey"/>
                                    </div>
                                    <div className="label">
                                        {item.label}
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
                {isOpen ?
                    <div className="shade" onClick={() => setIsOpen(false)}/>
                : null}
            </div>
        </div>
    );
};
