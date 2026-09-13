/**
 * Voice Generation Utilities
 * Handles text-to-speech conversion and caching
 */

export interface VoiceConfig {
  voice?: string; // Voice ID/name
  speed?: number; // Speech speed (0.5-2.0)
  pitch?: number; // Pitch adjustment
}

interface CachedAudio {
  url: string;
  duration: number;
  cachedAt: number;
}

// In-memory cache for generated audio (persists during session)
const audioCache = new Map<string, CachedAudio>();

/**
 * Generate voice audio for text using your TTS API
 */
export const generateVoiceAudio = async (
  text: string,
  config: VoiceConfig = {}
): Promise<{ url: string; duration: number }> => {
  // Create cache key
  const cacheKey = `${text}:${JSON.stringify(config)}`;
  
  // Check cache first
  if (audioCache.has(cacheKey)) {
    const cached = audioCache.get(cacheKey)!;
    // Validate cache (15 min TTL)
    if (Date.now() - cached.cachedAt < 15 * 60 * 1000) {
      return { url: cached.url, duration: cached.duration };
    }
    audioCache.delete(cacheKey);
  }

  try {
    const response = await fetch('/api/generate-voice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        voice: config.voice || 'default',
        speed: config.speed || 1.0,
        pitch: config.pitch || 1.0,
      }),
    });

    if (!response.ok) {
      throw new Error(`Voice generation failed: ${response.statusText}`);
    }

    const data = await response.json();
    const { audioUrl, duration } = data;

    // Cache the result
    audioCache.set(cacheKey, {
      url: audioUrl,
      duration,
      cachedAt: Date.now(),
    });

    return { url: audioUrl, duration };
  } catch (error) {
    console.error('Voice generation error:', error);
    throw error;
  }
};

/**
 * Batch generate voices for multiple text segments
 */
export const generateBatchVoices = async (
  texts: string[],
  config: VoiceConfig = {}
): Promise<Array<{ text: string; url: string; duration: number }>> => {
  const results = await Promise.allSettled(
    texts.map((text) => generateVoiceAudio(text, config))
  );

  return results
    .map((result, idx) => ({
      text: texts[idx],
      ...(result.status === 'fulfilled'
        ? result.value
        : { url: '', duration: 0 }),
    }))
    .filter((item) => item.url);
};

/**
 * Clear audio cache
 */
export const clearVoiceCache = () => {
  audioCache.clear();
};
