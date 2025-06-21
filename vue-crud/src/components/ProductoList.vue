<template>
  <div class="background">
    <div class="panel-container">
      <!-- Header Section -->
      <div class="header-section">
        <div class="title-section">
          <div class="icon-wrapper">
            <span class="icon">🌿</span>
          </div>
          <h2>Panel de Productos</h2>
        </div>
        <div class="stats-section">
          <div class="stat-card">
            <span class="stat-number">{{ productos.length }}</span>
            <span class="stat-label">Productos</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ totalPaginas }}</span>
            <span class="stat-label">Páginas</span>
          </div>
        </div>
      </div>

      <!-- Actions Section -->
      <div class="actions-section">
        <div class="pagination-controls">
          <select v-model="productosPorPagina" @change="cambiarProductosPorPagina" class="items-per-page">
            <option value="5">5 por página</option>
            <option value="10">10 por página</option>
            <option value="15">15 por página</option>
            <option value="20">20 por página</option>
          </select>
        </div>
        <router-link to="/nuevo" class="btn-create">
          <span class="btn-icon">+</span>
          Crear nuevo producto
        </router-link>
      </div>

      <!-- Products Table -->
      <div class="table-container" v-if="productos.length">
        <div class="table-wrapper">
          <table class="modern-table">
            <thead>
              <tr>
                <th class="th-nombre">
                  <div class="th-content">
                    <span>📦</span>
                    Nombre del Producto
                  </div>
                </th>
                <th class="th-precio">
                  <div class="th-content">
                    <span>💰</span>
                    Precio
                  </div>
                </th>
                <th class="th-acciones">
                  <div class="th-content">
                    <span>⚙️</span>
                    Acciones
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prod in productosPaginados" :key="prod.id" class="product-row">
                <td class="td-nombre">
                  <div class="product-name">
                    {{ prod.nombre }}
                  </div>
                </td>
                <td class="td-precio">
                  <div class="price-container">
                    <span class="currency">S/</span>
                    <span class="amount">{{ prod.precio.toFixed(2) }}</span>
                  </div>
                </td>
                <td class="td-acciones">
                  <div class="action-buttons">
                    <router-link :to="`/editar/${prod.id}`" class="btn-edit">
                      <span class="btn-icon">✏️</span>
                      Editar
                    </router-link>
                    <button class="btn-delete" @click="confirmarEliminar(prod.id)">
                      <span class="btn-icon">🗑️</span>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Section -->
        <div class="pagination-section" v-if="totalPaginas > 1">
          <div class="pagination-info">
            Mostrando {{ inicioRango }} - {{ finRango }} de {{ productos.length }} productos
          </div>
          
          <div class="pagination-controls-main">
            <!-- Botón Primera Página -->
            <button 
              class="pagination-btn" 
              :class="{ disabled: paginaActual === 1 }"
              @click="irAPagina(1)"
              :disabled="paginaActual === 1"
              title="Primera página"
            >
              ⏮️
            </button>
            
            <!-- Botón Anterior -->
            <button 
              class="pagination-btn" 
              :class="{ disabled: paginaActual === 1 }"
              @click="paginaAnterior"
              :disabled="paginaActual === 1"
              title="Página anterior"
            >
              ◀️
            </button>

            <!-- Números de página -->
            <div class="page-numbers">
              <button
                v-for="pagina in paginasVisibles"
                :key="pagina"
                class="page-btn"
                :class="{ active: pagina === paginaActual, dots: pagina === '...' }"
                @click="irAPagina(pagina)"
                :disabled="pagina === '...'"
                :title="pagina === '...' ? '' : `Página ${pagina}`"
              >
                {{ pagina }}
              </button>
            </div>

            <!-- Botón Siguiente -->
            <button 
              class="pagination-btn" 
              :class="{ disabled: paginaActual === totalPaginas }"
              @click="paginaSiguiente"
              :disabled="paginaActual === totalPaginas"
              title="Página siguiente"
            >
              ▶️
            </button>
            
            <!-- Botón Última Página -->
            <button 
              class="pagination-btn" 
              :class="{ disabled: paginaActual === totalPaginas }"
              @click="irAPagina(totalPaginas)"
              :disabled="paginaActual === totalPaginas"
              title="Última página"
            >
              ⏭️
            </button>
          </div>
        </div>

        <!-- Auto Pagination Alert -->
        <div v-if="mostrarAlertaPaginacion" class="auto-pagination-alert">
          <div class="alert-content">
            <span class="alert-icon">ℹ️</span>
            <span class="alert-text">
              Se han mostrado {{ productosPorPagina }} productos. 
              <button @click="irAPaginaSiguienteAuto" class="alert-btn">
                Ver más productos →
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>No hay productos registrados</h3>
        <p>Comienza agregando tu primer producto para gestionar tu inventario</p>
        <router-link to="/nuevo" class="btn-empty-action">
          Crear primer producto
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ProductoService from '@/services/ProductoService';

