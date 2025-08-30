import React, { useState } from 'react';
import { Shield, Smartphone, Clock, Settings, ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';

interface DistractionsPageProps {
  onBack: () => void;
}

const socialMediaApps = [
  { name: 'فيسبوك', icon: '📘', blocked: false, timeSpent: '2h 15m' },
  { name: 'إنستغرام', icon: '📷', blocked: true, timeSpent: '1h 45m' },
  { name: 'تيك توك', icon: '🎵', blocked: true, timeSpent: '3h 20m' },
  { name: 'سناب شات', icon: '👻', blocked: false, timeSpent: '45m' },
  { name: 'تويتر', icon: '🐦', blocked: true, timeSpent: '1h 10m' },
  { name: 'يوتيوب', icon: '📺', blocked: false, timeSpent: '2h 30m' },
  { name: 'واتساب', icon: '💬', blocked: false, timeSpent: '1h 5m' },
  { name: 'تلغرام', icon: '✈️', blocked: false, timeSpent: '30m' }
];

const studySessions = [
  { subject: 'الرياضيات', duration: '45 دقيقة', completed: true },
  { subject: 'الإنجليزية', duration: '30 دقيقة', completed: true },
  { subject: 'العلوم', duration: '60 دقيقة', completed: false },
  { subject: 'الجغرافيا', duration: '25 دقيقة', completed: false }
];

export default function DistractionsPage({ onBack }: DistractionsPageProps) {
  const [apps, setApps] = useState(socialMediaApps);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [studyTimer, setStudyTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const toggleAppBlock = (index: number) => {
    setApps(prev => prev.map((app, i) => 
      i === index ? { ...app, blocked: !app.blocked } : app
    ));
  };

  const toggleStudyMode = () => {
    setIsStudyMode(!isStudyMode);
    if (!isStudyMode) {
      // Block all social media apps when entering study mode
      setApps(prev => prev.map(app => ({ ...app, blocked: true })));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    // Timer logic would be implemented here
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setStudyTimer(25 * 60);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
          <span className="text-lg">رجوع</span>
        </button>
        
        <h1 className="text-3xl font-bold text-blue-600">
          منع المشتتات
        </h1>
        
        <div className="w-16"></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Study Mode Control */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className={`inline-flex p-4 rounded-full mb-4 ${
              isStudyMode ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              <Shield className={`w-8 h-8 ${
                isStudyMode ? 'text-green-600' : 'text-blue-600'
              }`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">وضع الدراسة</h2>
            <p className="text-gray-600">
              {isStudyMode ? 'وضع الدراسة مفعل - التطبيقات محجوبة' : 'فعل وضع الدراسة لحجب المشتتات'}
            </p>
          </div>

          <button
            onClick={toggleStudyMode}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              isStudyMode
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isStudyMode ? 'إيقاف وضع الدراسة' : 'تفعيل وضع الدراسة'}
          </button>

          {/* Pomodoro Timer */}
          <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">مؤقت الدراسة</h3>
            
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {formatTime(studyTimer)}
              </div>
              <p className="text-gray-600">دقائق متبقية</p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={startTimer}
                disabled={isTimerRunning}
                className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white p-3 rounded-xl transition-all duration-200"
              >
                <Play size={20} />
              </button>
              
              <button
                onClick={pauseTimer}
                disabled={!isTimerRunning}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white p-3 rounded-xl transition-all duration-200"
              >
                <Pause size={20} />
              </button>
              
              <button
                onClick={resetTimer}
                className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-xl transition-all duration-200"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Apps Control */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">التحكم في التطبيقات</h2>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {apps.map((app, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                  app.blocked 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{app.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{app.name}</h3>
                    <p className="text-sm text-gray-500">استخدام اليوم: {app.timeSpent}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleAppBlock(index)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                    app.blocked
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {app.blocked ? 'محجوب' : 'مسموح'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Sessions */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">جلسات الدراسة اليوم</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {studySessions.map((session, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  session.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <h3 className="font-bold text-gray-800 mb-2">{session.subject}</h3>
                <p className="text-sm text-gray-600 mb-3">{session.duration}</p>
                <div className={`text-center py-2 px-3 rounded-lg text-sm font-bold ${
                  session.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {session.completed ? 'مكتملة ✓' : 'قيد الانتظار'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}