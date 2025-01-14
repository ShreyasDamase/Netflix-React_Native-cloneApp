import React, { createContext, useState } from "react";

const MovieItems = createContext();

const ProfileContext = ({ children }) => {
  const [profile, setProfile] = useState({ name: "", image: "" }); // Store both name and image

  return (
    <MovieItems.Provider value={{ profile, setProfile }}>
      {children}
    </MovieItems.Provider>
  );
};

export { MovieItems, ProfileContext };
