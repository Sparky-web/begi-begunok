import { companyInfo } from "@/config/company";

export default function CompanyRequisites() {
  const { requisites } = companyInfo;

  return (
    <div className=" mx-auto relative overflow-hidden rounded-lg border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-8 sm:mb-12">Реквизиты компании</h2>
      <div className="grid gap-4 sm:gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 ">
          <div className="text-sm sm:text-base text-muted-foreground">
            Название организации
          </div>
          <div className="md:col-span-2 text-sm sm:text-base font-medium">
            {requisites.name}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
          <div className="text-sm sm:text-base text-muted-foreground">
            Юридический адрес организации
          </div>
          <div className="md:col-span-2 text-sm sm:text-base">
            {requisites.address}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 ">
          <div className="text-sm sm:text-base text-muted-foreground">ИНН</div>
          <div className="md:col-span-2 text-sm sm:text-base font-mono">
            {requisites.inn}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
          <div className="text-sm sm:text-base text-muted-foreground">
            Расчетный счет
          </div>
          <div className="md:col-span-2 text-sm sm:text-base font-mono">
            {requisites.account}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 ">
          <div className="text-sm sm:text-base text-muted-foreground">
            ОГРН/ОГРНИП
          </div>
          <div className="md:col-span-2 text-sm sm:text-base font-mono">
            {requisites.ogrnip}
          </div>
        </div>
      </div>
    </div>
  );
}
