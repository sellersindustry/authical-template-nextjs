"use client";
import { useContext, useEffect } from "react";
import { AuthicalContext } from "../AuthicalProvider";

export default () => {
    const authical = useContext(AuthicalContext);

    useEffect(() => {
        (async () => {
            await authical.Auth.logout();
        })();
    });

    return null;
};
