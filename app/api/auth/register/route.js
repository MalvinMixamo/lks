import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { fullname, username, password } = await req.json()
    try{
        const sql = (
            `INSERT INTO users (fullname, username, password, create_at, update_at, uuid) VALUES(?, ?, ?, NOW(), NOW(), UUID())`
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