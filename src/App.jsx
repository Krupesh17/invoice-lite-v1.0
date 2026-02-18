import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import DashboardLayout from "./layouts/dashboard-layout";
import CreateInvoiceSection from "./components/create-invoice-section";
import InvoicesSection from "./components/invoices-section";
import ManageAssetsSection from "./components/manage-assets-section";
import { ThemeProvider } from "./contexts/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/create/invoice",
        element: <CreateInvoiceSection />,
      },
      {
        path: "/invoices",
        element: <InvoicesSection />,
      },
      {
        path: "/assets",
        element: <ManageAssetsSection />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
