import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Оформите заказ",
    description: "Заполните форму на сайте или позвоните нам по телефону.",
  },
  {
    number: "02",
    title: "Получите подтверждение",
    description: "Наш менеджер свяжется с вами для уточнения деталей и стоимости.",
  },
  {
    number: "03",
    title: "Курьер заберет посылку",
    description: "Курьер приедет по указанному адресу и заберет отправление.",
  },
  {
    number: "04",
    title: "Доставка получателю",
    description: "Курьер доставит посылку по адресу назначения в указанное время.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-20">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Как это работает</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="relative overflow-hidden rounded-lg border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 sm:p-6 h-full">
                <div className="text-3xl sm:text-4xl font-bold text-primary/20 mb-3 sm:mb-4">{step.number}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

