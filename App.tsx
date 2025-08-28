import NavigationRoutes from "@/routes";
import "./src/shared/styles/global.css"
import { AuthContextProvider } from "@/context/auth.context";
import { SnackBarContextProvider } from "@/context/snackbar.context";
import { Snackbar } from "@/components/Snackbar";
import { BottomSheetProvider } from "@/context/bottomsheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";



export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackBarContextProvider>
        <AuthContextProvider>
          <BottomSheetProvider>
            <NavigationRoutes />
            <Snackbar />
          </BottomSheetProvider>
        </AuthContextProvider> 
      </SnackBarContextProvider>
    </GestureHandlerRootView>
  );
}

