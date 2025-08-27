import { useSnacbarContext } from "@/context/snackbar.context"
import { AppError } from "../helpers/AppError"

export function useErrorHandle(){

    const { notify } = useSnacbarContext()

    const handleError =  (error: unknown, defaultMessage?:string) => {
        const isAppError = error instanceof AppError;

        const message = isAppError 
        ? error.message
        : defaultMessage ?? "Falha na Requisição";
    notify({
        message,
        messageType: "ERROR"
    })
    }
    return{
        handleError
    }
}