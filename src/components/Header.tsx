import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    <header className="w-full flex items-center">
      <div>YOUTUBE</div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="search...."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button>Search</button>
      </form>
    </header>
  );
}
