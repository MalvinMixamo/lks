import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {

    const resolvedParams = await params
    const id = resolvedParams.id
    const { searchParams } = new URL(request.url)
    const queryId = searchParams.get('id')
    
    const finalId = id || queryId
    if (!finalId) {
        return NextResponse.json({ message: "ID-nya mana bray? Kosong nih." }, { status: 400 })
    }
    try {
        const [rows] = await db.query('SELECT * FROM film WHERE id = ?', [finalId])

        return NextResponse.json(rows[0])
    } catch (err) {
        return NextResponse.json({ message: "Gagal update" }, { status: 500 })
    }
}