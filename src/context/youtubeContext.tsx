import React, { createContext, useContext } from "react";
import { RealClient } from "../api/realClient";
import { Youtube } from "../api/youtube";

const youtube = new Youtube(new RealClient());
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
