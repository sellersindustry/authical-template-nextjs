import { MachineSDK } from "@sellers-industry/authical-core";
import { NextRequest } from "next/server";


export async function GET(req:NextRequest) {
    let sdk = new MachineSDK({
        authicalServerURL: "http://localhost:4000",
        tokenID: "9f581f07-37e0-4bdb-8870-a192b47bdf0b",
        secret: "41163caf7c9976a197190dac2030efb95508a84130bf9f3dab62f29a521ec698f1800af5b4dd2dede472ef13cbbac8aa"
    });
    let user = await sdk.Session.verify(req.headers.get("Authorization"));
    if (!user) {
        return new Response("Unauthorized", { status: 403 });
    } else {
        let profile = await sdk.User.get(user.user);
        return new Response(`Hello, ${profile.name.first} (${user.user})!`);
    }
}

