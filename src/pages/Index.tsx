import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/54e5a158-7dd5-457e-a358-c020981553d6.jpg';

const NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Серии', href: '#series' },
  { label: 'Калькулятор', href: '#calc' },
  { label: 'Как работаем', href: '#process' },
  { label: 'Акции', href: '#discounts' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
];

const ADVANTAGES = [
  { icon: 'ThermometerSun', title: '+15°C к температуре', text: 'Балкон становится полноценной тёплой комнатой даже в петербургские морозы.' },
  { icon: 'ShieldCheck', title: 'Гарантия 10 лет', text: 'Официальная гарантия на профиль, фурнитуру и монтажные работы.' },
  { icon: 'Building2', title: 'Сохраняем фасад', text: 'Внешний вид, цвет и расстекловка остаются прежними — согласований не требуется.' },
  { icon: 'Wallet', title: 'Рассрочка 0%', text: 'До 12 месяцев без переплат и первоначального взноса. Одобрение за 5 минут.' },
  { icon: 'Factory', title: 'Своё производство', text: 'Без посредников — цена ниже рынка на 10–15%, а сроки короче.' },
  { icon: 'Ruler', title: 'Бесплатный замер', text: 'Инженер приедет в удобное время, замерит и рассчитает точную смету на месте.' },
];

const SERVICES = [
  { icon: 'PanelTop', title: 'Замена холодного на тёплое', price: 'от 4 900 ₽/м²', text: 'Демонтаж алюминия и установка тёплого профиля с двухкамерным стеклопакетом.' },
  { icon: 'Home', title: 'Тёплое остекление лоджий', price: 'от 5 400 ₽/м²', text: 'Профиль VEKA/Rehau 70 мм, энергосберегающее стекло, тёплый отлив и подоконник.' },
  { icon: 'Layers', title: 'Утепление и отделка «под ключ»', price: 'от 3 200 ₽/м²', text: 'Утепление стен, пола и потолка, отделка вагонкой или панелями, тёплый пол.' },
  { icon: 'Sun', title: 'Объединение с комнатой', price: 'по проекту', text: 'Демонтаж блока, вынос радиатора, тёплый пол — балкон становится частью квартиры.' },
];

const BALCONY_SERIES = [
  {
    id: 1,
    name: 'Серия «Уют»',
    tag: 'Самая популярная',
    desc: 'Тёплое остекление + утепление пола и стен + вагонка под дерево. Идеально для зоны отдыха или зимнего сада.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/95838ce2-f079-429a-a058-8d29e3d09802.jpg',
    profile: 'VEKA Softline 70',
    area: '6–10 м²',
    price: 'от 58 000 ₽',
    includes: ['Тёплое остекление', 'Утепление стен и пола', 'Вагонка под дерево', 'Светодиодная подсветка'],
  },
  {
    id: 2,
    name: 'Серия «Кабинет»',
    tag: 'Для работы из дома',
    desc: 'Максимум света и тишины. Панорамные окна, электрообогрев пола, шумопоглощающий стеклопакет.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/4e3e6b72-c905-4811-936e-d51f60935a78.jpg',
    profile: 'Brusbox Super 70',
    area: '5–8 м²',
    price: 'от 64 000 ₽',
    includes: ['Тёплое остекление', 'Тёплый пол (электро)', 'Панели ПВХ белые', 'Розетки и освещение'],
  },
  {
    id: 3,
    name: 'Серия «Зимний сад»',
    tag: 'Для любителей растений',
    desc: 'Лоджия превращается в оранжерею: тёплый профиль, усиленный стеклопакет с UV-защитой, влагостойкая отделка.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/26e6adb7-79d4-4970-b771-e7db4e768713.jpg',
    profile: 'KBE Эксперт 70',
    area: '8–15 м²',
    price: 'от 72 000 ₽',
    includes: ['Тёплое остекление с UV-защитой', 'Влагостойкая отделка', 'Система полива', 'Вентиляционный клапан'],
  },
  {
    id: 4,
    name: 'Серия «Эконом+»',
    tag: 'Выгодный старт',
    desc: 'Замена холодного алюминия на тёплый профиль без отделки. Быстро, честно, с гарантией.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/54e5a158-7dd5-457e-a358-c020981553d6.jpg',
    profile: 'Rehau Blitz 60',
    area: '3–6 м²',
    price: 'от 29 000 ₽',
    includes: ['Тёплое остекление', 'Демонтаж алюминия', 'Уплотнители и фурнитура', 'Вывоз мусора'],
  },
];

const PROFILES = [
  { name: 'VEKA Softline 70', cameras: '5 камер', glass: 'Двухкамерный 40 мм', warm: '★★★★★', price: 'от 5 900 ₽/м²' },
  { name: 'Rehau Blitz 60', cameras: '3 камеры', glass: 'Однокамерный 32 мм', warm: '★★★★☆', price: 'от 4 900 ₽/м²' },
  { name: 'KBE Эксперт 70', cameras: '5 камер', glass: 'Двухкамерный 40 мм', warm: '★★★★★', price: 'от 5 400 ₽/м²' },
  { name: 'Brusbox Super 70', cameras: '5 камер', glass: 'Двухкамерный 40 мм', warm: '★★★★★', price: 'от 5 200 ₽/м²' },
];

const REVIEWS = [
  { name: 'Анна К.', area: 'ЖК «Северная Долина»', text: 'Поменяли холодный алюминий на тёплый профиль — теперь на лоджии зимний сад! Зимой +20°C без обогревателя. Монтаж за один день.', rating: 5 },
  { name: 'Дмитрий В.', area: 'Кудрово', text: 'Боялся, что испортят фасад — но снаружи всё осталось как было. Внутри тепло и тихо, шум с улицы пропал. Спасибо инженеру за расчёт.', rating: 5 },
  { name: 'Елена и Сергей', area: 'Приморский р-н', text: 'Объединили балкон с кухней. Сделали тёплый пол, вынесли подоконник-столешницу. Получилась полноценная комната. Рекомендуем!', rating: 5 },
];

