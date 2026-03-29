/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Lightbulb, 
  Trash2, 
  Star, 
  RefreshCw, 
  PlusCircle, 
  CheckCircle2,
  HelpCircle,
  Pencil,
  Rocket
} from 'lucide-react';
import { WrongQuestion } from '../types';

interface DetailProps {
  question: WrongQuestion;
  onBack: () => void;
}

export default function WrongQuestionDetail({ question, onBack }: DetailProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isFavorite, setIsFavorite] = useState(question.isFavorite);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* 1. 题目展示模块 */}
      <section className="bg-white/10 backdrop-blur-md rounded-[40px] p-10 border border-white/20 relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-400 rounded-xl">
            <HelpCircle size={24} className="text-purple-900" />
          </div>
          <h2 className="text-2xl font-bold">小迷糊原题</h2>
        </div>
        
        <div className="text-xl leading-relaxed mb-8 text-white/90">
          {question.title}
        </div>

        <div className="p-6 bg-red-500/10 border border-dashed border-red-500/30 rounded-3xl relative overflow-hidden">
          <div className="absolute top-2 right-4 text-red-400/40 font-black text-4xl italic select-none">WRONG!</div>
          <span className="text-red-400 font-bold mr-4">原来的答案:</span>
          <span className="text-2xl font-black text-red-400 relative">
            {question.originalAnswer}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '110%' }}
              className="absolute -bottom-1 left-[-5%] h-1 bg-red-500/60 rounded-full"
            />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '110%' }}
              className="absolute top-1/2 left-[-5%] h-1 bg-red-500/60 rounded-full rotate-[-5deg]"
            />
          </span>
        </div>

        {!showAnalysis && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAnalysis(true)}
            className="mt-8 w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl text-purple-900 font-black text-xl shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-2"
          >
            <Lightbulb size={24} />
            看看解题小技巧
          </motion.button>
        )}
      </section>

      {/* 2. 解析与知识点模块 */}
      <AnimatePresence>
        {showAnalysis && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-md rounded-[40px] p-10 border border-white/10 space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-400 rounded-xl">
                <CheckCircle2 size={24} className="text-purple-900" />
              </div>
              <h2 className="text-2xl font-bold">解题小技巧</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-400 font-bold">
                  <Pencil size={18} />
                  <span>正确答案</span>
                </div>
                <div className="text-3xl font-black text-green-400">{question.correctAnswer}</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <Star size={18} />
                  <span>关联知识点</span>
                </div>
                <div className="bg-blue-500/20 px-4 py-2 rounded-xl inline-block text-blue-300 font-bold">
                  {question.knowledgePoint}
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-lg leading-relaxed text-white/80 italic">
                “{question.analysis}”
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. 操作按钮模块 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionButton 
          icon={<RefreshCw size={20} />} 
          label="再做一遍" 
          color="bg-blue-500/20 text-blue-300"
          onClick={() => showToast('准备好啦，再挑战一次吧！🚀')}
        />
        <ActionButton 
          icon={<Star size={20} fill={isFavorite ? 'currentColor' : 'none'} />} 
          label={isFavorite ? '已收藏' : '收藏本题'} 
          color={isFavorite ? 'bg-yellow-400 text-purple-900' : 'bg-yellow-400/20 text-yellow-400'}
          onClick={() => {
            setIsFavorite(!isFavorite);
            showToast(isFavorite ? '取消收藏啦' : '收藏成功！星星点亮啦🌟');
          }}
        />
        <ActionButton 
          icon={<Trash2 size={20} />} 
          label="删除本题" 
          color="bg-red-500/20 text-red-300"
          onClick={() => setShowDeleteConfirm(true)}
        />
        <ActionButton 
          icon={<PlusCircle size={20} />} 
          label="加入复习计划" 
          color="bg-purple-500/20 text-purple-300"
          onClick={() => showToast('已加入复习计划啦🎉')}
        />
      </section>

      {/* 4. 举一反三推题模块 */}
      <section className="bg-white/5 backdrop-blur-md rounded-[40px] p-8 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Rocket size={20} className="text-orange-400" />
            同类题练练手
          </h2>
          <span className="text-xs text-white/40">举一反三，更聪明！</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map(i => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:bg-white/10 cursor-pointer transition-all"
              onClick={() => showToast('进入同类题练习模式...')}
            >
              <div className="text-sm text-white/60 mb-2">同类题巩固 #{i}</div>
              <div className="font-medium line-clamp-2">
                {i === 1 ? '如果小明有10个苹果，小红比他多5个，小红有多少个？' : '小红有8个苹果，小明比她少3个，小明有多少个？'}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-black shadow-2xl z-[100]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#2a2a4a] border border-white/20 p-10 rounded-[40px] max-w-sm w-full relative z-10 text-center space-y-6 shadow-2xl"
            >
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                <Trash2 size={40} className="text-red-400" />
              </div>
              <h3 className="text-2xl font-bold">确定要删掉这道<br/>“小迷糊题”吗？</h3>
              <p className="text-white/60">删掉后就找不回来啦，再考虑一下？</p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="py-4 bg-white/10 rounded-2xl font-bold hover:bg-white/20 transition-all"
                >
                  留着它
                </button>
                <button 
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    onBack();
                  }}
                  className="py-4 bg-red-500 rounded-2xl font-bold shadow-lg shadow-red-500/20 transition-all"
                >
                  狠心删掉
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ icon, label, color, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[32px] font-bold transition-all border border-white/10 ${color}`}
    >
      <div className="p-3 bg-white/10 rounded-2xl">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </motion.button>
  );
}
