import { ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
};
type TContenx = {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const PostInfoContext = createContext<TContenx>({} as TContenx);

export function PostInfoProvider({ children }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <PostInfoContext.Provider value={{title, setTitle, content, setContent}}>{children}</PostInfoContext.Provider>
  );
}
