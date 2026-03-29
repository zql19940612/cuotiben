/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, 
  Square, 
  Trash2, 
  Archive, 
  PlusCircle, 
  Filter, 
  ArrowUpDown,
  Search,
  ChevronDown
} from 'lucide-react';
import { MOCK_QUESTIONS } from '../types';

interface ManagementProps {
  onBack: () => void;
}

export default function WrongQuestionManagement({ onBack }: ManagementProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState<'delete' | 'archive' | 'plan' | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === MOCK_QUESTIONS.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(MOCK_QUESTIONS.map(q => q.id));
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. 批量操作模块 */}
      <section className="bg-white/10 backdrop-blur-md rounded-[40px] p-8 border border-white/20 sticky top-4 z-40 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-yellow-400 font-bold bg-yellow-400/10 px-4 py-2 rounded-xl"
            >
              {selectedIds.length === MOCK_QUESTIONS.length ? <CheckSquare size={20} /> : <Square size={20} />}
              <span>全选 ({selectedIds.length}/{MOCK_QUESTIONS.length})</span>
            </motion.button>
            
            <AnimatePresence>
              {selectedIds.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3"
                >
                  <BatchButton 
                    icon={<Trash2 size={18} />} 
                    label="批量删除" 
                    color="bg-red-500/20 text-red-300"
                    onClick={() => setShowConfirm('delete')}
                  />
                  <BatchButton 
                    icon={<Archive size={18} />} 
                    label="批量归档" 
                    color="bg-blue-500/20 text-blue-300"
                    onClick={() => setShowConfirm('archive')}
                  />
                  <BatchButton 
                    icon={<PlusCircle size={18} />} 
                    label="批量加入计划" 
                    color="bg-purple-500/20 text-purple-300"
                    onClick={() => setShowConfirm('plan')}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input 
                type="text" 
                placeholder="搜索小迷糊题..." 
                className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 筛选排序模块 */}
      <section className="flex flex-wrap items-center gap-4">
        <Dropdown label="错误原因" options={['全部', '粗心', '知识点不会', '审题错误']} />
        <Dropdown label="掌握程度" options={['全部', '未复习', '已掌握']} />
        <Dropdown label="收录时间" options={['从新到旧', '从旧到新']} icon={<ArrowUpDown size={16} />} />
      </section>

      {/* 错题列表 */}
      <section className="grid grid-cols-1 gap-4">
        {MOCK_QUESTIONS.map((q, idx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => toggleSelect(q.id)}
            className={`bg-white/5 backdrop-blur-md rounded-3xl p-6 border transition-all cursor-pointer flex items-center gap-6 group ${
              selectedIds.includes(q.id) ? 'border-yellow-400 bg-yellow-400/5' : 'border-white/10 hover:bg-white/10'
            }`}
          >
            <div className={`p-2 rounded-xl transition-colors ${selectedIds.includes(q.id) ? 'text-yellow-400' : 'text-white/20 group-hover:text-white/40'}`}>
              {selectedIds.includes(q.id) ? <CheckSquare size={28} /> : <Square size={28} />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white/60">{q.subject}</span>
                <span className="text-[10px] text-white/40">{q.collectTime} 收录</span>
              </div>
              <h3 className="text-lg font-medium truncate">{q.title}</h3>
              <div className="flex gap-2 mt-2">
                <span className="text-[10px] text-orange-300 bg-orange-500/10 px-2 py-1 rounded-lg">{q.errorReason}</span>
                <span className="text-[10px] text-blue-300 bg-blue-500/10 px-2 py-1 rounded-lg">{q.knowledgePoint}</span>
              </div>
            </div>

            <div className="text-right">
              <div className={`text-xs font-bold mb-1 ${q.mastery === '已掌握' ? 'text-green-400' : 'text-red-400'}`}>
                {q.mastery}
              </div>
              <div className="text-[10px] text-white/30">上次复习: {q.lastReviewTime}</div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#2a2a4a] border border-white/20 p-10 rounded-[40px] max-w-sm w-full relative z-10 text-center space-y-6 shadow-2xl"
            >
              <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                <Filter size={40} className="text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold">
                确定要对这 {selectedIds.length} 道题<br/>
                进行{showConfirm === 'delete' ? '批量删除' : showConfirm === 'archive' ? '批量归档' : '批量加入计划'}吗？
              </h3>
              <p className="text-white/60">这是一个大动作，想好了吗？</p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowConfirm(null)}
                  className="py-4 bg-white/10 rounded-2xl font-bold hover:bg-white/20 transition-all"
                >
                  再想想
                </button>
                <button 
                  onClick={() => {
                    setShowConfirm(null);
                    setSelectedIds([]);
                  }}
                  className="py-4 bg-yellow-400 text-purple-900 rounded-2xl font-bold shadow-lg shadow-yellow-400/20 transition-all"
                >
                  确定执行
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BatchButton({ icon, label, color, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${color}`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}

function Dropdown({ label, options, icon }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-all group">
      {icon || <Filter size={16} className="text-purple-400" />}
      <span className="text-sm font-bold text-white/60 group-hover:text-white">{label}</span>
      <ChevronDown size={16} className="text-white/20 group-hover:text-white/40" />
    </div>
  );
}
