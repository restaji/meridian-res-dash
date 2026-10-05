'use client';

import React, { useState } from 'react';
import { Lesson } from '../types';
import { Zap, Tag, CheckCircle2, ShieldAlert, Award, Sliders, Calendar } from 'lucide-react';

interface LessonsMatrixProps {
  lessons: Lesson[];
}

export const LessonsMatrix: React.FC<LessonsMatrixProps> = ({ lessons }) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = ['all', ...Array.from(new Set(lessons.flatMap((l) => l.tags)))];

  const filteredLessons = lessons.filter((l) => {
    if (selectedTag === 'all') return true;
    return l.tags.includes(selectedTag);
  });

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            Machine Learning Heuristics & Post-Mortem Lessons
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Evolving strategy rules, auto-tuned parameters, and risk preventions learned over time
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-mono text-xs">
        {filteredLessons.map((lesson) => {
          const isSelfTune = lesson.tags.includes('self_tune');
          const isConfig = lesson.tags.includes('config_change');
          const weight = lesson.weight || 0.85;

          return (
            <div
              key={lesson.id}
              className="bg-slate-950/70 border border-slate-800/90 hover:border-slate-700/90 rounded-xl p-4 space-y-3 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    {isSelfTune ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                        <Sliders className="w-3 h-3" />
                        SELF-TUNED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                        <Award className="w-3 h-3" />
                        STRATEGY RULE
                      </span>
                    )}
                    {lesson.pinned && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        PINNED
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500 text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(lesson.created_at).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-slate-200 font-semibold text-xs sm:text-sm leading-relaxed">
                  {lesson.rule}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-850/80 space-y-2">
                {/* Efficacy Weight Bar */}
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Confidence Weight:</span>
                  <span className="text-emerald-400 font-bold">{(weight * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: `${weight * 100}%` }}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lesson.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
