"use client";

import { useEffect, useState } from "react";

type Phase = "equipment" | "panic" | "ready" | "prompt" | "partyStart" | "systemDegrading" | "taskCounterCollapse" | "logoMeltdown" | "corporateRecoveryFailed" | "fullCringe" | "partyDiagnostics" | "shutdown" | "humanMode" | "silence" | "emotional";

const panicMessages = [
  "Запущен регламент экстренной подготовки мероприятия",
  "Поиск пакета Wildberries...",
  "Поиск пакета Ozon...",
  "Проверка праздничной готовности...",
  "Оценка морального состояния коллектива...",
  "Попытка сохранить достоинство...",
  "Ошибка. Достоинство не найдено."
];

const partyStartMessages = ["ВЕЧЕРИНКА РАЗРЕШЕНА", "КОРПОРАТИВНАЯ ГОТОВНОСТЬ: 146%", "РЕЖИМ СЕРЬЁЗНОСТИ ОТКЛЮЧЁН"];
const partyPhases: Phase[] = ["partyStart", "systemDegrading", "taskCounterCollapse", "logoMeltdown", "corporateRecoveryFailed", "fullCringe", "partyDiagnostics", "shutdown", "humanMode"];

export default function FarewellScenario({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("equipment");
  const [showPackages, setShowPackages] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showDeficit, setShowDeficit] = useState(false);
  const [setupReady, setSetupReady] = useState(false);
  const [panicStep, setPanicStep] = useState(0);
  const [readiness, setReadiness] = useState(0);
  const [readyStep, setReadyStep] = useState(0);
  const [sceneStep, setSceneStep] = useState(0);
  const [partyCounter, setPartyCounter] = useState("20 368");
  const [emotionalStep, setEmotionalStep] = useState(0);

  useEffect(() => {
    const timers = [window.setTimeout(() => setShowPackages(true), 1000), window.setTimeout(() => setShowWarning(true), 4000), window.setTimeout(() => setShowDeficit(true), 7000), window.setTimeout(() => setSetupReady(true), 9500)];
    return () => timers.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "panic") return;
    setPanicStep(0);
    const timers = panicMessages.slice(1).map((_, index) => window.setTimeout(() => setPanicStep(index + 1), 2800 * (index + 1)));
    timers.push(window.setTimeout(() => setPhase("equipment"), 2800 * panicMessages.length + 900));
    return () => timers.forEach(window.clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "ready") return;
    setReadiness(0); setReadyStep(0);
    const timers = [window.setTimeout(() => setReadiness(50), 1000), window.setTimeout(() => setReadiness(100), 2600), window.setTimeout(() => setReadyStep(1), 4200), window.setTimeout(() => setReadyStep(2), 5800), window.setTimeout(() => setPhase("prompt"), 7500)];
    return () => timers.forEach(window.clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (!partyPhases.includes(phase)) return;
    setSceneStep(0);
    const timers: number[] = [];
    const stepAt = (step: number, delay: number) => timers.push(window.setTimeout(() => setSceneStep(step), delay));
    const nextAt = (next: Phase, delay: number) => timers.push(window.setTimeout(() => { setSceneStep(0); setPhase(next); }, delay));

    if (phase === "partyStart") { setPartyCounter("20 368"); stepAt(1, 5000); stepAt(2, 10000); nextAt("systemDegrading", 15000); }
    if (phase === "systemDegrading") { [1,2,3,4,5].forEach((step, index) => stepAt(step, 1500 * (index + 1))); nextAt("taskCounterCollapse", 10000); }
    if (phase === "taskCounterCollapse") {
      ["16 421", "8 317", "1 204", "42", "1", "0", "∞"].forEach((value, index) => timers.push(window.setTimeout(() => setPartyCounter(value), 800 + index * 900)));
      stepAt(1, 7200); timers.push(window.setTimeout(() => setPartyCounter("0"), 8200)); nextAt("logoMeltdown", 9000);
    }
    if (phase === "logoMeltdown") { stepAt(1, 1500); stepAt(2, 3000); stepAt(3, 3900); stepAt(4, 4800); nextAt("corporateRecoveryFailed", 6000); }
    if (phase === "corporateRecoveryFailed") { stepAt(1, 4000); stepAt(2, 6500); stepAt(3, 9000); stepAt(4, 11500); stepAt(5, 15000); nextAt("fullCringe", 18000); }
    if (phase === "fullCringe") { stepAt(1, 3500); stepAt(2, 7500); stepAt(3, 11500); nextAt("partyDiagnostics", 16000); }
    if (phase === "partyDiagnostics") { stepAt(1, 8000); nextAt("shutdown", 12000); }
    if (phase === "shutdown") { [1,2,3,4,5,6].forEach((step, index) => stepAt(step, 2200 * (index + 1))); stepAt(7, 14000); nextAt("humanMode", 20000); }
    if (phase === "humanMode") nextAt("silence", 5000);
    return () => timers.forEach(window.clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "silence") return;
    const timer = window.setTimeout(() => setPhase("emotional"), 720);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "emotional") return;
    setEmotionalStep(0);
    const delays = [6000, 12000, 18000, 24000, 30000, 36000, 44000, 49000, 54000, 63500];
    const timers = delays.map((delay, index) => window.setTimeout(() => setEmotionalStep(index + 1), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [phase]);

  useEffect(() => {
    const root = document.documentElement;
    const partyActive = partyPhases.includes(phase);
    const broken = partyActive && phase !== "partyStart";
    root.classList.toggle("farewell-party-active", partyActive);
    root.classList.toggle("farewell-party-broken", broken);
    if (partyActive) root.classList.add(`farewell-phase-${phase}`);
    root.style.setProperty("--party-counter", `"${partyCounter}"`);
    return () => {
      root.classList.remove("farewell-party-active", "farewell-party-broken", `farewell-phase-${phase}`);
      root.style.removeProperty("--party-counter");
    };
  }, [phase, partyCounter]);

  const startPanic = () => phase === "equipment" && setPhase("panic");
  const found = () => (phase === "equipment" || phase === "panic") && setPhase("ready");
  const startParty = () => phase === "prompt" && setPhase("partyStart");
  const showClose = ["equipment", "panic", "ready", "prompt"].includes(phase);

  if (partyPhases.includes(phase)) return <PartyScene phase={phase} step={sceneStep} counter={partyCounter} />;
  if (phase === "silence") return <section className="farewell-panel farewell-silence" aria-label="Тишина после вечеринки"><div className="silence-line" /></section>;
  if (phase === "emotional") return <EmotionalFinal step={emotionalStep} />;

  const prepared = phase === "ready" || phase === "prompt";
  return <section className={`farewell-panel finale-setup ${phase}`} aria-label="Задача Создать ещё одно хорошее общее воспоминание">
    {showClose && <button className="profile-close" onClick={onClose} aria-label="Закрыть">×</button>}
    <p className="farewell-number">Задача №20 368</p><h1>Создать ещё одно хорошее общее воспоминание</h1>
    <p className="farewell-description">За семь лет накопилось достаточно задач, документов, переездов, инвентаризаций и историй.<br/>Сегодня задача проще: хорошо провести этот день вместе и добавить к ним ещё одно хорошее воспоминание.</p>
    <p className="equipment-lead">Для выполнения задачи необходимо проверить готовность обязательного праздничного оборудования.</p>
    {showPackages && <div className="packages"><PackageCard brand="OZON" image="/assets/ozon-package.jpg" delay="one" ready={prepared}/><PackageCard brand="WILDBERRIES" image="/assets/wildberries-package.jpg" delay="two" ready={prepared}/></div>}
    {showWarning && phase === "equipment" && <div className="package-warning">Без пакетов мероприятие не может быть признано состоявшимся.</div>}
    {showDeficit && phase === "equipment" && <p className="deficit">СБИС обнаружил критический дефицит праздничной тары.</p>}
    {phase === "panic" && <div key={panicStep} className={`panic-status panic-step-${panicStep}`} aria-live="polite">{panicMessages[panicStep]}</div>}
    <div className="readiness"><span>Уровень готовности мероприятия: {readiness}%</span><i><b style={{width:readiness+"%"}}/></i></div>
    {prepared && <div className="ready-messages" aria-live="polite"><p className="kit-ready">Комплект праздничной тары сформирован</p>{readyStep>=1&&<p>Все необходимые условия выполнены</p>}{(readyStep>=2||phase==="prompt")&&<strong>Запустить мероприятие?</strong>}</div>}
    <div className="farewell-actions">{setupReady&&(phase==="equipment"||phase==="panic")&&<><button className="found-button" onClick={found}>ПАКЕТЫ НАЙДЕНЫ</button><button onClick={startPanic} disabled={phase==="panic"}>ПАНИКА</button></>}{phase==="prompt"&&<button className="party-start" onClick={startParty}>ПОГНАЛИ</button>}</div>
  </section>;
}

function PartyScene({ phase, step, counter }: { phase: Phase; step: number; counter: string }) {
  const confetti = Array.from({length:34},(_,index)=>({left:(index*37)%100,delay:(index%10)*.22,duration:3.4+(index%5)*.35}));
  const packagesVisible = ["partyStart","systemDegrading","taskCounterCollapse","logoMeltdown","corporateRecoveryFailed","fullCringe"].includes(phase);
  return <section className={`farewell-panel party-scene scene-${phase}`} aria-label="Расширенный праздничный режим">
    {phase!=="shutdown"&&phase!=="humanMode"&&<><div className="party-lights" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i}/>)}</div><div className="party-stars" aria-hidden="true">★ ✦ ★ ✧ ✦ ★</div><div className="party-bangs" aria-hidden="true">!!!</div><div className="confetti" aria-hidden="true">{confetti.map((item,index)=><i key={index} style={{left:`${item.left}%`,animationDelay:`${item.delay}s`,animationDuration:`${item.duration}s`}}/>)}</div></>}
    {packagesVisible&&<div className="party-packages"><PackageCard brand="OZON" image="/assets/ozon-package.jpg" delay="one" ready party/><PackageCard brand="WILDBERRIES" image="/assets/wildberries-package.jpg" delay="two" ready party/></div>}
    {phase==="partyStart"&&<div key={step} className="party-message respectable" aria-live="polite">{partyStartMessages[step]}</div>}
    {phase==="systemDegrading"&&<SystemDegrading step={step}/>} 
    {phase==="taskCounterCollapse"&&<div className="counter-collapse"><span>Активных задач</span><b>{counter}</b>{step>=1&&<h1>ВСЁ. ХВАТИТ РАБОТАТЬ.</h1>}</div>}
    {phase==="logoMeltdown"&&<LogoMeltdown step={step}/>} 
    {phase==="corporateRecoveryFailed"&&<CorporateRecovery step={step}/>} 
    {phase==="fullCringe"&&<FullCringe step={step}/>}
    {phase==="partyDiagnostics"&&<PartyDiagnostics step={step}/>}
    {phase==="shutdown"&&<Shutdown step={step}/>} 
    {phase==="humanMode"&&<HumanMode/>}
  </section>;
}

