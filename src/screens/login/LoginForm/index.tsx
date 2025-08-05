import { useForm } from "react-hook-form"
import { Text } from "react-native"

export interface FormLoginParams {
    email: string,
    password: string
}

export const LoginForm = () => {

    const {
        control,
        handleSubmit,
        formState: { isSubmitted }
    } = useForm<FormLoginParams>()

    return (
        <>
            <Text className="text-white">
                Login Form
            </Text>
        </>
    )
}