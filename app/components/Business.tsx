import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { companyInfo } from "@/config/company";
import CompanyRequisites from "@/components/requisites";

export default function Business() {
  return (
    <section id="business" className="py-12 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-lg border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 sm:p-12">
          <div className="grid gap-6 sm:gap-8 items-center">
            <div className="grid h-full">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                Для бизнеса
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
                Специальные условия для компаний с регулярными потребностями в
                курьерской доставке. Наши специалисты подготовят персональное
                предложение с учетом особенностей вашего бизнеса и объемов
                доставок.
              </p>
              <a href={`tel:${companyInfo.phoneRaw}`}>
                <Button className="hover:opacity-90 gap-2 text-sm sm:text-base mt-auto">
                  <Phone className="h-4 w-4" />
                  {companyInfo.phone}
                </Button>
              </a>
            </div>
          </div>
        </div>
        <CompanyRequisites />
      </div>
    </section>
  );
}
