/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Rocket, Star, Calendar, Filter, ChevronRight } from 'lucide-react';
import { MOCK_QUESTIONS, WrongQuestion } from '../types';

interface HomeProps {
  onQuestionClick: (q: WrongQuestion) => void;
  onGoToAchievement: () => void;
}

export default function WrongQuestionHome({ onQuestionClick, onGoToAchievement }: HomeProps) {
  const [subjectFilter, setSubjectFilter] = useState('全部');
  const [masteryFilter, setMasteryFilter] = useState('全部');

  const filteredQuestions = MOCK_QUESTIONS.filter(q => {
    if (subjectFilter !== '全部' && q.subject !== subjectFilter) return false;
    if (masteryFilter !== '全部' && q.mastery !== masteryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* 1. 数据概览模块 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="本周小迷糊" 
          value="12" 
          unit="道" 
          icon={<Rocket className="text-yellow-400" />} 
          color="bg-yellow-400/20" 
          progress={40}
        />
        <StatCard 
          label="本月小迷糊" 
          value="38" 
          unit="道" 
          icon={<Star className="text-blue-400" />} 
          color="bg-blue-400/20" 
          progress={70}
        />
        <StatCard 
          label="已复习占比" 
          value="65" 
          unit="%" 
          icon={<Calendar className="text-green-400" />} 
          color="bg-green-400/20" 
          progress={65}
        />
        <StatCard 
          label="掌握知识点" 
          value="8" 
          unit="个" 
          icon={<Star className="text-purple-400" />} 
          color="bg-purple-400/20" 
          progress={80}
        />
      </section>

      {/* 2. 错题分类筛选模块 */}
      <section className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-purple-400" />
          <span className="font-bold">筛选一下:</span>
        </div>
        
        <div className="flex gap-3">
          {['全部', '语文', '数学', '英语'].map(s => (
            <FilterButton 
              key={s} 
              active={subjectFilter === s} 
              onClick={() => setSubjectFilter(s)} 
              label={s} 
            />
          ))}
        </div>

        <div className="h-6 w-px bg-white/10" />

        <div className="flex gap-3">
          {['全部', '未复习', '已掌握'].map(m => (
            <FilterButton 
              key={m} 
              active={masteryFilter === m} 
              onClick={() => setMasteryFilter(m)} 
              label={m} 
            />
          ))}
        </div>
      </section>

      {/* 3. 错题列表模块 */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredQuestions.map((q, idx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onQuestionClick(q)}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 cursor-pointer hover:bg-white/15 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                q.subject === '数学' ? 'bg-blue-500/30 text-blue-300' :
                q.subject === '语文' ? 'bg-red-500/30 text-red-300' :
                'bg-green-500/30 text-green-300'
              }`}>
                {q.subject}
              </span>
              <span className="text-[10px] text-white/40">{q.lastReviewTime}</span>
            </div>
            
            <h3 className="text-lg font-medium line-clamp-2 mb-4 group-hover:text-yellow-400 transition-colors">
              {q.title}
            </h3>

            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="bg-white/5 px-2 py-1 rounded-lg text-[10px] text-white/60">
                #{q.knowledgePoint}
              </span>
              <span className="bg-orange-500/20 px-2 py-1 rounded-lg text-[10px] text-orange-300">
                {q.errorReason}
              </span>
              <span className={`px-2 py-1 rounded-lg text-[10px] ${
                q.mastery === '已掌握' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {q.mastery}
              </span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 4. 激励入口模块 */}
      <motion.section 
        whileHover={{ scale: 1.01 }}
        onClick={onGoToAchievement}
        className="bg-gradient-to-r from-purple-600/40 to-blue-600/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
            <Trophy size={32} className="text-purple-900" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">我的荣誉勋章: 3 个</h2>
            <p className="text-white/60">你真棒！再攻克3道题就能解锁“错题小能手”勋章啦🎉</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-yellow-400 font-bold">
          <span>去看看我的成就</span>
          <ChevronRight size={20} />
        </div>
      </motion.section>
    </div>
  );
}

function StatCard({ label, value, unit, icon, color, progress }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color}`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-white">{value}<span className="text-sm font-normal ml-1 opacity-60">{unit}</span></div>
          <div className="text-xs text-white/40 mt-1">{label}</div>
        </div>
      </div>
      {/* Cartoon Rocket Progress Bar */}
      <div className="h-2 bg-white/5 rounded-full relative mt-4">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full relative"
        >
          <motion.div 
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute right-0 -top-1 translate-x-1/2"
          >
            <Rocket size={12} className="text-yellow-400 rotate-45" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, label }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
        active ? 'bg-yellow-400 text-purple-900 shadow-lg shadow-yellow-400/20' : 'bg-white/5 text-white/60 hover:bg-white/10'
      }`}
    >
      {label}
    </motion.button>
  );
}

function Trophy(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
