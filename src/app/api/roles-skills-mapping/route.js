import { NextResponse } from "next/server";
import map from "@/mapping.json";
const fs = require("fs");

export async function GET() {
    return NextResponse.json(map);
}

export async function PATCH(request) {
    const body = await request.json();
    console.log("body", body);
    console.log("map", map);
    const data = { ...map, [body.role_id]: body.skill_set };
    console.log("data", data);
    fs.writeFile("src/mapping.json", JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
        return NextResponse.json(data);
    });
}
