import { NextResponse } from "next/server";
import skills  from "@/skills.json";
const fs = require("fs").promises;

export async function GET() {
    return NextResponse.json(skills);
}

export async function POST(request) {
    const role = await request.json();
    const newSkills = [...skills, 
        { id: (skills.length + 1).toString(), name: role?.name }];
    try {
        await fs.writeFile("src/skills.json", JSON.stringify(newSkills));
        console.log("The file has been saved!", newSkills);
    } catch (err) {
        console.error("Error writing to file:", err);
        return new Response("An error occurred.", { status: 500 });
    }
    return NextResponse.json(newSkills);
}