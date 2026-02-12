import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const [rows] = await db.query(
            `SELECT fullname, username, role, is_blocked FROM users`
        )
        return NextResponse.json(rows, {status: 200})
    }catch(error){
        return NextResponse.json({message: 'gatau dah bray capek, nih errornya', error}, {status: 500})
    }
}