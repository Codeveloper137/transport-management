# 🚛 Sistema de Gestión de Transporte

Sistema completo de gestión administrativa para empresas de transporte, con autenticación multi-usuario, gestión de flota, registro de viajes, control de gastos y reportes analíticos.

## 🌟 Características Principales

### ✅ Implementadas en esta versión

- **Autenticación Completa**
  - Login/Register con Better-Auth
  - Sesiones seguras con cookies HTTP-only
  - Protección de rutas por roles
  - Aislamiento total de datos por usuario (multi-tenancy)

- **Dashboard Principal**
  - Métricas KPI en tiempo real
  - Visualización de ingresos, ganancias y gastos
  - Lista de viajes recientes
  - Contador de vehículos activos

- **Gestión de Viajes**
  - Cálculos automáticos (deducción 1.6%, ganancia 50%/60%)
  - Clasificación por tipo (Urbano/Nacional)
  - Registro completo de rutas y manifiestos
  - Campos extensibles para gastos futuros

- **Gestión de Flota**
  - Catálogo completo de vehículos
  - Estados: Activo, Mantenimiento, Inactivo
  - Tipos: Camión, Tractomula, Furgoneta, Otro

- **API REST Completa**
  - Endpoints para viajes, vehículos, gastos
  - Validación con Zod
  - Auditoría de cambios

## 📋 Stack Tecnológico

- **Frontend**: Next.js 15.1.3 (App Router), React 19, TypeScript 5.7
- **UI**: Shadcn/ui + Tailwind CSS
- **Backend**: Next.js API Routes
- **Autenticación**: Better-Auth
- **Base de Datos**: PostgreSQL + Prisma ORM
- **Deployment**: Vercel

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js 18.x o superior
- PostgreSQL 14.x o superior
- Cuenta en Vercel (para deployment)

### Paso 1: Clonar e Instalar Dependencias

