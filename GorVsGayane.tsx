import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  ChevronRight, 
  Swords, 
  User, 
  Zap,
  Timer,
  BicepsFlexed
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  sentence: string;
  translation: string;
  correct: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  { id: 1, sentence: "Yo ______ mucho en la oficina.", translation: "Ես շատ եմ աշխատում գրասենյակում", correct: "trabajo", options: ["trabajo", "funciono", "trabaja"] },
  { id: 2, sentence: "Mi teléfono no ______ bien.", translation: "Իմ հեռախոսը լավ չի աշխատում (գործում)", correct: "funciona", options: ["funciona", "trabaja", "funcionan"] },
  { id: 3, sentence: "Nosotros ______ juntos.", translation: "Մենք միասին ենք աշխատում", correct: "trabajamos", options: ["trabajamos", "funcionamos", "trabajan"] },
  { id: 4, sentence: "El ascensor ______ ahora.", translation: "Վերելակը հիմա աշխատում է (գործում է)", correct: "funciona", options: ["funciona", "trabaja", "funciono"] },
  { id: 5, sentence: "¿Tú ______ los fines de semana?", translation: "Դու աշխատո՞ւմ ես հանգստյան օրերին", correct: "trabajas", options: ["trabajas", "funcionas", "trabaja"] },
  { id: 6, sentence: "La máquina ______ sola.", translation: "Մեքենան (սարքը) միայնակ է աշխատում", correct: "funciona", options: ["funciona", "trabaja", "funcionan"] },
  { id: 7, sentence: "Ellos ______ en un hospital.", translation: "Նրանք աշխատում են հիվանդանոցում", correct: "trabajan", options: ["trabajan", "funcionan", "trabajas"] },
  { id: 8, sentence: "Este plan no ______.", translation: "Այս պլանը չի աշխատում (արդյունավետ չէ)", correct: "funciona", options: ["funciona", "trabaja", "funciono"] },
  { id: 9, sentence: "Yo quiero ______ como arquitecto.", translation: "Ես ուզում եմ աշխատել որպես ճարտարապետ", correct: "trabajar", options: ["trabajar", "funcionar", "trabaja"] },
  { id: 10, sentence: "La radio por fin ______.", translation: "Ռադիոն վերջապես աշխատում է", correct: "funciona", options: ["funciona", "trabaja", "funcionó"] },
  { id: 11, sentence: "Gayane ______ en la escuela.", translation: "Գայանեն աշխատում է դպրոցում", correct: "trabaja", options: ["trabaja", "funciona", "trabajo"] },
  { id: 12, sentence: "Gor ______ en el gimnasio.", translation: "Գոռը աշխատում (մարզվում) է մարզասրահում", correct: "trabaja", options: ["trabaja", "funciona", "trabajo"] },
  { id: 13, sentence: "Mi reloj ______ perfecto.", translation: "Իմ ժամացույցը կատարյալ է աշխատում", correct: "funciona", options: ["funciona", "trabaja", "funcionan"] },
  { id: 14, sentence: "Ustedes ______ demasiado.", translation: "Դուք չափազանց շատ եք աշխատում", correct: "trabajan", options: ["trabajan", "funcionan", "trabajamos"] },
  { id: 15, sentence: "La televisión ______ mal.", translation: "Հեռուստացույցը վատ է աշխատում", correct: "funciona", options: ["funciona", "trabaja", "funciono"] },
];

const Character = ({ name, color, isActive, state }: { name: string, color: string, isActive: boolean, state: 'idle' | 'success' | 'fail' }) => {
  const isGor = name === "Gor";
  return (
    <div className={`flex flex-col items-center gap-4 transition-all duration-500 ${isActive ? 'scale-110' : 'opacity-40 grayscale blur-[0.5px]'}`}>
      <div className="relative">
        <motion.div 
          animate={state === 'success' ? { y: [-15, 0, -15, 0], scale: [1, 1.1, 1] } : state === 'fail' ? { x: [0, -10, 10, -10, 0] } : {}}
          className={`w-28 h-28 rounded-full border-4 border-slate-900 shadow-2xl flex items-center justify-center relative overflow-hidden bg-white group`}
        >
          {/* Avatar Background */}
          <div className={`absolute inset-0 ${color} opacity-10 group-hover:opacity-20 transition-opacity`} />
          
          {/* Character Icon Representation */}
          <div className="relative z-10 flex flex-col items-center">
            {isGor ? (
              <User size={56} className="text-indigo-600" strokeWidth={1.5} />
            ) : (
              <User size={56} className="text-rose-500" strokeWidth={1.5} />
            )}
          </div>

          {/* Status Indicators */}
          <AnimatePresence>
            {state === 'success' && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-0 bg-emerald-500/80 flex items-center justify-center z-20"
              >
                <Zap size={40} className="text-white fill-white" />
              </motion.div>
            )}
            {state === 'fail' && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-0 bg-rose-500/80 flex items-center justify-center z-20"
              >
                <div className="text-4xl font-black text-white">!</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Ground Shadow */}
        <div className="w-16 md:w-20 h-2 bg-black/10 rounded-[100%] blur-sm mx-auto mt-2" />
      </div>

      <div className={`px-3 md:px-6 py-1 md:py-2 rounded-xl md:rounded-2xl text-[10px] md:text-sm font-black uppercase tracking-widest shadow-xl border-2 transition-colors ${
        isGor 
          ? isActive ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-indigo-600 border-slate-100'
          : isActive ? 'bg-rose-500 text-white border-rose-600' : 'bg-white text-rose-500 border-slate-100'
      }`}>
        {name}
      </div>
    </div>
  );
};

