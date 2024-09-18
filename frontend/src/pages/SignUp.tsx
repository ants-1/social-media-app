import { SignUpForm } from "@/components/SignUpForm"

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
      <SignUpForm />
    </div>
  )
}