// Tipos de vehículos
export const VEHICLE_TYPES = {
  TRUCK: 'Camión',
  TRAILER: 'Tractomula',
  VAN: 'Furgoneta',
  OTHER: 'Otro',
} as const;

// Estados de vehículos
export const VEHICLE_STATUS = {
  ACTIVE: 'Activo',
  MAINTENANCE: 'En Mantenimiento',
  INACTIVE: 'Inactivo',
} as const;

// Tipos de viajes
export const TRIP_TYPES = {
  URBAN: 'Urbano',
  NATIONAL: 'Nacional',
} as const;

// Rutas Urbanas
export const URBAN_ROUTES = [
  'Barranquilla - Soledad',
  'Barranquilla - Malambo',
  'Barranquilla - Puerto Colombia',
  'Barranquilla - Galapa',
  'Barranquilla - Zona Industrial',
  'Otra (Urbana)',
] as const;

// Rutas Nacionales
export const NATIONAL_ROUTES = [
  'Barranquilla - Bogotá',
  'Barranquilla - Medellín',
  'Barranquilla - Cali',
  'Barranquilla - Cartagena',
  'Barranquilla - Santa Marta',
  'Barranquilla - Bucaramanga',
  'Barranquilla - Valledupar',
  'Otra (Nacional)',
] as const;

// Tipos de gastos
export const EXPENSE_TYPES = {
  FUEL: 'Combustible',
  TOLL: 'Peajes',
  MAINTENANCE: 'Mantenimiento',
  SALARY: 'Salario',
  INSURANCE: 'Seguros',
  DOCUMENTATION: 'Documentación',
  OTHER: 'Otros',
} as const;

// Tipos de mantenimiento
export const MAINTENANCE_TYPES = {
  PREVENTIVE: 'Preventivo',
  CORRECTIVE: 'Correctivo',
  INSPECTION: 'Inspección Técnico-Mecánica',
  EMERGENCY: 'Emergencia',
} as const;

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 'Administrador',
  OPERATOR: 'Operador',
  VIEWER: 'Visualizador',
} as const;

// Porcentajes de ganancia
export const PROFIT_PERCENTAGES = {
  URBAN: 0.5,
  NATIONAL: 0.6,
} as const;

// Porcentaje de deducción
export const DEDUCTION_PERCENTAGE = 0.016;

// Períodos de filtro
export const FILTER_PERIODS = {
  week: 'Semana',
  month: 'Mes',
  year: 'Año',
} as const;

// Colores para gráficos
export const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
  purple: '#8b5cf6',
  pink: '#ec4899',
} as const;
