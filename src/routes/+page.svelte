<script lang="ts">
  import { onMount } from 'svelte';
  import YantraDisplay from '$lib/components/YantraDisplay.svelte';
  import MeditationControls from '$lib/components/MeditationControls.svelte';
  
  let isLoaded = $state(false);
  let sessionActive = $state(false);
  let currentSegment = $state(0);
  let sessionTime = $state(0);
  let sessionTimer: number | null = null;

  // Meditation segments configuration
  const meditationSegments = [
    { name: "Preparation", duration: 3, instruction: "Find a comfortable position and breathe naturally" },
    { name: "Outer Focus", duration: 6, instruction: "Focus on the outer square and lotus petals of the Yantra" },
    { name: "Triangle Layers", duration: 9, instruction: "Move your attention through the interlocking triangles" },
    { name: "Inner Journey", duration: 10, instruction: "Draw your focus toward the center, layer by layer" },
    { name: "Bindu Meditation", duration: 10, instruction: "Rest your awareness at the central point (bindu)" },
    { name: "Unity", duration: 6, instruction: "Experience the oneness of form and consciousness" },
    { name: "Integration", duration: 3, instruction: "Slowly return your awareness to your surroundings" },
    { name: "Relaxation", duration: 3, instruction: "Relax and let the meditation wash over you" },
    { name: "End", duration: 3, instruction: "End of meditation" }
  ];

  $effect(() => {
    if (sessionActive && sessionTimer === null) {
      sessionTimer = setInterval(() => {
        sessionTime++;
        updateCurrentSegment();
      }, 1000);
    } else if (!sessionActive && sessionTimer) {
      clearInterval(sessionTimer);
      sessionTimer = null;
    }
  });

  function updateCurrentSegment() {
    let elapsed = 0;
    for (let i = 0; i < meditationSegments.length; i++) {
      elapsed += meditationSegments[i].duration;
      if (sessionTime < elapsed) {
        currentSegment = i;
        return;
      }
    }
    // Session complete
    endSession();
  }

  function startSession() {
    sessionActive = true;
    sessionTime = 0;
    currentSegment = 0;
  }

  function pauseSession() {
    sessionActive = false;
  }

  function resumeSession() {
    sessionActive = true;
  }

  function endSession() {
    sessionActive = false;
    sessionTime = 0;
    currentSegment = 0;
    if (sessionTimer) {
      clearInterval(sessionTimer);
      sessionTimer = null;
    }
  }

  onMount(() => {
    isLoaded = true;
    return () => {
      if (sessionTimer) {
        clearInterval(sessionTimer);
      }
    };
  });
</script>

<svelte:head>
  <title>Guided Meditation - Shri Yantra</title>
  <meta name="description" content="Interactive guided meditation with sacred geometry" />
</svelte:head>

{#if isLoaded}
  <YantraDisplay 
    {currentSegment} 
    {sessionActive} 
  />
  
  <MeditationControls 
    {sessionActive}
    {sessionTime}
    {currentSegment}
    {meditationSegments}
    onStartSession={startSession}
    onPauseSession={pauseSession}
    onResumeSession={resumeSession}
    onEndSession={endSession}
  />
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
</style>
