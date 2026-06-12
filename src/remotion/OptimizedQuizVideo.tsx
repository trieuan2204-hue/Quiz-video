'use client';

import React from 'react';
import { 
  AbsoluteFill, 
  Series, 
  Audio, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  spring,
  Composition 
} from 'remotion';
import { TIMINGS, COLORS, AUDIO, SPRING_CONFIGS } from './constants';

export interface Question {
  question: string;
  choices: { A: string; B: string; C: string; D: string };
  correct: string;
  explanation: string;
}

export interface QuizData {
  quiz_title: string;
  questions: Question[];
}

// Hook Intro
const HookIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({ frame, fps, config: SPRING_CONFIGS.bouncy });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill className="flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0014] via-[#2d0b6b] to-[#0d1f6e] overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ffed00]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div style={{ transform: `scale(${scale})`, opacity }} className="relative z-10 text-center">
        <div className="text-8xl mb-4 animate-bounce">🧠</div>
        <h1 className="text-6xl font-black text-[#ffed00] drop-shadow-lg leading-tight mb-4" style={{ textShadow: '0 0 20px rgba(255,237,0,0.5)' }}>
          QUIZ TIME
        </h1>
        <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#ff0055] to-[#ffed00] text-white rounded-full text-xl font-black animate-pulse">
          ⚡ Can YOU ace this?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Question Display
const QuestionDisplay: React.FC<{ 
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}> = ({ question, questionNumber, totalQuestions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startCountdown = TIMINGS.question * fps;
  const startReveal = (TIMINGS.question + TIMINGS.countdown) * fps;

  return (
    <AbsoluteFill className="bg-gradient-to-b from-[#0a0014] via-[#2d0b6b] to-[#0d1f6e] flex flex-col justify-between px-6 py-8 overflow-hidden">
      <div className="absolute top-4 right-6 bg-black/50 px-4 py-2 rounded-full backdrop-blur text-[#ffed00] font-black">
        {questionNumber}/{totalQuestions}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-5xl font-black text-white text-center leading-tight drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>
          {question.question}
        </h2>
      </div>

      <div className="h-40 w-40 mx-auto mb-6 relative flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-[#ffed00] rounded-full animate-pulse opacity-40" />
        <div className="text-6xl font-black text-[#ffed00]" style={{ textShadow: '0 0 20px rgba(255,237,0,0.8)' }}>
          {frame < startCountdown 
            ? '🔥' 
            : frame >= startReveal 
            ? '✓' 
            : Math.max(1, 5 - Math.floor((frame - startCountdown) / fps))
          }
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {Object.entries(question.choices).map(([key, value], idx) => {
          const itemStartFrame = idx * 4;
          const itemSpring = spring({ 
            frame: Math.max(0, frame - itemStartFrame), 
            fps, 
            config: SPRING_CONFIGS.snappy 
          });

          let bgColor = 'bg-white/10 border-white/20';
          let textColor = 'text-white';
          
          const hasRevealed = frame >= startReveal;
          const isCorrect = key === question.correct;

          if (hasRevealed) {
            bgColor = isCorrect 
              ? 'bg-[#00ff88] border-[#00ff88] scale-110' 
              : 'bg-black/40 border-transparent opacity-30';
            textColor = isCorrect ? 'text-black font-black' : 'text-white/50';
          }

          return (
            <div
              key={key}
              style={{ 
                transform: `scale(${itemSpring})`,
                transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)'
              }}
              className={`w-full flex items-center p-4 rounded-2xl border-2 text-2xl font-black backdrop-blur-md ${bgColor} ${textColor}`}
            >
              <div className={`w-12 h-12 rounded-lg mr-4 flex items-center justify-center text-lg font-black ${isCorrect && hasRevealed ? 'bg-white text-[#00ff88]' : 'bg-white/20'}`}>
                {isCorrect && hasRevealed ? '✓' : key}
              </div>
              <span className="truncate">{value}</span>
            </div>
          );
        })}
      </div>

      {frame >= startReveal && (
        <div className="w-full bg-[#ffed00]/10 border-2 border-[#ffed00] rounded-2xl p-4 backdrop-blur-md animate-in fade-in duration-300">
          <p className="text-[#ffed00] font-black text-sm uppercase tracking-wider mb-2">✓ Correct Answer</p>
          <p className="text-white text-lg font-bold leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Quick Transition
const QuickTransition: React.FC<{ nextNumber: number }> = ({ nextNumber }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: SPRING_CONFIGS.bouncy });

  return (
    <AbsoluteFill className="flex items-center justify-center bg-gradient-to-r from-[#ff0055] via-[#ffed00] to-[#00ff88]">
      <div style={{ transform: `scale(${scale})` }} className="text-center">
        <div className="text-7xl mb-3 animate-bounce">⚡</div>
        <h3 className="text-5xl font-black text-white drop-shadow-lg">Question {nextNumber}</h3>
      </div>
    </AbsoluteFill>
  );
};

// Outro with CTA
const OutroWithCTA: React.FC<{ totalQuestions: number }> = ({ totalQuestions }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0014] to-[#2d0b6b] overflow-hidden p-8 text-center" style={{ opacity: fadeIn }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl animate-bounce"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {['🎉', '⭐', '🔥', '💯'][i % 4]}
        </div>
      ))}

      <h1 className="text-5xl font-black text-[#ffed00] mb-4 relative z-10 drop-shadow-lg">
        What's Your Score?
      </h1>
      
      <p className="text-3xl font-black text-white mb-8 relative z-10">
        Comment below! 👇
      </p>

      <div className="bg-gradient-to-r from-[#ff0055] to-[#ffed00] px-8 py-4 rounded-full mb-6 relative z-10 shadow-lg">
        <p className="text-white font-black text-2xl">Follow @quizmaster</p>
        <p className="text-white/80 font-bold text-sm">Daily Quizzes 📱</p>
      </div>

      <div className="text-white/60 text-xl font-bold relative z-10 space-y-2">
        <p>#quiz #trivia #foryou #viral</p>
        <p className="text-[#ffed00]">✓ Tag your friends! 👯</p>
      </div>
    </AbsoluteFill>
  );
};

