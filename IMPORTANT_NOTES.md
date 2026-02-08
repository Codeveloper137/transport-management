# 📌 Notas Importantes - Sistema de Gestión de Transporte

## ✅ Lo que Ya Está Implementado

### Backend Completo
- ✅ Esquema de base de datos con Prisma
- ✅ Autenticación con Better-Auth
- ✅ API Routes para viajes y vehículos
- ✅ Middleware de protección de rutas
- ✅ Validaciones con Zod
- ✅ Cálculos automáticos de ganancias

### Frontend Completo
- ✅ Páginas de login y registro
- ✅ Dashboard con métricas KPI
- ✅ Gestión completa de vehículos
- ✅ Gestión completa de viajes
- ✅ Formularios con validación
- ✅ Componentes UI de Shadcn
- ✅ Diseño responsivo

### Funcionalidades
- ✅ Multi-tenancy (datos aislados por usuario)
- ✅ Cálculos automáticos (deducción 1.6%, ganancia 50%/60%)
- ✅ Sistema de notificaciones (toast)
- ✅ Auditoría de cambios

## 🚧 Para Implementar en Futuras Versiones

### Alta Prioridad
- [ ] Página de gastos completa
- [ ] Página de mantenimientos completa
- [ ] Filtros por período (semana/mes/año)
- [ ] Página de reportes con gráficos
- [ ] Exportación a PDF/Excel

### Media Prioridad
- [ ] Sistema de roles (Admin/Operador/Visualizador)
- [ ] Edición y eliminación de viajes
- [ ] Búsqueda y filtros avanzados
- [ ] Configuración de usuario
- [ ] Temas dark/light

### Baja Prioridad
- [ ] Notificaciones push
- [ ] App móvil
- [ ] Integración con contabilidad
- [ ] GPS tracking
- [ ] Chat interno

## 🔑 Credenciales por Defecto

**Importante**: No hay credenciales predeterminadas. Debes crear tu primera cuenta en `/register`.

## 📝 Personalización Rápida

### 1. Cambiar Rutas Disponibles

Edita `src/lib/constants.ts`:

