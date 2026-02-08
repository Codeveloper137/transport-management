# ⚡ Inicio Rápido - 5 Minutos

## 🚀 Setup Express en Local

### 1. Instalar Dependencias (2 minutos)

\`\`\`bash
cd transport-management
npm install
\`\`\`

### 2. Configurar Variables de Entorno (1 minuto)

Crea \`.env.local\` con este contenido:

\`\`\`env
# PostgreSQL Local o Neon/Supabase
DATABASE_URL="postgresql://user:password@localhost:5432/transport_db"

# Genera con: openssl rand -base64 32
BETTER_AUTH_SECRET="cambia-esto-por-algo-seguro"

# URLs locales
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

**Opción Rápida con Neon (Sin PostgreSQL local)**:

1. Ve a [neon.tech](https://neon.tech)
2. Crea cuenta gratis
3. Crea proyecto "transport-db"
4. Copia la `DATABASE_URL` a tu `.env.local`

### 3. Crear Base de Datos (30 segundos)

\`\`\`bash
npx prisma db push
\`\`\`

### 4. Iniciar Servidor (30 segundos)

\`\`\`bash
npm run dev
\`\`\`

### 5. Abrir en Navegador

Abre [http://localhost:3000](http://localhost:3000)

¡Listo! Crea tu primera cuenta y empieza a usar el sistema.

---

## 🎯 Primera Vez en el Sistema

### 1. Crear Cuenta
- Ve a `/register`
- Ingresa nombre, email y contraseña
- Haz clic en "Crear Cuenta"

### 2. Agregar tu Primer Vehículo
- En el dashboard, ve a "Vehículos"
- Haz clic en "Agregar Vehículo"
- Ingresa:
  - Placa (ej: ABC123)
  - Tipo de vehículo
  - Marca, modelo (opcional)

### 3. Registrar tu Primer Viaje
- Ve a "Viajes"
- Haz clic en "Nuevo Viaje"
- Selecciona:
  - Vehículo
  - Tipo (Urbano/Nacional)
  - Ruta
  - Número de manifiesto
  - Fecha
  - Valor total
- El sistema calculará automáticamente las ganancias

---

## 📊 Ver Resultados

El dashboard muestra:
- ✅ Ingresos totales
- ✅ Ganancias netas
- ✅ Número de viajes
- ✅ Vehículos activos
- ✅ Lista de viajes recientes

---

## 🔧 Troubleshooting Rápido

**Error al conectar base de datos**:
\`\`\`bash
# Verifica que PostgreSQL esté corriendo
# O usa Neon/Supabase en la nube
\`\`\`

**Puerto 3000 ocupado**:
\`\`\`bash
# Cambia el puerto
PORT=3001 npm run dev
\`\`\`

**Error de dependencias**:
\`\`\`bash
# Reinstala
rm -rf node_modules package-lock.json
npm install
\`\`\`

---

## 📚 Próximos Pasos

1. ✅ Lee el [README.md](./README.md) completo
2. ✅ Revisa la [arquitectura](./ARCHITECTURE.md)
3. ✅ Prepara el [deployment](./DEPLOYMENT.md)
4. ✅ Personaliza las rutas en `src/lib/constants.ts`

---

**¿Necesitas ayuda?** Revisa la documentación completa en README.md
