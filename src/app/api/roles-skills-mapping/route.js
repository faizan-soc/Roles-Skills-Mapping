import { NextResponse } from "next/server";
import map from "@/mapping.json";
const fs = require("fs").promises;

export async function GET() {
    return NextResponse.json(map);
}

export async function PATCH(request) {
    const body = await request.json();
    const data = { ...map, [body.role_id]: body.skill_set };
    try {
        await fs.writeFile("src/mapping.json", JSON.stringify(data));
        console.log("The file has been saved!", data);
        return NextResponse.json(data);
    } catch (err) {
        console.error("Error writing to file:", err);
        return new Response("An error occurred.", { status: 500 });
    }
}
