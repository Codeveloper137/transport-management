# 🚛 Sistema de Gestión de Transporte - Arquitectura Técnica

## 📋 Descripción General

Sistema completo de gestión administrativa para empresas de transporte, con autenticación multi-usuario, gestión de flota, registro de viajes, control de gastos y reportes analíticos.

---

## 🏗️ Stack Tecnológico

### Frontend
- **Next.js 15.1.3** - Framework React con App Router y SSR
- **TypeScript 5.7** - Tipado estático
- **Shadcn/ui** - Componentes UI basados en Radix UI
- **Tailwind CSS** - Estilos utility-first
- **Recharts** - Gráficos y visualizaciones
- **React Hook Form + Zod** - Formularios y validaciones

### Backend
- **Next.js API Routes** - Endpoints serverless
- **Better-Auth** - Autenticación completa
- **Prisma ORM** - ORM type-safe para PostgreSQL
- **PostgreSQL** - Base de datos relacional

### DevOps
- **Vercel** - Deployment y hosting
- **GitHub** - Control de versiones
- **ESLint + Prettier** - Linting y formato

---

## 📊 Modelo de Datos

### Entidades Principales

#### 1. **User** (Usuario)
- Gestión de usuarios con roles (Admin, Operador, Visualizador)
- Autenticación mediante Better-Auth
- Aislamiento de datos por usuario (multi-tenancy)

#### 2. **Vehicle** (Vehículo)
- Catálogo completo de flota
- Estados: Activo, Mantenimiento, Inactivo
- Tipos: Camión, Tractomula, Furgoneta, Otro

#### 3. **Trip** (Viaje)
- Registro completo de viajes con cálculos automáticos
- Tipos: Urbano (50% ganancia) / Nacional (60% ganancia)
- Deducción automática del 1.6%
- Cálculo de ganancia bruta y neta

#### 4. **Expense** (Gasto)
- Gastos operativos por viaje
- Categorías: Combustible, Peajes, Mantenimiento, Salarios, etc.

#### 5. **Maintenance** (Mantenimiento)
- Historial de mantenimientos por vehículo
- Tipos: Preventivo, Correctivo, Inspección, Emergencia
- Alertas de próximo mantenimiento

#### 6. **AuditLog** (Auditoría)
- Registro completo de acciones del sistema
- Trazabilidad de cambios

---

## 🎯 Características Principales

### 1. Autenticación y Seguridad
- ✅ Login/Register con Better-Auth
- ✅ Sesiones seguras con cookies HTTP-only
- ✅ Protección de rutas por roles
- ✅ Aislamiento total de datos por usuario

### 2. Dashboard Principal
- ✅ Métricas KPI en tiempo real
- ✅ Gráficos de tendencias (ingresos, gastos, ganancias)
- ✅ Top vehículos más rentables
- ✅ Alertas de mantenimiento

### 3. Gestión de Viajes
- ✅ CRUD completo de viajes
- ✅ Cálculos automáticos:
  - Deducción: `totalValue * 0.016`
  - Valor Pagado: `totalValue - deduction`
  - Ganancia Bruta: `totalValue * (0.5 o 0.6)`
  - Ganancia Neta: `grossProfit - gastos`
- ✅ Filtros por fecha (semana, mes, año)
- ✅ Búsqueda por placa, tipo, ruta

### 4. Gestión de Flota
- ✅ Catálogo de vehículos
- ✅ Historial completo por vehículo
- ✅ Estados y tipos configurables

### 5. Control de Gastos
- ✅ Registro de gastos por viaje
- ✅ Categorización automática
- ✅ Impacto en ganancia neta

### 6. Reportes y Analytics
- ✅ Exportación a PDF/Excel
- ✅ Reportes personalizados por período
- ✅ Gráficos interactivos
- ✅ Comparativas período a período

### 7. Auditoría
- ✅ Log completo de acciones
- ✅ Historial de cambios
- ✅ Trazabilidad completa

---

## 📁 Estructura del Proyecto