export default {
  name: 'ProductPanel',
  data() {
    return {
      productos: [],
      paginaActual: 1,
      productosPorPagina: 5, // Cambiado por defecto a 5
      mostrarAlertaPaginacion: false
    };
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.productos.length / this.productosPorPagina);
    },
    productosPaginados() {
      const inicio = (this.paginaActual - 1) * this.productosPorPagina;
      const fin = inicio + this.productosPorPagina;
      return this.productos.slice(inicio, fin);
    },
    inicioRango() {
      return (this.paginaActual - 1) * this.productosPorPagina + 1;
    },
    finRango() {
      const fin = this.paginaActual * this.productosPorPagina;
      return fin > this.productos.length ? this.productos.length : fin;
    },
    paginasVisibles() {
      const paginas = [];
      const total = this.totalPaginas;
      const actual = this.paginaActual;
      
      if (total <= 7) {
        // Si hay 7 o menos páginas, mostrar todas
        for (let i = 1; i <= total; i++) {
          paginas.push(i);
        }
      } else {
        // Lógica para mostrar páginas con puntos suspensivos
        if (actual <= 4) {
          // Inicio: 1, 2, 3, 4, 5, ..., última
          for (let i = 1; i <= 5; i++) {
            paginas.push(i);
          }
          paginas.push('...');
          paginas.push(total);
        } else if (actual >= total - 3) {
          // Final: 1, ..., antepenúltima, penúltima, última
          paginas.push(1);
          paginas.push('...');
          for (let i = total - 4; i <= total; i++) {
            paginas.push(i);
          }
        } else {
          // Medio: 1, ..., actual-1, actual, actual+1, ..., última
          paginas.push(1);
          paginas.push('...');
          for (let i = actual - 1; i <= actual + 1; i++) {
            paginas.push(i);
          }
          paginas.push('...');
          paginas.push(total);
        }
      }
      
      return paginas;
    }
  },
  watch: {
    // Observar cambios en los productos para verificar paginación automática
    productos: {
      handler() {
        this.verificarPaginacionAutomatica();
      },
      deep: true
    },
    paginaActual() {
      this.verificarPaginacionAutomatica();
    }
  },
  methods: {
    obtenerProductos() {
      ProductoService.listar()
        .then(res => {
          this.productos = res.data;
          // Ajustar página actual si es necesario
          if (this.paginaActual > this.totalPaginas && this.totalPaginas > 0) {
            this.paginaActual = this.totalPaginas;
          }
        })
        .catch(() => {
          alert('Error al obtener productos');
        });
    },
    confirmarEliminar(id) {
      if (confirm('¿Eliminar este producto?')) {
        ProductoService.eliminar(id)
          .then(() => {
            this.obtenerProductos();
            // Verificar si necesitamos ajustar la página después de eliminar
            this.ajustarPaginaDespuesDeEliminar();
          })
          .catch(() => alert('No se pudo eliminar el producto'));
      }
    },
    irAPagina(pagina) {
      if (pagina !== '...' && pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
        this.ocultarAlertaPaginacion();
      }
    },
    paginaAnterior() {
      if (this.paginaActual > 1) {
        this.paginaActual--;
        this.ocultarAlertaPaginacion();
      }
    },
    paginaSiguiente() {
      if (this.paginaActual < this.totalPaginas) {
        this.paginaActual++;
        this.ocultarAlertaPaginacion();
      }
    },
    irAPaginaSiguienteAuto() {
      if (this.paginaActual < this.totalPaginas) {
        this.paginaSiguiente();
      }
      this.ocultarAlertaPaginacion();
    },
    cambiarProductosPorPagina() {
      this.paginaActual = 1; // Resetear a la primera página
      this.ocultarAlertaPaginacion();
    },
    verificarPaginacionAutomatica() {
      // Mostrar alerta si estamos mostrando exactamente el límite por página
      // y hay más productos disponibles
      const productosEnPaginaActual = this.productosPaginados.length;
      const hayMasPaginas = this.paginaActual < this.totalPaginas;
      
      if (productosEnPaginaActual === this.productosPorPagina && hayMasPaginas) {
        // Mostrar la alerta después de un pequeño delay para mejor UX
        setTimeout(() => {
          this.mostrarAlertaPaginacion = true;
        }, 1000);
      } else {
        this.mostrarAlertaPaginacion = false;
      }
    },
    ocultarAlertaPaginacion() {
      this.mostrarAlertaPaginacion = false;
    },
    ajustarPaginaDespuesDeEliminar() {
      // Si la página actual está vacía después de eliminar, ir a la página anterior
      if (this.productosPaginados.length === 0 && this.paginaActual > 1) {
        this.paginaActual--;
      }
    },
    // Método para auto-avanzar página cuando se alcanzan exactamente 5 productos
    autoAvanzarPagina() {
      if (this.productosPorPagina === 5 && 
          this.productosPaginados.length === 5 && 
          this.paginaActual < this.totalPaginas) {
        
        // Auto-avanzar después de 3 segundos si el usuario no interactúa
        setTimeout(() => {
          if (this.mostrarAlertaPaginacion) {
            this.irAPaginaSiguienteAuto();
          }
        }, 3000);
      }
    }
  },
  mounted() {
    this.obtenerProductos();
  }
};
</script>

