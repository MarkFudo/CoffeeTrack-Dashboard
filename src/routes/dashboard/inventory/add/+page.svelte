<script lang="ts">
  import { products } from '$lib/stores';
  import { goto } from '$app/navigation';
  import type { Product } from '$lib/types';

  let name = '';
  let stock = 0;
  let price = 0;

  function agregarProducto() {
    const nuevoProducto: Product = {
      id: Date.now(),
      name,
      stock,
      price
    };

    products.update(p => [...p, nuevoProducto]);
    goto('/dashboard/inventory');
  }
</script>

<h1 class="text-2xl font-bold mb-4">Añadir nuevo producto</h1>

<div class="space-y-4">
  <div>
    <label for="nombre" class="block text-gray-700">Nombre del producto</label>
    <input id="nombre" bind:value={name} type="text" class="w-full border p-2 rounded" />
  </div>

  <div>
    <label for="stock" class="block text-gray-700">Cantidad en stock</label>
    <input id="stock" bind:value={stock} type="number" min="0" class="w-full border p-2 rounded" />
  </div>

  <div>
    <label for="precio" class="block text-gray-700">Precio</label>
    <input id="precio" bind:value={price} type="number" min="0" class="w-full border p-2 rounded" />
  </div>

  <button
    on:click={agregarProducto}
    class="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Guardar producto
  </button>
</div>