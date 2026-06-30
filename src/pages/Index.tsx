import { useState } from 'react';
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
const PORTFOLIO_IMG =
  'https://cdn.poehali.dev/projects/a641e062-96ee-476e-88a9-0a00aae5111a/files/e63e0ee3-18dd-4fb2-ad22-6d9cce226213.jpg';

const NAV = [
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Услуги', href: '#services' },
  { label: 'Калькулятор', href: '#calc' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
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

const PROFILES = [
  { name: 'VEKA Softline 70', cameras: '5 камер', glass: 'Двухкамерный 40 мм', warm: '★★★★★', price: 'от 5 900 ₽/м²' },
  { name: 'Rehau Blitz 60', cameras: '3 камеры', glass: 'Однокамерный 32 мм', warm: '★★★★☆', price: 'от 4 900 ₽/м²' },
  { name: 'KBE Эксперт 70', cameras: '5 камер', glass: 'Двухкамерный 40 мм', warm: '★★★★★', price: 'от 5 400 ₽/м²' },
];

const REVIEWS = [
  { name: 'Анна К.', area: 'ЖК «Северная Долина»', text: 'Поменяли холодный алюминий на тёплый профиль — теперь на лоджии зимний сад! Зимой +20 без обогревателя. Монтаж за один день.', rating: 5 },
  { name: 'Дмитрий В.', area: 'Кудрово', text: 'Боялся, что испортят фасад — но снаружи всё осталось как было. Внутри тепло и тихо, шум с улицы пропал. Спасибо инженеру за расчёт.', rating: 5 },
  { name: 'Елена и Сергей', area: 'Приморский р-н', text: 'Объединили балкон с кухней. Сделали тёплый пол, вынесли подоконник-столешницу. Получилась полноценная комната. Рекомендуем!', rating: 5 },
];

const FAQ = [
  { q: 'Чем тёплое остекление отличается от холодного?', a: 'Холодное (алюминиевое) остекление защищает только от дождя и ветра, температура на балконе как на улице. Тёплое — это многокамерный ПВХ-профиль с двухкамерным стеклопакетом, который держит +20°C внутри даже в мороз и позволяет использовать балкон круглый год.' },
  { q: 'Нужно ли согласование на замену остекления?', a: 'При замене холодного остекления на тёплое мы сохраняем внешний облик фасада: цвет, форму и расстекловку. В большинстве случаев согласование не требуется. Если у вашего дома есть особые требования — мы подскажем на замере.' },
  { q: 'Выдержит ли балконная плита вес тёплых окон?', a: 'Тёплый ПВХ-профиль легче, чем кажется. Перед монтажом инженер оценивает состояние плиты и парапета. При необходимости усиливаем основание — это входит в смету и обсуждается заранее.' },
  { q: 'Сколько занимает монтаж?', a: 'Стандартный балкон — 1 день. Лоджия с утеплением и отделкой «под ключ» — 2–4 дня. Точные сроки фиксируем в договоре после замера.' },
  { q: 'Какая гарантия и что в неё входит?', a: 'Гарантия 10 лет на профиль и стеклопакеты, 5 лет на фурнитуру и монтажные работы. Бесплатное сервисное обслуживание в первый год.' },
  { q: 'Можно ли оформить рассрочку?', a: 'Да, рассрочка 0% до 12 месяцев без первоначального взноса. Одобрение онлайн за 5 минут, нужен только паспорт.' },
];

const Index = () => {
  const [area, setArea] = useState([8]);
  const [profile, setProfile] = useState(1);
  const [extras, setExtras] = useState<string[]>([]);

  const profilePrices = [5900, 4900, 5400];
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
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white">
              <Icon name="Snowflake" size={18} />
            </span>
            ТеплоОкна<span className="text-primary">СПб</span>
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-muted-foreground hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+78120000000" className="hidden md:flex items-center gap-2 font-display font-semibold">
              <Icon name="Phone" size={16} className="text-primary" />
              +7 (812) 000-00-00
            </a>
            <Button asChild size="sm" className="rounded-full bg-accent hover:bg-primary text-white shadow-glow-orange">
              <a href="#consult">Консультация</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-28 pb-20 grid-bg">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-5">
              <Icon name="MapPin" size={15} /> Санкт-Петербург и Лен. область
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
              Меняем <span className="text-sky">холодное</span> остекление
              на <span className="text-accent">тёплое</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              Превращаем продуваемый балкон в тёплую комнату за 1 день. Профили VEKA и Rehau,
              гарантия 10 лет, рассрочка 0%. Без изменения фасада.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full text-base h-14 px-8 bg-accent hover:bg-primary text-white shadow-glow-orange hover:shadow-glow-blue">
                <a href="#calc"><Icon name="Calculator" size={20} className="mr-2" /> Рассчитать смету</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-base h-14 px-8 border-primary text-primary hover:bg-primary hover:text-white">
                <a href="#consult">Бесплатный замер</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { n: '12+', t: 'лет на рынке' },
                { n: '4 800+', t: 'тёплых балконов' },
                { n: '10 лет', t: 'гарантии' },
              ].map((s) => (
                <div key={s.t}>
                  <div className="font-display text-3xl font-bold text-primary">{s.n}</div>
                  <div className="text-sm text-muted-foreground">{s.t}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] blur-2xl" />
            <img src={HERO_IMG} alt="Тёплое остекление балкона" className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-xl animate-float hidden sm:flex items-center gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-primary text-white">
                <Icon name="ThermometerSun" size={22} />
              </span>
              <div>
                <div className="font-display font-bold text-lg">+20°C</div>
                <div className="text-xs text-muted-foreground">даже в −25 на улице</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="py-20 bg-secondary/40">
        <div className="container">
          <SectionTitle eyebrow="Почему мы" title="Преимущества тёплого остекления" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="group bg-card rounded-2xl p-7 border border-border hover-lift">
                <span className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-5 group-hover:scale-110 transition-transform">
                  <Icon name={a.icon} size={26} />
                </span>
                <h3 className="font-display text-xl font-semibold mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="container">
          <SectionTitle eyebrow="Что мы делаем" title="Услуги и цены" />
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {SERVICES.map((s) => (
              <div key={s.title} className="flex gap-5 bg-card rounded-2xl p-7 border border-border hover-lift">
                <span className="shrink-0 grid place-items-center w-14 h-14 rounded-2xl bg-primary text-white">
                  <Icon name={s.icon} size={26} />
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                    <span className="font-display font-bold text-accent">{s.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Profiles comparison */}
          <div className="mt-12 rounded-2xl border border-border overflow-hidden">
            <div className="bg-primary text-white px-6 py-4 font-display text-lg font-semibold">
              Сравнение профилей
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="bg-secondary/60 text-left">
                    {['Профиль', 'Камеры', 'Стеклопакет', 'Тепло', 'Цена'].map((h) => (
                      <th key={h} className="px-6 py-3 font-display font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROFILES.map((p, i) => (
                    <tr key={p.name} className={i % 2 ? 'bg-secondary/20' : ''}>
                      <td className="px-6 py-4 font-semibold">{p.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{p.cameras}</td>
                      <td className="px-6 py-4 text-muted-foreground">{p.glass}</td>
                      <td className="px-6 py-4 text-accent">{p.warm}</td>
                      <td className="px-6 py-4 font-display font-bold text-primary">{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator + Consult */}
      <section id="calc" className="py-20 bg-gradient-to-br from-primary via-primary to-sky text-white">
        <div className="container grid lg:grid-cols-2 gap-10">
          {/* Calc */}
          <div className="bg-white text-foreground rounded-3xl p-8 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-2 text-primary font-display font-semibold mb-2">
              <Icon name="Calculator" size={20} /> Калькулятор сметы
            </div>
            <h3 className="font-display text-2xl font-bold mb-6">Узнайте стоимость за минуту</h3>

            <label className="block font-semibold mb-2">Площадь остекления: <span className="text-primary">{area[0]} м²</span></label>
            <Slider value={area} onValueChange={setArea} min={3} max={30} step={1} className="mb-6" />

            <label className="block font-semibold mb-2">Профиль</label>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {PROFILES.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setProfile(i)}
                  className={`rounded-xl border-2 px-2 py-3 text-xs font-semibold transition-all ${
                    profile === i ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'
                  }`}
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <label className="block font-semibold mb-2">Дополнительно</label>
            <div className="space-y-2 mb-6">
              {extraOptions.map((e) => (
                <button
                  key={e.id}
                  onClick={() => toggleExtra(e.id)}
                  className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                    extras.includes(e.id) ? 'border-accent bg-accent/10 text-accent' : 'border-border'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon name={extras.includes(e.id) ? 'CheckCircle2' : 'Circle'} size={18} />
                    {e.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-secondary p-5 flex items-center justify-between">
              <span className="font-medium">Примерная стоимость:</span>
              <span className="font-display text-3xl font-bold text-primary">
                {total.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Точную смету рассчитает инженер на бесплатном замере.
            </p>
          </div>

          {/* Consult form */}
          <div id="consult" className="flex flex-col justify-center animate-fade-in">
            <span className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 font-semibold text-sm mb-4">
              <Icon name="Headset" size={16} /> Онлайн-консультация
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Эксперт рассчитает смету бесплатно
            </h3>
            <p className="text-white/80 mb-7 max-w-md">
              Оставьте контакты — инженер по остеклению свяжется в течение 15 минут, ответит
              на вопросы и подготовит индивидуальный расчёт под ваш балкон.
            </p>
            <form className="space-y-3 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" className="bg-white text-foreground border-0 h-12 rounded-xl" />
              <Input placeholder="Телефон" type="tel" className="bg-white text-foreground border-0 h-12 rounded-xl" />
              <Button size="lg" className="w-full rounded-xl bg-accent hover:bg-white hover:text-primary text-white h-12 font-semibold shadow-glow-orange">
                Получить консультацию
              </Button>
            </form>
            <p className="text-xs text-white/60 mt-3 max-w-md">
              Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20">
        <div className="container">
          <SectionTitle eyebrow="Наши работы" title="Портфолио по объектам СПб" />
          <div className="grid lg:grid-cols-3 gap-6 mt-12">
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group hover-lift">
              <img src={PORTFOLIO_IMG} alt="До и после остекления" className="w-full h-full object-cover aspect-[16/10]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-7">
                <div className="text-white">
                  <span className="px-3 py-1 rounded-full bg-primary text-xs font-semibold">До / После</span>
                  <h3 className="font-display text-2xl font-bold mt-2">ЖК «Северная Долина», 9 м²</h3>
                  <p className="text-white/80 text-sm">Замена алюминия на VEKA 70 + утепление</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              {[
                { jk: 'Кудрово', m: '6 м²', d: 'Тёплое остекление лоджии Rehau' },
                { jk: 'Приморский р-н', m: '12 м²', d: 'Объединение балкона с кухней' },
              ].map((p) => (
                <div key={p.jk} className="bg-card border border-border rounded-2xl p-6 hover-lift flex-1 flex flex-col justify-center">
                  <Icon name="Building2" size={28} className="text-primary mb-3" />
                  <h3 className="font-display text-xl font-semibold">{p.jk}</h3>
                  <p className="text-sm text-muted-foreground">{p.d}</p>
                  <span className="mt-2 font-display font-bold text-accent">{p.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-secondary/40">
        <div className="container">
          <SectionTitle eyebrow="Нам доверяют" title="Отзывы клиентов" />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-card rounded-2xl p-7 border border-border hover-lift flex flex-col">
                <div className="flex gap-1 text-primary mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">«{r.text}»</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid place-items-center w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent text-white font-display font-bold">
                    {r.name[0]}
                  </span>
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container max-w-3xl">
          <SectionTitle eyebrow="Вопрос-ответ" title="Частые вопросы" />
          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-2xl mb-3 px-5 data-[state=open]:bg-secondary/40">
                <AccordionTrigger className="text-left font-display font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contacts / CTA */}
      <section id="contacts" className="py-20 bg-secondary/40">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionTitle eyebrow="Контакты" title="Приезжайте или звоните" align="left" />
            <div className="mt-8 space-y-5">
              {[
                { icon: 'Phone', label: 'Телефон', value: '+7 (812) 000-00-00' },
                { icon: 'Mail', label: 'Почта', value: 'info@teplookna-spb.ru' },
                { icon: 'MapPin', label: 'Офис и производство', value: 'Санкт-Петербург, пр. Энергетиков, 10' },
                { icon: 'Clock', label: 'Режим работы', value: 'Ежедневно с 9:00 до 21:00' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">{c.label}</div>
                    <div className="font-display font-semibold text-lg">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
            <h3 className="font-display text-2xl font-bold mb-2">Записаться на бесплатный замер</h3>
            <p className="text-muted-foreground text-sm mb-6">Инженер приедет в удобное время с образцами профилей.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" className="h-12 rounded-xl" />
              <Input placeholder="Телефон" type="tel" className="h-12 rounded-xl" />
              <Input placeholder="Адрес (район, ЖК)" className="h-12 rounded-xl" />
              <Button size="lg" className="w-full h-12 rounded-xl font-semibold bg-accent hover:bg-primary text-white shadow-glow-orange hover:shadow-glow-blue">Вызвать замерщика</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <Icon name="Snowflake" size={20} /> ТеплоОкна СПб
          </div>
          <p className="text-white/70">© 2026 ТеплоОкна СПб. Тёплое остекление балконов и лоджий.</p>
          <a href="tel:+78120000000" className="font-display font-semibold">+7 (812) 000-00-00</a>
        </div>
      </footer>
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
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky/15 text-primary font-semibold text-sm uppercase tracking-wide">
      {eyebrow}
    </span>
    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 leading-tight">
      {title}
    </h2>
  </div>
);

export default Index;