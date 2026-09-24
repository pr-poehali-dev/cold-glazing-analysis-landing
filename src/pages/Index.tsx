import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/54e5a158-7dd5-457e-a358-c020981553d6.jpg';

const NAV_CTA_TEXT = 'Узнайте точную цену за 2 минуты — позвоните сейчас!';

const ADVANTAGES = [
  { icon: 'ThermometerSun', title: '+15°C к температуре', text: 'Балкон становится полноценной тёплой комнатой даже в петербургские морозы.' },
  { icon: 'ShieldCheck', title: 'Гарантия 10 лет', text: 'Официальная гарантия на профиль, фурнитуру и монтажные работы.' },
  { icon: 'Building2', title: 'Сохраняем фасад', text: 'Внешний вид, цвет и расстекловка остаются прежними — согласований не требуется.' },
  { icon: 'Factory', title: 'Своё производство', text: 'Без посредников — цена ниже рынка на 10–15%, а сроки короче.' },
  { icon: 'Ruler', title: 'Бесплатный замер', text: 'Инженер приедет в удобное время, замерит и рассчитает точную смету на месте.' },
  { icon: 'Clock', title: 'Монтаж за 1 день', text: 'Стандартный балкон остекляем за один рабочий день без лишней грязи и шума.' },
];

const PAIN_POINTS = [
  {
    icon: 'Receipt',
    problem: '«В объявлении цена «от», а по факту сумма выросла в разы»',
    solution: 'Фиксируем итоговую стоимость в договоре после замера — никаких скрытых доплат за «дополнительные работы».',
  },
  {
    icon: 'Ruler',
    problem: '«Замерщик не учёл трубу, выступ — рама не влезла, появились щели»',
    solution: 'Инженер, а не менеджер, выезжает на замер и фиксирует все нюансы проёма в акте перед изготовлением.',
  },
  {
    icon: 'Users',
    problem: '«Менеджер, замерщик и монтажник говорят разное»',
    solution: 'За вашим объектом закреплён один инженер-куратор — от заявки до сдачи работ, без «испорченного телефона».',
  },
  {
    icon: 'Clock',
    problem: '«Долго ждали ответа, сроки переносили, замерщик приезжал несколько раз»',
    solution: 'Перезваниваем в течение 15 минут, замер — в согласованный день и час, без переносов.',
  },
  {
    icon: 'Layers',
    problem: '«Поставили материалы дешевле, чем обещали»',
    solution: 'В договоре прописан точный профиль, фурнитура и толщина утеплителя — то, что подписали, то и монтируем.',
  },
  {
    icon: 'Droplets',
    problem: '«Не сделали гидро- и пароизоляцию — появился конденсат и плесень»',
    solution: 'Гидро- и пароизоляция входят в технологию монтажа по умолчанию, а не как платная опция.',
  },
  {
    icon: 'Wind',
    problem: '«Дует из створок, уплотнитель прилегает неплотно»',
    solution: 'Регулируем фурнитуру на объекте и проверяем прилегание уплотнителя при сдаче работ вместе с вами.',
  },
  {
    icon: 'FileCheck',
    problem: '«В договоре не прописали материалы, сроки и гарантию»',
    solution: 'В договоре — конкретный профиль, этапы, сроки и гарантийные обязательства. Ничего «на словах».',
  },
  {
    icon: 'ShieldAlert',
    problem: '«Остеклили ветхий балкон без усиления — есть риск обрушения»',
    solution: 'Перед монтажом инженер оценивает состояние плиты и парапета, при необходимости усиливаем основание.',
  },
  {
    icon: 'Headset',
    problem: '«После сдачи работ мастер пропал, на гарантию не приезжает»',
    solution: 'Гарантия 10 лет официально закреплена в договоре, сервисная бригада выезжает по звонку в первый год бесплатно.',
  },
  {
    icon: 'Trash2',
    problem: '«Не убрали мусор после монтажа»',
    solution: 'Вывоз строительного мусора и уборка после монтажа входят в стоимость работ.',
  },
  {
    icon: 'Camera',
    problem: '«Не было понятно, на каком этапе находится заказ»',
    solution: 'Присылаем фотоотчёты по ключевым этапам — от замера до сдачи, вы всегда в курсе.',
  },
];

