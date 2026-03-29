/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Rocket, 
  TrendingDown, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  TreeDeciduous
} from 'lucide-react';
import { MOCK_ACHIEVEMENTS } from '../types';

interface AchievementProps {
  onBack: () => void;
}

export default function WrongQuestionAchievement({ onBack }: AchievementProps) {
  const [selectedMedal, setSelectedMedal] = useState<any>(null);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. 学习数据统计模块 */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-md rounded-[40px] p-10 border border-white/20 flex flex-col items-center text-center space-y-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute inset-0 bg-green-400/20 blur-[60px] rounded-full"
            />
            <TreeDeciduous size={120} className="text-green-400 relative z-10" />
            <div className="absolute -bottom-2 bg-yellow-400 text-purple-900 px-4 py-1 rounded-full font-black text-sm shadow-lg">
              成长值: 65%
            </div>
          </div>
          <h2 className="text-2xl font-bold">知识小树苗正在茁壮成长！</h2>
          <p className="text-white/60">你已经攻克了 65% 的知识点，再接再厉哦！🌲</p>
          
          <div className="w-full grid grid-cols-3 gap-4 pt-4">
            <StatMiniCard label="复习完成率" value="70%" color="text-blue-400" />
            <StatMiniCard label="本周进步" value="+15%" color="text-yellow-400" />
            <StatMiniCard label="累计积分" value="120" color="text-purple-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-[40px] p-10 border border-white/20 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingDown size={24} className="text-blue-400" />
              错题趋势 (近7天)
            </h2>
            <span className="text-xs text-white/40 italic">错题越来越少啦！</span>
          </div>
          
          <div className="h-64 w-full flex items-end justify-around gap-2 px-4">
            {[12, 10, 8, 7, 5, 4, 2].map((count, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${count * 15}px` }}
                  className="w-full bg-yellow-400 rounded-t-xl"
                />
                <span className="text-[10px] text-white/40">{['一','二','三','四','五','六','日'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 成就勋章模块 */}
      <section className="bg-white/5 backdrop-blur-md rounded-[40px] p-10 border border-white/10">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-yellow-400 rounded-xl">
            <Trophy size={24} className="text-purple-900" />
          </div>
          <h2 className="text-2xl font-bold">我的荣誉勋章</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {MOCK_ACHIEVEMENTS.map((a, idx) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedMedal(a)}
              className={`flex flex-col items-center gap-4 cursor-pointer group`}
            >
              <div className={`w-32 h-32 rounded-full flex items-center justify-center relative transition-all duration-500 ${
                a.isUnlocked 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-xl shadow-yellow-400/20' 
                  : 'bg-white/5 grayscale opacity-40'
              }`}>
                {a.isUnlocked && (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                    className="absolute inset-[-10%] border-2 border-dashed border-yellow-400/40 rounded-full"
                  />
                )}
                <span className="text-5xl">{a.icon}</span>
                {!a.isUnlocked && <Lock className="absolute bottom-2 right-2 text-white/60" size={20} />}
              </div>
              <div className="text-center">
                <div className={`font-black text-lg ${a.isUnlocked ? 'text-yellow-400' : 'text-white/40'}`}>
                  {a.name}
                </div>
                <div className="text-[10px] text-white/30 mt-1">{a.isUnlocked ? '已解锁' : '未解锁'}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Medal Detail Modal */}
      <AnimatePresence>
        {selectedMedal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-[#2a2a4a] border border-white/20 p-12 rounded-[50px] max-w-md w-full relative z-10 text-center space-y-8 shadow-2xl overflow-hidden"
            >
              {selectedMedal.isUnlocked && (
                <div className="absolute inset-0 pointer-events-none">
                  <Sparkles className="absolute top-10 left-10 text-yellow-400/20" size={100} />
                  <Sparkles className="absolute bottom-10 right-10 text-blue-400/20" size={80} />
                </div>
              )}

              <div className={`w-40 h-40 rounded-full flex items-center justify-center mx-auto relative ${
                selectedMedal.isUnlocked ? 'bg-yellow-400 shadow-2xl shadow-yellow-400/40' : 'bg-white/10'
              }`}>
                <span className="text-7xl">{selectedMedal.icon}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-black text-yellow-400 uppercase tracking-wider">{selectedMedal.name}</h3>
                <p className="text-white/60 text-lg">
                  {selectedMedal.isUnlocked ? '太棒了！你已经获得了这个荣誉！' : '还没解锁哦，加油！'}
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <div className="text-xs text-white/40 mb-2 uppercase tracking-widest">解锁要求</div>
                <div className="text-xl font-bold">{selectedMedal.requirement}</div>
                {!selectedMedal.isUnlocked && (
                  <div className="mt-4 text-orange-400 font-bold flex items-center justify-center gap-2">
                    <Rocket size={18} />
                    <span>再攻克5道错题即可解锁哦</span>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setSelectedMedal(null)}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-black text-xl shadow-xl shadow-purple-600/20 transition-all active:scale-95"
              >
                我知道啦
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatMiniCard({ label, value, color }: any) {
  return (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
      <div className={`text-xl font-black ${color}`}>{value}</div>
      <div className="text-[10px] text-white/40 mt-1">{label}</div>
    </div>
  );
}
