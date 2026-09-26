import DashboardPage from "../components/features/dashboard/DashboardPage.jsx";
import ListYourItemPage from "../components/features/dashboard/pages/ListYourItemPage.jsx";

// Add new protected routes here — nothing else needs to change
export const protectedRoutes = [
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/list-item", element: <ListYourItemPage /> },
];