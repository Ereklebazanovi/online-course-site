// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { Provider } from "react-redux";
// import { store, persistor } from "./app/store";
// import { PersistGate } from "redux-persist/integration/react";
// import { AuthProvider } from "./contexts/AuthContext";
// import { LoginModalProvider } from "./contexts/LoginModalContext";
// import { RegisterModalProvider } from "./contexts/RegisterModalContext"; // ✅ New

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <AuthProvider>
//         <LoginModalProvider>
//           <RegisterModalProvider> {/* ✅ Wrap App for register modal */}
//             <App />
//           </RegisterModalProvider>
//         </LoginModalProvider>
//       </AuthProvider>
//     </PersistGate>
//   </Provider>
// );



//use query to get the user data
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginModalProvider } from "./contexts/LoginModalContext";
import { RegisterModalProvider } from "./contexts/RegisterModalContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ React Query

const queryClient = new QueryClient(); // ✅ create client

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}> {/* ✅ Added here */}
        <AuthProvider>
          <LoginModalProvider>
            <RegisterModalProvider>
              <App />
            </RegisterModalProvider>
          </LoginModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
