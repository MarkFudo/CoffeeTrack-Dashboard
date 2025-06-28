<script lang="ts">
  import { products } from '$lib/stores';
  import { goto } from '$app/navigation';
</script>

<h1 class="text-2xl font-bold mb-4">Inventory</h1>

<button
  on:click={() => goto('/dashboard/inventory/add')}
  class="bg-green-600 text-white px-4 py-2 rounded mb-4"
>
  ➕ Add Product
</button>

<table class="min-w-full bg-white border rounded shadow">
  <thead>
    <tr class="bg-gray-200 text-left">
      <th class="p-2">Name</th>
      <th class="p-2">Stock</th>
      <th class="p-2">Price</th>
      <th class="p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each $products as product (product.id)}
      <tr class="border-t">
        <td class="p-2">{product.name}</td>
        <td class="p-2">{product.stock}</td>
        <td class="p-2">${product.price}</td>
        <td class="p-2 space-x-2">
          <button
            on:click={() => goto(`/dashboard/inventory/edit/${product.id}`)}
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
          >
            Edit
          </button>

          <button
            on:click={() => products.update(p => p.filter(prod => prod.id !== product.id))}
            class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>