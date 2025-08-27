import NavigationRoutes from "@/routes";
import "./src/shared/styles/global.css"
import { AuthContextProvider } from "@/context/auth.context";
import { SnackBarContextProvider } from "@/context/snackbar.context";
import { Snackbar } from "@/components/Snackbar";



export default function App() {
  return (
    <SnackBarContextProvider>
    <AuthContextProvider>
        <NavigationRoutes />
        <Snackbar/>
    </AuthContextProvider>
    </SnackBarContextProvider>
  );
}

