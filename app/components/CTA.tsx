import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { companyInfo } from "@/config/company"

export default function CTA() {
  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-6">Нужна срочная доставка?</h2>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-muted-foreground">
          Позвоните нам прямо сейчас, и мы организуем доставку в кратчайшие сроки!
        </p>
        <a href={`tel:${companyInfo.phoneRaw}`}>
          <Button className="hover:opacity-90 gap-2 text-sm sm:text-base">
            <Phone className="h-4 w-4" />
            {companyInfo.phone}
          </Button>
        </a>
      </div>
    </section>
  )
}

