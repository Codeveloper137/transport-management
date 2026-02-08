import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { tripSchema } from "@/lib/validations";
import { calculateDeduction, calculateGrossProfit, calculatePaidValue } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get("vehicleId");
    const tripType = searchParams.get("tripType");

    const trips = await prisma.trip.findMany({
      where: {
        userId: session.user.id,
        ...(vehicleId && { vehicleId }),
        ...(tripType && { tripType: tripType as any }),
      },
      include: {
        vehicle: true,
        expenses: true,
      },
      orderBy: { tripDate: "desc" },
    });

    return NextResponse.json(trips);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener viajes" }, { status: 500 });
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
    const validatedData = tripSchema.parse(body);

    const deduction = calculateDeduction(validatedData.totalValue);
    const paidValue = calculatePaidValue(validatedData.totalValue);
    const profitPercentage = validatedData.tripType === "NATIONAL" ? 60 : 50;
    const grossProfit = calculateGrossProfit(validatedData.totalValue, validatedData.tripType);

    const trip = await prisma.trip.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        deduction,
        paidValue,
        profitPercentage,
        grossProfit,
        netProfit: grossProfit,
      },
      include: {
        vehicle: true,
      },
    });

    // Registrar en auditoría
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "CREATE",
        entity: "TRIP",
        entityId: trip.id,
        changes: body,
      },
    });

    return NextResponse.json(trip);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al crear viaje" },
      { status: 400 }
    );
  }
}