\`\`\`typescript
export const URBAN_ROUTES = [
  'Tu ciudad - Destino 1',
  'Tu ciudad - Destino 2',
  // Agrega más rutas
];

export const NATIONAL_ROUTES = [
  'Origen - Bogotá',
  'Origen - Medellín',
  // Agrega más rutas
];
\`\`\`

### 2. Cambiar Porcentajes de Ganancia

Edita `src/lib/constants.ts`:

\`\`\`typescript
export const PROFIT_PERCENTAGES = {
  URBAN: 0.5,      // Cambia a tu porcentaje (ej: 0.45 = 45%)
  NATIONAL: 0.6,   // Cambia a tu porcentaje (ej: 0.65 = 65%)
};
\`\`\`

### 3. Cambiar Porcentaje de Deducción

Edita `src/lib/constants.ts`:

\`\`\`typescript
export const DEDUCTION_PERCENTAGE = 0.016;  // Cambia según necesites
\`\`\`

### 4. Cambiar Nombre de la Aplicación

Edita `src/components/layout/sidebar.tsx`:

\`\`\`typescript
<span className="text-xl font-bold">TuNombreAquí</span>
\`\`\`

Edita `src/app/layout.tsx`:

\`\`\`typescript
export const metadata: Metadata = {
  title: "Tu Nombre de Empresa",
  description: "Tu descripción",
};
\`\`\`

## ⚙️ Variables de Entorno Requeridas

\`\`\`env
# Base de Datos (OBLIGATORIO)
DATABASE_URL="postgresql://..."

# Autenticación (OBLIGATORIO)
BETTER_AUTH_SECRET="genera-con-openssl-rand-base64-32"
BETTER_AUTH_URL="http://localhost:3000"

# App URL (OBLIGATORIO)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

## 🛠️ Comandos Útiles

\`\`\`bash
# Desarrollo
npm run dev              # Iniciar en desarrollo
npm run build            # Construir para producción
npm start                # Iniciar en producción

# Base de Datos
npm run db:push          # Aplicar cambios de schema
npx prisma studio        # Ver datos en navegador
npx prisma generate      # Regenerar cliente Prisma

# Linting
npm run lint             # Ejecutar ESLint
\`\`\`

## 🐛 Errores Comunes y Soluciones

### 1. "Cannot find module '@/...'"
**Solución**: 
\`\`\`bash
npm install
npx prisma generate
\`\`\`

### 2. "Database connection failed"
**Solución**: 
- Verifica que PostgreSQL esté corriendo
- Revisa tu `DATABASE_URL` en `.env.local`
- Prueba con Neon o Supabase en la nube

### 3. "Session not found"
**Solución**:
- Limpia las cookies del navegador
- Verifica que `BETTER_AUTH_SECRET` esté configurado
- Reinicia el servidor

### 4. "Port 3000 already in use"
**Solución**:
\`\`\`bash
PORT=3001 npm run dev
\`\`\`

### 5. Errores de TypeScript
**Solución**:
\`\`\`bash
rm -rf .next
npm run dev
\`\`\`

## 📊 Estructura de Datos

### Usuario (User)
- id, email, name, role
- Relaciones: vehículos, viajes, gastos

### Vehículo (Vehicle)
- Placa, marca, modelo, año
- Tipo, estado
- Relaciones: viajes, mantenimientos

### Viaje (Trip)
- Manifiesto, fecha, tipo, ruta
- Valores: total, deducción, pagado
- Ganancias: bruta, neta
- Relaciones: vehículo, gastos

### Gasto (Expense)
- Descripción, monto, tipo, fecha
- Relaciones: viaje (opcional)

### Mantenimiento (Maintenance)
- Tipo, descripción, costo, fecha
- Relaciones: vehículo

## 🔐 Seguridad

- ✅ Autenticación segura con Better-Auth
- ✅ Sesiones con cookies HTTP-only
- ✅ Validación de datos en cliente y servidor
- ✅ Protección contra SQL injection (Prisma)
- ✅ Aislamiento de datos por usuario
- ✅ HTTPS en producción (Vercel)

## 📈 Próximos Pasos Recomendados

1. **Personalizar Rutas**: Edita `src/lib/constants.ts`
2. **Agregar Datos de Prueba**: Crea vehículos y viajes
3. **Configurar Production DB**: Neon o Supabase
4. **Deploy a Vercel**: Sigue `DEPLOYMENT.md`
5. **Implementar Reportes**: Agregar gráficos con Recharts
6. **Agregar Filtros**: Por fecha, vehículo, tipo

## 📞 Soporte Técnico

### Documentación Oficial
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Prisma: [prisma.io/docs](https://prisma.io/docs)
- Better-Auth: [better-auth.com](https://better-auth.com)
- Shadcn/ui: [ui.shadcn.com](https://ui.shadcn.com)

### Stack Overflow
Busca por:
- `next.js 15 app router`
- `prisma postgresql`
- `better-auth`

## ✨ Características Destacadas

1. **Cálculos Automáticos**: No necesitas calcular manualmente
2. **Multi-Usuario**: Cada usuario ve solo sus datos
3. **Responsive**: Funciona en móviles y tablets
4. **Type-Safe**: TypeScript previene errores
5. **Escalable**: Arquitectura modular y profesional

## 🎯 Tips de Uso

- Crea primero tus vehículos antes de registrar viajes
- Usa rutas predefinidas para consistencia
- Revisa el dashboard regularmente
- Exporta reportes mensualmente (próximamente)
- Mantén actualizados los estados de vehículos

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026

**¡Gracias por usar el Sistema de Gestión de Transporte!** 🚛✨
