import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Обычный",
    price: "от 250 ₽",
    features: [
      "Доставка в течение дня",
      "По всей Москве",
      "Документы и небольшие посылки",
      "Отслеживание статуса",
    ],
  },
  {
    name: "Быстрый",
    price: "от 500 ₽",
    features: [
      "Доставка в течение 2-х часов",
      "По всей Москве",
      "Документы и небольшие посылки",
      "Отслеживание статуса",
      "Приоритетное обслуживание",
    ],
  },
  {
    name: "Грузовой",
    price: "от 1000 ₽",
    features: [
      "Доставка крупногабаритных грузов",
      "По всей Москве и области",
      "Грузоподъемность до 1.5 тонн",
      "Отслеживание статуса",
      "Помощь при погрузке/разгрузке",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 sm:py-20">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          Тарифы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 sm:p-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                {plan.name}
              </h3>
              <p className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
                {plan.price}
              </p>
              <ul className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button className="w-full hover:opacity-90 text-sm sm:text-base">
                Заказать
              </Button>
            </div>
          ))}
        </div>
        <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
          * Окончательная стоимость зависит от расстояния, веса и габаритов
          отправления
        </p>
      </div>
    </section>
  );
}