const FAQ = [
  { q: 'Чем тёплое остекление отличается от холодного?', a: 'Холодное (алюминиевое) остекление защищает только от дождя и ветра — температура на балконе как на улице. Тёплое — это многокамерный ПВХ-профиль с двухкамерным стеклопакетом, который держит +20°C внутри даже в мороз и позволяет использовать балкон круглый год.' },
  { q: 'Нужно ли согласование на замену остекления?', a: 'При замене холодного остекления на тёплое мы сохраняем внешний облик фасада: цвет, форму и расстекловку. В большинстве случаев согласование не требуется. Если у вашего дома есть особые требования — уточним на замере.' },
  { q: 'Выдержит ли балконная плита вес тёплых окон?', a: 'Тёплый ПВХ-профиль легче, чем кажется. Перед монтажом инженер оценивает состояние плиты и парапета. При необходимости усиливаем основание — это входит в смету и обсуждается заранее.' },
  { q: 'Сколько времени занимает монтаж?', a: 'Стандартный балкон — 1 день. Лоджия с утеплением и отделкой «под ключ» — 2–4 дня. Точные сроки фиксируем в договоре после замера.' },
  { q: 'Какая гарантия и что в неё входит?', a: 'Гарантия 10 лет на профиль и стеклопакеты, 5 лет — на фурнитуру и монтажные работы. Бесплатное сервисное обслуживание в первый год.' },
  { q: 'Можно ли оформить рассрочку?', a: 'Да, рассрочка 0% до 12 месяцев без первоначального взноса. Одобрение онлайн за 5 минут, нужен только паспорт.' },
];

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    jk: 'ЖК «Северная Долина»',
    district: 'Выборгский р-н',
    area: '9 м²',
    type: 'Лоджия',
    work: 'Замена алюминия на VEKA 70 + утепление',
    profile: 'VEKA Softline 70',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/e63e0ee3-18dd-4fb2-ad22-6d9cce226213.jpg',
    tag: 'До / После',
  },
  {
    id: 2,
    jk: 'ЖК «Юнтолово»',
    district: 'Приморский р-н',
    area: '7 м²',
    type: 'Балкон',
    work: 'Тёплое остекление + зона отдыха',
    profile: 'VEKA Softline 70',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/95838ce2-f079-429a-a058-8d29e3d09802.jpg',
    tag: 'Серия «Уют»',
  },
  {
    id: 3,
    jk: 'ЖК «Кудрово Парк»',
    district: 'Кудрово',
    area: '6 м²',
    type: 'Балкон',
    work: 'Кабинет с тёплым полом и розетками',
    profile: 'Brusbox Super 70',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/4e3e6b72-c905-4811-936e-d51f60935a78.jpg',
    tag: 'Серия «Кабинет»',
  },
  {
    id: 4,
    jk: 'ЖК «Новое Горелово»',
    district: 'Красносельский р-н',
    area: '5 м²',
    type: 'Балкон',
    work: 'Хозяйственная зона, влагостойкая отделка',
    profile: 'Rehau Blitz 60',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/38a3ebe7-9c0e-4c0b-abaf-aeb9829e52d1.jpg',
    tag: 'Серия «Эконом+»',
  },
  {
    id: 5,
    jk: 'ЖК «Мурино Парк»',
    district: 'Мурино',
    area: '12 м²',
    type: 'Лоджия',
    work: 'Панорамное остекление, объединение с гостиной',
    profile: 'KBE Эксперт 70',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/d3d42da7-e3c8-42c0-962c-55e1a10cbf0f.jpg',
    tag: 'Панорамный вид',
  },
  {
    id: 6,
    jk: 'ЖК «Шуваловский»',
    district: 'Выборгский р-н',
    area: '8 м²',
    type: 'Лоджия',
    work: 'Зимний сад с UV-защитой и вентклапаном',
    profile: 'KBE Эксперт 70',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/26e6adb7-79d4-4970-b771-e7db4e768713.jpg',
    tag: 'Серия «Зимний сад»',
  },
];

const TRUST_BADGES = [
  { icon: 'BadgeCheck', label: 'Сертифицированный монтаж' },
  { icon: 'Star', label: 'Рейтинг 4.9 на Яндекс.Картах' },
  { icon: 'Users', label: '4 800+ клиентов в СПб' },
  { icon: 'ShieldCheck', label: 'Гарантия 10 лет' },
];

const HERO_SLIDES = [
  {
    profile: 'VEKA Softline 70',
    badge: 'VEKA',
    color: 'text-sky',
    utp: 'Немецкое качество, 5 камер тепла — балкон держит +20°C при −30°C на улице',
    tag: '5 камер · Двухкамерный стеклопакет',
    icon: 'ThermometerSun',
  },
  {
    profile: 'Rehau Blitz 60',
    badge: 'REHAU',
    color: 'text-accent',
    utp: 'Оптимальное соотношение цены и тепла — замена холодного алюминия за 1 день',
    tag: '3 камеры · Однокамерный стеклопакет',
    icon: 'Zap',
  },
  {
    profile: 'KBE Эксперт 70',
    badge: 'KBE',
    color: 'text-primary',
    utp: 'Экспертный профиль для лоджий: UV-защита, энергосбережение A++ и шумоизоляция 42 дБ',
    tag: '5 камер · Двухкамерный 40 мм',
    icon: 'Layers',
  },
  {
    profile: 'Brusbox Super 70',
    badge: 'BRUSBOX',
    color: 'text-green-600',
    utp: 'Российское производство — короткие сроки и цена ниже европейских аналогов на 15%',
    tag: '5 камер · Произведено в России',
    icon: 'Factory',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Заявка за 1 минуту',
    desc: 'Оставьте номер телефона на сайте или позвоните сами. Менеджер перезвонит в течение 15 минут, уточнит размеры и договорится о замере.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/0b5106ce-1a4d-4984-b28b-960310cf7a6d.jpg',
    icon: 'Phone',
    duration: '15 минут',
  },
  {
    step: '02',
    title: 'Бесплатный замер',
    desc: 'Инженер приедет в удобное время, произведёт точные замеры, оценит состояние плиты и парапета, покажет образцы профилей и стеклопакетов.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/988a4f36-232d-4a91-ba50-770be29423d9.jpg',
    icon: 'Ruler',
    duration: '1–2 дня',
  },
  {
    step: '03',
    title: 'Точная смета и договор',
    desc: 'Готовим детальную смету с фиксированной стоимостью. Подписываем договор с гарантиями, указанием сроков и штрафами за их нарушение.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/a5e7a9ce-6eee-47ff-9be6-9ca226365f7b.jpg',
    icon: 'FileText',
    duration: '1 день',
  },
  {
    step: '04',
    title: 'Производство и доставка',
    desc: 'Изготавливаем конструкции на собственном производстве. Никаких посредников — точные размеры, строгий контроль качества каждого профиля.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/01fe541f-4166-4014-b27d-709e879d5acb.jpg',
    icon: 'Factory',
    duration: '5–7 дней',
  },
  {
    step: '05',
    title: 'Монтаж за 1 день',
    desc: 'Бригада из 2–3 специалистов демонтирует старое остекление, устанавливает тёплый профиль, регулирует фурнитуру. Убираем за собой весь мусор.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/db4ed14f-a4bb-42f2-be9e-02b480454f8d.jpg',
    icon: 'HardHat',
    duration: '1 день',
  },
  {
    step: '06',
    title: 'Сдача и гарантия',
    desc: 'Принимаете работу по акту. Выдаём гарантийный талон на 10 лет. В первый год — бесплатный сервис и регулировка фурнитуры по вашему звонку.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/42d873a8-b8c1-49ba-b7c5-17785ca10daf.jpg',
    icon: 'ShieldCheck',
    duration: 'Навсегда',
  },
];

