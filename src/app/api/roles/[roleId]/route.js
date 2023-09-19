import { NextResponse } from "next/server";
// import map from "@/mapping.json";
import { roles } from "@/roles";

export async function GET(request, { params }) {
    const role = (roles.find(role => role.id === params.roleId));
    return NextResponse.json(role);
}

