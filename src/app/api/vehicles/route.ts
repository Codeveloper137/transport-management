import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { vehicleSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const vehicles = await prisma.vehicle.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener vehículos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = vehicleSchema.parse(body);

    const vehicle = await prisma.vehicle.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        licensePlate: validatedData.licensePlate.toUpperCase(),
      },
    });

    await prisma.audit_log.create({
      data: {
        userId: session.user.id,
        action: "CREATE",
        entity: "VEHICLE",
        entityId: vehicle.id,
        changes: body,
      },
    });

    return NextResponse.json(vehicle);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al crear vehículo" },
      { status: 400 }
    );
  }
}
