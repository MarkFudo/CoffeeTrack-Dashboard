<script lang="ts">
  import { onMount } from 'svelte';
  import "../app.css";
</script>

<div class="flex h-screen">
  <!-- Sidebar -->
  <aside class="w-64 bg-gray-800 text-white hidden md:block">
    <div class="p-4 font-bold text-lg border-b border-gray-600">☕ CoffeeTrack</div>
    <nav class="mt-4 flex flex-col space-y-2 px-4">
      <a href="/dashboard" class="hover:bg-gray-700 p-2 rounded">Start</a>
      <a href="/dashboard/inventory" class="hover:bg-gray-700 p-2 rounded">Inventory</a>
      <a href="/dashboard/sales/register" class="hover:bg-gray-700 p-2 rounded">Sales</a>
      <a href="/dashboard/reports" class="hover:bg-gray-700 p-2 rounded">Reports</a>
    </nav>
  </aside>

  <!-- Main content area -->
  <div class="flex-1 flex flex-col">
    <!-- Navbar -->
    <header class="bg-white shadow px-4 py-2 flex justify-between items-center">
      <div class="text-xl font-semibold text-gray-800">Admin Dashboard</div>
      <div>
        <button
          class="text-sm text-gray-600 hover:underline"
          on:click={() => {
            localStorage.removeItem('session_token');
            location.href = '/login';
          }}
        >
          Log Out
        </button>
      </div>
    </header>

    <!-- Page content -->
    <main class="p-4 overflow-auto flex-1 bg-gray-100">
      <slot />
      
    </main>
    <footer class="text-gray-800 py-4 font-semibold bg-gray-100">
        <div class="container mx-auto flex flex-col md:flex-row items-center justify-center text-center text-sm">
          <div class="order-2 md:order-1 mt-2 md:mt-0">
            <p>&copy; Freivel Hirujo, 2025.</p>
          </div>
          <div class="order-1 md:order-2">
            <a
              href="https://markfudo.github.io/PortfolioFH/"
              target="_blank"
              rel="noopener noreferrer"
              class="px-2 hover:underline text-blue-400"
            >
              Portfolio
            </a>
          </div>
        </div>
      </footer>
  </div>
</div>