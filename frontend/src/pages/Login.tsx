import { LoginForm } from "@/components/LoginForm"
import { useTheme } from "@/components/ThemeProvider"

export default function Login() {
  const { theme } = useTheme();

  return (
      <div className={`flex flex-col items-center justify-center h-screen w-full ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}>
        {/* <div className="hidden lg:block lg:w-1/2 bg-black h-screen"></div> */}
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <LoginForm />
      </div>

  )
}