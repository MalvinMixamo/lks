import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const [users] = await db.query(
            `SELECT fullname, username, role, is_blocked FROM users`
        )
        return NextResponse.json({message: 'berhasil dapetin user'}, {status: 200}, users)
    }catch(err){
        return NextResponse.json({message: 'gagal dapetin user. Nih errornya', err}, {status: 500})
    }
}