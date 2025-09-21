import { DimissKeyboardView } from '@/components/DimissKeyboardView/index'
import { View } from 'react-native'
import { LoginForm } from '@/screens/login/LoginForm'
import { AuthHeader } from '@/components/AuthHeader'
import { useAuthContext } from '@/context/auth.context'

export function Login() {
  return (
    <DimissKeyboardView>
      <View className='flex-1 w-[82%] self-center'>
        <AuthHeader/>
        <LoginForm/>
      </View>
    </DimissKeyboardView>


  )
}

