import { Login } from "@/screens"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"


type PublicStackParamsList = {
    Login: undefined
    Register: undefined
}

const NavigationRoutes = () => {
    const PublicStack = createStackNavigator<PublicStackParamsList>()

    return(
        <NavigationContainer>
        <PublicStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
            <PublicStack.Screen
            name="Login"
            component={Login}


            />
        </PublicStack.Navigator>
        </NavigationContainer>

    )
}

export default NavigationRoutes