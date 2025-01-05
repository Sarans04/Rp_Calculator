import React, { createContext, useState } from 'react';

export const PIDsContext = createContext();

export const PIDsProvider = ({ children }) => {
    const [pids, setPids] = useState(['PID001', 'PID002', 'PID003', 'PID004']); // Example PIDs

    return (
        <PIDsContext.Provider value={{ pids, setPids }}>
            {children}
        </PIDsContext.Provider>
    );
};
