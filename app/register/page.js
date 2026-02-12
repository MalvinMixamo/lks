'use client'
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";

export default function Register() { 
    const router = useRouter()
    const [ data, setData ] = useState({fullname: '', username: '', password: ''})
    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {
    if (data.fullname) {
        const suggested = data.fullname
            .toLowerCase()
            .replace(/\s+/g, '')
        
        setData(prev => ({ ...prev, username: suggested }))
    }
}, [data.fullname])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data})
            })
            if (res.ok) {
                setData({ username: '', password: '' })
                router.push("/login")
            }
        }catch(err){
            return NextResponse.json({message: 'error wok', err}, {status: 500})
        }
    }
    return(
        <div className="w-full h-dvh flex justify-center">
            <form onSubmit={handleSubmit} className="bg-white w-lg m-auto flex flex-col text-black rounded-2xl py-4 px-5 ">
                <h2>Create An Account!</h2>
                <label htmlFor="fullname" className="mt-3">Fullname :</label>
                <input name="fullname" id="fullname" className="border-2 rounded-full border-blue-800 px-5 py-2 focus:outline-0 focus:border-yellow-500" type="text" placeholder="fullname" required onChange={(e) => setData({...data, fullname: e.target.value})}/>
                <label htmlFor="username" className="mt-4">Username :</label>
                <input id="username"className="border-2 rounded-full border-blue-800 px-5 py-2 focus:outline-0 focus:border-yellow-500" type="text" placeholder="username" value={data.username} required onChange={(e) => setData({ ...data, username: e.target.value })}/>
                <label htmlFor="password" className="mt-4">Password :</label>
                <div id="password" className="border-2 rounded-full border-blue-800 px-5 py-2 focus:outline-0 focus-within:border-yellow-500 flex justify-center">
                    <input className="w-[96%] focus:outline-0" type={showPassword ? "text" : "password"} placeholder="password" required onChange={(e) => setData({...data, password: e.target.value})}/>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="hover:cursor-pointer"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5 text-yellow-500 hover:text-yellow-600" />
                        ) : (
                            <Eye className="h-5 w-5 text-yellow-500 hover:text-yellow-600" />
                        )}
                    </button>
                </div>
                <p className="ml-2 text-gray-700">Already have account? <Link href={"/login"} className="text-yellow-500 hover:text-yellow-600">Login now</Link></p>
                <input type="submit" value="Register" className="bg-yellow-500 text-white text-2xl font-bold rounded-2xl py-5 mt-10 hover:cursor-pointer hover:bg-yellow-600" />
            </form>
        </div>
    )
}