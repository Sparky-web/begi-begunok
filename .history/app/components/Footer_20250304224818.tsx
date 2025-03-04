import Link from "next/link";
import { MapPin, Phone, Clock, BellIcon as BrandTelegram } from "lucide-react";
import { companyInfo } from "@/config/company";

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-12">
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {companyInfo.name}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            Курьерская служба доставки по Москве и области.
          </p>
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Услуги
          </h4>
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <Link
                href="#order"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
              >
                Курьерская доставка
              </Link>
            </li>
            <li>
              <Link
                href="#order"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
              >
                Экспресс-доставка
              </Link>
            </li>
            {/* <li>
              <Link
                href="#"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
              >
                Грузовая доставка
              </Link>
            </li> */}
          </ul>
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Компания
          </h4>
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <Link
                href="#"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
              >
                О нас
              </Link>
            </li>
            {/* <li>
              <Link
                href="#"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
              >
                Вакансии
              </Link>
            </li> */}
            <li>
              <Link
                href="#"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
              >
                Контакты
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Контакты
          </h4>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-start">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0 text-primary" />
              <span className="text-sm sm:text-base text-muted-foreground">
                {companyInfo.address}
              </span>
            </li>
            <li className="flex items-start">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0 text-primary" />
              <a
                href={`tel:${companyInfo.phoneRaw}`}
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
              >
                {companyInfo.phone}
              </a>
            </li>
            <li className="flex items-start">
              <BrandTelegram className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0 text-primary" />
              <a
                href={`https://t.me/${companyInfo.telegram.substring(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
              >
                {companyInfo.telegram}
              </a>
            </li>
            <li className="flex items-start">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0 text-primary" />
              <span className="text-sm sm:text-base text-muted-foreground">
                {companyInfo.workingHours}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto border-t border-border/40 py-4 sm:py-6">
        <p className="text-center text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} {companyInfo.name}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