export default function GorVsGayane() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'result' | 'finished'>('playing');
  const [turn, setTurn] = useState<'Gor' | 'Gayane'>('Gor');
  const [gorScore, setGorScore] = useState(0);
  const [gayaneScore, setGayaneScore] = useState(0);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);

  const currentQ = QUESTIONS[currentIdx];

  const handleSelect = (opt: string) => {
    if (gameState !== 'playing') return;

    const isCorrect = opt === currentQ.correct;
    setSelectedOpt(opt);
    setFeedback(isCorrect);
    setGameState('result');

    if (isCorrect) {
      if (turn === 'Gor') setGorScore(s => s + 1);
      else setGayaneScore(s => s + 1);
      
      if (currentIdx === QUESTIONS.length - 1) {
        confetti({ particleCount: 150, spread: 70 });
      }
    }

    setTimeout(() => {
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(i => i + 1);
        setTurn(turn === 'Gor' ? 'Gayane' : 'Gor');
        setGameState('playing');
        setSelectedOpt(null);
        setFeedback(null);
      } else {
        setGameState('finished');
      }
    }, 2000);
  };

  const restart = () => {
    setCurrentIdx(0);
    setGorScore(0);
    setGayaneScore(0);
    setTurn('Gor');
    setGameState('playing');
    setSelectedOpt(null);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 overflow-hidden flex flex-col items-center">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-200 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-rose-200 rounded-full blur-[120px]" />
        {/* Track Lines */}
        <div className="absolute bottom-0 w-full h-[30vh] bg-slate-200 flex flex-col justify-between p-4">
           {[...Array(4)].map((_, i) => <div key={i} className="w-full h-px bg-white" />)}
        </div>
      </div>

      <header className="w-full max-w-5xl p-4 md:p-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl">
            <Swords size={20} className="md:w-6 md:h-6" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-xl font-black italic tracking-tighter uppercase leading-none">Competición</h1>
            <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">Trabajar vs Funcionar</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8 bg-white px-4 md:px-8 py-2 md:py-3 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100">
           <div className="flex flex-col items-center">
              <span className="text-[8px] md:text-[10px] font-black text-indigo-600 uppercase tracking-widest">Gor</span>
              <span className="text-xl md:text-2xl font-black italic">{gorScore}</span>
           </div>
           <div className="h-6 md:h-8 w-px bg-slate-100" />
           <div className="flex flex-col items-center">
              <span className="text-[8px] md:text-[10px] font-black text-rose-500 uppercase tracking-widest">Gayane</span>
              <span className="text-xl md:text-2xl font-black italic">{gayaneScore}</span>
           </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl flex flex-col items-center justify-center p-6 space-y-12 relative z-10">
        
        <AnimatePresence mode="wait">
          {gameState === 'finished' ? (
            <motion.div 
               key="finished"
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-center space-y-12 bg-white p-16 rounded-[4rem] shadow-2xl border-4 border-slate-900"
            >
               <div className="w-32 h-32 bg-indigo-600 rounded-[2rem] mx-auto flex items-center justify-center text-white shadow-2xl">
                  <Trophy size={64} />
               </div>
               <div className="space-y-4">
                  <h2 className="text-6xl font-black italic tracking-tighter uppercase">¡FINAL DE LA CARRERA!</h2>
                  <div className="flex justify-center gap-12 pt-4">
                     <div className="text-center">
                        <p className="text-[10px] font-black text-indigo-600 tracking-widest uppercase">Gor</p>
                        <p className="text-5xl font-black">{gorScore}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] font-black text-rose-500 tracking-widest uppercase">Gayane</p>
                        <p className="text-5xl font-black">{gayaneScore}</p>
                     </div>
                  </div>
                  <div className="pt-6">
                    {gorScore > gayaneScore ? (
                      <p className="text-2xl font-black text-indigo-600 uppercase">¡Gana Gor!</p>
                    ) : gayaneScore > gorScore ? (
                      <p className="text-2xl font-black text-rose-500 uppercase">¡Gana Gayane!</p>
                    ) : (
                      <p className="text-2xl font-black text-slate-400 uppercase">¡Empate!</p>
                    )}
                  </div>
               </div>
               <button onClick={restart} className="px-12 py-6 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:bg-indigo-600 transition-all flex items-center gap-3 mx-auto">
                  <RotateCcw /> REINTENTAR
               </button>
            </motion.div>
          ) : (
            <div className="w-full flex flex-col items-center space-y-16">
               
               {/* Competition Stage */}
               <div className="flex justify-between items-end w-full max-w-2xl px-4 md:px-12">
                  <Character 
                    name="Gor" 
                    color="bg-indigo-500" 
                    isActive={turn === 'Gor'} 
                    state={turn === 'Gor' && feedback === true ? 'success' : turn === 'Gor' && feedback === false ? 'fail' : 'idle'} 
                  />
                  
                  <div className="flex flex-col items-center gap-2 md:gap-4 py-4 md:py-8">
                     <div className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border-2 transition-all
                        ${turn === 'Gor' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-rose-500 text-white border-rose-500'}
                     `}>
                        {turn === 'Gor' ? 'Turno: Gor' : 'Turno: Gayane'}
                     </div>
                     <div className="flex items-center gap-2 text-slate-400">
                        <Timer size={14} className="md:w-4 md:h-4" />
                        <span className="text-xs md:text-sm font-black italic">{currentIdx + 1} / 15</span>
                     </div>
                  </div>

                  <Character 
                    name="Gayane" 
                    color="bg-rose-500" 
                    isActive={turn === 'Gayane'} 
                    state={turn === 'Gayane' && feedback === true ? 'success' : turn === 'Gayane' && feedback === false ? 'fail' : 'idle'} 
                  />
               </div>

               {/* Question Board */}
               <div className="w-full bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 field-border md:p-20 shadow-2xl border-b-[8px] md:border-b-[16px] border-slate-100 space-y-8 md:space-y-12">
                  
                  <div className="text-center space-y-4">
                     <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-slate-400">{currentQ.translation}</p>
                     <h3 className="text-2xl md:text-6xl font-black italic tracking-tighter uppercase leading-tight">
                        {currentQ.sentence.split('______')[0]}
                        <span className={`px-2 md:px-4 py-0.5 md:py-1 rounded-xl md:rounded-2xl border-2 md:border-4 mx-1 md:mx-2 ${turn === 'Gor' ? 'border-indigo-600 text-indigo-600' : 'border-rose-500 text-rose-500'}`}>
                           {selectedOpt || '?'}
                        </span>
                        {currentQ.sentence.split('______')[1]}
                     </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                     {currentQ.options.map(opt => (
                       <button
                         key={opt}
                         onClick={() => handleSelect(opt)}
                         disabled={gameState !== 'playing'}
                         className={`py-10 px-4 rounded-[2.5rem] border-4 font-black italic text-2xl uppercase transition-all shadow-xl
                           ${gameState === 'result' 
                             ? opt === currentQ.correct 
                               ? 'bg-emerald-500 border-emerald-600 text-white scale-105' 
                               : selectedOpt === opt ? 'bg-rose-500 border-rose-600 text-white' : 'bg-slate-50 border-slate-100 opacity-20'
                             : 'bg-white border-slate-100 hover:border-slate-900 group'
                           }
                         `}
                       >
                         {opt === 'trabajar' || opt.startsWith('trabaj') ? <BicepsFlexed className="inline-block mr-2 mb-1" size={24} /> : <Zap className="inline-block mr-2 mb-1" size={24} />}
                         {opt}
                       </button>
                     ))}
                  </div>

                  <AnimatePresence>
                     {gameState === 'result' && (
                       <motion.div 
                         initial={{ y: 20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         className="text-center"
                       >
                          <div className={`text-xl font-black uppercase tracking-widest ${feedback ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {feedback ? '¡ESTUPENDO!' : `¡UPS! ERA ${currentQ.correct.toUpperCase()}`}
                          </div>
                       </motion.div>
                     )}
                  </AnimatePresence>
               </div>

            </div>
          )}
        </AnimatePresence>

      </main>

      <footer className="w-full p-12 text-center opacity-10 select-none">
         <p className="text-[10px] font-black uppercase tracking-[1.5em]">Competición Lingüística: Gor vs Gayane v1.0</p>
      </footer>

    </div>
  );
}
