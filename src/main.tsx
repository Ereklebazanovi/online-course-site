import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginModalProvider } from "./contexts/LoginModalContext";
import { RegisterModalProvider } from "./contexts/RegisterModalContext"; // ✅ New

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <LoginModalProvider>
          <RegisterModalProvider> {/* ✅ Wrap App for register modal */}
            <App />
          </RegisterModalProvider>
        </LoginModalProvider>
      </AuthProvider>
    </PersistGate>
  </Provider>
);
