import { DimissKeyboardView } from '@/components/DimissKeyboardView/index'
import { PublicStackParamsList } from '@/routes/PublicRoutes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { LoginForm } from './LoginForm'

export function Login() {

  return (
    <DimissKeyboardView>
      <View className='flex-1 w-[82%] self-center'>
        <LoginForm/>
      </View>
    </DimissKeyboardView>


  )
}

