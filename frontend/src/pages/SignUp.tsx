import { SignUpForm } from "@/components/SignUpForm"
import { useTheme } from "@/components/ThemeProvider"

export default function SignUp() {
  const { theme } = useTheme();
  
  return (
    <div className={`flex flex-col items-center justify-center h-screen ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}>
      <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
      <SignUpForm />
    </div>
  )
}