import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [selectedValue, setSelectedValue] = useState('Changing Management');

  return (
    <MyContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
