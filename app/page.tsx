"use client";

import { useEffect, useRef, useState } from "react";
import FarewellScenario from "./FarewellScenario";
import ThoughtOfDay from "./ThoughtOfDay";

const sectionItems = ["Все приказы", "Приказ/распоряжение", "Доверенность", "Протокол комиссии", "Акт", "Служебная записка", "Согласование документов", "Приказ (ознакомление)", "Приказ с подписанием"];
const documentTitles = [
  "Приказ о проведении инвентаризации основных средств", "Доверенность №18 на подписание документов по продаже мебели", "Приказ об организации срочного переезда",
  "Акт об уничтожении", "Приказ о полном уничтожении", "Приказ о частичном уничтожении", "Приказ об уничтожении недоуничтоженного ранее",
  "Служебная записка о необходимости найма грузчиков", "Протокол заседания комиссии по учёту ТМЦ", "Приказ о проведении дератизации помещений",
  "Служебная записка о выявлении красных клопов", "Приказ о создании рабочей комиссии по вопросу мыши, попавшей в капкан", "Акт осмотра места обнаружения мыши в капкане",
  "Протокол комиссии по вопросу дальнейших действий в отношении мыши", "Приказ о повторном переезде", "Акт оценки состояния мебели, подлежащей продаже",
  "Приказ о повторной инвентаризации после переезда", "Договор на найм грузчиков", "Служебная записка по итогам срочного совещания по ТМЦ",
  "Приказ о повторной обработке помещений от вредителей", "Предложение о порядке реализации офисной мебели", "Протокол комиссии по вопросам красных клопов"
];
const documentStatuses = ["Ознакомление", "На подписании", "В обработке", "Требует срочного согласования", "На согласовании", "На рассмотрении", "Повторное ознакомление", "На подписании", "Исполнено"];
const documentNotes = ["Приказ.docx, Лист согласования, приложение к документу…", "Приложение: перечень мебели на 3 л. в 1 экз.", "Основание: по итогам совещания от 05.08.2026", "В целях обеспечения сохранности имущества", "Протокол, проект решения, лист согласования", "С целью выработки дальнейшего порядка действий"];

const taskTitles = [
  "СРОЧНО!!!!!!!!!! ВЫВОЗ МЕТАЛЛОЛОМА!!!!!!!!!!", "СРОЧНО!!! Освободить подвал", "Переезд архива", "УНИЧТОЖЕНИЕ", "Переучёт учёта ТМЦ",
  "СРОЧНО!!! Договор на продажу офисной мебели", "ПРОСРОЧЕНО 7 ДНЕЙ!!! Провести инвентаризацию", "!!! КЛОПЫ ВЕРНУЛИСЬ !!!",
  "ОЧЕНЬ СРОЧНО!!! Согласовать стоимость грузчиков", "СРОЧНО!!! Переезд", "КРИТИЧНО!!! Проверить остатки ТМЦ",
  "СРОЧНО!!! Совещание по учёту ТМЦ", "ПРОСРОЧЕНО!!! Найти ещё двух грузчиков", "СРОЧНО!!! Ещё один переезд",
  "ОЧЕНЬ СРОЧНО!!! Найти подрядчика по дезинсекции", "СРОЧНО!!! Акт передачи офисной мебели", "КРИТИЧНО!!! Снова переезд",
  "НУЖНО БЫЛО ВЧЕРА!!! Сверить инвентарные номера", "!!! ЕЩЁ ОДНО СОВЕЩАНИЕ ПО ТМЦ !!!", "СРОЧНО!!! Найти покупателя на офисные столы",
  "ПРОСРОЧЕНО!!! Повторная обработка помещения", "СРОЧНО!!! Переезд №4", "КРИТИЧНО!!! Договор на найм грузчиков",
  "ОЧЕНЬ СРОЧНО!!! Совещание по итогам инвентаризации", "СРОЧНО!!! Избавиться от красных клопов", "ПРОСРОЧЕНО!!! Завершить предыдущий переезд",
  "СРОЧНО!!! Повторная инвентаризация после переезда", "!!! МЫ СНОВА ПЕРЕЕЗЖАЕМ !!!"
];
const taskPeople = ["Радзиевская Т.", "Лю Ш.", "Ню Я."];
const taskDescriptions = ["Срок исполнения был вчера", "Требуется немедленное исполнение", "Контроль руководителя", "Повторное поручение", "Перенос срока не согласован"];