function SystemDegrading({step}:{step:number}) { const done=["Клопы ✓","Грузчики ✓","Мышь ✓","Переезд ✓","Всё остальное ✓"]; return <div className="system-degrading"><h2>Система начинает снижать рабочую нагрузку</h2><div className="temporary-statuses"><span>Переезды: ХВАТИТ</span><span>Инвентаризация: НЕ СЕГОДНЯ</span><span>ТМЦ: РАЗБЕРЁМСЯ В ПОНЕДЕЛЬНИК</span><span>Документы: НИЧЕГО НЕ ПОДПИСЫВАЕМ</span><span>Совещания: ОТМЕНЕНЫ</span><span>Грузчики: ПУСТЬ ОТДЫХАЮТ</span></div><div className="auto-complete">{done.map((item,index)=><p className={step>index?"visible":""} key={item}>{item}</p>)}</div><strong className="normal-status">Ну и ладно ✓</strong></div> }

function LogoMeltdown({step}:{step:number}) { const easter=step===2,normal=step===3; return <div className={`logo-meltdown step-${step}${normal?" restored":""}`} aria-label={easter?"SABЫ":"SABY"}><span>S</span><span>A</span><span>B</span><span>{easter?"Ы":"Y"}</span><small>{easter?"Почти восстановлено":"Логотип утратил управляемость"}</small></div> }

