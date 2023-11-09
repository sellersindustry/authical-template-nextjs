"use client";
import React, { createContext } from "react";
import { Children } from "../model";
import { ClientSDK, ClientSDKConfig } from "@sellers-industry/authical-core";


export const AuthicalContext = createContext({} as ClientSDK);
export const AuthicalProvider = ({ children, config } : { children:Children, config:ClientSDKConfig }) => {
    return (
        <AuthicalContext.Provider value={new ClientSDK(config)}>
            {children}
        </AuthicalContext.Provider>
    );
};
