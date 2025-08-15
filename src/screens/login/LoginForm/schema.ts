import * as  yup from "yup"

export const Schema = yup.object().shape({
    email: yup.string().email("E-mail inválido.").required("E-mail é obrigatório."),
    password: yup.string().min(6, "A senha dever ter no mínimo 6 caracteres.").required("A senha é obrigatória.")

})