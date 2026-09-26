import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
// import AuthPage from "./components/features/auth/AuthPage";
// import DashboardPage from "./components/features/dashboard/DashboardPage";
// import ListYourItemPage from "./components/features/dashboard/pages/ListYourItemPage";
import AppRoutes from "./AppRoutes";
import "./App.css";

// function AppRoutes() {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="app-loading" aria-live="polite">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           isAuthenticated ? (
//             <Navigate to="/dashboard" replace />
//           ) : (
//             <AuthPage />
//           )
//         }
//       />

//       <Route
//         path="/dashboard"
//         element={
//           isAuthenticated ? <DashboardPage /> : <Navigate to="/" replace />
//         }
//       />

//       <Route
//         path="/list-item"
//         element={
//           isAuthenticated ? (
//             <ListYourItemPage />
//           ) : (
//             <Navigate to="/" replace />
//           )
//         }
//       />

//       <Route
//         path="*"
//         element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
//       />
//     </Routes>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
