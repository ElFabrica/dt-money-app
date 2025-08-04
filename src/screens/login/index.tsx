
import { PublicStackParamsList } from '@/routes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, TouchableOpacity, View } from 'react-native'

export function Login() {

  const navigation = 
  useNavigation<StackNavigationProp<PublicStackParamsList>>()
  
  return (
    <View className='flex-1 items-center justify-center'>
        <Text>Bem vindo a tela de login!</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("Register")}>
          <Text>Registrar</Text>
        </TouchableOpacity>
    </View>
  )
}

