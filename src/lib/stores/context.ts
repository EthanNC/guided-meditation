import { getContext, setContext } from "svelte";
import { MeditationState } from "./meditation.svelte";

const MEDITATION_CONTEXT_KEY = Symbol("meditation");

export function createMeditationContext(): MeditationState {
  const meditationState = new MeditationState();
  setContext(MEDITATION_CONTEXT_KEY, meditationState);
  return meditationState;
}

export function getMeditationContext(): MeditationState {
  const context = getContext<MeditationState>(MEDITATION_CONTEXT_KEY);
  if (!context) {
    throw new Error(
      "getMeditationContext must be called within a component that has createMeditationContext in its ancestry"
    );
  }
  return context;
}
