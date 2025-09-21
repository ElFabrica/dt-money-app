import { useAuthContext } from "@/context/auth.context";
import { useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView } from "react-native";

interface Props {
    setLoading: (value: boolean) => void
}

export function Loading({ setLoading }: Props) {
    const { restoreUserSession, handleLogout } = useAuthContext()

    useEffect(() => {
        (async () => {
            try {
                const user = await restoreUserSession()
                if (!user) {
                    await handleLogout()
                }
            } catch (error) {
                console.log(error)
                await handleLogout()
            }
            finally {
                setLoading(false)
            }
        })()
    }, [])
    return (
        <SafeAreaView className="bg-background-primary items-center justify-center flex-1">
            <>
                <Image source={require("@/assets/Logo.png")} className="h-[48px] w-[255px]" />
                <ActivityIndicator color={"white"} className="mt-20" />
            </>
        </SafeAreaView>
    )
}