\`\`\`bash
# Instalar dependencias
npm install

# o con yarn
yarn install

# o con pnpm
pnpm install
\`\`\`

### Paso 2: Configurar Variables de Entorno

Crea un archivo \`.env.local\` en la raíz del proyecto:

\`\`\`env
# Database (Usa Neon, Supabase o tu propia instancia de PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/transport_db"

# Better-Auth (Genera un secret seguro con: openssl rand -base64 32)
BETTER_AUTH_SECRET="tu-secret-key-muy-segura-cambiala"
BETTER_AUTH_URL="http://localhost:3000"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

### Paso 3: Configurar Base de Datos

\`\`\`bash
# Generar cliente de Prisma
npx prisma generate

# Crear las tablas en la base de datos
npx prisma db push

# (Opcional) Abrir Prisma Studio para ver la base de datos
npx prisma studio
\`\`\`

### Paso 4: Ejecutar en Desarrollo

\`\`\`bash
npm run dev
# o
yarn dev
# o
pnpm dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Deployment en Vercel

### Opción 1: Deploy desde GitHub

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com) y conecta tu repositorio
3. Configura las variables de entorno en Vercel
4. Deploy automático

### Opción 2: Deploy con CLI

\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
\`\`\`

### Variables de Entorno en Vercel

Configura las siguientes variables en Vercel Dashboard:

- \`DATABASE_URL\`: URL de tu base de datos PostgreSQL
- \`BETTER_AUTH_SECRET\`: Secret para Better-Auth
- \`BETTER_AUTH_URL\`: URL de tu app en Vercel (ej: https://tu-app.vercel.app)
- \`NEXT_PUBLIC_APP_URL\`: Misma URL de producción

## 🗄️ Estructura del Proyecto

\`\`\`
transport-management/
├── prisma/
│   └── schema.prisma              # Esquema de base de datos
├── src/
│   ├── app/
│   │   ├── api/                   # API Routes
│   │   │   ├── auth/              # Autenticación
│   │   │   ├── trips/             # Viajes
│   │   │   └── vehicles/          # Vehículos
│   │   ├── dashboard/             # Páginas protegidas
│   │   │   ├── page.tsx           # Dashboard principal
│   │   │   ├── trips/             # Gestión de viajes
│   │   │   ├── vehicles/          # Gestión de vehículos
│   │   │   └── layout.tsx         # Layout con sidebar
│   │   ├── login/                 # Página de login
│   │   ├── register/              # Página de registro
│   │   ├── layout.tsx             # Layout raíz
│   │   └── page.tsx               # Home (redirect)
│   ├── components/
│   │   ├── ui/                    # Componentes Shadcn
│   │   └── layout/                # Componentes de layout
│   ├── lib/
│   │   ├── auth.ts                # Configuración Better-Auth
│   │   ├── db.ts                  # Cliente Prisma
│   │   ├── validations.ts         # Schemas Zod
│   │   ├── utils.ts               # Utilidades
│   │   └── constants.ts           # Constantes
│   └── types/                     # TypeScript types
├── .env.example                   # Ejemplo de variables de entorno
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
\`\`\`

## 💡 Uso del Sistema

### 1. Registro e Inicio de Sesión

- Ve a `/register` para crear una cuenta
- Inicia sesión en `/login`
- Cada usuario tiene datos completamente aislados

### 2. Gestión de Vehículos

1. Ve a "Vehículos" en el sidebar
2. Haz clic en "Agregar Vehículo"
3. Completa el formulario:
   - Placa (formato: ABC123)
   - Marca, Modelo, Año (opcional)
   - Tipo de vehículo
   - Estado

### 3. Registro de Viajes

1. Ve a "Viajes" en el sidebar
2. Haz clic en "Nuevo Viaje"
3. Completa el formulario:
   - Selecciona vehículo
   - Tipo de viaje (Urbano/Nacional)
   - Ruta/Trayecto
   - Número de manifiesto
   - Fecha del viaje
   - Valor total
4. El sistema calculará automáticamente:
   - Deducción (1.6%)
   - Valor pagado
   - Ganancia bruta (50% o 60%)
   - Ganancia neta

### 4. Visualización de Datos

- **Dashboard**: Ver métricas generales
- **Filtros**: Por vehículo, tipo de viaje, fecha
- **Reportes**: (próximamente) Exportar a PDF/Excel

## 🔢 Cálculos Automáticos

### Viaje Nacional (60% ganancia)
\`\`\`
Deducción = Valor Total × 0.016
Valor Pagado = Valor Total - Deducción
Ganancia Bruta = Valor Total × 0.60
Ganancia Neta = Ganancia Bruta - Gastos
\`\`\`

### Viaje Urbano (50% ganancia)
\`\`\`
Deducción = Valor Total × 0.016
Valor Pagado = Valor Total - Deducción
Ganancia Bruta = Valor Total × 0.50
Ganancia Neta = Ganancia Bruta - Gastos
\`\`\`

## 🛠️ Comandos Disponibles

\`\`\`bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm start            # Iniciar servidor de producción
npm run lint         # Ejecutar linter

# Base de Datos
npm run db:push      # Sincronizar esquema con BD
npm run db:migrate   # Crear migración
npm run db:studio    # Abrir Prisma Studio
\`\`\`

## 🔐 Seguridad

- Autenticación con Better-Auth
- Sesiones seguras con cookies HTTP-only
- Validación de datos con Zod
- Sanitización de inputs
- Aislamiento de datos por usuario
- HTTPS obligatorio en producción

## 📊 Modelo de Datos

### Entidades Principales

- **User**: Usuarios del sistema
- **Vehicle**: Vehículos de la flota
- **Trip**: Viajes realizados
- **Expense**: Gastos operativos
- **Maintenance**: Mantenimientos
- **AuditLog**: Auditoría de cambios

Ver `prisma/schema.prisma` para el esquema completo.

## 🎨 Personalización

### Cambiar Colores

Edita `src/app/globals.css`:

\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Color primario */
  --secondary: 210 40% 96.1%;     /* Color secundario */
  /* ... más variables */
}
\`\`\`

### Agregar Rutas Personalizadas

Edita `src/lib/constants.ts`:

\`\`\`typescript
export const URBAN_ROUTES = [
  'Tu ruta 1',
  'Tu ruta 2',
  // ...
];
\`\`\`

## 🐛 Troubleshooting

### Error: "Cannot connect to database"

- Verifica que PostgreSQL esté corriendo
- Revisa que la \`DATABASE_URL\` sea correcta
- Asegúrate de que el firewall permita la conexión

### Error: "Session not found"

- Limpia las cookies del navegador
- Verifica que \`BETTER_AUTH_SECRET\` esté configurado
- Reinicia el servidor

### Error en deployment de Vercel

- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que \`DATABASE_URL\` apunte a una BD accesible desde internet
- Revisa los logs en Vercel Dashboard

## 📝 Roadmap Futuro

- [ ] Filtros avanzados por período (semana/mes/año)
- [ ] Gráficos de tendencias con Recharts
- [ ] Exportación de reportes a PDF/Excel
- [ ] Sistema de gastos detallado
- [ ] Gestión completa de mantenimientos
- [ ] Roles y permisos (Admin/Operador/Visualizador)
- [ ] Notificaciones y alertas
- [ ] App móvil (React Native)
- [ ] Integración con contabilidad

## 🤝 Contribuciones

Este es un proyecto privado para uso empresarial. Para soporte contacta al administrador.

## 📄 Licencia

Propietario - Todos los derechos reservados

---

**Versión**: 1.0.0  
**Fecha**: Febrero 2026  
**Desarrollado con** ❤️ **para optimizar la gestión de tu empresa de transporte**