const DISCOUNTS = [
  {
    icon: 'Percent',
    badge: 'Акция июля',
    title: 'Скидка 10% при заказе до 31 июля',
    desc: 'На любое тёплое остекление балкона или лоджии. Акция действует при подписании договора до конца месяца.',
    cta: 'Записаться на замер',
    color: 'from-accent to-orange-500',
    deadline: 'Осталось мест: 6 из 10',
    icon2: 'Flame',
  },
  {
    icon: 'Gift',
    badge: 'Подарок',
    title: 'Утепление пола в подарок',
    desc: 'При заказе серии «Уют» или «Зимний сад» — утепление пола пеноплексом 50 мм бесплатно. Экономия до 8 000 ₽.',
    cta: 'Получить подарок',
    color: 'from-primary to-sky',
    deadline: 'До конца недели',
    icon2: 'Clock',
  },
  {
    icon: 'CreditCard',
    badge: 'Рассрочка',
    title: 'Рассрочка 0% на 12 месяцев',
    desc: 'Сделайте балкон сейчас — платите потом. Одобрение за 5 минут онлайн, только паспорт. Без переплат и скрытых комиссий.',
    cta: 'Оформить рассрочку',
    color: 'from-green-600 to-primary',
    deadline: 'Постоянное предложение',
    icon2: 'BadgeCheck',
  },
];

const SERIES_PRESETS = [
  { seriesId: 1, label: 'Уют',        icon: 'Sofa',        area: 8,  profile: 0, extras: ['utep'] },
  { seriesId: 2, label: 'Кабинет',    icon: 'Monitor',     area: 6,  profile: 3, extras: ['floor'] },
  { seriesId: 3, label: 'Зимний сад', icon: 'Flower2',     area: 10, profile: 2, extras: ['utep'] },
  { seriesId: 4, label: 'Эконом+',    icon: 'Banknote',    area: 4,  profile: 1, extras: [] },
];

const API_URL = 'https://functions.poehali.dev/ad423de6-73be-4688-ad8f-ec9eaa644826';

async function sendLead(data: { name?: string; phone: string; address?: string; source: string; series?: string }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('network error');
  return res.json();
}

