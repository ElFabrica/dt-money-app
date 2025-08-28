import NavigationRoutes from "@/routes";
import "./src/shared/styles/global.css"
import { AuthContextProvider } from "@/context/auth.context";
import { SnackBarContextProvider } from "@/context/snackbar.context";
import { Snackbar } from "@/components/Snackbar";
import { BottomSheetProvider } from "@/context/bottomsheet.Context";



export default function App() {
  return (
    <SnackBarContextProvider>
      <AuthContextProvider>
        <BottomSheetProvider>
          <NavigationRoutes />
          <Snackbar />
        </BottomSheetProvider>
      </AuthContextProvider>
    </SnackBarContextProvider>
  );
}

