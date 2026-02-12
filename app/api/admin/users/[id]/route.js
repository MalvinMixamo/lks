import { db } from "@/lib/db";

export async function PATCH(request, { params }) {
    const { id } = params;
    const { role, is_blocked } = await request.json();

    try {
        await db.query(
            "UPDATE users SET role = ?, is_blocked = ? WHERE id = ?",
            [role, is_blocked, id]
        );
        return NextResponse.json({ message: "Update sukses bray!" });
    } catch (err) {
        return NextResponse.json({ message: "Gagal update" }, { status: 500 });
    }
}