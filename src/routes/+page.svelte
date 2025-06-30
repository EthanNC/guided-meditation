<script lang="ts">
  import { onMount } from 'svelte';
  import YantraDisplay from '$lib/components/YantraDisplay.svelte';
  import MeditationControls from '$lib/components/MeditationControls.svelte';
  import { createMeditationContext } from '$lib/stores/context';
  
  // Create the meditation state context - this makes it available to all child components
  const meditation = createMeditationContext();

  onMount(() => {
    // Cleanup when component is destroyed
    return () => {
      meditation.destroy();
    };
  });
</script>

<svelte:head>
  <title>Guided Meditation - Trataka</title>
  <meta name="description" content="Interactive guided meditation with sacred geometry" />
</svelte:head>

{#if meditation.isLoaded}
  <YantraDisplay />
  <MeditationControls />
{:else}
  <div class="loading">
    <div class="loading-spinner"></div>
    <p>Loading meditation audio...</p>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #e8e8e8;
    overflow: hidden;
  }

  :global(html) {
    overflow: hidden;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 1rem;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-left: 4px solid #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading p {
    font-size: 1.1rem;
    opacity: 0.8;
  }
</style>
