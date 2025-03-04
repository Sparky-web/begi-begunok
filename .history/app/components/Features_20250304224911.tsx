import { Clock, MapPin, Package, Truck } from "lucide-react";

const features = [
  {
    icon: <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Быстрая доставка",
    description: "Доставка в течение 2-х часов или в тот же день по Москве.",
  },
  {
    icon: <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Вся Москва",
    description: "Работаем по всей Москве и ближайшему Подмосковью.",
  },
  {
    icon: <Package className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Любые отправления",
    description: "От документов до крупногабаритных грузов.",
  },
  {
    icon: <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />,
    title: "Разные виды транспорта",
    description: "Пешие курьеры, велокурьеры и автомобильная доставка.",
  },
];

export default function Features() {
  return (
    <section id="services" className="py-12 sm:py-20" id="services">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-clip-text">
          Наши услуги
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 sm:p-6"
            >
              <div className="mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
