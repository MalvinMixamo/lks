import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        const {
            judul, 
            genre, 
            sinopsis, 
            trailer, 
            kategori,
            poster,
            casting, 
            durasi,
            tahun_rilis,
            trivia
        } = await request.json()

        const sql = `
            INSERT INTO film (judul, genre, sinopsis, trailer, kategori, poster, casting, durasi, tahun_rilis, trivia) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `

        const values = [
            judul,
            genre, 
            sinopsis, 
            trailer, 
            kategori,
            poster,
            casting,
            durasi, 
            tahun_rilis,
            trivia
        ]

        const [result] = await db.query(sql, values)

        return NextResponse.json({
            message: 'film berhasil dimasukin bray!',
            data: { id: result.insertId, judul }
        },{status: 200})
    }catch (err){
        return NextResponse.json({
            message: 'gagal bray, servernya mungkin',
            err: err.message
        }, {status: 500})
    }
}