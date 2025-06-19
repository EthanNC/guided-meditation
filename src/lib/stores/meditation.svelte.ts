export class MeditationState {
  // Reactive state using Svelte 5 runes
  active = $state(false);
  elapsed = $state(0);
  currentSegment = $state(0);
  isLoaded = $state(false);

  private audio: HTMLAudioElement | null = null;
  private animationFrame: number | null = null;

  segments: { name: string; duration: number; instruction: string }[] = [
    {
      name: "Preparation",
      duration: 30,
      instruction: "Find a comfortable position and breathe naturally",
    },
    {
      name: "Center Focus",
      duration: 82,
      instruction:
        "Stare at the center red dot. Eventually move your attention to the yellow triangle surround the center red dot. Try not to blink.",
    },
    {
      name: "Attention Shift",
      duration: 10,
      instruction:
        "Move your attention to the green triangles surround the center red dot",
    },
    {
      name: "Inner Journey",
      duration: 8,
      instruction:
        "Move your attention to the black triangle surround the center red dot",
    },
    {
      name: "Bindu Meditation",
      duration: 12,
      instruction: "Rest your awareness at the central point (bindu)",
    },
    {
      name: "Unity",
      duration: 13,
      instruction: "Experience the oneness of form and consciousness",
    },
    {
      name: "Integration",
      duration: 7,
      instruction: "Slowly return your awareness to your surroundings",
    },
    {
      name: "Relaxation",
      duration: 10,
      instruction: "Relax and let the meditation wash over you",
    },
    { name: "After Image", duration: 120, instruction: "End of meditation" },
  ];

  constructor() {
    // Initialize audio only in browser environment
    if (typeof window !== "undefined") {
      this.initializeAudio();
    }

    // // Effect to automatically update current segment when elapsed changes
    $effect(() => {
      let totalTime = 0;
      for (let i = 0; i < this.segments.length; i++) {
        totalTime += this.segments[i].duration;
        if (this.elapsed < totalTime) {
          this.currentSegment = i;
          return;
        }
      }
      // If we've gone past all segments, end the session
      if (this.active) {
        this.endSession();
      }
    });
  }

  // Public methods for controlling the meditation session
  startSession() {
    if (!this.audio || !this.isLoaded) return;

    this.audio.currentTime = 0;
    this.audio.play();
    this.active = true;
    this.currentSegment = 0;
  }

  pauseSession() {
    if (!this.audio) return;

    this.audio.pause();
    this.active = false;
  }

  resumeSession() {
    if (!this.audio) return;

    this.audio.play();
    this.active = true;
  }

  endSession() {
    if (!this.audio) return;

    this.audio.pause();
    this.audio.currentTime = 0;
    this.active = false;
    this.elapsed = 0;
    this.currentSegment = 0;
  }

  // Method to jump to a specific segment (useful for testing or user control)
  jumpToSegment(segmentIndex: number) {
    if (!this.audio || segmentIndex < 0 || segmentIndex >= this.segments.length)
      return;

    let targetTime = 0;
    for (let i = 0; i < segmentIndex; i++) {
      targetTime += this.segments[i].duration;
    }

    this.audio.currentTime = targetTime;
    this.currentSegment = segmentIndex;
  }

  // Cleanup method
  destroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  // Getters for computed values
  get currentSegmentData() {
    return this.segments[this.currentSegment];
  }

  get totalDuration() {
    return this.segments.reduce(
      (total, segment) => total + segment.duration,
      0
    );
  }

  get progress() {
    return this.totalDuration > 0
      ? (this.elapsed / this.totalDuration) * 100
      : 0;
  }

  get segmentProgress() {
    const segment = this.currentSegmentData;
    if (!segment) return 0;

    let segmentStartTime = 0;
    for (let i = 0; i < this.currentSegment; i++) {
      segmentStartTime += this.segments[i].duration;
    }

    const segmentElapsed = this.elapsed - segmentStartTime;
    return Math.min((segmentElapsed / segment.duration) * 100, 100);
  }

  private initializeAudio() {
    this.audio = new Audio("/guide.m4a");

    // Set up audio event listeners
    this.audio.addEventListener("loadeddata", () => {
      this.isLoaded = true;
    });

    this.audio.addEventListener("timeupdate", () => {
      if (this.audio) {
        this.elapsed = this.audio.currentTime;
      }
    });

    this.audio.addEventListener("ended", () => {
      this.endSession();
    });

    this.audio.addEventListener("error", (e) => {
      console.error("Audio loading error:", e);
    });

    // Start loading the audio
    this.audio.load();
  }
}
