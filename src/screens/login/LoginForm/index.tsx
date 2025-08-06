import { AppInput } from "@/components/AppInput"
import { AppButton } from "@/routes/AppButton"
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
            <AppInput
            control={control}
            name="email"
            label="EMAIL"
            placeholder="email@example.br"
            leftIconName="mail-outline"
            />

                        <AppInput
            control={control}
            name="password"
            label="SENHA"
            placeholder="Sua senha"
            leftIconName="lock-outline"
            secureTextEntry
            />
            <AppButton iconName="arrow-forward" mode="outline">Login</AppButton>
        </>
    )
}