const SERVICES = [
  { icon: 'PanelTop', title: 'Замена холодного на тёплое', price: 'от 4 900 ₽/м²', text: 'Демонтаж алюминия и установка тёплого профиля с двухкамерным стеклопакетом.' },
  { icon: 'Home', title: 'Тёплое остекление лоджий', price: 'от 5 400 ₽/м²', text: 'Профиль VEKA/Rehau/Melke 70 мм, энергосберегающее стекло, тёплый отлив и подоконник.' },
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
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/56df182b-cb21-4dda-addc-061fdd5cc81e.jpg',
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
  { name: 'Melke Lite 70', cameras: '4 камеры', glass: 'Двухкамерный 40 мм', warm: '★★★★☆', price: 'от 5 100 ₽/м²' },
];

const TYPICAL_BALCONIES = [
  { shape: 'Прямой', icon: 'Minus', oldPrice: '44 229 ₽', price: '38 460 ₽', area: 4 },
  { shape: '«Г-образный»', icon: 'CornerDownRight', oldPrice: '59 110 ₽', price: '51 400 ₽', area: 6 },
  { shape: '«П-образный»', icon: 'RectangleHorizontal', oldPrice: '81 535 ₽', price: '70 900 ₽', area: 8 },
  { shape: 'Зиг-заг', icon: 'Zap', oldPrice: '84 525 ₽', price: '73 500 ₽', area: 9 },
];

const PRICING_WITH_FINISH = [
  { shape: 'Прямое ~18 м²', icon: 'Minus', noFinish: '49 554 ₽', withFinish: '141 932 ₽', area: 18 },
  { shape: 'П-образное ~13 м²', icon: 'RectangleHorizontal', noFinish: '34 438 ₽', withFinish: '100 139 ₽', area: 13 },
  { shape: '«Сапожок» ~23 м²', icon: 'Footprints', noFinish: '62 829 ₽', withFinish: '179 258 ₽', area: 23 },
  { shape: 'Угловое ~15 м²', icon: 'CornerDownRight', noFinish: '43 306 ₽', withFinish: '129 608 ₽', area: 15 },
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
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/56df182b-cb21-4dda-addc-061fdd5cc81e.jpg',
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
  {
    profile: 'Melke Lite 70',
    badge: 'MELKE',
    color: 'text-purple-600',
    utp: 'Лёгкий и прочный профиль по доступной цене — оптимален для балконов и лоджий',
    tag: '4 камеры · Двухкамерный стеклопакет',
    icon: 'ShieldCheck',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Заявка за 1 минуту',
    desc: 'Оставьте номер телефона на сайте или позвоните сами. Менеджер перезвонит в течение 15 минут, уточнит размеры и договорится о замере.',
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/fcaa43aa-64b9-43ed-84eb-2d762bd0e6a2.jpg',
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
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/30ca06e5-aa03-44e6-bf71-7190f9ad437c.jpg',
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
    img: 'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/fbbd8b0c-0301-4171-a52b-a9c2b830ecf4.jpg',
    icon: 'ShieldCheck',
    duration: 'Навсегда',
  },
];

const SERIES_PRESETS = [
  { seriesId: 1, label: 'Уют',        icon: 'Sofa',        area: 8,  profile: 0, extras: ['utep'] },
  { seriesId: 2, label: 'Кабинет',    icon: 'Monitor',     area: 6,  profile: 3, extras: ['floor'] },
  { seriesId: 3, label: 'Зимний сад', icon: 'Flower2',     area: 10, profile: 2, extras: ['utep'] },
  { seriesId: 4, label: 'Эконом+',    icon: 'Banknote',    area: 4,  profile: 1, extras: [] },
];

