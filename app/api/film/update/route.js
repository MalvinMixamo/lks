import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PUT(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return Response.json({ error: "Mana ID-Nya???" }, { status: 400 });
    }
    try{
        const {
            judul, 
            genre, 
            sinopsis, 
            trailer, 
            kategori, 
            casting, 
            durasi, 
            tahun_rilis,
            trivia
        } = await request.json()
        const sql =
            'UPDATE film SET judul = ?, genre = ?, sinopsis = ?, trailer = ?, kategori = ?, casting = ?, durasi = ?, tahun_rilis = ?, trivia = ? WHERE id = ?'
        const values = [
            judul,
            genre, 
            sinopsis, 
            trailer, 
            kategori,
            casting,
            durasi, 
            tahun_rilis,
            trivia,
            id
        ]
        await db.query(sql, values)
        return NextResponse.json({message: 'data berhasil di update!'}, {status: 200})
    }catch(err){
        return NextResponse.json({message: 'error woi api nya, payah'}, {status: 500})
    }
}