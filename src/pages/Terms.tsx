import Icon from '@/components/ui/icon';

const Terms = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container py-10 sm:py-16 max-w-3xl">
      <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <Icon name="ArrowLeft" size={16} /> На главную
      </a>
      <h1 className="font-display text-2xl sm:text-4xl font-bold mb-6">Пользовательское соглашение</h1>
      <div className="space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
        <p>
          Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между
          ООО «Ленинградские Фасады» (далее — «Компания») и посетителем сайта (далее — «Пользователь»)
          при использовании сайта Компании.
        </p>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-2">1. Общие положения</h2>
        <p>
          Используя сайт, Пользователь подтверждает, что ознакомился с условиями настоящего Соглашения
          и принимает их в полном объёме. Если Пользователь не согласен с условиями Соглашения, он
          обязан прекратить использование сайта.
        </p>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-2">2. Предмет соглашения</h2>
        <p>
          Компания предоставляет Пользователю доступ к информации о товарах и услугах, размещённой на
          сайте, включая калькулятор расчёта стоимости, формы обратной связи и контактные данные.
        </p>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-2">3. Права и обязанности сторон</h2>
        <p>
          Компания обязуется предоставлять актуальную информацию об услугах и ценах. Стоимость,
          указанная на сайте, носит предварительный характер и уточняется после бесплатного замера.
          Пользователь обязуется предоставлять достоверные контактные данные при оформлении заявки.
        </p>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-2">4. Ответственность</h2>
        <p>
          Компания не несёт ответственности за временную недоступность сайта по техническим причинам.
          Все споры решаются путём переговоров, а при недостижении согласия — в порядке, установленном
          законодательством Российской Федерации.
        </p>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-2">5. Заключительные положения</h2>
        <p>
          Компания вправе вносить изменения в настоящее Соглашение в одностороннем порядке. Актуальная
          версия всегда размещена на данной странице.
        </p>
      </div>
    </div>
  </div>
);

export default Terms;
