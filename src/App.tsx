// // src/App.tsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import Login from "./features/auth/Login";
// import Register from "./features/auth/Register";
// import Home from "./pages/Home";
// import DashBoard from "./features/dashboard/DashBoard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//       <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<DashBoard />} />

//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import DashBoard from "./features/dashboard/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      {/* Always visible navbar */}
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
