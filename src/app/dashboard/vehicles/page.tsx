"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Truck } from "lucide-react";
import { VEHICLE_TYPES, VEHICLE_STATUS } from "@/lib/constants";

interface Vehicle {
  id: string;
  licensePlate: string;
  brand?: string;
  model?: string;
  year?: number;
  vehicleType: keyof typeof VEHICLE_TYPES;
  status: keyof typeof VEHICLE_STATUS;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    licensePlate: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    vehicleType: "TRUCK" as keyof typeof VEHICLE_TYPES,
    status: "ACTIVE" as keyof typeof VEHICLE_STATUS,
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/api/vehicles");
      if (!response.ok) throw new Error();
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      toast.error("Error al cargar vehículos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error();

      toast.success("Vehículo agregado exitosamente");
      setShowForm(false);
      setFormData({
        licensePlate: "",
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        vehicleType: "TRUCK",
        status: "ACTIVE",
      });
      fetchVehicles();
    } catch (error) {
      toast.error("Error al agregar vehículo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Vehículos</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Vehículo
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Vehículo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">Placa *</Label>
                  <Input
                    id="licensePlate"
                    placeholder="ABC123"
                    value={formData.licensePlate}
                    onChange={(e) =>
                      setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })
                    }
                    required
                    maxLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Tipo *</Label>
                  <select
                    id="vehicleType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.vehicleType}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleType: e.target.value as any })
                    }
                  >
                    {Object.entries(VEHICLE_TYPES).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Año</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado *</Label>
                  <select
                    id="status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    {Object.entries(VEHICLE_STATUS).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  Guardar
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.length === 0 && !isLoading ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Truck className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hay vehículos registrados</p>
            </CardContent>
          </Card>
        ) : (
          vehicles.map((vehicle) => (
            <Card key={vehicle.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  {vehicle.licensePlate}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Tipo:</span> {VEHICLE_TYPES[vehicle.vehicleType]}
                  </p>
                  {vehicle.brand && (
                    <p>
                      <span className="font-medium">Marca:</span> {vehicle.brand}
                    </p>
                  )}
                  {vehicle.model && (
                    <p>
                      <span className="font-medium">Modelo:</span> {vehicle.model}
                    </p>
                  )}
                  {vehicle.year && (
                    <p>
                      <span className="font-medium">Año:</span> {vehicle.year}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Estado:</span>{" "}
                    <span
                      className={
                        vehicle.status === "ACTIVE"
                          ? "text-green-600"
                          : vehicle.status === "MAINTENANCE"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }
                    >
                      {VEHICLE_STATUS[vehicle.status]}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
