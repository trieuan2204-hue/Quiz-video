'use client';

import React, { useState } from 'react';
import { QuizData, Question } from '@/remotion/OptimizedQuizVideo';
import { calculateOptimalDuration, validateDuration } from '@/remotion/constants';
import { PresetTemplate } from '@/remotion/presets';
import VideoPreview from './VideoPreview';
import PresetsGallery from './PresetsGallery';

type ViewMode = 'builder' | 'preview' | 'templates';

export default function QuizBuilder() {
  const [viewMode, setViewMode] = useState<ViewMode>('templates');
  const [quizTitle, setQuizTitle] = useState('My Quiz');
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: 'An _____ a day keeps the doctor away',
      choices: { A: 'egg', B: 'orange', C: 'apple', D: 'avocado' },
      correct: 'C',
      explanation: 'Apples contain Vitamin C and dietary fiber which boost overall immune health!',
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>();

  const duration = calculateOptimalDuration(questions.length);
  const validation = validateDuration(questions.length);

  const quizData: QuizData = { quiz_title: quizTitle, questions };

  // Handle template selection
  const handleSelectTemplate = (template: PresetTemplate) => {
    setSelectedTemplateId(template.id);
    setQuizTitle(template.quizData.quiz_title);
    setQuestions(template.quizData.questions);
    setViewMode('builder');
  };

  // Add new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: 'New question?',
        choices: { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' },
        correct: 'A',
        explanation: 'Explanation here',
      },
    ]);
  };

  // Update question
  const updateQuestion = (index: number, field: string, value: string) => {
    const updated = [...questions];
    if (field.startsWith('choices.')) {
      const choiceKey = field.split('.')[1];
      updated[index].choices[choiceKey as keyof typeof updated[index]['choices']] = value;
    } else {
      updated[index][field as keyof Question] = value;
    }
    setQuestions(updated);
  };

  // Remove question
  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Generate video
  const handleGenerateVideo = async () => {
    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) throw new Error('Video generation failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate video');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-2 text-[#ffed00]">📱 TikTok Quiz Generator</h1>
          <p className="text-white/60 text-lg">Create viral quiz videos optimized for social media</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setViewMode('templates')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              viewMode === 'templates'
                ? 'bg-[#ffed00] text-black'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            📚 Templates
          </button>
          <button
            onClick={() => setViewMode('builder')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              viewMode === 'builder'
                ? 'bg-[#ffed00] text-black'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            ✏️ Edit Quiz
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              viewMode === 'preview'
                ? 'bg-[#ffed00] text-black'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            👁️ Preview
          </button>
        </div>

        {/* Templates View */}
        {viewMode === 'templates' && (
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
            <h2 className="text-3xl font-black text-white mb-6">Choose a Template</h2>
            <PresetsGallery onSelectTemplate={handleSelectTemplate} selectedId={selectedTemplateId} />
            
            <div className="mt-8 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
              <p className="text-blue-300 text-sm">
                💡 Select a template to get started quickly, or create your own quiz from scratch in the Edit Quiz tab.
              </p>
            </div>
          </div>
        )}

        {/* Builder View */}
        {viewMode === 'builder' && (
          <div className="space-y-8">
            {/* Algorithm Status */}
            <div
              className={`p-4 rounded-lg border-2 ${
                validation.isOptimal
                  ? 'bg-green-900/30 border-green-500/50'
                  : 'bg-yellow-900/30 border-yellow-500/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-black text-lg text-white">
                    {validation.isOptimal ? '✅ ALGORITHM OPTIMIZED' : '⚠️ Not Optimal'}
                  </p>
                  <p className="text-sm text-white/70 mt-1">{validation.duration.toFixed(1)}s duration</p>
                  <p className="text-sm text-white/70 mt-1">{validation.warning}</p>
                  <p className="text-xs text-white/50 mt-2">🎯 TikTok sweet spot: 21-34 seconds for max viral potential</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-[#ffed00]">{duration.toFixed(1)}s</div>
                  <div className="text-xs text-white/50 mt-1">{questions.length} questions</div>
                </div>
              </div>
            </div>

            {/* Quiz Title */}
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <label className="block text-sm font-black text-white/70 mb-2 uppercase tracking-wider">
                Quiz Title
              </label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-600 rounded-lg text-white font-bold focus:outline-none focus:border-[#ffed00]"
                placeholder="Enter quiz title..."
              />
            </div>

            {/* Questions Editor */}
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <h3 className="text-2xl font-black text-white mb-6">Questions</h3>
              <div className="space-y-6">
                {questions.map((q, idx) => (
                  <div key={idx} className="bg-slate-900 p-6 rounded-lg border-2 border-slate-700 hover:border-slate-600 transition">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-[#ffed00]">Question {idx + 1}</h4>
                      <button
                        onClick={() => removeQuestion(idx)}
                        className="px-3 py-1 bg-red-600/80 hover:bg-red-700 rounded text-sm font-bold text-white transition"
                      >
                        ✕ Delete
                      </button>
                    </div>

                    {/* Question Text */}
                    <div className="mb-4">
                      <label className="text-xs font-black text-white/60 uppercase tracking-wider block mb-2">
                        Question
                      </label>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => updateQuestion(idx, 'question', e.target.value)}
                        placeholder="Enter question..."
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-[#ffed00]"
                      />
                    </div>

                    {/* Answer Choices */}
                    <div className="mb-4">
                      <label className="text-xs font-black text-white/60 uppercase tracking-wider block mb-2">
                        Answer Choices
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.keys(q.choices).map((key) => (
                          <div key={key}>
                            <label className="text-xs font-bold text-white/50 block mb-1">{key}.</label>
                            <input
                              type="text"
                              value={q.choices[key as keyof typeof q.choices]}
                              onChange={(e) => updateQuestion(idx, `choices.${key}`, e.target.value)}
                              placeholder={`Option ${key}`}
                              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-[#ffed00]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Correct Answer */}
                    <div className="mb-4">
                      <label className="text-xs font-black text-white/60 uppercase tracking-wider block mb-2">
                        Correct Answer
                      </label>
                      <select
                        value={q.correct}
                        onChange={(e) => updateQuestion(idx, 'correct', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white font-bold focus:outline-none focus:border-[#ffed00]"
                      >
                        {['A', 'B', 'C', 'D'].map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Explanation */}
                    <div>
                      <label className="text-xs font-black text-white/60 uppercase tracking-wider block mb-2">
                        Explanation
                      </label>
                      <textarea
                        value={q.explanation}
                        onChange={(e) => updateQuestion(idx, 'explanation', e.target.value)}
                        placeholder="Explain why this is correct..."
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-[#ffed00]"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Question Button */}
              <button
                onClick={addQuestion}
                className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-black text-white transition"
              >
                + Add Question
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 sticky bottom-0 bg-slate-950 py-4 rounded-lg border border-slate-700 px-6">
              <button
                onClick={() => setViewMode('preview')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-white transition"
              >
                👁️ Preview
              </button>
              <button
                onClick={handleGenerateVideo}
                disabled={isGenerating || questions.length === 0}
                className="px-6 py-3 bg-[#ffed00] hover:bg-[#ffe700] disabled:opacity-50 rounded-lg font-black text-black transition"
              >
                {isGenerating ? '⏳ Generating...' : '🎬 Generate Video'}
              </button>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download="quiz-video.mp4"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-white transition"
                >
                  ⬇️ Download
                </a>
              )}
            </div>
          </div>
        )}

        {/* Preview View */}
        {viewMode === 'preview' && (
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-white">Video Preview</h2>
              <button
                onClick={() => setViewMode('builder')}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-bold"
              >
                ← Back to Edit
              </button>
            </div>

            <div className="flex justify-center">
              <VideoPreview quizData={quizData} autoPlay={true} />
            </div>

            <div className="mt-8 p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
              <p className="text-green-300 text-sm">
                ✅ The preview shows exactly how your video will appear on TikTok/Instagram. Press play to watch!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
