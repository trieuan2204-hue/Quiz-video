'use client';

import React, { useState } from 'react';
import { PRESET_TEMPLATES, PresetTemplate, getPresetsByCategory, searchPresets } from '@/remotion/presets';

interface PresetsGalleryProps {
  onSelectTemplate: (template: PresetTemplate) => void;
  selectedId?: string;
}

export const PresetsGallery: React.FC<PresetsGalleryProps> = ({ onSelectTemplate, selectedId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  let filteredTemplates = PRESET_TEMPLATES;

  if (searchQuery.trim()) {
    filteredTemplates = searchPresets(searchQuery);
  } else if (selectedCategory !== 'all') {
    filteredTemplates = getPresetsByCategory(selectedCategory as any);
  }

  const categories = ['all', ...new Set(PRESET_TEMPLATES.map((t) => t.category))];

  return (
    <div className="w-full">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setSelectedCategory('all');
          }}
          className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#ffed00]"
        />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSearchQuery('');
            }}
            className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition ${
              selectedCategory === category
                ? 'bg-[#ffed00] text-black'
                : 'bg-slate-700 text-white hover:bg-slate-600'
            }`}
          >
            {category === 'all' ? '🎯 All' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No templates found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className={`p-4 rounded-lg text-left transition-all hover:scale-105 ${
                selectedId === template.id
                  ? 'bg-[#ffed00] text-black shadow-lg shadow-[#ffed00]/50'
                  : 'bg-slate-800 text-white hover:bg-slate-700 border-2 border-slate-700 hover:border-[#ffed00]'
              }`}
            >
              <div className="text-5xl mb-3">{template.thumbnail}</div>
              <h3 className="font-black text-lg mb-1">{template.name}</h3>
              <p className="text-sm opacity-70 mb-3">{template.description}</p>
              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedId === template.id
                        ? 'bg-black/20 text-black'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-xs mt-3 font-bold opacity-60">
                {template.quizData.questions.length} questions
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PresetsGallery;