```
transport-management/
├── prisma/
│   ├── schema.prisma              # Esquema de base de datos
│   └── migrations/                # Migraciones
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/               # Rutas de autenticación
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/          # Rutas protegidas
│   │   │   ├── dashboard/        # Panel principal
│   │   │   ├── vehicles/         # Gestión de vehículos
│   │   │   ├── trips/            # Gestión de viajes
│   │   │   ├── expenses/         # Gestión de gastos
│   │   │   ├── maintenance/      # Mantenimientos
│   │   │   ├── reports/          # Reportes
│   │   │   └── settings/         # Configuración
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/
│   │   │   ├── trips/
│   │   │   ├── vehicles/
│   │   │   └── reports/
│   │   ├── layout.tsx
│   │   └── page.tsx              # Redirect a login
│   ├── components/
│   │   ├── ui/                   # Componentes Shadcn
│   │   ├── dashboard/            # Componentes del dashboard
│   │   ├── forms/                # Formularios
│   │   ├── charts/               # Gráficos
│   │   └── layout/               # Layouts reutilizables
│   ├── lib/
│   │   ├── auth.ts               # Configuración Better-Auth
│   │   ├── db.ts                 # Cliente Prisma
│   │   ├── validations.ts        # Schemas Zod
│   │   └── utils.ts              # Utilidades
│   ├── hooks/                    # Custom hooks
│   ├── types/                    # TypeScript types
│   └── constants/                # Constantes
├── public/
├── .env.local                    # Variables de entorno
├── next.config.js
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 🔐 Variables de Entorno Requeridas

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Better-Auth
BETTER_AUTH_SECRET="tu-secret-key-segura"
BETTER_AUTH_URL="http://localhost:3000"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🚀 Flujo de Usuario

### 1. Autenticación
```
Usuario → Login/Register → Better-Auth → Session → Dashboard
```

### 2. Creación de Viaje
```
Dashboard → Nuevo Viaje → Seleccionar Vehículo → 
Tipo de Viaje → Ingresar Datos → Cálculos Automáticos → 
Guardar → Actualización Dashboard
```

### 3. Filtros y Reportes
```
Dashboard → Filtros (Fecha/Vehículo) → 
Aplicar → Visualización Actualizada → 
Exportar (PDF/Excel)
```

---

## 📊 Cálculos Financieros

### Viaje Nacional (60% ganancia)
```typescript
const deduction = totalValue * 0.016;
const paidValue = totalValue - deduction;
const grossProfit = totalValue * 0.60;
const netProfit = grossProfit - totalExpenses;
```

### Viaje Urbano (50% ganancia)
```typescript
const deduction = totalValue * 0.016;
const paidValue = totalValue - deduction;
const grossProfit = totalValue * 0.50;
const netProfit = grossProfit - totalExpenses;
```

---

## 🎨 Diseño UI/UX

### Paleta de Colores
- **Primary**: Blue (Confianza, profesionalismo)
- **Success**: Green (Ganancias positivas)
- **Warning**: Yellow (Alertas de mantenimiento)
- **Danger**: Red (Gastos, pérdidas)

### Componentes Principales
- **Dashboard Cards**: Métricas KPI
- **Data Tables**: Listado de viajes/vehículos
- **Charts**: Gráficos de líneas, barras, pie
- **Forms**: Formularios dinámicos con validación
- **Modals**: Creación/edición rápida

---

## 🔄 Estados y Validaciones

### Estados de Vehículo
- `ACTIVE`: Disponible para viajes
- `MAINTENANCE`: En mantenimiento
- `INACTIVE`: Fuera de operación

### Validaciones de Formularios
- Placa: Formato colombiano (ABC123 o ABC12D)
- Valores: Números positivos con 2 decimales
- Fechas: No futuras para viajes completados
- Rutas: Predefinidas según tipo de viaje

---

## 📈 Métricas y KPIs

1. **Ingresos Totales**: Suma de todos los valores totales
2. **Gastos Totales**: Suma de todos los gastos
3. **Ganancia Neta Total**: Suma de ganancias netas
4. **Promedio por Viaje**: Ganancia promedio
5. **Vehículo Más Rentable**: Por ganancia neta
6. **Tendencia Mensual**: Comparativa mes a mes

---

## 🔒 Seguridad

- Autenticación con tokens seguros
- Validación de datos en cliente y servidor
- Sanitización de inputs
- Rate limiting en APIs
- HTTPS obligatorio en producción
- Variables de entorno para secrets
- Roles y permisos granulares

---

## 📦 Deployment en Vercel

1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Configurar PostgreSQL (Neon/Supabase)
4. Deploy automático en cada push

---

## 🧪 Testing (Futuro)

- Unit tests con Jest
- Integration tests con React Testing Library
- E2E tests con Playwright
- Coverage mínimo: 80%

---

## 📝 Notas Técnicas

- SSR habilitado para SEO y performance
- ISR para datos estáticos
- API Routes con validación Zod
- Optimistic UI updates
- Error boundaries
- Loading states
- Toast notifications

---

## 🎯 Roadmap Futuro

- [ ] App móvil (React Native)
- [ ] Notificaciones push
- [ ] Integración con contabilidad
- [ ] GPS tracking en tiempo real
- [ ] Chat interno
- [ ] Multi-idioma (i18n)
- [ ] Tema dark/light
- [ ] Backup automático

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026  
**Autor**: Sistema de Gestión de Transporte