function CorporateRecovery({step}:{step:number}) { const progress=["","14%","38%","62%","ОШИБКА",""][step]; return <div className="corporate-recovery"><p>Обнаружено критическое снижение серьёзности.</p><h2>Попытка восстановить корпоративный стиль…</h2>{step>0&&step<5&&<b>{progress}</b>}{step>=4&&<strong>ОШИБКА</strong>}{step>=5&&<h1>Корпоративный стиль восстановлению не подлежит.</h1>}</div> }

function FullCringe({step}:{step:number}){return <div className={`full-cringe cringe-step-${step}`}>{step>=1&&<div className="wordart">ВЕЧЕРИНКА СОСТОЯЛАСЬ!!!</div>}{step>=2&&<div className="party-marquee"><span>ПАКЕТЫ НАЙДЕНЫ • ПАКЕТЫ НАЙДЕНЫ • ПАКЕТЫ НАЙДЕНЫ • </span></div>}{step>=3&&<div className="retro-badges"><i>★ 2000 ★</i><i>SUPER PARTY</i><i>ГОТОВО!!!</i></div>}</div>}

function PartyDiagnostics({step}:{step:number}){return <div className="party-diagnostics"><h2>Диагностика мероприятия</h2><dl><dt>Пакеты:</dt><dd>100%</dd><dt>Люди:</dt><dd>100%</dd><dt>Настроение:</dt><dd>117%</dd><dt>Работоспособность:</dt><dd>0%</dd><dt>Желание обсуждать ТМЦ:</dt><dd>−46%</dd><dt>Готовность к ещё одному переезду:</dt><dd>0%</dd></dl>{step>=1&&<h1>СИСТЕМА РАБОТАЕТ ШТАТНО</h1>}</div>}

