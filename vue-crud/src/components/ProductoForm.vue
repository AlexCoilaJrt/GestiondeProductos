<template>
  <div class="background">
    <div class="form-container">
      <!-- Header Section -->
      <div class="header-section">
        <div class="icon-wrapper">
          <span class="form-icon">{{ isEdit ? '✏️' : '➕' }}</span>
        </div>
        <h2>{{ isEdit ? 'Editar Producto' : 'Crear Producto' }}</h2>
        <p class="subtitle">{{ isEdit ? 'Modifica la información del producto' : 'Agrega un nuevo producto al inventario' }}</p>
      </div>

      <!-- Form Section -->
      <form @submit.prevent="guardarProducto" class="modern-form">
        <div class="form-group">
          <label for="nombre" class="form-label">
            <span class="label-icon">📦</span>
            Nombre del Producto
          </label>
          <div class="input-wrapper">
            <input 
              id="nombre"
              v-model="producto.nombre" 
              type="text"
              class="form-input"
              placeholder="Ingresa el nombre del producto"
              required 
            />
            <div class="input-border"></div>
          </div>
        </div>

        <div class="form-group">
          <label for="precio" class="form-label">
            <span class="label-icon">💰</span>
            Precio (S/.)
          </label>
          <div class="input-wrapper">
            <div class="price-input-container">
              <span class="currency-symbol">S/</span>
              <input 
                id="precio"
                v-model.number="producto.precio" 
                type="number" 
                class="form-input price-input"
                placeholder="0.00"
                min="0" 
                step="0.01" 
                required 
              />
            </div>
            <div class="input-border"></div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="form-actions">
          <button type="button" @click="volver" class="btn-cancel">
            <span class="btn-icon">❌</span>
            Cancelar
          </button>
          <button type="submit" class="btn-submit">
            <span class="btn-icon">{{ isEdit ? '💾' : '✅' }}</span>
            {{ isEdit ? 'Actualizar' : 'Guardar' }}
          </button>
        </div>
      </form>

      <!-- Footer Info -->
      <div class="form-footer">
        <p>{{ isEdit ? 'Los cambios se guardarán inmediatamente' : 'El producto se agregará al inventario' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductoService from '@/services/ProductoService';

export default {
  name: 'ProductForm',
  data() {
    return {
      producto: {
        nombre: '',
        precio: 0
      },
      isEdit: false
    };
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.isEdit = true;
      ProductoService.listar().then(res => {
        const prod = res.data.find(p => p.id === parseInt(id));
        if (prod) this.producto = { ...prod };
      });
    }
  },
  methods: {
    guardarProducto() {
      if (this.isEdit) {
        ProductoService.actualizar(this.$route.params.id, this.producto)
          .then(() => this.volver())
          .catch(() => alert('Error al actualizar'));
      } else {
        ProductoService.crear(this.producto)
          .then(() => this.volver())
          .catch(() => alert('Error al crear'));
      }
    },
    volver() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
/* Fondo completo con imágenes */
.background {
  min-height: 100vh;
  width: 100vw;
  background-image: 
    url('/src/assets/aea1.png'),   /* imagen superior */
    url('/src/assets/aea.jpg');    /* imagen base */
  background-size: cover, cover;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  background-attachment: fixed, fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  overflow-x: hidden;
  position: relative;
}

/* Overlay sutil para mejorar legibilidad */
.background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
}

/* Contenedor principal del formulario */
.form-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
  transform: rotate(-3deg);
  transition: transform 0.3s ease;
}

.icon-wrapper:hover {
  transform: rotate(0deg) scale(1.05);
}

.form-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2e7d32, #4CAF50);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.subtitle {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
  font-weight: 400;
}

/* Form Styles */
.modern-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
}

.label-icon {
  font-size: 1.2rem;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 1.25rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 16px;
  font-size: 1.1rem;
  background: rgba(248, 249, 250, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #4CAF50;
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.2);
}

.form-input::placeholder {
  color: #999;
  font-weight: 400;
}

/* Price Input Specific */
.price-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-symbol {
  position: absolute;
  left: 1.5rem;
  font-weight: 600;
  color: #4CAF50;
  font-size: 1.1rem;
  z-index: 2;
}

.price-input {
  padding-left: 3rem;
}

/* Input Border Animation */
.input-border {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.form-input:focus + .input-border {
  transform: scaleX(1);
}

/* Action Buttons */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 3rem;
}

.btn-cancel,
.btn-submit {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.btn-cancel {
  background: rgba(108, 117, 125, 0.1);
  color: #6c757d;
  border: 2px solid rgba(108, 117, 125, 0.2);
}

.btn-cancel:hover {
  background: rgba(108, 117, 125, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.btn-submit {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.btn-submit:hover {
  background: linear-gradient(135deg, #45a049, #388e3c);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
}

.btn-icon {
  font-size: 1.1rem;
}

/* Form Footer */
.form-footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.form-footer p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
  .background {
    padding: 1rem;
  }
  
  .form-container {
    padding: 2rem;
    border-radius: 16px;
  }
  
  .icon-wrapper {
    width: 60px;
    height: 60px;
  }
  
  .form-icon {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .btn-cancel,
  .btn-submit {
    justify-content: center;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 1.5rem;
  }
  
  .form-input {
    padding: 1rem;
    font-size: 1rem;
  }
  
  .price-input {
    padding-left: 2.5rem;
  }
  
  .currency-symbol {
    left: 1rem;
  }
}

/* Animaciones adicionales */
.form-group {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.form-group:nth-child(1) {
  animation-delay: 0.1s;
}

.form-group:nth-child(2) {
  animation-delay: 0.2s;
}

.form-actions {
  animation: fadeInUp 0.6s ease-out;
  animation-delay: 0.3s;
  animation-fill-mode: both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>