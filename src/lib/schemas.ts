import z from "zod"

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

const SignUpSchema = z.object({
  password_conf: z.string()
}).merge(SignInSchema)

const OnBoardingSchema = z.object({
  username: z.string().max(20),

})

export {
  SignInSchema,
  SignUpSchema,
  OnBoardingSchema
}