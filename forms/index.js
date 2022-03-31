import * as yup from 'yup'



export const registerForm = yup.object().shape({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required()
})

export const signInForm = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})