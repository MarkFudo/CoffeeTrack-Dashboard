<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    goto('/dashboard');
  });
</script>

<!-- Mientras redirige (opcional) -->
<div class="flex items-center justify-center h-screen">
  <p>Redirecting to the control panel...</p>
</div>