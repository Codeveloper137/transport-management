import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, TrendingUp, Truck, MapPin } from "lucide-react";

async function getDashboardData(userId: string) {
  const [trips, vehicles, totalExpenses] = await Promise.all([
    prisma.trip.findMany({
      where: { userId },
      include: {
        vehicle: true,
        expenses: true,
      },
      orderBy: { tripDate: 'desc' },
      take: 10,
    }),
    prisma.vehicle.findMany({
      where: { userId, status: 'ACTIVE' },
    }),
    prisma.expense.aggregate({
      where: { userId },
      _sum: { amount: true },
    }),
  ]);

  const totalRevenue = trips.reduce((sum, trip) => sum + Number(trip.totalValue), 0);
  const totalNetProfit = trips.reduce((sum, trip) => sum + Number(trip.netProfit), 0);
  const totalTrips = trips.length;

  return {
    totalRevenue,
    totalNetProfit,
    totalTrips,
    activeVehicles: vehicles.length,
    totalExpenses: Number(totalExpenses._sum.amount || 0),
    recentTrips: trips,
  };
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await getDashboardData(session!.user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido, {session!.user.name || session!.user.email}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Total de viajes registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganancia Neta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(data.totalNetProfit)}
            </div>
            <p className="text-xs text-muted-foreground">Después de gastos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Viajes</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalTrips}</div>
            <p className="text-xs text-muted-foreground">Viajes completados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehículos Activos</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeVehicles}</div>
            <p className="text-xs text-muted-foreground">En operación</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Viajes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentTrips.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay viajes registrados aún
              </p>
            ) : (
              data.recentTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{trip.vehicle.licensePlate}</p>
                    <p className="text-sm text-muted-foreground">{trip.route}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(Number(trip.totalValue))}</p>
                    <p className="text-sm text-green-600">
                      Ganancia: {formatCurrency(Number(trip.netProfit))}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
