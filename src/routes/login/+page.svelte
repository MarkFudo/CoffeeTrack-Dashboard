<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let username = '';
  let password = '';
  let error = '';

  // Si ya está logueado, redirige
  onMount(() => {
    if (localStorage.getItem('session_token')) {
      goto('/dashboard');
    }
  });

  function handleLogin() {
    if (username === 'admin' && password === 'cafecito123') {
      localStorage.setItem('session_token', 'token-falso-123');
      goto('/dashboard');
    } else {
      error = 'Credenciales incorrectas';
    }
  }
</script>

<div class="h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

    {#if error}
      <p class="text-red-600 mb-4">{error}</p>
    {/if}

    <div class="mb-4">
        <label for="username" class="block text-gray-700 mb-1">User &#40;admin&#41;</label>
        <input id="username" bind:value={username} type="text" class="w-full p-2 border rounded" />
    </div>

    <div class="mb-6">
        <label for="password" class="block text-gray-700 mb-1">Password &#40;cafecito123&#41;</label>
        <input id="password" bind:value={password} type="password" class="w-full p-2 border rounded" />
    </div>


    <button
      on:click={handleLogin}
      class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
    >
      Login
    </button>
  </div>
</div>