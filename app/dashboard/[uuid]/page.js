'use client'
import SideNav from "../../components/sideNav"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import EditFilmModal from "./editFilmModal"
import AddFilmModal from "./addFilmModal"

function Home({ nama, className, role}){
  const [ films, setFilms ] = useState([])
  useEffect(() => {fetchFilm()}, [])
  const fetchFilm = async () => {
    const res = await fetch('/api/film')
    const data = await res.json()
    setFilms(data)
  } 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const openEditModal = (film) => {
      setSelectedFilm(film);
      setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedFilm({
        judul: "",
        genre: "",
        sinopsis: "",
        trailer: "",
        poster: "",
        kategori: "",
        casting: "",
        durasi: "",
        tahun_rilis: "",
        trivia: ""
    })
    setIsModalOpen(true);
};
  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus film ini bray?")) return
    const res = await fetch(`/api/film/delete?id=${id}`, { 
        method: 'DELETE' 
    });
    
    const data = await res.json()
    
    if (res.ok) {
        setFilms((prev) => prev.filter((film) => film.id !== id))
        alert('Data berhasil dihapus!')
    } else {
        alert("Gagal menghapus data")
    }
}
  return (
    <div className="min-h-screen bg-slate-950 text-white flex font-sans">
      <main className="flex-1 p-8 overflow-y-auto">
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
            { label: 'Total Movies', val: films.length, color: 'text-blue-400' },
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

        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-scroll md:overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold">Film Management</h3>
            <button onClick={() => setIsAddOpen(true)} className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-yellow-400 transition">
              + Add New Film
            </button>
          </div>
          
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4 tracking-widest">Judul</th>
                <th className="px-6 py-4 tracking-widest">Genre</th>
                <th className="px-6 py-4 tracking-widest">Sinopsis</th>
                <th className="px-6 py-4 tracking-widest w-50">Kategori</th>
                <th className="px-6 py-4 tracking-widest w-50">Durasi(Menit)</th>
                <th className="px-6 py-4 tracking-widest w-50">Tahun Rilis</th>
                <th className="px-6 py-4 tracking-widest w-50">Trivia</th>
                <th className="px-6 py-4 tracking-widest w-50 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {films.map((film, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold">{film.judul}</p>
                  </td>
                  <td className="px-6 py-4">
                    {film.genre}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[12px] font-bold`}>
                      {film.sinopsis}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-[12px] font-bold">
                      {film.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-[12px] font-bold">
                      {film.durasi}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-[12px] font-bold">
                      {film.tahun_rilis}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-[12px] font-bold">
                      {film.trivia}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => openEditModal(film)} className="text-slate-400 hover:text-white mr-3 hover:cursor-pointer">Edit</button>
                    <button onClick={() => handleDelete(film.id)} className="text-red-500 hover:underline font-bold hover:cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedFilm && (
              <EditFilmModal 
                  isOpen={isModalOpen} 
                  onClose={() => setIsModalOpen(false)} 
                  film={selectedFilm}
                  onUpdate={fetchFilm}
                  genres={selectedFilm.genre}
                  onRefresh={fetchFilm}
              />
          )}
          <AddFilmModal 
            isOpen={isAddOpen} 
            onClose={() => setIsAddOpen(false)} 
            onRefresh={fetchFilm} 
          />
        </section>
      </main>
    </div>
);
    
}
export default function HomePage() {
    const params = useParams()
    const uuid = params.uuid
    const router =  useRouter()
    const [dataUser, setDataUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (uuid) {
            fetch(`../../api/auth/${uuid}`)
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
            <SideNav active="dashboard"/>
            <div className="w-full ml-0 md:ml-62.5 mt-10 md:mt-0">
                <Home 
                    nama={dataUser.fullname}
                    className="text-black"
                    role={dataUser.role == null ? "" : `${dataUser.role}`}/>
            </div>

        </div>
    )
}