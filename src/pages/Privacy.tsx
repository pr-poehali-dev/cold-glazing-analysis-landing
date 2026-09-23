import Icon from '@/components/ui/icon';

const Privacy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container py-10 sm:py-16 max-w-3xl">
      <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <Icon name="ArrowLeft" size={16} /> На главную
      </a>
      <h1 className="font-display text-2xl sm:text-4xl font-bold mb-6">Согласие на обработку персональных данных</h1>
      <div className="space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
        <p>
          Оставляя заявку на сайте ООО «Ленинградские Фасады» (далее — «Компания»), Пользователь даёт
          согласие на обработку своих персональных данных на условиях, изложенных ниже.
        </p>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-2">1. Состав персональных данных</h2>
        <p>
          Компания обрабатывает следующие данные: имя, номер телефона, адрес объекта (при вызове
          замерщика), а также иные данные, добровольно предоставленные Пользователем через формы на сайте.
        </p>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-2">2. Цели обработки</h2>
        <p>
          Персональные данные обрабатываются в целях: обратной связи по заявке, расчёта стоимости услуг,
          согласования выезда замерщика, заключения и исполнения договора, информирования об акциях и
          специальных предложениях.
        </p>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-2">3. Условия обработки</h2>
        <p>
          Обработка персональных данных осуществляется с использованием и без использования средств
          автоматизации, включает сбор, запись, хранение, уточнение и удаление данных. Компания принимает
          необходимые организационные и технические меры для защиты персональных данных от
          неправомерного доступа.
        </p>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-2">4. Срок действия согласия</h2>
        <p>
          Согласие действует бессрочно с момента предоставления данных и может быть отозвано
          Пользователем в любой момент путём направления письменного уведомления по контактным
          данным, указанным на сайте.
        </p>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground pt-2">5. Права Пользователя</h2>
        <p>
          Пользователь вправе запросить информацию о своих персональных данных, обрабатываемых
          Компанией, требовать их уточнения, блокирования или уничтожения в случаях, предусмотренных
          законодательством о персональных данных.
        </p>
      </div>
    </div>
  </div>
);

export default Privacy;
