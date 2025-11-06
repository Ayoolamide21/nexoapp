import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FrontpageRoutes from "./routes/FrontpageRoutes";
import BusinessRoutes from "./routes/BusinessRoutes";
import UserRoutes from "./routes/UserRoutes";

const router = createBrowserRouter([
  ...FrontpageRoutes,
  ...BusinessRoutes,
  ...UserRoutes,
]);

export default function App() {
  return <RouterProvider router={router} />;
}
