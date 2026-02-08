# 🚀 Guía de Deployment - Sistema de Gestión de Transporte

## Deployment en Vercel (Recomendado)

### Opción 1: Deploy desde GitHub (Más Fácil)

#### Paso 1: Preparar el Repositorio

1. Sube tu código a GitHub:
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/transport-management.git
git push -u origin main
\`\`\`

#### Paso 2: Configurar PostgreSQL en la Nube

**Opción A: Neon (Gratis para empezar)**
1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Copia la `DATABASE_URL`

**Opción B: Supabase (Gratis para empezar)**
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Ve a Settings > Database
5. Copia la `Connection String` en modo "Session"

#### Paso 3: Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Add New" > "Project"
3. Importa tu repositorio de GitHub
4. Configura las variables de entorno:
   - `DATABASE_URL`: Tu URL de PostgreSQL
   - `BETTER_AUTH_SECRET`: Un string aleatorio seguro
   - `BETTER_AUTH_URL`: https://tu-proyecto.vercel.app
   - `NEXT_PUBLIC_APP_URL`: https://tu-proyecto.vercel.app

5. Haz clic en "Deploy"
6. ¡Espera 2-3 minutos y tu app estará lista!

#### Paso 4: Migrar la Base de Datos

Después del primer deploy:

\`\`\`bash
# Instala Vercel CLI
npm i -g vercel

# Login
vercel login

# Ejecuta migraciones en producción
vercel env pull .env.production
npx prisma db push --schema=./prisma/schema.prisma
\`\`\`

---

### Opción 2: Deploy con Vercel CLI

\`\`\`bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Login en Vercel
vercel login

# Deploy a preview
vercel

# Deploy a producción
vercel --prod
\`\`\`

---

## Variables de Entorno en Producción

### Generar BETTER_AUTH_SECRET Seguro

\`\`\`bash
# En Mac/Linux
openssl rand -base64 32

# En Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
\`\`\`

### Configurar en Vercel Dashboard

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega cada variable:

\`\`\`
DATABASE_URL=postgresql://usuario:contraseña@host.com:5432/basedatos
BETTER_AUTH_SECRET=tu-secret-muy-seguro
BETTER_AUTH_URL=https://tu-proyecto.vercel.app
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
\`\`\`

---

## Configuración de Base de Datos

### Neon (Recomendado)

1. **Crear Proyecto**:
   - Ve a [console.neon.tech](https://console.neon.tech)
   - Click "Create Project"
   - Nombre: "transport-db"
   - Región: Selecciona la más cercana

2. **Obtener Connection String**:
   - Dashboard > Connection Details
   - Copia la URL completa que empieza con `postgresql://`

3. **Configurar en Vercel**:
   - Pega la URL en `DATABASE_URL`

### Supabase

1. **Crear Proyecto**:
   - Ve a [app.supabase.com](https://app.supabase.com)
   - New Project
   - Nombre: "transport-db"
   - Contraseña fuerte

2. **Obtener Connection String**:
   - Settings > Database
   - Connection String > Session mode
   - Reemplaza `[YOUR-PASSWORD]` con tu contraseña

3. **Configurar en Vercel**:
   - Pega la URL en `DATABASE_URL`

---

## Post-Deployment

### 1. Verificar Deployment

Visita tu URL de Vercel y verifica:
- ✅ La página de login carga correctamente
- ✅ Puedes crear una cuenta
- ✅ Puedes iniciar sesión
- ✅ El dashboard funciona

### 2. Migrar Base de Datos (Importante)

\`\`\`bash
# Opción A: Desde local con variables de producción
vercel env pull .env.production
npx prisma db push

# Opción B: Ejecutar comando en Vercel
vercel exec -- npx prisma db push
\`\`\`

### 3. Configurar Dominio Personalizado (Opcional)

1. Ve a tu proyecto en Vercel
2. Settings > Domains
3. Agrega tu dominio personalizado
4. Configura DNS según las instrucciones

---

## Troubleshooting

### Error: "Cannot connect to database"

**Solución**:
1. Verifica que `DATABASE_URL` esté correcta
2. Asegúrate de que la BD acepte conexiones externas
3. En Neon/Supabase, verifica que el proyecto esté activo

### Error: "Session not found"

**Solución**:
1. Verifica que `BETTER_AUTH_SECRET` esté configurado
2. Asegúrate de que `BETTER_AUTH_URL` sea la URL correcta de producción
3. Limpia cookies y vuelve a intentar

### Error: "Module not found"

**Solución**:
1. Verifica que `package.json` tenga todas las dependencias
2. En Vercel, ve a Deployments > Redeploy

### Base de datos vacía después de deploy

**Solución**:
\`\`\`bash
# Ejecutar migraciones
npx prisma db push --force
\`\`\`

---

## Monitoreo y Logs

### Ver Logs en Vercel

1. Ve a tu proyecto
2. Deployments > [Tu deployment]
3. Runtime Logs

### Monitorear Base de Datos

**Neon**:
- Dashboard > Monitoring
- Ver queries, conexiones, uso

**Supabase**:
- Dashboard > Database > Logs

---

## Backup y Seguridad

### Backup Automático

Neon y Supabase hacen backups automáticos diarios.

### Backup Manual

\`\`\`bash
# Export de la base de datos
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
\`\`\`

### Configurar HTTPS

Vercel configura HTTPS automáticamente. No requiere acción adicional.

---

## Actualizaciones

### Actualizar Código

\`\`\`bash
# Hacer cambios
git add .
git commit -m "Update: descripción"
git push

# Vercel auto-despliega desde GitHub
\`\`\`

### Actualizar Base de Datos

\`\`\`bash
# Modificar prisma/schema.prisma
# Luego ejecutar:
npx prisma db push
\`\`\`

---

## Performance

### Optimizaciones Recomendadas

1. **Database Connection Pooling**:
   - Ya configurado en Prisma
   - Neon/Supabase lo manejan automáticamente

2. **CDN de Vercel**:
   - Automático para assets estáticos

3. **Server-Side Rendering**:
   - Ya implementado con Next.js App Router

---

## Costos Estimados

### Vercel
- **Hobby (Gratis)**:
  - 100GB bandwidth/mes
  - Suficiente para empezar

- **Pro ($20/mes)**:
  - 1TB bandwidth
  - Para producción

### Base de Datos

**Neon**:
- Free Tier: 0.5GB storage, 3 proyectos
- Pro: $19/mes (3GB)

**Supabase**:
- Free Tier: 500MB, 2 proyectos
- Pro: $25/mes (8GB)

---

## Checklist Final de Deployment

- [ ] Código subido a GitHub
- [ ] Base de datos PostgreSQL creada (Neon/Supabase)
- [ ] Variables de entorno configuradas en Vercel
- [ ] Proyecto desplegado en Vercel
- [ ] Migraciones de base de datos ejecutadas
- [ ] Primera cuenta de usuario creada
- [ ] Funcionalidad básica verificada
- [ ] Dominio personalizado configurado (opcional)

---

## Soporte

Para problemas específicos:
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Neon**: [neon.tech/docs](https://neon.tech/docs)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)

---

**¡Tu aplicación está lista para producción!** 🎉
