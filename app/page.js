'use client'
import { useEffect, useState } from "react"

export default function Page(){
  const fetchData = async (e) => {
    try{
      const res = await fetch('/api/film')
      const data = await res.json()
      console.log(data)
    }catch(err){
    
    }
  }
  useEffect(() => {fetchData()}, [])
  return(
    <div>
      
    </div>
  )
}