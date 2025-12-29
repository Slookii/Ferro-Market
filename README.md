# Ferro-Market - Tienda Online

Este proyecto es una aplicación web de comercio electrónico para "Ferro-Market", desarrollada con React, TypeScript y Tailwind CSS.

## Características

- Navegación por categorías (Blanquería, Regionales, Minimarket, Regalería, Perfumería).
- Carrito de compras funcional.
- Detalle de productos con control de stock.
- Checkout sin pagos online: genera un pedido formato texto para enviar por WhatsApp.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 16 o superior).

## Instalación

1. Clonar el repositorio o descargar el código.
2. Abrir una terminal en la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

## Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Construcción para Producción

Para generar los archivos estáticos optimizados para producción:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## Configuración y Personalización

### Nombre de la Tienda y Textos Generales
- Editar `src/pages/Home.tsx` para cambiar el título y subtítulo de la portada.
- Editar `src/components/Navbar.tsx` y `src/components/Footer.tsx` para headers y footers.

### Número de WhatsApp
- Editar `src/pages/CheckoutPage.tsx`. Buscar la constante `adminPhone` y cambiar el número (formato internacional sin `+`, ej: `549...`).

### Productos
- El catálogo de productos se encuentra en `src/data/products.ts`.
- Puede agregar, eliminar o modificar los objetos en el array `products`.
- Asegúrese de usar las categorías válidas definidas en `src/types/index.ts`.

### Categorías
- Si desea modificar las categorías, debe actualizar:
  1. `src/types/index.ts` (Type definition)
  2. `src/components/Navbar.tsx` (Links del menú)
  3. `src/pages/Home.tsx` (Tarjetas de la home)