// Main Composition
export const OptimizedQuizVideo: React.FC<{ 
  quizData: QuizData;
  questionCount: number;
}> = ({ quizData, questionCount }) => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={Math.ceil(TIMINGS.intro * 60)}>
          <HookIntro />
        </Series.Sequence>

        {quizData.questions.map((q, idx) => {
          const isLast = idx === questionCount - 1;
          const seqDuration = Math.ceil((TIMINGS.question + TIMINGS.countdown + TIMINGS.reveal) * 60);

          return (
            <React.Fragment key={idx}>
              <Series.Sequence durationInFrames={seqDuration}>
                <QuestionDisplay 
                  question={q}
                  questionNumber={idx + 1}
                  totalQuestions={questionCount}
                />
              </Series.Sequence>

              {!isLast && (
                <Series.Sequence durationInFrames={Math.ceil(TIMINGS.transition * 60)}>
                  <QuickTransition nextNumber={idx + 2} />
                </Series.Sequence>
              )}
            </React.Fragment>
          );
        })}

        <Series.Sequence durationInFrames={Math.ceil(TIMINGS.outro * 60)}>
          <OutroWithCTA totalQuestions={questionCount} />
        </Series.Sequence>
      </Series>

      <Audio 
        src={AUDIO.bgm.url}
        volume={AUDIO.bgm.volume}
        loop
      />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC<{ quizData: QuizData }> = ({ quizData }) => {
  const fps = 60;
  
  let totalSeconds = TIMINGS.intro;
  quizData.questions.forEach((_, idx) => {
    totalSeconds += TIMINGS.question + TIMINGS.countdown + TIMINGS.reveal;
    if (idx < quizData.questions.length - 1) totalSeconds += TIMINGS.transition;
  });
  totalSeconds += TIMINGS.outro;

  const totalFrames = Math.ceil(totalSeconds * fps);

  return (
    <Composition
      id="QuizVideoOptimized"
      component={OptimizedQuizVideo}
      durationInFrames={totalFrames}
      fps={fps}
      width={1080}
      height={1920}
      defaultProps={{
        quizData,
        questionCount: quizData.questions.length,
      }}
    />
  );
};
