'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation"
import { Play, Star, Calendar, Clock, Film, User } from 'lucide-react'

export default function DetailFilm(){
  const [data, setData] = useState(null)
  const params = useParams()

  useEffect(() => {
    const getFilmDetail = async () => {
      try {
        const res = await fetch(`/api/film/${params.id}`)
        const result = await res.json()
        setData(result)
      } catch (error) {
        console.error("Gagal ambil data bray", error)
      }
    }

    if (params.id) getFilmDetail()
  }, [params.id])
  console.log(data)
  if (!data) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center text-white">
        <p className="animate-pulse text-xl">Lagi narik data dari database bray...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0f1117] text-white font-sans">
      <div className="max-w-6xl mx-auto pt-8 px-4">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{data.judul}</h1>
            <div className="flex gap-4 text-sm text-gray-400 items-center">
              <span>{data.tahun_rilis}</span>
              <span>{data.kategori}</span>
              <span>{data.durasi} Menit</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">IMDb Rating</span>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500 w-6 h-6" />
              <span className="text-2xl font-bold">8.5</span>
              <span className="text-gray-500">/10</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Poster (Kiri) */}
          <div className="hidden md:block bg-gray-800 rounded-lg aspect-2/3 overflow-hidden">
             <img 
               src={data.poster}
               alt="Poster" 
               className="w-full h-full object-cover"
             />
          </div>
          
          {/* Video Trailer (Tengah & Kanan) */}
          <div className="md:col-span-2 bg-black rounded-lg aspect-video flex items-center justify-center border border-gray-800 relative group cursor-pointer">
            <iframe 
            className='aspect-video w-full' 
            src={data.trailer}
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen />
            <span className="absolute bottom-4 left-4 text-sm font-medium bg-black/60 px-3 py-1 rounded">Watch Trailer</span>
          </div>
        </div>

        {/* --- DETAILS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
          {/* Info Utama (Kiri) */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex gap-2">
              <span className="px-4 py-1 border border-gray-600 rounded-full text-sm font-medium hover:bg-gray-800 cursor-pointer">
                {data.genre}
              </span>
            </div>
            
            <p className="text-lg leading-relaxed text-gray-300">
              {data.sinopsis}
            </p>

            <div className="border-y border-gray-800 py-4 space-y-4 text-sm md:text-base">
                <div className="flex gap-4">
                    <span className="font-bold text-gray-400 w-24">Cast</span>
                    <span className="text-blue-400 hover:underline cursor-pointer">{data.casting}</span>
                </div>
                <div className="flex gap-4">
                    <span className="font-bold text-gray-400 w-24">Directors</span>
                    <span className="text-blue-400 hover:underline cursor-pointer">James Wan</span>
                </div>
            </div>
          </div>

          {/* Action Card (Kanan) */}
          <div className="space-y-4">
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition">
              <Play className="fill-black w-5 h-5" /> Watch Options
            </button>
            <button className="w-full bg-[#1a1f2e] hover:bg-[#252b3d] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 border border-gray-700 transition">
              + Add to Watchlist
            </button>
            
            <div className="bg-[#1a1f2e] p-4 rounded-lg border border-gray-800">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Film className="w-4 h-4 text-yellow-500" /> Trivia
                </h3>
                <p className="text-sm text-gray-400 italic">
                    {data.trivia}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}