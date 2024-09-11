import { Home } from "lucide-react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="w-full h-20 top-0 sticky border-b flex items-center pl-5 bg-orange-200 z-40">
      <Home className="mx-2 h-6 w-6" />
      <h1 className="text-black text-xl font-semibold">{title}</h1>
    </div>
  );
}
