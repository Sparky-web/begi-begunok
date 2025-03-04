import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { companyInfo } from "@/config/company"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold ">
          {companyInfo.name}
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Услуги
          </Link>
          <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Как это работает
          </Link>
          <Link href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Тарифы
          </Link>
          <Link href="#business" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Для бизнеса
          </Link>
        </nav>
        <a href={`tel:${companyInfo.phoneRaw}`}>
          <Button className="hover:opacity-90 gap-2">
            <Phone className="h-4 w-4" />
            {companyInfo.phone}
          </Button>
        </a>
      </div>
    </header>
  )
}

