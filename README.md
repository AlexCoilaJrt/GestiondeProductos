# 📦 Sistema de Gestión de Productos

Un sistema completo para la gestión eficiente de inventario y productos, desarrollado para optimizar el control de stock y facilitar las operaciones comerciales.

## 🚀 Características Principales

- **Gestión de Inventario**: Control completo del stock de productos
- **Administración de Productos**: Agregar, editar, eliminar y consultar productos
- **Control de Stock**: Alertas de stock bajo y gestión de existencias
- **Interfaz Intuitiva**: Diseño amigable y fácil de usar

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Vue
- **Backend**: SpringBoot
- **Base de Datos**: MySql
- **Estilo**: CSS

## 📋 Prerequisitos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- Mysql
- Navegador web moderno

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/AlexCoilaJrt/GestiondeProductos.git
   cd GestiondeProductos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar base de datos**
   - Crear la base de datos
   - Ejecutar scripts de migración (si aplica)
   - Configurar credenciales en archivo de configuración

4. **Ejecutar la aplicación**
   ```bash
   npm run serve
   ```

5. **Acceder a la aplicación**
   - Abrir navegador en `http://localhost:5173` (o puerto configurado)

## 📱 Uso del Sistema

### Gestión de Productos

1. **Agregar Producto**
   - Ir a la sección "Productos"
   - Hacer clic en "Nuevo Producto"
   - Completar los campos requeridos
   - Guardar

2. **Actualizar Stock**
   - Seleccionar producto
   - Modificar cantidad en stock
   - Confirmar cambios



## 🏗️ Estructura del Proyecto

```
GestiondeProductos/
├── src/
│   ├── components/
│   │   ├── productos/
│   ├── controllers/
│   ├── productocontroller/

```
## 📊 Funcionalidades Detalladas

### Gestión de Productos
- **CRUD completo**: Crear, leer, actualizar, eliminar
- **Información detallada**: Nombre, descripción, precio, stock, categoría
- **Imágenes**: Subida y gestión de imágenes de productos
- **Códigos de barras**: Generación automática de códigos

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

---

⭐ **¡No olvides dar una estrella al proyecto si te ha sido útil!**

---

*Desarrollado con ❤️ por Alex Coila*
