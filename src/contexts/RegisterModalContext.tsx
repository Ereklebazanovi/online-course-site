import { createContext, useContext, useState, ReactNode } from "react";

interface RegisterModalContextType {
  show: boolean;
  open: () => void;
  close: () => void;
}

const RegisterModalContext = createContext<RegisterModalContextType | null>(null);

export const useRegisterModal = () => {
  const ctx = useContext(RegisterModalContext);
  if (!ctx) throw new Error("useRegisterModal must be used within RegisterModalProvider");
  return ctx;
};

export const RegisterModalProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);

  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <RegisterModalContext.Provider value={{ show, open, close }}>
      {children}
    </RegisterModalContext.Provider>
  );
};
