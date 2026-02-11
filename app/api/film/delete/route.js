import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(request, {params}) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    try{
        await db.query(
            'DELETE FROM film WHERE id = ?', id
        )
        return NextResponse.json({message: 'data berhasil dihapus!'}, {status: 200})
    }catch(err){
        return NextResponse.json({message: 'gagal ngehapus bray!'}, {status: 500})
    }
}