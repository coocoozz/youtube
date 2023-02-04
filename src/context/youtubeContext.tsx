import React, { createContext, useContext } from "react";
import { Youtube } from "../api/youtube";

const youtube = new Youtube();
const YoutubeContext = createContext<Youtube | undefined>(youtube);

export function YoutubeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <YoutubeContext.Provider value={youtube}>
      {children}
    </YoutubeContext.Provider>
  );
}

export function useYoutube() {
  const youtube = useContext(YoutubeContext);
  if (!youtube) {
    throw new Error(`YoutubeContext provider not found`);
  }
  return youtube;
}
