import React, { createContext, useContext, useReducer } from 'react';
import { initialState } from './initialState';
import { storeReducer, Action } from './storeReducer';

const StoreContext = createContext<{
    state: typeof initialState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
