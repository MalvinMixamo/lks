import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { fullname, username, password } = await req.json()
    try{
        const token = crypto.randomUUID() 
        const expiredAt = Math.floor((Date.now() + 1000 * 60 * 60 * 24) / 1000) 
        const sql = (
            `INSERT INTO users (fullname, username, password, is_blocked, create_at, update_at, uuid) VALUES (?, ?, ?, 0, NOW(), NOW(), UUID())`
        )
        const values = [
            fullname, 
            username, 
            password
        ]
        const [result] = await db.query(sql, values)
        return NextResponse.json({message: 'Berhasil Register!', data: {id: result.insertId, username}})
    }catch(err){
        return NextResponse.json({message: 'error ini woi!', err}, {status: 500})
    }
}