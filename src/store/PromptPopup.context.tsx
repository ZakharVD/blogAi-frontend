import { ReactNode, createContext, useState } from "react";

type Props = {
    children: ReactNode;
}
type TContext = {
    isPromptOpen: boolean;
    setIsPromptOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PromptPopupContext = createContext<TContext>({} as TContext);

export function PromptPopupProvider({ children }: Props) {
    const [isPromptOpen, setIsPromptOpen] = useState(false);

    return (
        <PromptPopupContext.Provider value={{isPromptOpen, setIsPromptOpen}}>{children}</PromptPopupContext.Provider>
    )
}