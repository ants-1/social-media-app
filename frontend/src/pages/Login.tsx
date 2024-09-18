import { LoginForm } from "@/components/LoginForm"

export default function Login() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-1/2 bg-black h-screen"></div>
      <div className="flex flex-col items-center justify-center h-screen lg:w-1/2">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}