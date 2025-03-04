"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import DeliveryMap from "./delivery-map";

import Backgroung from "./image.jpg";
import Image from "next/image";

const packageTypes = [
  { value: "documents", label: "Документы" },
  { value: "personal", label: "Личные вещи" },
  { value: "flowers", label: "Цветы" },
  { value: "electronics", label: "Электроника" },
  { value: "food", label: "Продукты питания" },
  { value: "clothes", label: "Одежда и обувь" },
  { value: "furniture", label: "Мебель" },
  { value: "medicine", label: "Лекарства" },
];

interface FormData {
  tariff: string;
  sourceAddress: string;
  destinationAddress: string;
  senderPhone: string;
  recipientPhone: string;
  packageContents: string;
  contactPhone: string;
  name: string;
  email: string;
  message: string;
}

async function sendOrder(orderData: FormData) {
  const response = await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const result = await response.json();
  if (result.success) {
    console.log("Заказ успешно отправлен!");
  } else {
    throw new Error(result.error);
  }
}

export default function Hero() {
  const [step, setStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    tariff: "standard",
    sourceAddress: "",
    destinationAddress: "",
    senderPhone: "",
    recipientPhone: "",
    packageContents: "",
    contactPhone: "",
    name: "",
    email: "",
    message: "",
  });
  const [selectedPackageType, setSelectedPackageType] = useState<string | null>(
    null
  );

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (isStepValid()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!formData.tariff;
      case 2:
        return (
          !!formData.sourceAddress &&
          !!formData.destinationAddress &&
          !!formData.senderPhone &&
          !!formData.recipientPhone
        );
      case 3:
        return !!formData.packageContents;
      case 4:
        return !!formData.contactPhone && !!formData.name && !!formData.email;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    try {
      // In a real application, you would send the data to your backend
      await sendOrder(formData);
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="relative pt-24 py-20">
      <div className="absolute top-0 left-0 h-full w-full">
        <Image
          width={1920}
          objectFit="cover"
          alt="hero"
          src={Backgroung}
          className="h-full w-full opacity-30 object-cover object-center blur-xs"
        />
      </div>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative ">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 sm:mb-8  mt-6 sm:mt-8 text-left md:text-center">
          Курьерская доставка по Москве
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 text-left md:text-center ">
          Быстрая и надежная доставка документов, посылок и грузов по Москве в
          течение дня или нескольких часов
        </p>

        <div className="relative overflow-hidden rounded-lg border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 sm:p-6">
          {!formSubmitted ? (
            <>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Оформить доставку
              </h2>

              {/* Step 1: Tariff Selection */}
              {step === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold">Тарифы</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div
                      className={`p-4 sm:p-6 rounded-lg border border-border/40 cursor-pointer transition-colors ${
                        formData.tariff === "standard"
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-primary/5"
                      }`}
                      onClick={() => updateFormData("tariff", "standard")}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-base sm:text-lg font-medium">
                            Обычный
                          </h4>
                          <p className="text-xl sm:text-2xl font-bold mt-2">
                            от 250 руб.
                          </p>
                          <p className="text-sm sm:text-base text-muted-foreground mt-1">
                            доставка в течение суток
                          </p>
                        </div>
                        {formData.tariff === "standard" && (
                          <Check className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                        )}
                      </div>
                    </div>

                    <div
                      className={`p-4 sm:p-6 rounded-lg border border-border/40 cursor-pointer transition-colors ${
                        formData.tariff === "express"
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-primary/5"
                      }`}
                      onClick={() => updateFormData("tariff", "express")}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-base sm:text-lg font-medium">
                            Быстрый
                          </h4>
                          <p className="text-xl sm:text-2xl font-bold mt-2">
                            от 500 руб.
                          </p>
                          <p className="text-sm sm:text-base text-muted-foreground mt-1">
                            доставка в течение 2-х часов
                          </p>
                        </div>
                        {formData.tariff === "express" && (
                          <Check className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 sm:mt-6">
                    <Button
                      onClick={nextStep}
                      disabled={!formData.tariff}
                      className="px-4 sm:px-6 text-sm sm:text-base"
                    >
                      Далее
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Addresses */}
              {step === 2 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Адреса доставки
                  </h3>

                  <DeliveryMap
                    onSourceAddressChange={(address) =>
                      updateFormData("sourceAddress", address)
                    }
                    onDestinationAddressChange={(address) =>
                      updateFormData("destinationAddress", address)
                    }
                    sourceAddress={formData.sourceAddress}
                    destinationAddress={formData.destinationAddress}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label
                        htmlFor="sender-phone"
                        className="text-sm sm:text-base"
                      >
                        Номер телефона отправителя
                      </Label>
                      <Input
                        id="sender-phone"
                        type="tel"
                        className="mt-1 text-sm sm:text-base"
                        value={formData.senderPhone}
                        onChange={(e) =>
                          updateFormData("senderPhone", e.target.value)
                        }
                        placeholder="Введите номер телефона"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="recipient-phone"
                        className="text-sm sm:text-base"
                      >
                        Номер телефона получателя
                      </Label>
                      <Input
                        id="recipient-phone"
                        type="tel"
                        className="mt-1 text-sm sm:text-base"
                        value={formData.recipientPhone}
                        onChange={(e) =>
                          updateFormData("recipientPhone", e.target.value)
                        }
                        placeholder="Введите номер телефона"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-4 sm:mt-6">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="text-sm sm:text-base"
                    >
                      Назад
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={
                        !formData.sourceAddress ||
                        !formData.destinationAddress ||
                        !formData.senderPhone ||
                        !formData.recipientPhone
                      }
                      className="px-4 sm:px-6 text-sm sm:text-base"
                    >
                      Далее
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Package Contents */}
              {step === 3 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Содержимое посылки
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <Label
                        htmlFor="package-contents"
                        className="text-sm sm:text-base"
                      >
                        Что в посылке
                      </Label>
                      <Input
                        id="package-contents"
                        placeholder="Опишите содержимое посылки"
                        className="mt-1 text-sm sm:text-base"
                        value={formData.packageContents}
                        onChange={(e) =>
                          updateFormData("packageContents", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2">
                        {packageTypes.map((type) => (
                          <div
                            key={type.value}
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm cursor-pointer transition-colors ${
                              selectedPackageType === type.value
                                ? "bg-primary text-white"
                                : "bg-primary/10 hover:bg-primary/20"
                            }`}
                            onClick={() => {
                              updateFormData("packageContents", type.label);
                            }}
                          >
                            {type.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4 sm:mt-6">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="text-sm sm:text-base"
                    >
                      Назад
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={!formData.packageContents}
                      className="px-4 sm:px-6 text-sm sm:text-base"
                    >
                      Далее
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Information */}
              {step === 4 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Контактные данные
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-sm sm:text-base">
                        Телефон
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="mt-1 text-sm sm:text-base"
                        value={formData.contactPhone}
                        onChange={(e) =>
                          updateFormData("contactPhone", e.target.value)
                        }
                        placeholder="Введите номер телефона"
                      />
                    </div>

                    <div>
                      <Label htmlFor="name" className="text-sm sm:text-base">
                        Имя
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ваше имя"
                        className="mt-1 text-sm sm:text-base"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="email" className="text-sm sm:text-base">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="mt-1 text-sm sm:text-base"
                        value={formData.email}
                        onChange={(e) =>
                          updateFormData("email", e.target.value)
                        }
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="message" className="text-sm sm:text-base">
                        Сообщение (необязательно)
                      </Label>
                      <Input
                        id="message"
                        placeholder="Дополнительная информация"
                        className="mt-1 text-sm sm:text-base"
                        value={formData.message}
                        onChange={(e) =>
                          updateFormData("message", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-primary/5 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      <strong className="text-foreground">Стоимость: </strong>
                      Обговаривается с менеджером, перезвонит в течение 15 минут
                      после оформления заказа в рабочее время.
                    </p>
                  </div>

                  <div className="flex justify-between mt-4 sm:mt-6">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="text-sm sm:text-base"
                    >
                      Назад
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        !formData.contactPhone ||
                        !formData.name ||
                        !formData.email
                      }
                      className="px-4 sm:px-6 text-sm sm:text-base"
                    >
                      Оформить доставку
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Заявка успешно отправлена!
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Наш менеджер свяжется с вами в ближайшее время для уточнения
                деталей заказа.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
