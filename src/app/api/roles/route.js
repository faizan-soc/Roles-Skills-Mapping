import { NextResponse } from "next/server";
import roles  from "@/roles.json";
import { title } from "process";
const fs = require("fs").promises;

export async function GET() {
    console.log("roles", roles);
    return NextResponse.json(roles);
}

export async function POST(request) {
    const role = await request.json();
    console.log("role", role, 'title', role.title);
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