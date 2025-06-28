<script lang="ts">
  import { sales, products } from '$lib/stores';
  import type { Sale } from '$lib/types';

  let selectedProductId = '';
  let startDate = '';
  let endDate = '';

  // Convertir a milisegundos si hay fechas
  $: start = startDate ? new Date(startDate).getTime() : null;
  $: end = endDate ? new Date(endDate).getTime() : null;

  // Aplicar filtros
  $: ventasFiltradas = $sales.filter(v => {
    const fechaVenta = new Date(v.date).getTime();

    return (
      (selectedProductId === '' || v.productId === Number(selectedProductId)) &&
      (!start || fechaVenta >= start) &&
      (!end || fechaVenta <= end)
    );
  });

  function eliminarVenta(id: number) {
    sales.update(s => s.filter(venta => venta.id !== id));
  }
</script>

<h1 class="text-2xl font-bold mb-4">Sales Report</h1>

<!-- 🔍 Filtros -->
<div class="grid md:grid-cols-3 gap-4 mb-6 bg-gray-100 p-4 rounded shadow">
  <div>
    <label for="productFilter" class="block text-sm text-gray-600 mb-1">Product</label>
    <select id="productFilter" bind:value={selectedProductId} class="w-full p-2 border rounded">
      <option value="">All</option>
      {#each $products as p}
        <option value={p.id}>{p.name}</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="startDate" class="block text-sm text-gray-600 mb-1">From</label>
    <input id="startDate" bind:value={startDate} type="date" class="w-full p-2 border rounded" />
  </div>

  <div>
    <label for="endDate" class="block text-sm text-gray-600 mb-1">Until</label>
    <input id="endDate" bind:value={endDate} type="date" class="w-full p-2 border rounded" />
  </div>
</div>

<!-- 🧾 Tabla de resultados -->
{#if ventasFiltradas.length === 0}
  <p class="text-gray-600">There are no sales for the applied filters.</p>
{:else}
  <table class="min-w-full bg-white border rounded shadow">
    <thead>
      <tr class="bg-gray-700 text-white text-left">
        <th class="p-2 w-1/5">Product</th>
        <th class="p-2 w-1/6">Quantity</th>
        <th class="p-2 w-1/6">Total</th>
        <th class="p-2 w-1/3">Date</th>
        <th class="p-2 w-1/6">Action</th>
      </tr>
    </thead>
    <tbody>
      {#each ventasFiltradas as venta (venta.id)}
        <tr class="border-t border-gray-600 align-middle">
          <td class="p-2 align-middle">{venta.productName}</td>
          <td class="p-2 align-middle">{venta.quantity}</td>
          <td class="p-2 align-middle">${venta.total}</td>
          <td class="p-2 align-middle">{new Date(venta.date).toLocaleString()}</td>
          <td class="p-2 align-middle">
            <button
              on:click={() => eliminarVenta(venta.id)}
              class="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}