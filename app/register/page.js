'use client'
import { Router } from "next/router";
import { NextResponse } from "next/server";
import { useState, useEffect } from "react";
import { generateUsername } from "unique-username-generator";

export default function Register() {
    const [ data, setData ] = useState({fullname: '', username: '', password: ''})

    useEffect(() => {
        if (data.fullname.length > 2) {
            const suggestedName = generateUsername(data.fullname.replace(/\s+/g, ""), 1)
            setData(prev => ({ ...prev, username: suggestedName.toLowerCase() }))
        }
    }, [data.fullname])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: 'Content-Type/Server',
                ody: JSON.stringify({ ...data})
            })
            if (res.ok) {
            setData({ username: '', password: '' })
        }
        }catch(err){
            return NextResponse.json({message: 'error wok', err}, {status: 500})
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="fullname" required onChange={(e) => setData({...data, fullname: e.target.value})}/>
                <input type="text" placeholder="username" value={data.username} required onChange={(e) => setData({ ...data, username: e.target.value })}/>
                <input type="password" placeholder="password" required onChange={(e) => setData({...data, password: e.target.value})}/>
                <input type="submit" value="register" className="hover:cursor-pointer" />
            </form>
        </div>
    )
}