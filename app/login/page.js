'use client'
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";

export default function Login() {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    
    const handleSubmit = async (e) => {
        const data = { username, password }
        e.preventDefault()
        try{
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const result = await res.json();
            if (!res.ok) { 
                alert(result.message || 'responsenya ga oke ni bray');
            } else {
                alert('Welcome ' + result.fullname);
                setUsername('');
                setPassword('');
                router.push(`/dashboard/${result.uuid}`); 
            }
        }catch(err){
            return NextResponse.json({message: 'error wok', err}, {status: 500})
        }
    }
    return(
        <div className="w-full h-dvh flex justify-center">
            <form onSubmit={handleSubmit} className="bg-white w-lg m-auto flex flex-col text-black rounded-2xl py-4 px-5 gap-4">
                <h2>Login Account!</h2>
                <input className="border-2 rounded-full border-blue-800 px-5 py-2 focus:outline-0 focus:border-yellow-500" type="text" placeholder="username" value={username} required onChange={(e) => setUsername(e.target.value)}/>
                <div className="border-2 rounded-full border-blue-800 px-5 py-2 focus:outline-0 focus-within:border-yellow-500 flex justify-center">
                    <input className="w-[96%] focus:outline-0" type={showPassword ? "text" : "password"} placeholder="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
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
                <p className="ml-2 text-gray-700">Don&apos;t have an account? <Link href={"/register"} className="text-yellow-500 hover:text-yellow-600">Register</Link></p>
                <input type="submit" value="Login" className="bg-yellow-500 text-white text-2xl font-bold rounded-2xl py-5 mt-5 hover:cursor-pointer hover:bg-yellow-600" />
            </form>
        </div>
    )
}