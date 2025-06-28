<script lang="ts">
  import { products, sales } from '$lib/stores';
  import type { Product } from '$lib/types';
  import { goto } from '$app/navigation';

  let selectedProductId = '';
  let quantity = 1;
  let error = '';

  $: availableProducts = $products.filter(p => p.stock > 0);
  $: selectedProduct = $products.find(p => p.id === Number(selectedProductId));
  $: total = selectedProduct ? selectedProduct.price * quantity : 0;

  function registrarVenta() {
    if (!selectedProduct || quantity <= 0 || quantity > selectedProduct.stock) {
      error = 'Invalid quantity or product not available';
      return;
    }

    const nuevaVenta = {
      id: Date.now(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity,
      total,
      date: new Date().toISOString()
    };

    // Guardar la venta
    sales.update(s => [...s, nuevaVenta]);

    // Actualizar el stock del producto
    products.update(p =>
      p.map(prod =>
        prod.id === selectedProduct.id
          ? { ...prod, stock: prod.stock - quantity }
          : prod
      )
    );

    goto('/dashboard');
  }
</script>

<h1 class="text-2xl font-bold mb-4">Register Sale</h1>

{#if error}
  <p class="text-red-600 mb-4">{error}</p>
{/if}

<div class="space-y-4">
  <div>
    <label for="producto" class="block text-gray-700">Product</label>
    <select id="producto" bind:value={selectedProductId} class="w-full border p-2 rounded">
      <option value="">-- Select a Product --</option>
      {#each availableProducts as prod}
        <option value={prod.id}>{prod.name} - ${prod.price} ({prod.stock} available)</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="cantidad" class="block text-gray-700">Quantity</label>
    <input id="cantidad" bind:value={quantity} type="number" min="1" class="w-full border p-2 rounded" />
  </div>

  <div class="font-semibold text-lg">
    Total: ${total}
  </div>

  <button on:click={registrarVenta} class="bg-blue-600 text-white px-4 py-2 rounded">
    Register
  </button>
</div>