/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WrongQuestion {
  id: string;
  title: string;
  subject: '语文' | '数学' | '英语';
  knowledgePoint: string;
  errorReason: '粗心看错' | '知识点不会' | '审题错误';
  collectTime: string;
  lastReviewTime: string;
  mastery: '未复习' | '已掌握';
  originalAnswer: string;
  correctAnswer: string;
  analysis: string;
  image?: string;
  isFavorite: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  isUnlocked: boolean;
  requirement: string;
}

export const MOCK_QUESTIONS: WrongQuestion[] = [
  {
    id: '1',
    title: '小明有5个苹果，小红比小明多3个，请问小红有多少个苹果？',
    subject: '数学',
    knowledgePoint: '加法运算',
    errorReason: '粗心看错',
    collectTime: '2026-03-20',
    lastReviewTime: '2026-03-28',
    mastery: '未复习',
    originalAnswer: '2个',
    correctAnswer: '8个',
    analysis: '小红比小明多3个，所以应该是 5 + 3 = 8。',
    isFavorite: false,
  },
  {
    id: '2',
    title: '请写出“静夜思”的作者。',
    subject: '语文',
    knowledgePoint: '古诗词常识',
    errorReason: '知识点不会',
    collectTime: '2026-03-22',
    lastReviewTime: '2026-03-27',
    mastery: '已掌握',
    originalAnswer: '杜甫',
    correctAnswer: '李白',
    analysis: '《静夜思》是唐代诗人李白的代表作之一。',
    isFavorite: true,
  },
  {
    id: '3',
    title: 'What is the opposite of "Big"?',
    subject: '英语',
    knowledgePoint: '反义词',
    errorReason: '审题错误',
    collectTime: '2026-03-25',
    lastReviewTime: '2026-03-28',
    mastery: '未复习',
    originalAnswer: 'Large',
    correctAnswer: 'Small',
    analysis: '"Big" 的意思是“大”，它的反义词是 "Small"（小）。',
    isFavorite: false,
  },
  // Add more to reach 10+
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: `${i + 4}`,
    title: `示例题目 ${i + 4}：关于${['乘法口诀', '生字组词', '长方形面积'][i % 3]}的练习题。`,
    subject: (['数学', '语文', '英语'][i % 3]) as any,
    knowledgePoint: ['乘法口诀', '生字组词', '长方形面积'][i % 3],
    errorReason: (['粗心看错', '知识点不会', '审题错误'][i % 3]) as any,
    collectTime: `2026-03-${20 + i}`,
    lastReviewTime: `2026-03-${25 + i}`,
    mastery: (i % 2 === 0 ? '未复习' : '已掌握') as any,
    originalAnswer: '错误答案示例',
    correctAnswer: '正确答案示例',
    analysis: '这是一个详细的解题小技巧说明，帮助你更好地理解这个知识点。',
    isFavorite: false,
  })),
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', name: '错题小达人', icon: '🏆', isUnlocked: true, requirement: '累计收录10道错题' },
  { id: '2', name: '知识点巩固大师', icon: '📚', isUnlocked: true, requirement: '掌握5个不同知识点' },
  { id: '3', name: '复习小能手', icon: '⏰', isUnlocked: true, requirement: '连续3天进行再挑战' },
  { id: '4', name: '错题清零王', icon: '👑', isUnlocked: false, requirement: '清空所有未复习错题' },
  { id: '5', name: '举一反三高手', icon: '💡', isUnlocked: false, requirement: '完成10道同类题练习' },
];
