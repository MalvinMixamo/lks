'use client'
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Page(){
  const [selectedGenre, setSelectedGenre] = useState("");
  const [film, setFilm] = useState([])
  const fetchData = async () => {
    try{
      const res = await fetch('/api/film')
      const data = await res.json()
      setFilm(data)
    }catch(err){
    
    }
  }
  
  useEffect(() => {fetchData()}, [])
  const filteredItems = film.filter(item => 
    selectedGenre === "" ? true : item.genre.toLowerCase() === selectedGenre.toLowerCase()
  )

  console.log(filteredItems)
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-black text-yellow-500 tracking-tighter">FILMKu</h1>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-yellow-500 transition">Movies</a>
            <a href="#" className="hover:text-yellow-500 transition">TV Shows</a>
            <a href="#" className="hover:text-yellow-500 transition">Celebs</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search movies..." 
              className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 text-sm w-64 focus:outline-none focus:border-yellow-500 transition"
            />
          </div>
          <label htmlFor="genre">Genre :</label>
          <select className="bg-slate-500" name="genre" id="genre" onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">All</option>
            <option value="Romance">Romance</option>
            <option value="Horror">Horror</option>
            <option value="comedy">Comedy</option>
          </select>
          <Link href={"/login"} className="bg-yellow-500 text-black px-5 py-1.5 rounded-full text-sm font-bold hover:bg-yellow-400 transition">
            Sign In
          </Link>
        </div>
      </nav>

      <section className="relative h-[70vh] flex items-center px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/background.png" 
            className="w-full h-full object-cover opacity-30"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-2xl">
          <span className="text-yellow-500 font-bold tracking-widest uppercase text-xs">Featured Today</span>
          <h2 className="text-5xl lg:text-7xl font-black mt-4 mb-6 leading-tight">The Conjuring</h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            When husband and wife Rod and Carolyn realize that their family is being disturbed by evil spirits - they finally ask for help from a pair of supernatural experts to investigate this problem.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-200 transition">
              Watch Trailer
            </button>
            <button className="bg-slate-800/80 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-bold border border-slate-700 hover:bg-slate-700 transition">
              View Details
            </button>
          </div>
        </div>
      </section>

      <main className="px-8 lg:px-16 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold border-l-4 border-yellow-500 pl-4">Trending Now</h3>
          <a href="#" className="text-sm text-yellow-500 font-semibold hover:underline">View All</a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredItems.map((item) => (
            <Link href={`/film/${item.id}`} key={item.id} className="group cursor-pointer">
              <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-3 border border-slate-800">
                <img 
                  src={item.poster} 
                  alt="Poster"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                
              </div>
              <h4 className="font-bold text-sm group-hover:text-yellow-500 transition line-clamp-1">{item.judul}</h4>
              <p className="text-xs text-slate-500 mt-1">{item.tahun_rilis} • {item.genre}</p>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-900 py-12 px-8 text-center text-slate-500 text-sm">
        <p>© 2026 FILMKu. Built with passion for Cinema bray.</p>
      </footer>
    </div>
)
}