function Icon({ children }: { children: string }) { return <span className="nav-icon">{children}</span>; }

export default function Home() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [view, setView] = useState<"documents" | "tasks">("documents");
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [tasks, setTasks] = useState(taskTitles);
  const [notice, setNotice] = useState(false);
  const [farewellOpen, setFarewellOpen] = useState(false);
  const [thoughtOpen, setThoughtOpen] = useState(false);

  const openTasks = () => { setView("tasks"); setProfileOpen(false); setSelectedTask(null); setSelectedDocument(null); };
  const completeTask = () => {
    setNotice(true);
    setTasks(current => ["СРОЧНО!!! Снова переезд", ...current]);
    window.setTimeout(() => setNotice(false), 3200);
  };

  return <main className="shell">
    <aside className="rail">
      <div className="brand"><i>›</i><span>saby</span></div>
      <div className="enterprise">☰ <small>ПРЕДПРИЯТИЕ</small></div>
      <nav>
        <a><Icon>▱</Icon>Бизнес</a><a><Icon>◌</Icon>Контакты <b>›</b></a><a><Icon>♧</Icon>Компании <b>›</b></a><button className="profile-trigger" onClick={() => setProfileOpen(true)}><Icon>КО</Icon>Китриш О. <b>⌘</b></button><button className="profile-trigger thought-trigger" onClick={() => setThoughtOpen(true)}><Icon>✧</Icon>Мысль дня</button><a><Icon>⚙</Icon>Настройки</a>
        <button className={view === "documents" ? "nav-button active" : "nav-button"} onClick={() => { setView("documents"); setSelectedTask(null); }}><Icon>➤</Icon>Документы <small className="document-alert">428</small></button>
        {view === "documents" && <a className="subactive">Приказы / Доверенности</a>}
        <button className={view === "tasks" ? "nav-button active" : "nav-button"} onClick={openTasks}><Icon>☑</Icon>Задачи <small className="task-alert">20 368</small></button><a><Icon>♙</Icon>Сотрудники <b>›</b></a>
      </nav>
    </aside>
    {view === "documents" ? <>
    <aside className="folders">
      <div className="folder-head"><button>＋</button></div>
      <div className="folder-list">{sectionItems.map((item, index) => <div key={item} className={index === 0 ? "selected" : ""}>{item}</div>)}</div>
      <div className="more">•••</div>
      <div className="process-title">В обработке</div>
      <div className="people">{["Китриш О.", "", "", "", ""].map((name, i) => <div className="person" key={i}><span className={'avatar a'+i}>{i === 0 ? "КО" : ""}</span><span>{name}</span><small>{i === 0 ? 6 : ""}</small></div>)}</div>
    </aside>
    <section className="content">
      <header><div className="search">Найти</div><div className="top-actions"><span>Все</span><span>♢</span></div></header>
      <div className="tabs"><span>Статистика</span><strong>Документы</strong></div>
      <div className="document-list">
        {documentTitles.map((title, index) => { const person = taskPeople[index % 3]; const status = documentStatuses[index % documentStatuses.length]; return <button className={index === 1 || index === 7 ? "doc highlighted doc-button" : "doc doc-button"} key={title} onClick={() => setSelectedDocument(index)}>
          <span className="date"><i>{index === 1 || index === 7 ? "□" : ""}</i>{String(12 - Math.floor(index / 3)).padStart(2,"0")}.08.26<small>{118 - index}</small></span>
          <span className="doc-main"><h2>{title}</h2><p>{index === 7 ? "В целях надлежащего реагирования на возникшую ситуацию и определения дальнейшего порядка действий" : documentNotes[index % documentNotes.length]}</p><p className="attachments">♧ {title}.docx, Лист согласования документа, приложение…</p><p className="names">{person}, Китриш О. — исполнитель документа</p><span className="badges"><span>{person === "Радзиевская Т." ? "РТ" : person === "Лю Ш." ? "ЛШ" : "НЯ"}</span><span>КО</span></span></span>
          <span className={'status ' + (status === 'Исполнено' ? 'done' : '')}>{status}</span><span className="right-person">{person}<small>Китриш О.</small></span>
          {(index === 1 || index === 7) && <span className="kebab">⋮</span>}
        </button>})}
      </div>
    </section>
    </> : <TaskScreen tasks={tasks} onSelect={setSelectedTask} onOpenFarewell={() => setFarewellOpen(true)} />}
    <aside className="tools"><span>⚙</span><span>⇩</span><span>▤</span><span>☑</span><span>⌁</span><div></div><span>▣</span><span>12<br/><small>ср</small></span><span>⌕</span><span>◯</span><span className="help">?</span></aside>
    {profileOpen && <section className="profile-panel" aria-label="Профиль Китриш О.">
      <button className="profile-close" onClick={() => setProfileOpen(false)} aria-label="Закрыть">×</button>
      <div className="profile-top">
        <div className="profile-photo" role="img" aria-label="Фотография Китриш О." />
        <div className="profile-title"><p className="presence"><i /> В сети&nbsp; Работает у нас по 17.08.2026</p><p className="profile-role">Департамент администрации и персонала&nbsp;&nbsp; Менеджер по учету товарно-материальных ценностей и управлению архивом и швец и жнец и на дуде игрец</p><h1>Китриш Ольга</h1></div>
      </div>
      <div className="contact-card"><b>Контакты</b><button>＋</button><p>☎ &nbsp;8870 &nbsp;&nbsp;&nbsp; +7 (911) 184-91-42 &nbsp;&nbsp;&nbsp; ✈ &nbsp;◌ &nbsp; @ &nbsp; kitrishoo@baltikpearl.net</p></div>
      <div className="profile-tabs"><strong>Общие сведения</strong><span>CRM</span><span>Задачи <small>1</small></span><span>Группы</span></div>
    </section>}
    {selectedTask !== null && <section className="task-detail" aria-label="Карточка задачи">
      <button className="profile-close" onClick={() => setSelectedTask(null)} aria-label="Закрыть">×</button>
      <p className="detail-label">Задача</p><h1>{tasks[selectedTask]}</h1>
      <div className="detail-grid"><span>Постановщик</span><b>{taskPeople[selectedTask % 3]}</b><span>Исполнитель</span><b>Китриш О.</b><span>Срок</span><b className="red">Просрочено · сегодня</b><span>Статус</span><b>Ожидает немедленного исполнения</b></div>
      <div className="assignment"><h2>Текст поручения</h2><p>Выполнить максимально срочно. Подробности будут добавлены после следующего срочного совещания.</p></div>
      <button className="complete-button" onClick={completeTask}>Выполнить</button>
    </section>}
    {selectedDocument !== null && <DocumentDetail index={selectedDocument} onClose={() => setSelectedDocument(null)} />}
    {farewellOpen && <FarewellScenario onClose={() => setFarewellOpen(false)} />}
    {thoughtOpen && <ThoughtOfDay onClose={() => setThoughtOpen(false)} />}
    {notice && <div className="task-notice">Невозможно завершить задачу: поступила новая срочная задача</div>}
  </main>;
}