const Index = () => {
  const [area, setArea] = useState([8]);
  const [profile, setProfile] = useState(1);
  const [extras, setExtras] = useState<string[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [portfolioSlide, setPortfolioSlide] = useState(0);
  const [activeSeries, setActiveSeries] = useState<number | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const [processSlide, setProcessSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide((p) => (p + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const applyPreset = (preset: typeof SERIES_PRESETS[0]) => {
    setArea([preset.area]);
    setProfile(preset.profile);
    setExtras(preset.extras);
    setActiveSeries(preset.seriesId);
  };

  const applyAreaProfile = (areaValue: number, withFinish = false) => {
    setArea([areaValue]);
    setProfile(4);
    setExtras(withFinish ? ['utep'] : []);
    setActiveSeries(null);
    document.getElementById('calc')?.scrollIntoView({ behavior: 'smooth' });
  };

  const profilePrices = [5900, 4900, 5400, 5200, 5100];
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

          {/* Desktop nav CTA */}
          <a
            href="tel:+79817773070"
            className="hidden lg:flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors whitespace-nowrap"
          >
            <Icon name="PhoneCall" size={16} className="shrink-0" />
            {NAV_CTA_TEXT}
          </a>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5">
              {SOCIAL_LINKS.map(({ name, href, Icon: SocialIcon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="grid place-items-center w-8 h-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                >
                  <SocialIcon size={16} />
                </a>
              ))}
            </div>
            <a href="tel:+79817773070" className="flex items-center gap-1.5 font-display font-semibold text-sm sm:text-base">
              <Icon name="Phone" size={18} className="text-primary shrink-0" />
              <span className="hidden sm:inline">+7 (981) 777-30-70</span>
            </a>
            <Button asChild size="sm" className="hidden md:flex rounded-full bg-accent hover:bg-primary text-white shadow-glow-orange text-xs sm:text-sm">
              <a href="#consult">Консультация</a>
            </Button>
          </div>
        </div>

        {/* Mobile CTA bar */}
        <a
          href="tel:+79817773070"
          className="lg:hidden flex items-center justify-center gap-2 border-t border-border bg-primary/5 px-4 py-2 text-center text-xs sm:text-sm font-semibold text-primary"
        >
          <Icon name="PhoneCall" size={14} className="shrink-0" />
          <span className="leading-tight">{NAV_CTA_TEXT}</span>
        </a>
      </header>

      {/* === HERO === */}
      <section id="top" className="relative pt-32 sm:pt-36 lg:pt-28 pb-12 sm:pb-20 grid-bg">
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
      <div className="sticky top-[88px] sm:top-24 z-40 lg:hidden bg-primary text-white py-2 px-4 flex items-center justify-between shadow-md">
        <span className="text-sm font-medium">Бесплатный замер за 15 минут</span>
        <a
          href="tel:+79817773070"
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

      {/* === PAIN POINTS === */}
      <section id="pain-points" className="py-14 sm:py-20">
        <div className="container">
          <SectionTitle eyebrow="Работаем без сюрпризов" title="Решаем главные проблемы клиентов при остеклении" />
          <p className="text-center text-muted-foreground mt-3 mb-8 sm:mb-10 text-sm sm:text-base max-w-2xl mx-auto">
            Мы изучили частые жалобы на подрядчиков по остеклению и выстроили процесс так, чтобы
            ни одна из этих проблем не повторилась у вас
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PAIN_POINTS.map((p) => (
              <div key={p.problem} className="bg-card rounded-2xl p-5 sm:p-6 border border-border hover-lift">
                <div className="flex items-start gap-2.5 mb-4 pb-4 border-b border-border">
                  <Icon name="X" size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed">{p.problem}</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-accent/15 text-accent shrink-0">
                    <Icon name={p.icon} size={14} />
                  </span>
                  <p className="text-sm font-medium leading-relaxed">{p.solution}</p>
                </div>
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
              src="https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/5ef04373-60f1-4925-b8fe-b4f134f401a4.jpg"
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

      {/* === TYPICAL BALCONIES === */}
      <section id="typical" className="py-14 sm:py-20 bg-secondary/40">
        <div className="container">
          <SectionTitle eyebrow="Готовые конфигурации" title="Остекление типовых балконов" />
          <p className="text-center text-muted-foreground mt-3 mb-8 sm:mb-10 text-sm sm:text-base max-w-xl mx-auto">
            Выберите форму балкона — покажем ориентировочную стоимость остекления профилем Melke
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TYPICAL_BALCONIES.map((b) => (
              <button
                key={b.shape}
                onClick={() => applyAreaProfile(b.area)}
                className="text-left bg-card rounded-2xl p-5 sm:p-6 border border-border hover-lift flex flex-col cursor-pointer transition-all hover:border-accent"
              >
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-4">
                  <Icon name={b.icon} size={22} />
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold mb-3">{b.shape}</h3>
                <div className="mt-auto">
                  <div className="text-xs text-muted-foreground line-through">{b.oldPrice}</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-muted-foreground">от</span>
                    <span className="font-display text-xl sm:text-2xl font-bold text-primary">{b.price}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Icon name="Calculator" size={13} /> Рассчитать точнее
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* === PRICING WITH FINISH === */}
      <section id="pricing-finish" className="py-14 sm:py-20">
        <div className="container">
          <SectionTitle eyebrow="С отделкой под ключ" title="Цены остекления балкона с отделкой" />
          <p className="text-center text-muted-foreground mt-3 mb-8 sm:mb-10 text-sm sm:text-base max-w-xl mx-auto">
            Сравните стоимость остекления без отделки и «под ключ» — с утеплением стен, пола и потолка
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PRICING_WITH_FINISH.map((p) => (
              <div key={p.shape} className="bg-card rounded-2xl overflow-hidden border border-border hover-lift">
                <div className="bg-primary text-white px-5 py-4 flex items-center gap-3">
                  <Icon name={p.icon} size={20} />
                  <h3 className="font-display text-sm sm:text-base font-semibold">{p.shape}</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Без утепления</div>
                    <div className="font-display text-lg sm:text-xl font-bold">{p.noFinish}</div>
                  </div>
                  <div className="w-full h-px bg-border" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">С утеплением и отделкой «под ключ»</div>
                    <div className="font-display text-xl sm:text-2xl font-bold text-primary">{p.withFinish}</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => applyAreaProfile(p.area, true)}
                    className="w-full rounded-xl bg-accent hover:bg-primary text-white shadow-glow-orange"
                  >
                    Заказать расчёт
                  </Button>
                </div>
              </div>
            ))}
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

          {/* Consult phone block */}
          <div id="consult" className="flex flex-col justify-center animate-fade-in pt-2 lg:pt-0">
            <span className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 font-semibold text-sm mb-4">
              <Icon name="Headset" size={16} /> Онлайн-консультация
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              Эксперт рассчитает смету бесплатно
            </h3>
            <p className="text-white/80 mb-6 sm:mb-7 text-sm sm:text-base max-w-md">
              Позвоните нам — инженер проконсультирует и подготовит
              индивидуальный расчёт под ваш балкон.
            </p>
            <a
              href="tel:+79817773070"
              className="max-w-md w-full flex items-center justify-center gap-3 rounded-xl bg-accent hover:bg-white hover:text-primary text-white h-14 font-display text-xl sm:text-2xl font-bold shadow-glow-orange transition-colors"
            >
              <Icon name="Phone" size={22} /> +7 (981) 777-30-70
            </a>
            <p className="text-xs text-white/60 mt-3 max-w-md">
              Звонок бесплатный. Работаем ежедневно с 9:00 до 21:00.
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
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0077FF] via-[#2287f5] to-primary text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/4" />

            <div className="relative p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="shrink-0 grid place-items-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/15">
                <VkIcon size={48} />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 font-semibold text-xs sm:text-sm mb-4">
                  <Icon name="Gift" size={15} /> Подарок за подписку
                </span>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3">
                  Вступи в наше сообщество ВКонтакте
                </h2>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">
                  И получи в подарок <strong className="text-white">чек-лист приёмки работ</strong> по замене
                  остекления — что проверить перед оплатой, чтобы не платить дважды.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="shrink-0 rounded-full bg-white text-primary hover:bg-white/90 font-semibold h-13 sm:h-14 px-7 sm:px-8 text-base shadow-lg"
              >
                <a href="https://vk.ru/zamena_ostekleniya_spb" target="_blank" rel="noopener noreferrer">
                  <VkIcon size={20} /> <span className="ml-2">Вступить и получить</span>
                </a>
              </Button>
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
          <div className="flex justify-center mt-8 sm:mt-10">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white h-12 px-7"
            >
              <a href="https://vk.ru/im?sel=-1203311" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageSquarePlus" size={18} className="mr-2" /> Оставить отзыв
              </a>
            </Button>
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
                { icon: 'Phone', label: 'Телефон', value: '+7 (981) 777-30-70', href: 'tel:+79817773070' },
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

          </div>

          <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border shadow-xl flex flex-col justify-center">
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">Записаться на бесплатный замер</h3>
            <p className="text-muted-foreground text-sm mb-5 sm:mb-6">Инженер приедет в удобное время с образцами профилей. Позвоните нам, чтобы договориться.</p>
            <a
              href="tel:+79817773070"
              className="w-full flex items-center justify-center gap-3 h-14 rounded-xl font-display text-xl sm:text-2xl font-bold bg-accent hover:bg-primary text-white shadow-glow-orange hover:shadow-glow-blue transition-colors"
            >
              <Icon name="Phone" size={22} /> +7 (981) 777-30-70
            </a>
            <p className="text-xs text-muted-foreground mt-3">
              Звонок бесплатный. Работаем ежедневно с 9:00 до 21:00.
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
          <p className="text-white/70 text-xs sm:text-sm">
            ИНН: 531801753258
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ name, href, Icon: SocialIcon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="grid place-items-center w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <SocialIcon size={18} />
                </a>
              ))}
            </div>
            <a href="tel:+79817773070" className="font-display font-semibold hover:text-white/80 transition-colors">
              +7 (981) 777-30-70
            </a>
          </div>
        </div>
        <div className="container flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-5 pt-5 border-t border-white/10 text-xs text-white/60">
          <a href="/terms" className="hover:text-white transition-colors underline underline-offset-2">
            Пользовательское соглашение
          </a>
          <span className="hidden sm:inline">·</span>
          <a href="/privacy" className="hover:text-white transition-colors underline underline-offset-2">
            Согласие на обработку персональных данных
          </a>
        </div>
        <div className="container mt-3 text-[11px] leading-relaxed text-white/40 text-center max-w-3xl mx-auto">
          Информация, опубликованная на Сайте, носит общий характер и служит для ознакомительных целей,
          не является публичной офертой. В силу ст. 1259 Гражданского кодекса РФ фотографии относятся
          к объектам авторского права. Использование фотографических произведений без согласия
          правообладателя не допускается.
        </div>
      </footer>

      {/* Mobile floating CTA */}
      <div className="fixed bottom-4 inset-x-4 z-50 sm:hidden">
        <a
          href="tel:+79817773070"
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

const VkIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.649-3.503-1.633-1.51-1.723-1.597-.134-3.628 1.914-2.417 4.146-5.286 2.51-6.415-.696-.472-2.075-.472-3.38-.472-.877 0-1.66.008-1.996.008-.792 0-.95.442-1.16 1.137-.7 2.284-2.27 5.297-3.18 5.297-.412 0-.596-.34-.596-1.117v-3.39c0-1.29-.396-1.935-1.463-1.935H8.518c-.72 0-1.129.443-1.129.892 0 .767 1.129.918 1.246 3.013v2.24c0 1.02-.184 1.204-.596 1.204-1.104 0-3.02-3.03-4.29-6.775-.25-.73-.5-1.024-1.297-1.024H.253C.036 4.058 0 4.297 0 4.65c0 .663.806 4.084 3.75 8.572C5.73 16.376 8.395 18 10.797 18c1.446 0 1.622-.325 1.622-.885v-2.048c0-.646.136-.773.596-.773.34 0 .924.17 2.284 1.484 1.552 1.554 1.807 2.216 2.68 2.216h.183z" />
  </svg>
);

const AvitoIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#00AAA6" />
    <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif" fill="white">A</text>
  </svg>
);

const SOCIAL_LINKS = [
  { name: 'VK', href: 'https://vk.ru/zamena_ostekleniya_spb', Icon: VkIcon },
  { name: 'Avito', href: 'https://www.avito.ru/brands/6ad9dd994720d14613d3204a32298aca/all?sellerId=6ad9dd994720d14613d3204a32298aca', Icon: AvitoIcon },
];

export default Index;