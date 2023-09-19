import { NextResponse } from "next/server";
import roles from "@/roles.json";
const fs = require("fs").promises;

export async function GET(request, { params }) {
    const role = roles.find((role) => role.id === params.roleId);
    return NextResponse.json(role);
}

export async function DELETE(request, { params }) {
    const newRoles = roles.filter((role) => role.id !== params.roleId);
    try {
        await fs.writeFile("src/roles.json", JSON.stringify(newRoles));
        console.log("The file has been saved!", newRoles);
    } catch (err) {
        console.error("Error writing to file:", err);
        return new Response("An error occurred.", { status: 500 });
    }
    return NextResponse.json(newRoles);
}

export async function PATCH(request, { params }) {
    const role = await request.json();
    const newRoles = roles.map((oldRole) =>
        oldRole.id === params.roleId
            ? {
                  ...oldRole,
                  [params.roleId]: role?.title,
              }
            : oldRole
    );
    try {
        await fs.writeFile("src/roles.json", JSON.stringify(newRoles));
        console.log("The file has been saved!", newRoles);
    } catch (err) {
        console.error("Error writing to file:", err);
        return new Response("An error occurred.", { status: 500 });
    }
    return NextResponse.json(newRoles);
}
