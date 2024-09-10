import { LoginForm } from "@/components/LoginForm"

export default function Login() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-1/2 bg-black h-screen"></div>
      <div className="flex items-center justify-center h-screen lg:w-1/2">
        <LoginForm />
      </div>
    </div>
  )
}