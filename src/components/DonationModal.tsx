"use client";

import { useState } from "react";
import { X, Gift, Wallet, CreditCard, User, MessageSquare, Send, Phone } from "lucide-react";

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const cardTypes = [
    { id: "3000", name: "بطاقة الخير", price: "3,000", priceNum: 3000 },
    { id: "25000", name: "بطاقة العطاء", price: "25,000", priceNum: 25000 },
];

const paymentMethods = [
    { id: "zaincash", name: "زين كاش", number: "07716626421", icon: Wallet, color: "bg-purple-600" },
    { id: "mastercard", name: "ماستر كارد", number: "6800319797", icon: CreditCard, color: "bg-orange-600" },
];

const whatsappNumbers = [
    { id: "1", name: "الرقم الأول", number: "9647855588554" },
    { id: "2", name: "الرقم الثاني", number: "9647780400165" },
];

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
    const [selectedCard, setSelectedCard] = useState<string>("");
    const [selectedPayment, setSelectedPayment] = useState<string>("");
    const [selectedWhatsapp, setSelectedWhatsapp] = useState<string>(whatsappNumbers[0].id);
    const [name, setName] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    const handleSubmit = () => {
        // التحقق من الحقول المطلوبة
        if (!selectedCard || !selectedPayment || !name.trim()) {
            alert("الرجاء ملء جميع الحقول المطلوبة");
            return;
        }

        // الحصول على معلومات البطاقة والدفع
        const card = cardTypes.find(c => c.id === selectedCard);
        const payment = paymentMethods.find(p => p.id === selectedPayment);
        const whatsapp = whatsappNumbers.find(w => w.id === selectedWhatsapp);

        if (!card || !payment || !whatsapp) return;

        // إنشاء رسالة الواتساب
        const message = `السلام عليكم ورحمة الله وبركاته

🎁 *طلب شراء بطاقة دعم خيرية*

📋 *تفاصيل الطلب:*
━━━━━━━━━━━━━━━
🏷️ نوع البطاقة: ${card.name}
💰 السعر: ${card.price} دينار عراقي
💳 وسيلة الدفع: ${payment.name}
📱 رقم الدفع: ${payment.number}

👤 *معلومات المساهم:*
━━━━━━━━━━━━━━━
الاسم: ${name}
${notes ? `📝 ملاحظات: ${notes}` : ""}

━━━━━━━━━━━━━━━
شكراً لمساهمتكم في دعم المحتاجين 🙏
مؤسسة أزر للمساعدات الإنسانية`;

        // ترميز الرسالة للرابط
        const encodedMessage = encodeURIComponent(message);

        // فتح واتساب
        const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");

        // إعادة تعيين الحقول وإغلاق النافذة
        setSelectedCard("");
        setSelectedPayment("");
        setName("");
        setNotes("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-dark-900 rounded-2xl border border-amber-500/30 shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-dark-900 p-6 border-b border-dark-700 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
                            <Gift size={20} className="text-dark-900" />
                        </div>
                        <h2 className="text-xl font-bold text-white">ساهم في البطاقة</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* اختيار البطاقة */}
                    <div>
                        <label className="block text-amber-400 font-bold mb-3 flex items-center gap-2">
                            <Gift size={18} />
                            اختر نوع البطاقة *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {cardTypes.map((card) => (
                                <button
                                    key={card.id}
                                    onClick={() => setSelectedCard(card.id)}
                                    className={`p-4 rounded-xl border-2 transition-all text-center ${selectedCard === card.id
                                            ? "border-amber-500 bg-amber-500/10"
                                            : "border-dark-700 bg-dark-800 hover:border-dark-600"
                                        }`}
                                >
                                    <p className="text-sm text-gray-400">{card.name}</p>
                                    <p className="text-xl font-bold text-gradient">{card.price}</p>
                                    <p className="text-xs text-amber-400">دينار</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* اختيار وسيلة الدفع */}
                    <div>
                        <label className="block text-amber-400 font-bold mb-3 flex items-center gap-2">
                            <Wallet size={18} />
                            اختر وسيلة الدفع *
                        </label>
                        <div className="space-y-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedPayment(method.id)}
                                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${selectedPayment === method.id
                                            ? "border-amber-500 bg-amber-500/10"
                                            : "border-dark-700 bg-dark-800 hover:border-dark-600"
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center flex-shrink-0`}>
                                        <method.icon size={24} className="text-white" />
                                    </div>
                                    <div className="text-right flex-grow">
                                        <p className="text-white font-bold">{method.name}</p>
                                        <p className="text-gray-400 text-sm" dir="ltr">{method.number}</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === method.id
                                            ? "border-amber-500 bg-amber-500"
                                            : "border-dark-600"
                                        }`}>
                                        {selectedPayment === method.id && (
                                            <div className="w-2 h-2 rounded-full bg-dark-900" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* الاسم */}
                    <div>
                        <label className="block text-amber-400 font-bold mb-3 flex items-center gap-2">
                            <User size={18} />
                            الاسم الكامل *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="أدخل اسمك الكامل"
                            className="w-full p-4 rounded-xl bg-dark-800 border-2 border-dark-700 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-all"
                        />
                    </div>

                    {/* الملاحظات */}
                    <div>
                        <label className="block text-amber-400 font-bold mb-3 flex items-center gap-2">
                            <MessageSquare size={18} />
                            ملاحظات (اختياري)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="أضف أي ملاحظات تريدها..."
                            rows={3}
                            className="w-full p-4 rounded-xl bg-dark-800 border-2 border-dark-700 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-all resize-none"
                        />
                    </div>

                    {/* اختيار رقم الواتساب */}
                    <div>
                        <label className="block text-amber-400 font-bold mb-3 flex items-center gap-2">
                            <Phone size={18} />
                            إرسال إلى رقم واتساب
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {whatsappNumbers.map((wp) => (
                                <button
                                    key={wp.id}
                                    onClick={() => setSelectedWhatsapp(wp.id)}
                                    className={`p-4 rounded-xl border-2 transition-all text-center ${selectedWhatsapp === wp.id
                                            ? "border-green-500 bg-green-500/10"
                                            : "border-dark-700 bg-dark-800 hover:border-dark-600"
                                        }`}
                                >
                                    <p className="text-sm text-gray-400">{wp.name}</p>
                                    <p className="text-white font-bold text-sm" dir="ltr">+{wp.number.slice(0, 3)} {wp.number.slice(3, 6)} {wp.number.slice(6)}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-dark-900 p-6 border-t border-dark-700">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 gold-gradient text-dark-900 font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 text-lg"
                    >
                        <Send size={20} />
                        إرسال عبر واتساب
                    </button>
                    <p className="text-center text-gray-500 text-sm mt-3">
                        سيتم فتح تطبيق واتساب لإتمام الطلب
                    </p>
                </div>
            </div>
        </div>
    );
}
