import NavigationRoutes from "@/routes";
import "./src/shared/styles/global.css"
import { AuthContextProvider } from "@/context/auth.context";
import { SnackBarContextProvider } from "@/context/snackbar.context";



export default function App() {
  return (
    <SnackBarContextProvider>
    <AuthContextProvider>
        <NavigationRoutes />
    </AuthContextProvider>
    </SnackBarContextProvider>
  );
}

