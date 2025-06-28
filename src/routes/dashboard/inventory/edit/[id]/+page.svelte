<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { products } from '$lib/stores';
  import type { Product } from '$lib/types';

  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let id = 0;
  let product: Product | undefined;

  let name = '';
  let stock = 0;
  let price = 0;

  onMount(() => {
    const params = get(page).params;
    id = Number(params.id);
    product = get(products).find(p => p.id === id);

    if (product) {
      name = product.name;
      stock = product.stock;
      price = product.price;
    } else {
      goto('/dashboard/inventory'); // Si no existe, redirige
    }
  });

  function guardarCambios() {
    products.update(p =>
      p.map(prod =>
        prod.id === id
          ? { ...prod, name, stock, price }
          : prod
      )
    );

    goto('/dashboard/inventory');
  }
</script>

<h1 class="text-2xl font-bold mb-4">Editar producto</h1>

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

  <div class="flex space-x-2">
    <button
      on:click={guardarCambios}
      class="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Guardar cambios
    </button>

    <button
      on:click={() => goto('/dashboard/inventory')}
      class="bg-gray-600 text-white px-4 py-2 rounded"
    >
      Cancelar
    </button>
  </div>
</div>