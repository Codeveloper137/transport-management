"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, MapPin } from "lucide-react";
import { formatCurrency, formatShortDate } from "@/lib/utils";
import { TRIP_TYPES, URBAN_ROUTES, NATIONAL_ROUTES } from "@/lib/constants";

interface Trip {
  id: string;
  manifestNumber: string;
  tripDate: string;
  tripType: "URBAN" | "NATIONAL";
  route: string;
  totalValue: string;
  deduction: string;
  paidValue: string;
  grossProfit: string;
  netProfit: string;
  vehicle: {
    licensePlate: string;
  };
}

interface Vehicle {
  id: string;
  licensePlate: string;
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    vehicleId: "",
    manifestNumber: "",
    tripDate: new Date().toISOString().split("T")[0],
    tripType: "NATIONAL" as "URBAN" | "NATIONAL",
    route: "",
    totalValue: "",
    notes: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tripsRes, vehiclesRes] = await Promise.all([
        fetch("/api/trips"),
        fetch("/api/vehicles"),
      ]);

      if (!tripsRes.ok || !vehiclesRes.ok) throw new Error();

      const [tripsData, vehiclesData] = await Promise.all([
        tripsRes.json(),
        vehiclesRes.json(),
      ]);

      setTrips(tripsData);
      setVehicles(vehiclesData.filter((v: Vehicle & { status: string }) => v.status === "ACTIVE"));
    } catch (error) {
      toast.error("Error al cargar datos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tripDate: new Date(formData.tripDate),
          totalValue: parseFloat(formData.totalValue),
        }),
      });

      if (!response.ok) throw new Error();

      toast.success("Viaje registrado exitosamente");
      setShowForm(false);
      setFormData({
        vehicleId: "",
        manifestNumber: "",
        tripDate: new Date().toISOString().split("T")[0],
        tripType: "NATIONAL",
        route: "",
        totalValue: "",
        notes: "",
      });
      fetchData();
    } catch (error) {
      toast.error("Error al registrar viaje");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoutes = () => {
    return formData.tripType === "URBAN" ? URBAN_ROUTES : NATIONAL_ROUTES;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Viajes</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Viaje
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Registrar Nuevo Viaje</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleId">Vehículo *</Label>
                  <select
                    id="vehicleId"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.vehicleId}
                    onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar vehículo</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.licensePlate}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tripType">Tipo de Viaje *</Label>
                  <select
                    id="tripType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.tripType}
                    onChange={(e) =>
                      setFormData({ ...formData, tripType: e.target.value as any, route: "" })
                    }
                    required
                  >
                    {Object.entries(TRIP_TYPES).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="route">Ruta *</Label>
                  <select
                    id="route"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.route}
                    onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                    required
                  >
                    <option value="">Seleccionar ruta</option>
                    {getRoutes().map((route) => (
                      <option key={route} value={route}>
                        {route}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manifestNumber">N° de Manifiesto *</Label>
                  <Input
                    id="manifestNumber"
                    placeholder="000123"
                    value={formData.manifestNumber}
                    onChange={(e) => setFormData({ ...formData, manifestNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tripDate">Fecha del Viaje *</Label>
                  <Input
                    id="tripDate"
                    type="date"
                    value={formData.tripDate}
                    onChange={(e) => setFormData({ ...formData, tripDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalValue">Valor Total (COP) *</Label>
                  <Input
                    id="totalValue"
                    type="number"
                    step="0.01"
                    placeholder="1000000"
                    value={formData.totalValue}
                    onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="notes">Notas (Opcional)</Label>
                  <Input
                    id="notes"
                    placeholder="Observaciones adicionales"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  Registrar Viaje
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {trips.length === 0 && !isLoading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hay viajes registrados</p>
            </CardContent>
          </Card>
        ) : (
          trips.map((trip) => (
            <Card key={trip.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {trip.vehicle.licensePlate} - {trip.route}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {formatShortDate(trip.tripDate)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <p className="font-medium">{TRIP_TYPES[trip.tripType]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Manifiesto</p>
                    <p className="font-medium">{trip.manifestNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Total</p>
                    <p className="font-medium">{formatCurrency(Number(trip.totalValue))}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Deducción (1.6%)</p>
                    <p className="font-medium text-red-600">
                      {formatCurrency(Number(trip.deduction))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Pagado</p>
                    <p className="font-medium">{formatCurrency(Number(trip.paidValue))}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ganancia Bruta</p>
                    <p className="font-medium text-blue-600">
                      {formatCurrency(Number(trip.grossProfit))}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Ganancia Neta</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(Number(trip.netProfit))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
