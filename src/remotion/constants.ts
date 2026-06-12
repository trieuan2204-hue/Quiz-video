// ==========================================
// VIDEO SPECS FOR TIKTOK & INSTAGRAM (ALGORITHM-OPTIMIZED)
// ==========================================

export const VIDEO_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 60,
};

export const TIMINGS = {
  intro: 1.2,
  question: 2.0,
  countdown: 3.0,
  reveal: 1.5,
  transition: 0.2,
  outro: 1.0,
};

export const FPS = 60;

export const COLORS = {
  background: {
    primary: '#0a0014',
    secondary: '#2d0b6b',
    tertiary: '#0d1f6e',
  },
  accents: {
    correct: '#00ff88',
    incorrect: '#ff0055',
    highlight: '#ffed00',
    secondary: '#ff6b6b',
  },
  text: {
    primary: '#ffffff',
    secondary: '#ffed00',
  },
};

export const AUDIO = {
  bgm: {
    url: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    volume: 0.1,
  },
  sfx: {
    whoosh: 'https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-whoosh-1486.mp3',
    correct: 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-reward-952.mp3',
    countdown: 'https://assets.mixkit.co/sfx/preview/mixkit-countdown-timer-beep-989.mp3',
  },
};

export const SPRING_CONFIGS = {
  snappy: { damping: 18, mass: 0.5, stiffness: 120 },
  smooth: { damping: 12, mass: 0.5, stiffness: 80 },
  bouncy: { damping: 8, mass: 0.3, stiffness: 110 },
};

export const BRANDING = {
  watermark: '@quizmaster',
  hashtags: ['#quiz', '#trivia', '#foryou', '#fyp', '#viral'],
  callToAction: 'Comment your score! 💬',
};

export const calculateOptimalDuration = (questionCount: number): number => {
  let totalSeconds = TIMINGS.intro;
  totalSeconds += questionCount * (TIMINGS.question + TIMINGS.countdown + TIMINGS.reveal);
  totalSeconds += (questionCount - 1) * TIMINGS.transition;
  totalSeconds += TIMINGS.outro;
  return totalSeconds;
};

export const validateDuration = (questionCount: number): { isOptimal: boolean; duration: number; warning?: string } => {
  const duration = calculateOptimalDuration(questionCount);
  
  if (duration < 15) {
    return { isOptimal: false, duration, warning: 'Too short (<15s). Algorithm ignores very short videos.' };
  }
  if (duration > 60) {
    return { isOptimal: true, duration, warning: 'Over 60s but OK if retention stays high (>60%)' };
  }
  if (duration >= 21 && duration <= 34) {
    return { isOptimal: true, duration, warning: 'PERFECT: Sweet spot for viral completion rate!' };
  }
  if (duration >= 30 && duration <= 45) {
    return { isOptimal: true, duration, warning: 'Great range for algorithm' };
  }
  return { isOptimal: true, duration };
};
