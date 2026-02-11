import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    try{
        const [rows] = await db.query(
            'SELECT * FROM film'
        )
        return NextResponse.json(rows)
    }catch (err){
        return NextResponse.json({ err: err.message}, {status: 500})
    }
}

