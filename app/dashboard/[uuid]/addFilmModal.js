import { useState, useEffect } from "react";

export default function AddFilmModal({ isOpen, onClose, onRefresh }) {
  const initialState = {
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
  }

  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (isOpen) {
      setFormData(initialState)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/film/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Film baru berhasil ditambahkan bray!")
        onRefresh()
        onClose()
      } else {
        alert("Gagal nambah data!")
      }
    } catch (err) {
      console.error(err)
      alert("Ada error server bray!")
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1a1f2e] border border-gray-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Add New Film</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Judul Film</label>
            <input name="judul" value={formData.judul} onChange={handleChange} className="w-full bg-[#111827] border border-gray-600 p-2.5 rounded-lg text-white focus:border-yellow-500 outline-none transition" required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Genre</label>
            <input name="genre" value={formData.genre} onChange={handleChange} className="w-full bg-[#111827] border border-gray-600 p-2.5 rounded-lg text-white focus:border-yellow-500 outline-none transition" />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Sinopsis</label>
            <textarea name="sinopsis" value={formData.sinopsis} onChange={handleChange} rows="3" className="w-full bg-[#111827] border border-gray-600 p-2.5 rounded-lg text-white focus:border-yellow-500 outline-none transition" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Durasi (Menit)</label>
            <input name="durasi" type="number" value={formData.durasi} onChange={handleChange} className="w-full bg-[#111827] border border-gray-600 p-2.5 rounded-lg text-white focus:border-yellow-500 outline-none transition" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Tahun Rilis</label>
            <input name="tahun_rilis" type="number" value={formData.tahun_rilis} onChange={handleChange} className="w-full bg-[#111827] border border-gray-600 p-2.5 rounded-lg text-white focus:border-yellow-500 outline-none transition" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Poster URL</label>
            <input name="poster" type="text" value={formData.poster} onChange={handleChange} className="w-full bg-[#111827] border border-gray-600 p-2.5 rounded-lg text-white focus:border-yellow-500 outline-none transition" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Kategori</label>
            <input name="kategori" value={formData.kategori} onChange={handleChange} className="w-full bg-[#111827] border border-gray-600 p-2.5 rounded-lg text-white focus:border-yellow-500 outline-none transition" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Trivia</label>
            <input name="trivia" value={formData.trivia} onChange={handleChange} className="w-full bg-[#111827] border border-gray-600 p-2.5 rounded-lg text-white focus:border-yellow-500 outline-none transition" />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Trailer URL</label>
            <input name="trailer" value={formData.trailer} onChange={handleChange} className="w-full bg-[#111827] border border-gray-600 p-2.5 rounded-lg text-white focus:border-yellow-500 outline-none transition" />
          </div>

          <div className="md:col-span-2 mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2 text-gray-400 hover:text-white font-medium transition">
              Batal
            </button>
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-2 rounded-lg transition-transform active:scale-95">
              Tambah Film
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}