import { z } from 'zod';

// ============================================
// AUTH SCHEMAS
// ============================================

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

// ============================================
// VEHICLE SCHEMAS
// ============================================

export const vehicleSchema = z.object({
  licensePlate: z.string()
    .min(6, 'La placa debe tener al menos 6 caracteres')
    .max(6, 'La placa debe tener máximo 6 caracteres')
    .regex(/^[A-Z]{3}[0-9]{2}[0-9A-Z]$/, 'Formato de placa inválido (ejemplo: ABC123)'),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().int().min(1950).max(new Date().getFullYear() + 1).optional(),
  vehicleType: z.enum(['TRUCK', 'TRAILER', 'VAN', 'OTHER']),
  status: z.enum(['ACTIVE', 'MAINTENANCE', 'INACTIVE']).default('ACTIVE'),
  acquisitionDate: z.date().optional(),
  notes: z.string().optional(),
});

export const updateVehicleSchema = vehicleSchema.partial().extend({
  id: z.string(),
});

// ============================================
// TRIP SCHEMAS
// ============================================

export const tripSchema = z.object({
  vehicleId: z.string().min(1, 'Debe seleccionar un vehículo'),
  manifestNumber: z.string().min(1, 'El número de manifiesto es requerido'),
  tripDate: z.date({
    required_error: 'La fecha del viaje es requerida',
  }),
  tripType: z.enum(['URBAN', 'NATIONAL'], {
    required_error: 'El tipo de viaje es requerido',
  }),
  route: z.string().min(1, 'La ruta es requerida'),
  totalValue: z.number()
    .positive('El valor total debe ser positivo')
    .min(1, 'El valor total es requerido'),
  notes: z.string().optional(),
});

export const updateTripSchema = tripSchema.partial().extend({
  id: z.string(),
});

// ============================================
// EXPENSE SCHEMAS
// ============================================

export const expenseSchema = z.object({
  description: z.string().min(1, 'La descripción es requerida'),
  amount: z.number().positive('El monto debe ser positivo'),
  expenseType: z.enum(['FUEL', 'TOLL', 'MAINTENANCE', 'SALARY', 'INSURANCE', 'DOCUMENTATION', 'OTHER']),
  expenseDate: z.date({
    required_error: 'La fecha del gasto es requerida',
  }),
  tripId: z.string().optional(),
  notes: z.string().optional(),
});

export const updateExpenseSchema = expenseSchema.partial().extend({
  id: z.string(),
});

// ============================================
// MAINTENANCE SCHEMAS
// ============================================

export const maintenanceSchema = z.object({
  vehicleId: z.string().min(1, 'Debe seleccionar un vehículo'),
  maintenanceType: z.enum(['PREVENTIVE', 'CORRECTIVE', 'INSPECTION', 'EMERGENCY']),
  description: z.string().min(1, 'La descripción es requerida'),
  cost: z.number().positive('El costo debe ser positivo'),
  maintenanceDate: z.date({
    required_error: 'La fecha del mantenimiento es requerida',
  }),
  nextDueDate: z.date().optional(),
  mileage: z.number().int().positive().optional(),
  notes: z.string().optional(),
});

export const updateMaintenanceSchema = maintenanceSchema.partial().extend({
  id: z.string(),
});

// ============================================
// FILTER SCHEMAS
// ============================================

export const tripFilterSchema = z.object({
  vehicleId: z.string().optional(),
  tripType: z.enum(['URBAN', 'NATIONAL']).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  period: z.enum(['week', 'month', 'year']).optional(),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type VehicleInput = z.infer<typeof vehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;
export type TripInput = z.infer<typeof tripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;
export type ExpenseInput = z.infer<typeof expenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
export type MaintenanceInput = z.infer<typeof maintenanceSchema>;
export type UpdateMaintenanceInput = z.infer<typeof updateMaintenanceSchema>;
export type TripFilterInput = z.infer<typeof tripFilterSchema>;
