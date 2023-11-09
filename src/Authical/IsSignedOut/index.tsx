"use client";
import { useContext, useEffect, useState } from "react";
import { AuthicalContext } from "../AuthicalProvider";
import { Children } from "../model";

export default ({ children } : { children:Children }) => {
    const authical                    = useContext(AuthicalContext);
    const [isLoaded, setIsLoaded]     = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoggedIn(await authical.Auth.active(true));
            setIsLoaded(true);
        })();
    });

    return (isLoaded && !isLoggedIn) ? children : null;
};
