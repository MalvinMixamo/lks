import { db } from '@/lib/db';

export async function GET(request, { params }) {
    const { uuid } = await params;
    
    const [rows] = await db.query('SELECT * FROM users WHERE uuid = ?', [uuid]);
    
    if (rows.length === 0) {
        return Response.json({ message: "Data tidak ditemukan" }, { status: 404 });
    }

    return Response.json(rows[0]);
}