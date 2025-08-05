import { DimissKeyboardView } from '@/components/DimissKeyboardView/index'
import { PublicStackParamsList } from '@/routes/PublicRoutes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export function Login() {

  const navigation =
    useNavigation<StackNavigationProp<PublicStackParamsList>>()

  return (
    <DimissKeyboardView>
      <View>
        <Text>Bem vindo a tela de login!</Text>
        <TextInput className='bg-gray-500 w-full' />
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Registrar</Text>
        </TouchableOpacity>
      </View>
    </DimissKeyboardView>


  )
}

