import { createContext, useContext, useState } from "react";

export enum PongState {
    Initial = 0,
    InGame = 1,
    PostGameWin = 2,
    PostGameLose = 3,
}

export interface AppContextType {
    scrollLocation: number;
    setScrollLocation: (val: number) => void;
    scrollEnabled: boolean;
    setScrollEnabled: (val: boolean) => void;    
    pongState: PongState;
    setPongState: (val: PongState) => void;

}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [scrollLocation, setScrollLocation] = useState<number>(0);
    const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
    const [pongState, setPongState] = useState<PongState>(0);

    const value = { 
        scrollLocation, setScrollLocation, 
        scrollEnabled, setScrollEnabled,
        pongState, setPongState
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};


