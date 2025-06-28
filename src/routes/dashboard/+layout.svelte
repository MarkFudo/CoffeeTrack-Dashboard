<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    const token = localStorage.getItem('session_token');
    if (!token) {
      goto('/login');
    }
  });
</script>

<slot />