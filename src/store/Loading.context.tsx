import { Dispatch, ReactNode, createContext, useState } from "react";

type LoadingProvideProps = {
    children: ReactNode;
}
type TLoadingContext = {
    loading: boolean;
    setLoading: Dispatch<React.SetStateAction<boolean>>
}

export const LoadingContext = createContext<TLoadingContext>({} as TLoadingContext);

export function LoadingProvider({ children }: LoadingProvideProps) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{loading, setLoading}}>{children}</LoadingContext.Provider>
    )
}