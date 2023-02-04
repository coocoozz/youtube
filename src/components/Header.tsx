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
    <header className="w-full flex mb-4 text-2xl p-4">
      <Link to="/" className="flex justify-center items-center gap-1">
        <BsYoutube className="text-red-600" />
        <p className="font-bold">KwangTube</p>
      </Link>
      <form onSubmit={handleOnSubmit} className="w-full flex justify-center">
        <input
          type="text"
          placeholder="search...."
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="w-7/12 outline-none bg-black text-gray-50 p-2"
        />
        <button className="bg-zinc-500 px-4">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
