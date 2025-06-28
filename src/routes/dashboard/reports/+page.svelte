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

<h1 class="text-2xl font-bold mb-4">Reportes de Ventas</h1>

<!-- 🔍 Filtros -->
<div class="grid md:grid-cols-3 gap-4 mb-6 bg-gray-100 p-4 rounded shadow">
  <div>
    <label for="productFilter" class="block text-sm text-gray-600 mb-1">Producto</label>
    <select id="productFilter" bind:value={selectedProductId} class="w-full p-2 border rounded">
      <option value="">Todos</option>
      {#each $products as p}
        <option value={p.id}>{p.name}</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="startDate" class="block text-sm text-gray-600 mb-1">Desde</label>
    <input id="startDate" bind:value={startDate} type="date" class="w-full p-2 border rounded" />
  </div>

  <div>
    <label for="endDate" class="block text-sm text-gray-600 mb-1">Hasta</label>
    <input id="endDate" bind:value={endDate} type="date" class="w-full p-2 border rounded" />
  </div>
</div>

<!-- 🧾 Tabla de resultados -->
{#if ventasFiltradas.length === 0}
  <p class="text-gray-600">No hay ventas para los filtros aplicados.</p>
{:else}
  <table class="min-w-full bg-white border rounded shadow">
    <thead>
      <tr class="bg-gray-700 text-white">
        <th class="p-2">Producto</th>
        <th class="p-2">Cantidad</th>
        <th class="p-2">Total</th>
        <th class="p-2">Fecha</th>
        <th class="p-2">Acción</th>
      </tr>
    </thead>
    <tbody>
      {#each ventasFiltradas as venta (venta.id)}
        <tr class="border-t border-gray-600">
          <td class="p-2">{venta.productName}</td>
          <td class="p-2">{venta.quantity}</td>
          <td class="p-2">${venta.total}</td>
          <td class="p-2">{new Date(venta.date).toLocaleString()}</td>
          <td class="p-2">
            <button
              on:click={() => eliminarVenta(venta.id)}
              class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}