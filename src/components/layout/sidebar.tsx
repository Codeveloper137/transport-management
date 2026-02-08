"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Truck,
  MapPin,
  DollarSign,
  Wrench,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Vehículos", href: "/dashboard/vehicles", icon: Truck },
  { name: "Viajes", href: "/dashboard/trips", icon: MapPin },
  { name: "Gastos", href: "/dashboard/expenses", icon: DollarSign },
  { name: "Mantenimiento", href: "/dashboard/maintenance", icon: Wrench },
  { name: "Reportes", href: "/dashboard/reports", icon: FileText },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Sesión cerrada correctamente");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Truck className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">TransportApp</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
