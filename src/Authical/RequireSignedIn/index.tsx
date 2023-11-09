"use client";
import { useContext, useEffect, useState } from "react";
import { AuthicalContext } from "../AuthicalProvider";
import { Children } from "../model";
import { useRouter } from "next/navigation";


export default ({ children } : { children:Children }) => {
    const router                  = useRouter();
    const authical                = useContext(AuthicalContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            if (!(await authical.Auth.active()) && authical.config.paths?.signIn) {
                router.push(authical.config.paths?.signIn);
            } else {
                setIsLoaded(true);
            }
        })();
    }, [router]);

    return (isLoaded) ? children : null;
};
