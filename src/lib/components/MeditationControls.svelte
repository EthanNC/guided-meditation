<script lang="ts">
  import { getMeditationContext } from '$lib/stores/context';
  import {  Tooltip } from 'bits-ui';
  import Info from "phosphor-svelte/lib/Info";
  
  const meditation = getMeditationContext();
  let sidebarCollapsed = $state(false);

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
  }
</script>

<div class="sidebar-container" class:collapsed={sidebarCollapsed}>
  <!-- Collapse/Expand Button -->
  <button class="sidebar-toggle" onclick={toggleSidebar}>
    {sidebarCollapsed ? '→' : '←'}
  </button>

  <div class="sidebar-content">
    <!-- Header -->
    <header class="meditation-header">
      <h1>Guided Trataka Meditation</h1>
      <p>5 minutes fixed point gazing</p>
    </header>

    <!-- Session Controls -->
    <div class="controls-panel">
      {#if !meditation.active && meditation.elapsed === 0}
        <button class="start-btn" onclick={() => meditation.startSession()}>
          <span class="btn-icon">🧘‍♂️</span>
          <div class="btn-text">
            <span>Begin Meditation</span>
            <span class="duration">{formatTime(meditation.totalDuration)}</span>
          </div>
        </button>
      {:else if meditation.active}
        <div class="session-info">
          <h3 class="current-segment">{meditation.currentSegmentData?.name}</h3>
          
          
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: {meditation.segmentProgress}%"></div>
            </div>
            <div class="time-display">
              {formatTime(Math.floor(meditation.elapsed))} / {formatTime(meditation.totalDuration)}
            </div>
          </div>

          <div class="control-buttons">
            <button class="control-btn pause" onclick={() => meditation.pauseSession()}>⏸️ Pause</button>
            <button class="control-btn end" onclick={() => meditation.endSession()}>⏹️ End</button>
          </div>
        </div>
      {:else}
        <!-- Paused state -->
        <div class="session-info">
          <h3>Session Paused</h3>
          <p>{meditation.currentSegmentData?.name} - {formatTime(Math.floor(meditation.elapsed))}</p>
          <div class="control-buttons">
            <button class="control-btn resume" onclick={() => meditation.resumeSession()}>▶️ Resume</button>
            <button class="control-btn end" onclick={() => meditation.endSession()}>⏹️ End</button>
          </div>
        </div>
      {/if}
    </div>

    <!-- Segment Timeline -->
    <div class="timeline" class:visible={meditation.active || meditation.elapsed > 0}>
      <h4>Meditation Track</h4>
      {#each meditation.segments as segment, index}
        <div class="timeline-segment" 
             class:active={meditation.currentSegment === index}
             class:completed={meditation.currentSegment > index}
             onclick={() => meditation.jumpToSegment(index)}
             onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && meditation.jumpToSegment(index)}
             tabindex="0"
             role="button">
          <div class="segment-dot"></div>
          <span class="segment-name">{segment.name}</span>
          <Tooltip.Provider>
            <Tooltip.Root delayDuration={100}>
            <Tooltip.Trigger>
              <Info size={16} color="#ffd700"/>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="right" sideOffset={10} align="center">
                {segment.instruction}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
          </Tooltip.Provider>
          <span class="segment-duration">{formatTime(segment.duration)}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 350px;
    height: 100vh;
    border: 4px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 10;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .sidebar-container.collapsed {
    transform: translateX(-310px);
  }

  .sidebar-toggle {
    position: absolute;
    top: 50%;
    right: -40px;
    transform: translateY(-50%);
    width: 40px;
    height: 60px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-left: none;
    border-radius: 0 8px 8px 0;
    color: #ffd700;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar-toggle:hover {
    background: rgba(255, 215, 0, 0.1);
    color: #fff;
  }

  .sidebar-content {
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
  }

  .meditation-header {
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1.5rem;
  }

  .meditation-header h1 {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, #ffd700, #ffb347, #ff6b6b);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.02em;
  }

  .controls-panel {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
  }

  .start-btn {
    background: linear-gradient(135deg, #ffd700, #ffb347);
    color: #1a1a2e;
    border: none;
    padding: 1rem;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  .start-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
  }

  .btn-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }

  .btn-text span:first-child {
    font-size: 1rem;
  }

  .duration {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .session-info h3 {
    color: #ffd700;
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }

  :global([data-tooltip-content]) {
    margin: 0 0 1.5rem 0;
    line-height: 1.4;
    color: #e8e8e8;
    font-size: 0.9rem;
    background: black;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    max-width: 280px;
    word-wrap: break-word;
    white-space: normal;
    z-index: 1000;
  }

  .progress-container {
    margin: 1rem 0;
  }

  .progress-bar {
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #ffd700, #ffb347);
    transition: width 0.3s ease;
  }

  .time-display {
    font-size: 0.8rem;
    opacity: 0.8;
    color: #e8e8e8;
    text-align: center;
  }

  .control-buttons {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .control-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #e8e8e8;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
    font-size: 0.85rem;
  }

  .control-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .control-btn.resume {
    background: rgba(34, 197, 94, 0.2);
    border-color: rgba(34, 197, 94, 0.4);
  }

  .control-btn.end {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.4);
  }

  .timeline {
    opacity: 0;
    transition: opacity 0.5s ease;
    flex: 1;
  }

  .timeline.visible {
    opacity: 1;
  }

  .timeline h4 {
    color: #ffd700;
    margin: 0 0 1rem 0;
    font-size: 1rem;
    text-align: center;
  }

  .timeline-segment {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    opacity: 0.5;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    cursor: pointer;
  }

  .timeline-segment:hover {
    opacity: 0.8;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    padding: 0.5rem;
    margin: 0 -0.5rem;
  }

  .timeline-segment:last-child {
    border-bottom: none;
  }

  .timeline-segment.active {
    opacity: 1;
    background: rgba(255, 215, 0, 0.1);
    border-radius: 6px;
    padding: 0.5rem;
    margin: 0 -0.5rem;
  }

  .timeline-segment.completed {
    opacity: 0.8;
  }

  .segment-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .timeline-segment.active .segment-dot {
    background: #ffd700;
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
  }

  .timeline-segment.completed .segment-dot {
    background: #4ade80;
  }

  .segment-name {
    font-size: 0.85rem;
    color: #e8e8e8;
  }

  .segment-duration {
    font-size: 0.75rem;
    opacity: 0.6;
    color: #e8e8e8;
    margin-left: auto;
  }

  :global([data-tooltip-trigger]) {
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 4px;
    padding: 0.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  :global([data-tooltip-trigger]:hover) {
    background: rgba(255, 215, 0, 0.2);
    border-color: rgba(255, 215, 0, 0.5);
  }

  /* Mobile responsiveness */
  @media (max-width: 767px) {
    .sidebar-container {
      width: 300px;
    }

    .sidebar-container.collapsed {
      transform: translateX(-260px);
    }

    .sidebar-content {
      padding: 1.5rem 1rem;
      gap: 1.5rem;
    }

    .meditation-header h1 {
      font-size: 1.5rem;
    }

    .controls-panel {
      padding: 1rem;
    }
  }
</style> 