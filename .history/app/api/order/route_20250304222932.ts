import { NextResponse } from "next/server";
import { Bot } from "grammy";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req) {
  try {
    const formData = await req.json();
    const message = `🚀 Новый заказ доставки!

📦 Тариф: ${formData.tariff}
📍 Адрес отправления: ${formData.sourceAddress}
🎯 Адрес получения: ${formData.destinationAddress}
📞 Телефон отправителя: ${formData.senderPhone}
📞 Телефон получателя: ${formData.recipientPhone}
📦 Содержимое: ${formData.packageContents}
📲 Контактный телефон: ${formData.contactPhone}
👤 Имя: ${formData.name}
✉️ Email: ${formData.email}
📝 Сообщение: ${formData.message}`;

    await bot.api.sendMessage(CHAT_ID, message);

    return NextResponse.json({
      success: true,
      message: "Заказ успешно отправлен",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
