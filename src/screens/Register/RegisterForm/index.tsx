import { Text, View } from "react-native"
import { useForm } from "react-hook-form"
import { AppInput } from "@/components/AppInput"
import { AppButton } from "@/routes/AppButton"
import { PublicStackParamsList } from "@/routes/PublicRoutes"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "./schema"

interface FormRegisterParams {
    email: string,
    name: string,
    password: string
    confirmPasword: string
}
    const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

    const onSubmit = async () => {

    }

export const RegisterForm = () => {
    const {
        control,
        handleSubmit,
        formState: {
            isSubmitted
        }
    } = useForm<FormRegisterParams>({
        defaultValues:{
            confirmPasword:"",
            email: "",
            name: "",
            password: ""
                },
                resolver: yupResolver(schema)
    })
    return <>
        <AppInput
            control={control}
            name="name"
            leftIconName="person"
            label="NOME"
            placeholder="Seu nome"
        />

        <AppInput
            control={control}
            name="email"
            leftIconName="mail-outline"
            label="EMAIL"
            placeholder="mail@example.com"
        />

        <AppInput
            control={control}
            name="password"
            leftIconName="lock-outline"
            label="SENHA"
            placeholder="Sua senha"
        />

        <AppInput
            control={control}
            name="confirmPasword"
            leftIconName="lock-outline"
            label="SENHA"
            placeholder="Confirme sua senha"
        />

        <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
            <AppButton  onPress={handleSubmit(onSubmit)} iconName="arrow-forward">Cadastrar</AppButton>
            <View>
                <Text className="mb-6 text-gray-300 text-base">Já possui uma conta?</Text>
                <AppButton onPress={() => { navigation.navigate("Login") }} iconName="arrow-forward" mode="outline">Acessar</AppButton>
            </View>
        </View>
    </>
} 