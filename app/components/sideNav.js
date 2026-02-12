'use client'
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function SideNav({active}) {
    function Tab({ logo, isi, id, href }) {
        const isActive = active === id
        return (
            <a id={id} href={href} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? "bg-yellow-500 text-black rounded-lg" : "hover:bg-slate-800"}`}>
                    <span className="text-lg">{logo}</span> {isi}
                </a>
        )
    }
    const params = useParams()
    const uuid = params.uuid
    const [open, setOpen] = useState(false)
    const [role, setRole] = useState('')
    
    useEffect(() => {
        const getCookie = (name) => {
            if (typeof document !== "undefined") {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            }
            return null;
        };

        const userRole = getCookie('role');
        console.log("Role di SideNav:", userRole);
        setRole(userRole);
    }, []);
    return (
        <>
            <div className={`w-full bg-slate-900/50 backdrop-blur-md ${ open ? "h-0" : "h-14"} z-50 md:hidden flex items-center fixed transition-all ease-in-out`}>
                <button
                    className="sm:hidden fixed top-4 left-4 z-50 p-2 backdrop-blur-md rounded-md"
                    onClick={() => setOpen(!open)}
                >
                    <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                    <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                </button>
                <h1 className="ml-20 text-xl font-black text-yellow-500 tracking-tighter">FILMKu <span className="text-[10px] bg-yellow-500 text-black px-1 rounded ml-1">ADMIN</span></h1>
            </div>

            <aside className={` bg-slate-900 md:bg-slate-900/50  border-r border-slate-800 z-10
                    fixed top-0 left-0 h-screen px-2.5 py-2.5 gap-2.5 w-full md:w-62.5
                    flex flex-col transition-transform duration-300 
                    ${open ? "translate-y-0" : "-translate-y-full"}
                    sm:translate-y-0 sm:static" }`}>
                <div className="p-6">
                <h1 className="text-xl font-black text-yellow-500 tracking-tighter">FILMKu <span className="text-[10px] bg-yellow-500 text-black px-1 rounded ml-1">ADMIN</span></h1>
                </div>
                
                <nav className="flex-1 px-4 space-y-2 text-sm font-medium text-slate-400">
                <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold px-2 mb-2">Main Menu</div>
                <Tab id={'dashboard'} href={`/dashboard/${uuid}/`} isi={`Dashboard`} logo={'📊'} />
                <Tab id={'manage-user'} href={`/dashboard/${uuid}/manage-user`} isi={`User Management`} logo={'👥'}/>
                </nav>

                <div className="p-4 border-t border-slate-800">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition">
                    <span>🚪</span> Logout
                </button>
                </div>
            </aside>
        </>
    )
}
