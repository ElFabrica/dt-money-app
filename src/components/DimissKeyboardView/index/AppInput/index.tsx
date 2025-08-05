import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { TextInputProps, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

interface AppInputParams<T extends FieldValues> extends TextInputProps{
    control: Control<T>,
    name: Path<T>
    leftIconName?: keyof typeof MaterialIcons.glyphMap 
    label?: string
}

export const AppInput = <T extends FieldValues> ({
    control,
    name,
    leftIconName,
}: AppInputParams<T>) =>{
    return(
        <Controller 
        control={control} name={name} render={({field: {onChange, value}}) => {
            return (
                <View>

                </View>
            )
        }}
        />
    )
}