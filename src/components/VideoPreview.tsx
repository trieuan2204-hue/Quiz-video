'use client';

import React, { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { RemotionRoot, QuizData } from '@/remotion/OptimizedQuizVideo';
import { TIMINGS } from '@/remotion/constants';

interface VideoPreviewProps {
  quizData: QuizData;
  autoPlay?: boolean;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ quizData, autoPlay = true }) => {
  const [totalFrames, setTotalFrames] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let totalSeconds = TIMINGS.intro;
    quizData.questions.forEach((_, idx) => {
      totalSeconds += TIMINGS.question + TIMINGS.countdown + TIMINGS.reveal;
      if (idx < quizData.questions.length - 1) totalSeconds += TIMINGS.transition;
    });
    totalSeconds += TIMINGS.outro;
    setTotalFrames(Math.ceil(totalSeconds * 60));
    setIsLoading(false);
  }, [quizData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-96 bg-slate-800 rounded-lg">
        <p className="text-white font-bold">Loading preview...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-black border-4 border-[#ffed00]">
        <Player
          component={RemotionRoot}
          durationInFrames={totalFrames}
          fps={60}
          compositionWidth={1080}
          compositionHeight={1920}
          style={{ width: '100%', maxWidth: '400px' }}
          defaultProps={{ quizData }}
          autoPlay={autoPlay}
          loop
          controls
        />
      </div>

      <div className="bg-slate-800 p-4 rounded-lg text-white">
        <p className="font-black text-lg text-[#ffed00] mb-2">Video Stats</p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-white/60">Duration</p>
            <p className="font-bold text-lg">{(totalFrames / 60).toFixed(1)}s</p>
          </div>
          <div>
            <p className="text-white/60">Questions</p>
            <p className="font-bold text-lg">{quizData.questions.length}</p>
          </div>
          <div>
            <p className="text-white/60">FPS</p>
            <p className="font-bold text-lg">60</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
