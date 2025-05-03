import { createContext, useContext, useState, ReactNode } from "react";

interface LoginModalContextType {
  show: boolean;
  redirectTo: string | null;
  open: (options?: { redirectTo?: string }) => void;
  close: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | null>(null);

export const useLoginModal = () => {
  const ctx = useContext(LoginModalContext);
  if (!ctx) throw new Error("useLoginModal must be inside LoginModalProvider");
  return ctx;
};

export const LoginModalProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const open = (options?: { redirectTo?: string }) => {
    setShow(true);
    setRedirectTo(options?.redirectTo || null);
  };

  const close = () => {
    setShow(false);
    setRedirectTo(null);
  };

  return (
    <LoginModalContext.Provider value={{ show, redirectTo, open, close }}>
      {children}
    </LoginModalContext.Provider>
  );
};