function Shutdown({step}:{step:number}){const rows=["Закрытие задач...","Архивация переездов...","Завершение инвентаризации...","Освобождение от ТМЦ...","Удаление красных клопов...","Закрытие комиссии по мыши..."];return <div className="party-shutdown"><h2>SABY выполняет завершение рабочих процессов…</h2>{rows.map((row,index)=><p className={step>index?"done":""} key={row}>{row}<b>{step>index?"✓":""}</b></p>)}{step>=7&&<><h1>Переход в режим «Просто люди»…</h1><div className="shutdown-progress"><i/></div><pre>████████████ 100%</pre></>}</div>}

function HumanMode(){return <div className="party-result"><h1>ВЕЧЕРИНКА СОСТОЯЛАСЬ</h1><p>Пакеты найдены.<br/>Работа остановлена.<br/>Люди на месте.<br/>Задача выполнена.</p><strong>ГОТОВО ✓</strong></div>}

function EmotionalFinal({step}:{step:number}){return <section className="farewell-panel emotional-final" aria-label="Финал"><div className="emotional-copy"><p className="reveal visible">Мы весь день шутили про СБИС, переезды, мышей, клопов и бесконечные задачи.</p><p className={`reveal ${step>=1?"visible":""}`}>Наверное, потому что так немного проще говорить о том, что на самом деле грустно.</p><div className={`emotional-group reveal ${step>=2?"visible":""}`}><p>Семь лет - это уже не просто работа вместе.</p><p className={step>=3?"visible nested-reveal":"nested-reveal"}>Это свои люди, свои фразы, свои истории и огромное количество моментов, которые стали общими.</p></div><div className={`emotional-group reveal ${step>=4?"visible":""}`}><p>Мы очень старались спрятать грусть за шутками.</p><p className={step>=5?"visible nested-reveal":"nested-reveal"}>Получилось не идеально. И, наверное, хорошо.</p></div><h1 className={`reveal final-thought ${step>=6?"visible":""}`}>Потому что если грустно расставаться - значит, всё это было не зря.</h1><div className="last-lines"><p className={`reveal ${step>=7?"visible":""}`}>Вечеринка состоялась.</p><p className={`reveal ${step>=8?"visible":""}`}>Рабочий этап закончился.</p><h2 className={`reveal ${step>=9?"visible":""}`}>Всё важное - нет.</h2><h3 className={`reveal continuation ${step>=10?"visible":""}`}>Продолжение следует…</h3></div></div></section>}

function PackageCard({brand,image,delay,ready,party=false}:{brand:string;image:string;delay:string;ready:boolean;party?:boolean}){const[imageMissing,setImageMissing]=useState(false);return <article className={`package-card ${delay}${ready?" package-ready":""}${party?" party-package":""}`}><div className="bangs">!!!</div><div className={`package-image ${imageMissing?"missing":""}`}>{!imageMissing&&<img src={image} alt={`Пакет ${brand}`} onError={()=>setImageMissing(true)}/>} {imageMissing&&<div className={`bag-mock ${brand.toLowerCase()}`}><span>{brand}</span></div>}</div><h2>ПАКЕТ {brand}</h2><p className="package-state">{ready?"ГОТОВО ✓":"НЕ ПОДГОТОВЛЕН"}</p><b>{ready?"ПОДГОТОВЛЕНО":"КРИТИЧНО"}</b></article>}