const Index = () => {
  const [area, setArea] = useState([8]);
  const [profile, setProfile] = useState(1);
  const [extras, setExtras] = useState<string[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [portfolioSlide, setPortfolioSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSeries, setActiveSeries] = useState<number | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const [processSlide, setProcessSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 47, s: 12 });

  // Состояния форм
  const [consultForm, setConsultForm] = useState({ name: '', phone: '' });
  const [consultState, setConsultState] = useState<'idle'|'loading'|'ok'|'err'>('idle');

  const [measureForm, setMeasureForm] = useState({ name: '', phone: '', address: '' });
  const [measureState, setMeasureState] = useState<'idle'|'loading'|'ok'|'err'>('idle');

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultForm.phone) return;
    setConsultState('loading');
    try {
      await sendLead({ ...consultForm, source: 'Онлайн-консультация' });
      setConsultState('ok');
      setConsultForm({ name: '', phone: '' });
    } catch { setConsultState('err'); }
  };

  const handleMeasure = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!measureForm.phone) return;
    setMeasureState('loading');
    try {
      await sendLead({ ...measureForm, source: 'Бесплатный замер' });
      setMeasureState('ok');
      setMeasureForm({ name: '', phone: '', address: '' });
    } catch { setMeasureState('err'); }
  };

  useEffect(() => {
    const t = setInterval(() => setHeroSlide((p) => (p + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const applyPreset = (preset: typeof SERIES_PRESETS[0]) => {
    setArea([preset.area]);
    setProfile(preset.profile);
    setExtras(preset.extras);
    setActiveSeries(preset.seriesId);
  };

  const profilePrices = [5900, 4900, 5400, 5200];
  const extraOptions = [
    { id: 'utep', label: 'Утепление и отделка', price: 3200 },
    { id: 'floor', label: 'Тёплый пол', price: 1800 },
    { id: 'sill', label: 'Подоконник-столешница', price: 6000 },
  ];

  const toggleExtra = (id: string) =>
    setExtras((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const base = area[0] * profilePrices[profile];
  const extrasSum = extraOptions
    .filter((e) => extras.includes(e.id))
    .reduce((s, e) => s + (e.id === 'sill' ? e.price : area[0] * e.price), 0);
  const total = base + extrasSum;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* === HEADER === */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg sm:text-xl shrink-0">
            <span className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white">
              <Icon name="Snowflake" size={16} />
            </span>
            Ленинградские<span className="text-primary"> Фасады</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="tel:+79219107496" className="flex items-center gap-1.5 font-display font-semibold text-sm sm:text-base">
              <Icon name="Phone" size={15} className="text-primary shrink-0" />
              <span className="hidden sm:inline">+7 (921) 910-74-96</span>
              <span className="sm:hidden text-primary font-bold">Звонок</span>
            </a>
            <Button asChild size="sm" className="hidden md:flex rounded-full bg-accent hover:bg-primary text-white shadow-glow-orange text-xs sm:text-sm">
              <a href="#consult">Консультация</a>
            </Button>
            {/* Burger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden grid place-items-center w-9 h-9 rounded-xl border border-border hover:bg-secondary transition-colors"
              aria-label="Меню"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-xl">
            <nav className="container py-4 flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-base font-medium hover:bg-secondary hover:text-primary transition-colors"
                >
                  {n.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
                <a href="tel:+79219107496" className="flex items-center gap-3 py-3 px-4 rounded-xl bg-primary/10 text-primary font-semibold">
                  <Icon name="Phone" size={18} /> +7 (921) 910-74-96
                </a>
                <Button asChild className="rounded-xl bg-accent text-white shadow-glow-orange h-12">
                  <a href="#consult" onClick={() => setMenuOpen(false)}>Бесплатная консультация</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* === HERO === */}
      <section id="top" className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 grid-bg">
        <div className="container grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs sm:text-sm mb-4 sm:mb-5">
              <Icon name="MapPin" size={14} /> Санкт-Петербург и Лен. область
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08]">
              Меняем <span className="text-sky">холодное</span> остекление
              на <span className="text-accent">тёплое</span>
            </h1>

            {/* УТП-слайдер по профилям */}
            <div className="mt-5 sm:mt-6">
              {/* Переключатели профилей */}
              <div className="flex flex-wrap gap-2 mb-4">
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={s.profile}
                    onClick={() => setHeroSlide(i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all duration-300 ${
                      heroSlide === i
                        ? 'bg-primary border-primary text-white shadow-glow-blue'
                        : 'border-border text-muted-foreground hover:border-primary hover:text-primary bg-card'
                    }`}
                  >
                    <Icon name={s.icon} size={13} />
                    {s.badge}
                  </button>
                ))}
              </div>

              {/* Текст УТП */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-5 py-4 min-h-[88px] flex flex-col justify-center">
                {HERO_SLIDES.map((s, i) => (
                  <div
                    key={s.profile}
                    className={`transition-all duration-500 ${
                      heroSlide === i ? 'opacity-100 translate-y-0' : 'opacity-0 absolute translate-y-3 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon name={s.icon} size={16} className={s.color} />
                      <span className={`font-display font-bold text-sm ${s.color}`}>{s.profile}</span>
                      <span className="text-xs text-muted-foreground">· {s.tag}</span>
                    </div>
                    <p className="text-sm sm:text-base text-foreground leading-snug font-medium">
                      {s.utp}
                    </p>
                  </div>
                ))}

                {/* Прогресс-полоска */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border rounded-full overflow-hidden">
                  <div
                    key={heroSlide}
                    className="h-full bg-primary rounded-full"
                    style={{ animation: 'shimmer-progress 4s linear forwards' }}
                  />
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="rounded-full text-base h-13 sm:h-14 px-6 sm:px-8 bg-accent hover:bg-primary text-white shadow-glow-orange hover:shadow-glow-blue w-full sm:w-auto">
                <a href="#calc"><Icon name="Calculator" size={20} className="mr-2" /> Рассчитать смету</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-base h-13 sm:h-14 px-6 sm:px-8 border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto">
                <a href="#consult">Бесплатный замер</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-8">
              {[
                { n: '12+', t: 'лет на рынке' },
                { n: '4 800+', t: 'балконов сделано' },
                { n: '10 лет', t: 'гарантии' },
              ].map((s) => (
                <div key={s.t} className="text-center sm:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-primary">{s.n}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{s.t}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative animate-scale-in mt-4 lg:mt-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Тёплое остекление балкона в Санкт-Петербурге"
              className="relative rounded-2xl sm:rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 glass rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl animate-float flex items-center gap-2 sm:gap-3">
              <span className="grid place-items-center w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-primary text-white">
                <Icon name="ThermometerSun" size={20} />
              </span>
              <div>
                <div className="font-display font-bold text-base sm:text-lg">+20°C</div>
                <div className="text-xs text-muted-foreground">даже в −25°C на улице</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges strip */}
        <div className="container mt-10 sm:mt-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-2 sm:gap-3 bg-card border border-border rounded-xl px-3 sm:px-4 py-3">
                <Icon name={b.icon} size={20} className="text-accent shrink-0" />
                <span className="text-xs sm:text-sm font-medium leading-tight">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === QUICK CALL BANNER (мобильный Директ-элемент) === */}
      <div className="sticky top-16 z-40 lg:hidden bg-primary text-white py-2 px-4 flex items-center justify-between shadow-md">
        <span className="text-sm font-medium">Бесплатный замер за 15 минут</span>
        <a
          href="tel:+79219107496"
          className="flex items-center gap-1.5 bg-accent rounded-full px-4 py-1.5 text-white text-sm font-bold shadow-glow-orange"
        >
          <Icon name="Phone" size={15} /> Позвонить
        </a>
      </div>

      {/* === ADVANTAGES === */}
      <section id="advantages" className="py-14 sm:py-20 bg-secondary/40">
        <div className="container">
          <SectionTitle eyebrow="Почему мы" title="Преимущества тёплого остекления" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="group bg-card rounded-2xl p-5 sm:p-7 border border-border hover-lift">
                <span className="grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                  <Icon name={a.icon} size={24} />
                </span>
                <h3 className="font-display text-lg sm:text-xl font-semibold mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === WHY TEXT BLOCK (AIDA: Interest) === */}
      <section className="py-14 sm:py-20">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden hover-lift">
            <img
              src="https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/d33b75ee-1aae-409e-a432-6e67d5f3d10a.jpg"
              alt="Уютный тёплый балкон зимой"
              className="w-full object-cover aspect-[4/3]"
            />
            <div className="absolute bottom-4 left-4 glass rounded-2xl px-5 py-3 max-w-xs">
              <div className="text-xs text-muted-foreground mb-0.5">Реальный отзыв клиента</div>
              <div className="text-sm font-semibold">«Зимой пью кофе на балконе в майке — не верила, что так бывает»</div>
              <div className="text-xs text-primary font-medium mt-1">— Марина, Приморский р-н</div>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky/15 text-primary font-semibold text-xs sm:text-sm uppercase tracking-wide mb-4">
              Почему это важно
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5">
              Холодный балкон — это не просто неудобно. Это потеря 15–20% тепла в квартире
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <p>
                Большинство петербургских балконов застеклены тонким алюминиевым профилем 60–80-х годов.
                Он не держит тепло от слова совсем: при −15°C на улице на таком балконе будет −10°C.
                Это прямые потери тепла через стену и дверь, которые вы оплачиваете каждый месяц.
              </p>
              <p>
                Замена на тёплый ПВХ-профиль с двухкамерным стеклопакетом решает задачу радикально.
                Температура на балконе поднимается до +18–22°C без дополнительного отопления —
                только за счёт тепла из квартиры. Балкон перестаёт быть «дырой в стене» и становится
                полноценным жилым пространством.
              </p>
              <p>
                При этом внешний вид дома не меняется: мы подбираем цвет и расстекловку под
                существующий фасад, так что согласование в большинстве случаев не требуется.
              </p>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {[
                { n: '-40%', t: 'теплопотерь через балкон' },
                { n: '+1', t: 'комната в квартире' },
                { n: '1 день', t: 'монтаж под ключ' },
              ].map((s) => (
                <div key={s.t} className="bg-secondary/60 rounded-2xl p-4 text-center">
                  <div className="font-display text-xl sm:text-2xl font-bold text-primary">{s.n}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">{s.t}</div>
                </div>
              ))}
            </div>
            <Button asChild className="mt-7 rounded-full bg-accent hover:bg-primary text-white shadow-glow-orange h-12 px-8">
              <a href="#calc">Рассчитать стоимость для моего балкона</a>
            </Button>
          </div>
        </div>
      </section>

      {/* === SERVICES === */}
      <section id="services" className="py-14 sm:py-20">
        <div className="container">
          <SectionTitle eyebrow="Что мы делаем" title="Услуги и цены" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {SERVICES.map((s) => (
              <div key={s.title} className="flex gap-4 sm:gap-5 bg-card rounded-2xl p-5 sm:p-7 border border-border hover-lift">
                <span className="shrink-0 grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary text-white">
                  <Icon name={s.icon} size={22} />
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-display text-lg sm:text-xl font-semibold">{s.title}</h3>
                    <span className="font-display font-bold text-accent text-sm sm:text-base">{s.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Profiles comparison */}
          <div className="mt-10 sm:mt-12 rounded-2xl border border-border overflow-hidden">
            <div className="bg-primary text-white px-5 sm:px-6 py-4 font-display text-base sm:text-lg font-semibold">
              Сравнение профилей
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[580px]">
                <thead>
                  <tr className="bg-secondary/60 text-left">
                    {['Профиль', 'Камеры', 'Стеклопакет', 'Тепло', 'Цена'].map((h) => (
                      <th key={h} className="px-4 sm:px-6 py-3 font-display font-semibold text-xs sm:text-sm">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROFILES.map((p, i) => (
                    <tr key={p.name} className={i % 2 ? 'bg-secondary/20' : ''}>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-sm">{p.name}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground text-xs sm:text-sm">{p.cameras}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground text-xs sm:text-sm">{p.glass}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-accent text-xs sm:text-sm">{p.warm}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-display font-bold text-primary text-xs sm:text-sm">{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* === CALCULATOR + CONSULT === */}
      <section id="calc" className="py-14 sm:py-20 bg-gradient-to-br from-primary via-primary to-sky text-white">
        <div className="container grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Calc */}
          <div className="bg-white text-foreground rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-2 text-primary font-display font-semibold mb-2 text-sm sm:text-base">
              <Icon name="Calculator" size={18} /> Калькулятор сметы
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-4">Узнайте стоимость за минуту</h3>

            {/* Быстрый старт по сериям */}
            <div className="mb-5 sm:mb-6">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Быстрый старт — выберите серию:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SERIES_PRESETS.map((s) => (
                  <button
                    key={s.seriesId}
                    onClick={() => applyPreset(s)}
                    className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-all text-left ${
                      activeSeries === s.seriesId
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border hover:border-primary hover:text-primary text-muted-foreground'
                    }`}
                  >
                    <Icon name={s.icon} size={16} className="shrink-0" />
                    <span>«{s.label}»</span>
                    {activeSeries === s.seriesId && (
                      <Icon name="Check" size={14} className="ml-auto shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              {activeSeries && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-accent font-medium">
                  <Icon name="Zap" size={13} />
                  Параметры серии «{SERIES_PRESETS.find(s => s.seriesId === activeSeries)?.label}» подставлены
                </div>
              )}
            </div>

            <div className="w-full h-px bg-border mb-5" />

            <label className="block font-semibold mb-2 text-sm sm:text-base">
              Площадь остекления: <span className="text-primary">{area[0]} м²</span>
            </label>
            <Slider
              value={area}
              onValueChange={(v) => { setArea(v); setActiveSeries(null); }}
              min={3} max={30} step={1}
              className="mb-5 sm:mb-6"
            />

            <label className="block font-semibold mb-2 text-sm sm:text-base">Профиль</label>
            <div className="grid grid-cols-2 gap-2 mb-5 sm:mb-6">
              {PROFILES.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => { setProfile(i); setActiveSeries(null); }}
                  className={`rounded-xl border-2 px-2 py-2.5 text-xs font-semibold transition-all ${
                    profile === i ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <label className="block font-semibold mb-2 text-sm sm:text-base">Дополнительно</label>
            <div className="space-y-2 mb-5 sm:mb-6">
              {extraOptions.map((e) => (
                <button
                  key={e.id}
                  onClick={() => toggleExtra(e.id)}
                  className={`w-full flex items-center gap-2 rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium transition-all ${
                    extras.includes(e.id) ? 'border-accent bg-accent/10 text-accent' : 'border-border'
                  }`}
                >
                  <Icon name={extras.includes(e.id) ? 'CheckCircle2' : 'Circle'} size={17} />
                  {e.label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-secondary p-4 sm:p-5 flex items-center justify-between gap-2">
              <span className="font-medium text-sm sm:text-base">Примерная стоимость:</span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-primary whitespace-nowrap">
                {total.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-secondary/70 px-3 py-2.5">
              <Icon name="Info" size={15} className="text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Цены на сайте — предварительные и могут измениться после точного замера. Окончательная стоимость фиксируется в договоре.
              </p>
            </div>
          </div>

          {/* Consult form */}
          <div id="consult" className="flex flex-col justify-center animate-fade-in pt-2 lg:pt-0">
            <span className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 font-semibold text-sm mb-4">
              <Icon name="Headset" size={16} /> Онлайн-консультация
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              Эксперт рассчитает смету бесплатно
            </h3>
            <p className="text-white/80 mb-6 sm:mb-7 text-sm sm:text-base max-w-md">
              Оставьте контакты — инженер свяжется в течение 15 минут и подготовит
              индивидуальный расчёт под ваш балкон.
            </p>
            {consultState === 'ok' ? (
              <div className="max-w-md w-full rounded-2xl bg-white/15 border border-white/30 p-6 flex flex-col items-center gap-3 text-center">
                <span className="grid place-items-center w-14 h-14 rounded-full bg-accent text-white shadow-glow-orange">
                  <Icon name="CheckCircle2" size={28} />
                </span>
                <div className="font-display text-xl font-bold">Заявка принята!</div>
                <p className="text-white/80 text-sm">Инженер свяжется с вами в течение 15 минут.</p>
                <button onClick={() => setConsultState('idle')} className="text-xs text-white/60 underline mt-1">Отправить ещё</button>
              </div>
            ) : (
              <form className="space-y-3 max-w-md w-full" onSubmit={handleConsult}>
                <Input
                  placeholder="Ваше имя"
                  value={consultForm.name}
                  onChange={(e) => setConsultForm(f => ({ ...f, name: e.target.value }))}
                  className="bg-white text-foreground border-0 h-12 rounded-xl"
                />
                <Input
                  placeholder="Телефон *"
                  type="tel"
                  required
                  value={consultForm.phone}
                  onChange={(e) => setConsultForm(f => ({ ...f, phone: e.target.value }))}
                  className="bg-white text-foreground border-0 h-12 rounded-xl"
                />
                <Button
                  size="lg"
                  type="submit"
                  disabled={consultState === 'loading'}
                  className="w-full rounded-xl bg-accent hover:bg-white hover:text-primary text-white h-12 font-semibold shadow-glow-orange disabled:opacity-60"
                >
                  {consultState === 'loading' ? (
                    <span className="flex items-center gap-2"><Icon name="Loader2" size={18} className="animate-spin" /> Отправка...</span>
                  ) : 'Получить консультацию'}
                </Button>
                {consultState === 'err' && <p className="text-red-300 text-xs text-center">Ошибка отправки. Позвоните нам напрямую.</p>}
              </form>
            )}
            <p className="text-xs text-white/60 mt-3 max-w-md">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <a href="#contacts" className="underline underline-offset-2 hover:text-white/90">
                политикой обработки персональных данных
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* === BALCONY SERIES CAROUSEL === */}
      <section id="series" className="py-14 sm:py-20 bg-secondary/40">
        <div className="container">
          <SectionTitle eyebrow="Готовые решения" title="Популярные серии балконов" />
          <p className="text-center text-muted-foreground mt-3 mb-8 sm:mb-10 text-sm sm:text-base max-w-xl mx-auto">
            Подберите подходящую комплектацию и получите точную смету — за 1 клик
          </p>

          {/* Desktop 4 cards */}
          <div className="hidden lg:grid grid-cols-4 gap-5">
            {BALCONY_SERIES.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setActiveSlide(i)}
                className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 hover-lift ${
                  activeSlide === i ? 'border-accent shadow-glow-orange' : 'border-border'
                }`}
              >
                <div className="relative">
                  <img src={s.img} alt={s.name} className="w-full aspect-[4/3] object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold shadow-glow-orange">
                    {s.tag}
                  </span>
                </div>
                <div className="bg-card p-5">
                  <h3 className="font-display text-lg font-bold mb-1">{s.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-primary">{s.price}</span>
                    <span className="text-xs text-muted-foreground">{s.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/tablet carousel */}
          <div className="lg:hidden">
            {/* Tablet: 2 columns */}
            <div className="hidden sm:grid grid-cols-2 gap-4 mb-6">
              {BALCONY_SERIES.map((s, i) => (
                <div
                  key={s.id}
                  onClick={() => setActiveSlide(i)}
                  className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    activeSlide === i ? 'border-accent shadow-glow-orange' : 'border-border'
                  }`}
                >
                  <div className="relative">
                    <img src={s.img} alt={s.name} className="w-full aspect-[4/3] object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-accent text-white text-xs font-semibold">
                      {s.tag}
                    </span>
                  </div>
                  <div className="bg-card p-4">
                    <h3 className="font-display text-base font-bold mb-1">{s.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-primary">{s.price}</span>
                      <span className="text-xs text-muted-foreground">{s.area}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: single card + arrows */}
            <div className="sm:hidden">
              <div className="rounded-2xl overflow-hidden border-2 border-accent shadow-glow-orange">
                <div className="relative">
                  <img
                    src={BALCONY_SERIES[activeSlide].img}
                    alt={BALCONY_SERIES[activeSlide].name}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold">
                    {BALCONY_SERIES[activeSlide].tag}
                  </span>
                </div>
                <div className="bg-card p-5">
                  <h3 className="font-display text-xl font-bold mb-1">{BALCONY_SERIES[activeSlide].name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{BALCONY_SERIES[activeSlide].desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-primary">{BALCONY_SERIES[activeSlide].price}</span>
                    <span className="text-sm text-muted-foreground">{BALCONY_SERIES[activeSlide].area}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 mt-4">
                <button
                  onClick={() => setActiveSlide((p) => (p - 1 + BALCONY_SERIES.length) % BALCONY_SERIES.length)}
                  className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                {BALCONY_SERIES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-3 rounded-full transition-all ${i === activeSlide ? 'bg-accent w-6' : 'bg-border w-3'}`}
                  />
                ))}
                <button
                  onClick={() => setActiveSlide((p) => (p + 1) % BALCONY_SERIES.length)}
                  className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop detail panel */}
          <div className="hidden lg:grid grid-cols-2 gap-8 mt-8 bg-card rounded-2xl border border-border p-6 sm:p-8 items-center animate-fade-in">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-3">
                {BALCONY_SERIES[activeSlide].tag}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2">{BALCONY_SERIES[activeSlide].name}</h3>
              <p className="text-muted-foreground mb-5 text-sm sm:text-base">{BALCONY_SERIES[activeSlide].desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Профиль', value: BALCONY_SERIES[activeSlide].profile },
                  { label: 'Площадь', value: BALCONY_SERIES[activeSlide].area },
                  { label: 'Стоимость', value: BALCONY_SERIES[activeSlide].price },
                  { label: 'Срок монтажа', value: '1–3 дня' },
                ].map((d) => (
                  <div key={d.label} className="bg-secondary/60 rounded-xl px-4 py-3">
                    <div className="text-xs text-muted-foreground">{d.label}</div>
                    <div className="font-display font-bold text-primary">{d.value}</div>
                  </div>
                ))}
              </div>
              <Button asChild className="rounded-xl bg-accent hover:bg-primary text-white shadow-glow-orange hover:shadow-glow-blue">
                <a href="#consult">Заказать эту серию</a>
              </Button>
            </div>
            <div>
              <div className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Что входит:</div>
              <ul className="space-y-2">
                {BALCONY_SERIES[activeSlide].includes.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-accent/15 text-accent shrink-0">
                      <Icon name="Check" size={14} />
                    </span>
                    <span className="font-medium text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile detail panel */}
          <div className="lg:hidden mt-6 bg-card rounded-2xl border border-border p-5">
            <div className="grid grid-cols-2 gap-2 mb-5">
              {[
                { label: 'Профиль', value: BALCONY_SERIES[activeSlide].profile },
                { label: 'Площадь', value: BALCONY_SERIES[activeSlide].area },
                { label: 'Стоимость', value: BALCONY_SERIES[activeSlide].price },
                { label: 'Срок монтажа', value: '1–3 дня' },
              ].map((d) => (
                <div key={d.label} className="bg-secondary/60 rounded-xl px-3 py-2.5">
                  <div className="text-xs text-muted-foreground">{d.label}</div>
                  <div className="font-display font-bold text-primary text-sm">{d.value}</div>
                </div>
              ))}
            </div>
            <ul className="space-y-2 mb-5">
              {BALCONY_SERIES[activeSlide].includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <Icon name="Check" size={15} className="text-accent shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="w-full rounded-xl bg-accent hover:bg-primary text-white shadow-glow-orange h-12">
              <a href="#consult">Заказать эту серию</a>
            </Button>
          </div>
        </div>
      </section>

      {/* === PROCESS CAROUSEL (4U: Useful) === */}
      <section id="process" className="py-14 sm:py-20">
        <div className="container">
          <SectionTitle eyebrow="Как мы работаем" title="Процесс от заявки до гарантии" />
          <p className="text-center text-muted-foreground mt-3 mb-10 text-sm sm:text-base max-w-xl mx-auto">
            Прозрачно и предсказуемо — 6 шагов, никаких сюрпризов
          </p>

          {/* Шаги-навигация */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {PROCESS_STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setProcessSlide(i)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                  processSlide === i
                    ? 'bg-primary border-primary text-white shadow-glow-blue'
                    : 'border-border text-muted-foreground hover:border-primary bg-card'
                }`}
              >
                <span className="font-display">{s.step}</span>
                <span className="hidden sm:inline">{s.title}</span>
              </button>
            ))}
          </div>

          {/* Главная карточка шага */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 bg-card border border-border rounded-3xl overflow-hidden">
            <div className="relative">
              <img
                src={PROCESS_STEPS[processSlide].img}
                alt={PROCESS_STEPS[processSlide].title}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-display text-2xl font-bold shadow-glow-blue">
                {PROCESS_STEPS[processSlide].step}
              </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-accent/15 text-accent">
                  <Icon name={PROCESS_STEPS[processSlide].icon} size={18} />
                </span>
                <span className="text-sm font-semibold text-accent">{PROCESS_STEPS[processSlide].duration}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                {PROCESS_STEPS[processSlide].title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {PROCESS_STEPS[processSlide].desc}
              </p>

              {/* Мини-прогресс */}
              <div className="flex items-center gap-2 mb-6">
                {PROCESS_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setProcessSlide(i)}
                    className={`h-2 rounded-full transition-all ${i === processSlide ? 'bg-primary w-8' : 'bg-border w-4'}`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setProcessSlide((p) => (p - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length)}
                  className="w-11 h-11 rounded-xl border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={() => setProcessSlide((p) => (p + 1) % PROCESS_STEPS.length)}
                  className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-accent transition-all shadow-glow-blue"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
                <Button asChild className="ml-auto rounded-xl bg-accent hover:bg-primary text-white shadow-glow-orange">
                  <a href="#consult">Начать с шага 1</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === PORTFOLIO === */}
      <section id="portfolio" className="py-14 sm:py-20">
        <div className="container">
          <SectionTitle eyebrow="Наши работы" title="Портфолио по объектам СПб" />

          {/* Desktop: главная карточка + превью */}
          <div className="hidden md:grid grid-cols-3 gap-5 mt-10 sm:mt-12">
            {/* Главная карточка */}
            <div className="col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer hover-lift">
              <img
                src={PORTFOLIO_ITEMS[portfolioSlide].img}
                alt={PORTFOLIO_ITEMS[portfolioSlide].jk}
                className="w-full object-cover aspect-[16/10] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="w-fit px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold mb-3 shadow-glow-orange">
                  {PORTFOLIO_ITEMS[portfolioSlide].tag}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                  {PORTFOLIO_ITEMS[portfolioSlide].jk}
                </h3>
                <p className="text-white/80 text-sm mb-3">{PORTFOLIO_ITEMS[portfolioSlide].work}</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: 'MapPin', val: PORTFOLIO_ITEMS[portfolioSlide].district },
                    { icon: 'Maximize2', val: PORTFOLIO_ITEMS[portfolioSlide].area },
                    { icon: 'Home', val: PORTFOLIO_ITEMS[portfolioSlide].type },
                    { icon: 'PanelTop', val: PORTFOLIO_ITEMS[portfolioSlide].profile },
                  ].map((d) => (
                    <span key={d.val} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-medium backdrop-blur-sm">
                      <Icon name={d.icon} size={13} /> {d.val}
                    </span>
                  ))}
                </div>
              </div>
              {/* Стрелки */}
              <button
                onClick={() => setPortfolioSlide((p) => (p - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={() => setPortfolioSlide((p) => (p + 1) % PORTFOLIO_ITEMS.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>

            {/* Превью-список */}
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[420px] pr-1">
              {PORTFOLIO_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setPortfolioSlide(i)}
                  className={`flex gap-3 rounded-xl overflow-hidden border-2 transition-all text-left hover-lift ${
                    portfolioSlide === i ? 'border-accent shadow-glow-orange' : 'border-border'
                  }`}
                >
                  <img src={item.img} alt={item.jk} className="w-20 h-16 object-cover shrink-0" />
                  <div className="py-2 pr-2 min-w-0">
                    <div className={`font-display font-bold text-sm leading-tight mb-0.5 ${portfolioSlide === i ? 'text-accent' : ''}`}>
                      {item.jk}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{item.work}</div>
                    <div className="text-xs font-semibold text-primary mt-0.5">{item.area} · {item.type}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Точки-индикаторы (desktop) */}
          <div className="hidden md:flex justify-center gap-2 mt-5">
            {PORTFOLIO_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setPortfolioSlide(i)}
                className={`h-2 rounded-full transition-all ${i === portfolioSlide ? 'bg-accent w-6' : 'bg-border w-2'}`}
              />
            ))}
          </div>

          {/* Mobile: полная карусель */}
          <div className="md:hidden mt-8">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={PORTFOLIO_ITEMS[portfolioSlide].img}
                alt={PORTFOLIO_ITEMS[portfolioSlide].jk}
                className="w-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent flex flex-col justify-end p-5">
                <span className="w-fit px-2.5 py-1 rounded-full bg-accent text-white text-xs font-semibold mb-2">
                  {PORTFOLIO_ITEMS[portfolioSlide].tag}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-1">
                  {PORTFOLIO_ITEMS[portfolioSlide].jk}
                </h3>
                <p className="text-white/80 text-xs">{PORTFOLIO_ITEMS[portfolioSlide].work}</p>
              </div>
              <button
                onClick={() => setPortfolioSlide((p) => (p - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center"
              >
                <Icon name="ChevronLeft" size={18} />
              </button>
              <button
                onClick={() => setPortfolioSlide((p) => (p + 1) % PORTFOLIO_ITEMS.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center"
              >
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>

            {/* Мета-инфо */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { icon: 'MapPin', val: PORTFOLIO_ITEMS[portfolioSlide].district },
                { icon: 'Maximize2', val: PORTFOLIO_ITEMS[portfolioSlide].area },
                { icon: 'Home', val: PORTFOLIO_ITEMS[portfolioSlide].type },
                { icon: 'PanelTop', val: PORTFOLIO_ITEMS[portfolioSlide].profile },
              ].map((d) => (
                <div key={d.val} className="flex items-center gap-2 bg-secondary/60 rounded-xl px-3 py-2 text-xs font-medium">
                  <Icon name={d.icon} size={14} className="text-primary shrink-0" /> {d.val}
                </div>
              ))}
            </div>

            {/* Точки */}
            <div className="flex justify-center gap-2 mt-4">
              {PORTFOLIO_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPortfolioSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === portfolioSlide ? 'bg-accent w-6' : 'bg-border w-2'}`}
                />
              ))}
            </div>
          </div>

          {/* CTA под портфолио */}
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white h-11 px-7">
              <a href="#consult">Хочу так же — получить смету</a>
            </Button>
          </div>
        </div>
      </section>

      {/* === DISCOUNTS (4U: Urgent + Unique) === */}
      <section id="discounts" className="py-14 sm:py-20 bg-secondary/40">
        <div className="container">
          <SectionTitle eyebrow="Специальные предложения" title="Акции и скидки" />

          {/* Таймер */}
          <div className="flex justify-center mt-5 mb-8">
            <div className="inline-flex items-center gap-3 bg-primary text-white rounded-2xl px-6 py-3 shadow-glow-blue">
              <Icon name="Timer" size={20} className="text-accent" />
              <span className="text-sm font-medium">Акция июля заканчивается через:</span>
              <div className="flex items-center gap-1 font-display text-xl font-bold">
                <span className="bg-white/20 rounded-lg px-2 py-0.5 min-w-[2.5rem] text-center">{String(timeLeft.h).padStart(2,'0')}</span>
                <span>:</span>
                <span className="bg-white/20 rounded-lg px-2 py-0.5 min-w-[2.5rem] text-center">{String(timeLeft.m).padStart(2,'0')}</span>
                <span>:</span>
                <span className="bg-white/20 rounded-lg px-2 py-0.5 min-w-[2.5rem] text-center">{String(timeLeft.s).padStart(2,'0')}</span>
              </div>
            </div>
          </div>

          {/* Карточки акций */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DISCOUNTS.map((d) => (
              <div key={d.title} className={`relative rounded-3xl bg-gradient-to-br ${d.color} text-white overflow-hidden hover-lift`}>
                {/* Декор */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative p-6 sm:p-7 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="grid place-items-center w-12 h-12 rounded-2xl bg-white/20">
                      <Icon name={d.icon} size={22} />
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
                      {d.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 leading-tight">{d.title}</h3>
                  <p className="text-white/85 text-sm leading-relaxed flex-1 mb-5">{d.desc}</p>

                  <div className="flex items-center gap-2 mb-4 text-xs font-semibold">
                    <Icon name={d.icon2} size={14} className="text-white/80" />
                    <span className="text-white/80">{d.deadline}</span>
                  </div>

                  <Button asChild className="w-full rounded-xl bg-white text-foreground hover:bg-white/90 font-semibold h-11">
                    <a href="#consult">{d.cta}</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Фото + CTA-блок */}
          <div className="mt-10 grid lg:grid-cols-2 gap-6 bg-card border border-border rounded-3xl overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/42d873a8-b8c1-49ba-b7c5-17785ca10daf.jpg"
              alt="Счастливая семья на тёплом балконе"
              className="w-full h-64 lg:h-auto object-cover"
            />
            <div className="p-7 sm:p-10 flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-4">
                <Icon name="Flame" size={15} /> Горячее предложение
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                Закажите замер сегодня — получите скидку 10% и подарок
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Только в июле: при подписании договора в день замера вы получаете скидку 10% на всю стоимость
                работ и утепление пола в подарок. Акция ограничена — осталось <strong className="text-foreground">6 мест</strong> в этом месяце.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="rounded-full bg-accent hover:bg-primary text-white shadow-glow-orange h-12 px-7">
                  <a href="#consult">Записаться на замер со скидкой</a>
                </Button>
                <a href="tel:+79219107496" className="flex items-center justify-center gap-2 h-12 px-5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all">
                  <Icon name="Phone" size={17} /> Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === REVIEWS === */}
      <section id="reviews" className="py-14 sm:py-20 bg-secondary/40">
        <div className="container">
          <SectionTitle eyebrow="Нам доверяют" title="Отзывы клиентов" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-card rounded-2xl p-5 sm:p-7 border border-border hover-lift flex flex-col">
                <div className="flex gap-1 text-accent mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={17} className="fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">«{r.text}»</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-primary to-accent text-white font-display font-bold text-sm">
                    {r.name[0]}
                  </span>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section id="faq" className="py-14 sm:py-20">
        <div className="container max-w-3xl">
          <SectionTitle eyebrow="Вопрос-ответ" title="Частые вопросы" />
          <Accordion type="single" collapsible className="mt-8 sm:mt-10">
            {FAQ.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border rounded-2xl mb-3 px-4 sm:px-5 data-[state=open]:bg-secondary/40"
              >
                <AccordionTrigger className="text-left font-display font-semibold hover:no-underline text-sm sm:text-base py-4">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* === CONTACTS === */}
      <section id="contacts" className="py-14 sm:py-20 bg-secondary/40">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div>
            <SectionTitle eyebrow="Контакты" title="Приезжайте или звоните" align="left" />
            <div className="mt-6 sm:mt-8 space-y-4">
              {[
                { icon: 'Phone', label: 'Телефон', value: '+7 (921) 910-74-96', href: 'tel:+79219107496' },
                { icon: 'Mail', label: 'Электронная почта', value: 'info@teplookna-spb.ru', href: 'mailto:info@teplookna-spb.ru' },
                { icon: 'MapPin', label: 'Офис и производство', value: 'Санкт-Петербург, пр. Энергетиков, 10', href: undefined },
                { icon: 'Clock', label: 'Режим работы', value: 'Ежедневно с 9:00 до 21:00', href: undefined },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3 sm:gap-4">
                  <span className="grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="font-display font-semibold text-base sm:text-lg hover:text-primary transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <div className="font-display font-semibold text-base sm:text-lg">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Legal info */}
            <div className="mt-8 p-4 bg-card border border-border rounded-2xl text-xs text-muted-foreground space-y-1">
              <div className="font-semibold text-foreground text-sm mb-2">Реквизиты компании</div>
              <div>ООО «Ленинградские Фасады»</div>
              <div>ИНН: 7800000000 · ОГРН: 1230000000000</div>
              <div>Юридический адрес: 195027, г. Санкт-Петербург, пр. Энергетиков, д. 10</div>
              <div className="pt-1">
                <a href="#contacts" className="underline underline-offset-2 hover:text-primary">
                  Политика конфиденциальности
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border shadow-xl">
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">Записаться на бесплатный замер</h3>
            <p className="text-muted-foreground text-sm mb-5 sm:mb-6">Инженер приедет в удобное время с образцами профилей.</p>
            {measureState === 'ok' ? (
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-6 flex flex-col items-center gap-3 text-center">
                <span className="grid place-items-center w-14 h-14 rounded-full bg-accent text-white shadow-glow-orange">
                  <Icon name="CheckCircle2" size={28} />
                </span>
                <div className="font-display text-xl font-bold">Замер записан!</div>
                <p className="text-muted-foreground text-sm">Мы перезвоним вам в ближайшее время, чтобы уточнить удобное время.</p>
                <button onClick={() => setMeasureState('idle')} className="text-xs text-muted-foreground underline mt-1">Отправить ещё</button>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleMeasure}>
                <Input
                  placeholder="Ваше имя"
                  value={measureForm.name}
                  onChange={(e) => setMeasureForm(f => ({ ...f, name: e.target.value }))}
                  className="h-12 rounded-xl"
                />
                <Input
                  placeholder="Телефон *"
                  type="tel"
                  required
                  value={measureForm.phone}
                  onChange={(e) => setMeasureForm(f => ({ ...f, phone: e.target.value }))}
                  className="h-12 rounded-xl"
                />
                <Input
                  placeholder="Адрес (район, ЖК)"
                  value={measureForm.address}
                  onChange={(e) => setMeasureForm(f => ({ ...f, address: e.target.value }))}
                  className="h-12 rounded-xl"
                />
                <Button
                  size="lg"
                  type="submit"
                  disabled={measureState === 'loading'}
                  className="w-full h-12 rounded-xl font-semibold bg-accent hover:bg-primary text-white shadow-glow-orange hover:shadow-glow-blue disabled:opacity-60"
                >
                  {measureState === 'loading' ? (
                    <span className="flex items-center gap-2"><Icon name="Loader2" size={18} className="animate-spin" /> Отправка...</span>
                  ) : 'Вызвать замерщика'}
                </Button>
                {measureState === 'err' && <p className="text-red-500 text-xs text-center">Ошибка. Позвоните нам: +7 (921) 910-74-96</p>}
              </form>
            )}
            <p className="text-xs text-muted-foreground mt-3">
              Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
            </p>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="bg-primary text-white py-8 sm:py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <Icon name="Snowflake" size={20} /> Ленинградские Фасады
          </div>
          <p className="text-white/70 text-center text-xs sm:text-sm">
            © 2026 ООО «Ленинградские Фасады». Тёплое остекление балконов и лоджий в Санкт-Петербурге.
          </p>
          <a href="tel:+79219107496" className="font-display font-semibold hover:text-white/80 transition-colors">
            +7 (921) 910-74-96
          </a>
        </div>
      </footer>

      {/* Mobile floating CTA */}
      <div className="fixed bottom-4 inset-x-4 z-50 sm:hidden">
        <a
          href="tel:+79219107496"
          className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-accent text-white font-display font-bold text-base shadow-glow-orange shadow-lg"
        >
          <Icon name="Phone" size={20} /> Позвонить бесплатно
        </a>
      </div>

    </div>
  );
};

const SectionTitle = ({
  eyebrow,
  title,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  align?: 'center' | 'left';
}) => (
  <div className={align === 'center' ? 'text-center' : 'text-left'}>
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky/15 text-primary font-semibold text-xs sm:text-sm uppercase tracking-wide">
      {eyebrow}
    </span>
    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 leading-tight">
      {title}
    </h2>
  </div>
);

export default Index;