function DocumentDetail({ index, onClose }: { index: number; onClose: () => void }) {
  const mouseDocument = index === 7;
  const person = taskPeople[index % 3];
  const status = documentStatuses[index % documentStatuses.length];
  return <section className="document-detail" aria-label="Карточка документа">
    <button className="profile-close" onClick={onClose} aria-label="Закрыть">×</button>
    <p className="detail-label">Документ № {118 - index} от {String(12 - Math.floor(index / 3)).padStart(2,"0")}.08.2026</p>
    <h1>{documentTitles[index]}</h1>
    <div className="document-meta"><span>Постановщик / подписант</span><b>{person}</b><span>Исполнитель</span><b>Китриш О.</b><span>Статус</span><b>{status}</b><span>Согласующие</span><b>Радзиевская Т., Лю Ш., Ню Я.</b></div>
    <div className="document-body"><h2>Краткое содержание</h2>{mouseDocument ? <><p>В связи с фактом обнаружения мыши, попавшей в капкан, и в целях определения дальнейшего порядка действий, создать рабочую комиссию в составе Радзиевской Т., Лю Ш., Ню Я. Назначить ответственным исполнителем Китриш О.</p><p>Комиссии надлежит в срок до конца рабочего дня:</p><ol><li>зафиксировать факт обнаружения;</li><li>определить дальнейший порядок действий;</li><li>подготовить предложения по предотвращению аналогичных случаев.</li></ol></> : <p>{documentNotes[index % documentNotes.length]} Документ подготовлен для выработки единообразного подхода и исключения аналогичных случаев в дальнейшем.</p>}</div>
    <div className="document-actions"><button>Открыть документ</button><button>Ознакомиться</button><button>Согласовать</button></div>
  </section>;
}

