import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import DashboardLayout from "./layouts/dashboard-layout";
import CreateInvoiceSection from "./components/create-invoice-section";
import InvoicesSection from "./components/invoices-section";
import ManageAssetsSection from "./components/manage-assets-section";
import { useTheme } from "./contexts/theme-provider";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "sonner";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  LoaderIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import ErrorPage from "./pages/error-page";

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
        element: <CreateInvoiceSection key="create" />,
      },
      {
        path: "/invoices",
        element: <InvoicesSection />,
      },
      {
        path: "/assets",
        element: <ManageAssetsSection />,
      },
      {
        path: "/edit/:storage/:invoiceId",
        element: <CreateInvoiceSection key="edit" />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const toastIcons = {
  close: <XIcon size={20} />,
  error: <CircleAlertIcon size={20} />,
  info: <InfoIcon size={20} />,
  success: <CircleCheckIcon size={20} />,
  warning: <TriangleAlertIcon size={20} />,
  loading: <LoaderIcon size={20} />,
};

function App() {
  const { theme } = useTheme();

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        theme={theme}
        icons={toastIcons}
        richColors={true}
      />
    </Provider>
  );
}

export default App;
