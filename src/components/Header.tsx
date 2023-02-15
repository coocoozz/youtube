import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsYoutube, BsSearch } from "react-icons/bs";

export default function Header() {
  const { keyword } = useParams();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };

  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);

  return (
    <header className="w-full flex mb-4 text-2xl p-2 sticky top-0 z-50 bg-black">
      <Link to="/" className="flex justify-center items-center gap-2">
        <BsYoutube className="text-red-600" />
        <p className="font-bold text-white">KwangTube</p>
      </Link>
      <form onSubmit={handleOnSubmit} className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Search...."
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="w-7/12 outline-none bg-zinc-900 text-gray-50 p-2 px-3 py-3 rounded-l-2xl border-solid border-2 border-zinc-500"
        />
        <button className="bg-zinc-500 px-4 text-white rounded-r-2xl">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
