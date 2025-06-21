<template>
  <div id="app">
    <h1 class="titulo-app">Gestión de Productos</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Importa la fuente Poppins desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap');

/* Reset completo para pantalla completa */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
  /* Eliminar restricciones que impiden pantalla completa */
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100vw;
  
  /* Posicionamiento relativo para el título flotante */
  position: relative;
}

.titulo-app {
  /* Posición fija para que flote sobre el contenido */
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  
  /* Estilos del título */
  font-family: 'Poppins', sans-serif;
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0;
  padding: 1rem 2rem;
  
  /* Colores y efectos */
  color: white;
  background: rgba(27, 94, 32, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  
  /* Sombras y efectos */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
  
  /* Animación suave */
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.titulo-app:hover {
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.2);
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .titulo-app {
    font-size: 1.8rem;
    padding: 0.8rem 1.5rem;
    top: 15px;
  }
}

@media (max-width: 480px) {
  .titulo-app {
    font-size: 1.5rem;
    padding: 0.6rem 1rem;
    top: 10px;
  }
}
</style>