import { NextResponse } from "next/server";
import roles  from "@/roles.json";
const fs = require("fs").promises;

export async function GET() {
    return NextResponse.json(roles);
}

export async function POST(request) {
    const role = await request.json();
    const newRoles = [...roles, 
        { id: (roles.length + 1).toString(), title: role?.title }];
    try {
        await fs.writeFile("src/roles.json", JSON.stringify(newRoles));
        console.log("The file has been saved!", newRoles);
    } catch (err) {
        console.error("Error writing to file:", err);
        return new Response("An error occurred.", { status: 500 });
    }
    return NextResponse.json(newRoles);
}