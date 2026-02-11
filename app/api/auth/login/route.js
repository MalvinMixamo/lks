import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request) {
    try{
        const { username, password } = await request.json()
        const [rows] = await db.query(
            `SELECT id, username, password, role FROM users WHERE username = ? AND password = ?`, 
        [username, password]
        )
        if(rows.length === 0){
            return NextResponse.json({message: 'ga ada bray datanya'}, {status: 400})
        }

        const user = rows[0]
        const token = crypto.randomUUID()
        const expiredAt = new Date(Date.now() + 1000 * 60 * 60 * 24)

        await db.query(
            `UPDATE users SET token = ?, expired_at = ? WHERE id = ?`, [token, expiredAt, user.id]
        )

        const response = NextResponse.json({message: 'login berhasil bray!', user: user.username, token: token, expired: expiredAt, role: user.role_name}, {status: 200})
        response.cookies.set('token', user.uuid, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24
        })
        response.cookies.set('role', user.role, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24
        })

        return response
    }catch(err){
        console.error("Detail errornya nih bray:", err)
        return NextResponse.json({message: 'rusak ni api nya, payah'}, {status: 500})
    }
}