function TaskScreen({ tasks, onSelect, onOpenFarewell }: { tasks: string[]; onSelect: (index: number) => void; onOpenFarewell: () => void }) {
  const filters = [["Все", "20 368"], ["СРОЧНО!!!", "20 367"], ["Просрочено", "8 914"], ["На сегодня", ""], ["Инвентаризация", ""], ["Переезды", "347"], ["Договоры", ""], ["ТМЦ", ""], ["Дератизация", ""], ["Грузчики", ""], ["Совещания", ""]];
  return <><aside className="task-filters"><div className="task-filter-head">＋</div>{filters.map((f,i)=><div className={i===0?"task-filter selected":"task-filter"} key={f[0]}><span>{f[0]}</span><small>{f[1]}</small></div>)}</aside>
    <section className="tasks-content"><header><div className="search">Найти</div><span className="filter-icon">▽</span></header><div className="task-tabs"><span>В работе <small>20 368</small></span><span>Просрочено <small>8 914</small></span><strong>СРОЧНО!!! <small>20 367</small></strong></div>
      <div className="task-list">{tasks.map((title,i)=>{const person=taskPeople[i%3]; return <button className="task-row" key={title+i} onClick={()=>onSelect(i)}><span className={'task-avatar p'+(i%3)}>{person === "Радзиевская Т." ? "РТ" : person === "Лю Ш." ? "ЛШ" : "НЯ"}</span><span className="task-copy"><span className="task-person">{person} <small>Департамент администрации...</small></span><b>{title}</b><span className="task-secondary">{taskDescriptions[i%taskDescriptions.length]} · Исполнитель: Китриш О.</span></span><span className={i%4===0?"task-deadline pulse":"task-deadline"}>{i===1?"ПРОСРОЧЕНО: 7 ДНЕЙ":i%3===0?"сегодня":"вчера"}</span></button>})}<FinalTaskRow onOpen={onOpenFarewell}/></div>
    </section></>;
}

function FinalTaskRow({ onOpen }: { onOpen: () => void }) {
  const rowRef = useRef<HTMLButtonElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const node = rowRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect(); } }, { threshold: .65 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <button ref={rowRef} className={'task-row farewell-task '+(revealed?'first-reveal':'')} onClick={onOpen}><span className="farewell-star">★</span><span className="task-copy"><span className="farewell-kicker">Осталась 1 задача</span><b>Осталась одна действительно срочная задача</b><span className="farewell-name">Создать ещё одно хорошее общее воспоминание</span><span className="task-secondary">Сегодня. Всем вместе. Исполнители: Все · Перенос срока: Недоступен</span></span><span className="farewell-deadline">Сегодня<small>Действительно важный</small></span></button>;
}
