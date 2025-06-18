<script lang="ts">
  import svgContent from '$lib/shriyantra.svg?raw';
  
  interface Props {
    currentSegment: number;
    sessionActive: boolean;
  }

  let { currentSegment, sessionActive }: Props = $props();
</script>

<div class="yantra-fullscreen segment-{currentSegment} {sessionActive ? 'active' : ''}">
  {@html svgContent}
</div>

<style>
  .yantra-fullscreen {
    position: fixed;
    top: 0;
    left: 350px;
    width: calc(100vw - 350px);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0.02) 50%, transparent 70%);
    transition: all 0.6s ease;
  }

  .yantra-fullscreen :global(svg) {
    width: min(90vw, 90vh);
    height: auto;
    max-width: none;
    max-height: 90vh;
    transition: all 0.6s ease;
    object-fit: contain;
  }

  
  .yantra-fullscreen.segment-0 :global(svg) { 
    opacity: 0.8; 
  }
  
  
  .yantra-fullscreen :global(#inner-blue),
  .yantra-fullscreen :global(#inner-red),
  .yantra-fullscreen :global(#inner-black),
  .yantra-fullscreen :global(#inner-green),
  .yantra-fullscreen :global(#outer-red),
  .yantra-fullscreen :global(#outer-yellow) {
    opacity: 0;
    transition: opacity 0.8s ease-in-out;
  }
  
  
  .yantra-fullscreen.segment-2 :global(#inner-green),
  .yantra-fullscreen.segment-3 :global(#inner-green),
  .yantra-fullscreen.segment-4 :global(#inner-green),
  .yantra-fullscreen.segment-5 :global(#inner-green),
  .yantra-fullscreen.segment-6 :global(#inner-green),
  .yantra-fullscreen.segment-7 :global(#inner-green),
  .yantra-fullscreen.segment-8 :global(#inner-green) {
    opacity: 1;
  }
  
  
  .yantra-fullscreen.segment-3 :global(#inner-black),
  .yantra-fullscreen.segment-4 :global(#inner-black),
  .yantra-fullscreen.segment-5 :global(#inner-black),
  .yantra-fullscreen.segment-6 :global(#inner-black),
  .yantra-fullscreen.segment-7 :global(#inner-black),
  .yantra-fullscreen.segment-8 :global(#inner-black) {
    opacity: 1;
  }
  
  
  .yantra-fullscreen.segment-4 :global(#inner-red),
  .yantra-fullscreen.segment-5 :global(#inner-red),
  .yantra-fullscreen.segment-6 :global(#inner-red),
  .yantra-fullscreen.segment-7 :global(#inner-red),
  .yantra-fullscreen.segment-8 :global(#inner-red) {
    opacity: 1;
  }
  
  .yantra-fullscreen.segment-5 :global(#inner-blue),
  .yantra-fullscreen.segment-6 :global(#inner-blue),
  .yantra-fullscreen.segment-7 :global(#inner-blue),
  .yantra-fullscreen.segment-8 :global(#inner-blue) {
    opacity: 1;
  }
  
  .yantra-fullscreen.segment-6 :global(#outer-red),
  .yantra-fullscreen.segment-7 :global(#outer-red),
  .yantra-fullscreen.segment-8 :global(#outer-red) { 
    opacity: 1; 
  }

  .yantra-fullscreen.segment-7 :global(#outer-yellow),
  .yantra-fullscreen.segment-8 :global(#outer-yellow) { 
    opacity: 1; 
  }

  .yantra-fullscreen.segment-8 :global(svg) { 
    opacity: 0.9; 
  }

  /* Mobile responsiveness */
  @media (max-width: 767px) {
    .yantra-fullscreen {
      left: 300px;
      width: calc(100vw - 300px);
    }

    .yantra-fullscreen :global(svg) {
      width: min(85vw, 85vh);
      max-height: 85vh;
    }
  }
</style> 