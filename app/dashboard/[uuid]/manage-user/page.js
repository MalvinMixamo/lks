'use client'
import SideNav from "@/app/components/sideNav"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

function ManageUser({ nama, className, role}){

    const handleToggleBan = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'Banned' ? 'Active' : 'Banned'
        const isBlocked = newStatus === 'Banned' ? 1 : 0;

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_blocked: isBlocked })
            });
            if (res.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u))
            }
        } catch (err) {
            alert("Gagal mengubah status user")
        }
    }

    const [ users, setUsers ] = useState({data: []})
    const fetchUsers = async () => {
        const res = await fetch('/api/admin/users')
        const data = res.json
        setUsers(data)
    }
    useEffect(() => { fetchUsers() }, [])
    return (
    <div className="min-h-screen bg-slate-950 text-white flex font-sans">
      {/* --- SIDEBAR --- */}
      

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <p className="text-slate-500 text-sm">Welcome back, Admin {nama}! 👋</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition">🔔</button>
            <div className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-slate-800"></div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Movies', val: '1,240', color: 'text-blue-400' },
            { label: 'Active Users', val: '8,502', color: 'text-green-400' },
            { label: 'Total Reviews', val: '45.2k', color: 'text-yellow-400' },
            { label: 'Banned Users', val: '12', color: 'text-red-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h4 className={`text-3xl font-black mt-2 ${stat.color}`}>{stat.val}</h4>
            </div>
          ))}
        </div>

        {/* User Management Table */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-scroll md:overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold">User Management</h3>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-yellow-400 transition">
              + Add New User
            </button>
          </div>
          
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4 tracking-widest">User</th>
                <th className="px-6 py-4 tracking-widest">Role</th>
                <th className="px-6 py-4 tracking-widest">Status</th>
                <th className="px-6 py-4 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { name: 'Malvin Pradhypta', email: 'malvin@movies.db', role: 'Admin', status: 'Active' },
                { name: 'Joni Yespapa', email: 'joni@mail.com', role: 'Author', status: 'Active' },
                { name: 'Siti Subscriber', email: 'siti@web.id', role: 'Subscriber', status: 'Banned' },
              ].map((user, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold">{user.name}</div>
                    <div className="text-slate-500 text-xs">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <select className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-yellow-500">
                      <option selected={user.role === 'Admin'}>Admin</option>
                      <option selected={user.role === 'Author'}>Author</option>
                      <option selected={user.role === 'Subscriber'}>Subscriber</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${user.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-white mr-3">Edit</button>
                    <button onClick={() => handleToggleBan(user.id, user.status)} className="text-red-500 hover:underline font-bold">
                      {user.status === 'Banned' ? 'Unban' : 'Ban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
);
}

export default function Page() {
    const params = useParams()
    const uuid = params.uuid
    const router =  useRouter()
    const [dataUser, setDataUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (uuid) {
            fetch(`/api/auth/${uuid}`)
                .then((res) => {
                    if (!res.ok) {
                        router.push('/login');
                        return;
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data) setDataUser(data);
                    setLoading(false)
                })
                .catch((err) => console.log(err));
        }
    }, [uuid, router]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Memuat data...</div>;
    }

    if (!dataUser) {
        return <div className="flex h-screen items-center justify-center">Data tidak ditemukan bray.</div>;
    }

    return(
        <div className="flex flex-col md:flex-row gap-2.5 h-screen">
            <SideNav active="manage-user"/>
            <div className="w-full ml-0 mt-10 md:ml-62.5 md:mt-0">
                <ManageUser 
                    nama={dataUser.fullname}
                    className="text-black"
                    role={dataUser.role == null ? "" : `${dataUser.role}`}/>
            </div>

        </div>
    )
}