<style scoped>
.background {
  min-height: 100vh;
  width: 100vw;
  background-image: 
    url('/src/assets/aea1.png'),   /* imagen superior */
    url('/src/assets/aea.jpg');   /* imagen base */
  background-size: cover, cover;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  background-attachment: fixed, fixed; /* Para que no se muevan al hacer scroll */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 150px;
  font-family: 'Segoe UI', sans-serif;
  overflow-x: hidden;
}

.panel-container {
  width: 100%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Header Section */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(76, 175, 80, 0.3);
}

.icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

h2 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2e7d32, #4CAF50);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.stats-section {
  display: flex;
  gap: 1rem;
}

.stat-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 1rem 1.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #2e7d32;
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
}

/* Actions Section */
.actions-section {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.items-per-page {
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.items-per-page:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.btn-create {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  border: none;
}

.btn-create:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
}

.btn-icon {
  font-size: 1.1rem;
}

/* Table Container */
.table-container {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.table-wrapper {
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table thead {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.modern-table th {
  padding: 1.5rem 1rem;
  text-align: left;
  border-bottom: 2px solid #e0e0e0;
}

.th-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.modern-table td {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}

.product-row {
  transition: all 0.2s ease;
}

.product-row:hover {
  background-color: #f8f9ff;
  transform: translateX(4px);
}

.product-name {
  font-weight: 500;
  color: #333;
  font-size: 1rem;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.currency {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.amount {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2e7d32;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn-edit, .btn-delete {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
}

.btn-edit:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
}

.btn-delete {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
}

.btn-delete:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

/* Auto Pagination Alert */
.auto-pagination-alert {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border: 1px solid #2196F3;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  animation: slideIn 0.3s ease-out;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
}

.alert-icon {
  font-size: 1.25rem;
}

.alert-text {
  color: #1565c0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alert-btn {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.alert-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(33, 150, 243, 0.3);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pagination Styles */
.pagination-section {
  padding: 1.5rem;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.pagination-info {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.pagination-controls-main {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.pagination-btn:hover:not(.disabled) {
  border-color: #4CAF50;
  background: #f1f8e9;
}

.pagination-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
  margin: 0 0.5rem;
}

.page-btn {
  min-width: 40px;
  height: 40px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0 0.5rem;
}

.page-btn:hover:not(.active):not(.dots) {
  border-color: #4CAF50;
  background: #f1f8e9;
}

.page-btn.active {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-color: #4CAF50;
  color: white;
  font-weight: 600;
}

.page-btn.dots {
  border: none;
  background: transparent;
  cursor: default;
  color: #999;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 16px;
  border: 2px dashed #e0e0e0;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
}

.empty-state p {
  margin: 0 0 2rem 0;
  color: #666;
  font-size: 1rem;
}

.btn-empty-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.btn-empty-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .background {
    padding: 1rem;
  }
  
  .panel-container {
    padding: 1.5rem;
    border-radius: 16px;
  }
  
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  .actions-section {
    justify-content: center;
    flex-direction: column;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn-edit, .btn-delete {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  
  .modern-table th,
  .modern-table td {
    padding: 1rem 0.5rem;
  }
  
  .pagination-section {
    flex-direction: column;
    text-align: center;
  }
  
  .page-numbers {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .alert-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .th-content {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
  
  .price-container {
    justify-content: center;
  }
  
  .pagination-btn,
  .page-btn {
    width: 35px;
    height: 35px;
    font-size: 0.8rem;
  }
}
</style>