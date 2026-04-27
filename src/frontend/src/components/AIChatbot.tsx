import {
  BookOpen,
  Building,
  GraduationCap,
  MessageCircle,
  Phone,
  Send,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

interface ChatMessage {
  id: number;
  role: "bot" | "user";
  text: string;
}

const quickReplies = [
  { label: "Admissions Info", icon: GraduationCap },
  { label: "Academic Programs", icon: BookOpen },
  { label: "Campus Life", icon: Users },
  { label: "Contact Us", icon: Phone },
];

const botResponses: Record<string, string> = {
  "Admissions Info":
    "COEP Technological University offers admissions to B.Tech, M.Tech, MBA, and PhD programmes. Applications are accepted via CAS (Central Admission System) for UG and through GATE/CAT/NET for PG/PhD. Visit coeptech.ac.in/admissions for deadlines.",
  "Academic Programs":
    "COEP offers 9 B.Tech programmes (CSE, Mechanical, Civil, Electrical, ENTC, Chemical, IT, Metallurgy, Instrumentation), 26 PG programmes, MBA, and interdisciplinary PhD research across 13 departments.",
  "Campus Life":
    "Life at COEP includes the famous Regatta boat race, Mindspark tech fest, Impressions cultural fest, NSS, sports clubs, and a vibrant hostel community. The Wellesley Road campus spans lush historic grounds in the heart of Pune.",
  "Contact Us":
    "📞 +91-20-25507000 | 📧 registrar@coeptech.ac.in\n🏛 Wellesley Road, Shivajinagar, Pune – 411 005\n🌐 www.coeptech.ac.in",
};

const greetingMessage: ChatMessage = {
  id: 1,
  role: "bot",
  text: "Hi! I'm COEPBot 🎓 How can I help you today? Choose a topic below or type your question.",
};

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greetingMessage]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, role: "bot", text },
      ]);
      setTimeout(scrollToBottom, 50);
    }, 900);
  };

  const handleQuickReply = (label: string) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user", text: label },
    ]);
    const response =
      botResponses[label] ??
      "I'll connect you to our admissions team shortly. In the meantime, visit coeptech.ac.in for more information.";
    addBotMessage(response);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user", text },
    ]);
    addBotMessage(
      "Thanks for your question! For the most accurate information, please visit coeptech.ac.in or contact our office at registrar@coeptech.ac.in. Our team is happy to help.",
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showQuickReplies =
    messages.length === 1 || messages[messages.length - 1].role === "bot";

  return (
    <>
      {/* Chat panel */}
      {open && (
        <dialog
          open
          className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden p-0 m-0"
          style={{
            width: "340px",
            height: "480px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow:
              "0 24px 80px rgba(8,30,92,0.35), 0 8px 32px rgba(8,30,92,0.2)",
            border: "1px solid rgba(22,72,200,0.12)",
            animation: "chatbotSlideUp 0.3s cubic-bezier(0.4,0,0.2,1) both",
          }}
          aria-label="COEPBot chat assistant"
          data-ocid="chatbot.dialog"
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{
              background: "linear-gradient(135deg, #1648C8 0%, #0F3499 100%)",
            }}
          >
            <div
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "50%",
              }}
            >
              <Building size={18} color="#ffffff" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-bold text-sm text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                COEPBot
              </div>
              <div
                className="text-[10px] flex items-center gap-1"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "#4ade80" }}
                />
                Online · COEP Technological University
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-8 h-8 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "50%",
                color: "#ffffff",
                border: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.15)";
              }}
              aria-label="Close chat"
              data-ocid="chatbot.close_button"
            >
              <X size={14} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] px-3 py-2 text-sm leading-relaxed"
                  style={{
                    background:
                      msg.role === "user" ? "#1648C8" : "rgba(22,72,200,0.06)",
                    color: msg.role === "user" ? "#ffffff" : "#333",
                    borderRadius:
                      msg.role === "user"
                        ? "12px 12px 2px 12px"
                        : "12px 12px 12px 2px",
                    fontFamily: "'Source Sans 3', sans-serif",
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 flex items-center gap-1"
                  style={{
                    background: "rgba(22,72,200,0.06)",
                    borderRadius: "12px 12px 12px 2px",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#1648C8",
                        animation: `bounce 1s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {showQuickReplies && (
            <div
              className="px-3 pb-3 flex flex-wrap gap-1.5 shrink-0"
              style={{ borderTop: "1px solid rgba(22,72,200,0.08)" }}
            >
              <p
                className="w-full text-[10px] uppercase tracking-widest pt-2 pb-1"
                style={{
                  color: "#aaa",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Quick topics
              </p>
              {quickReplies.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleQuickReply(label)}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 transition-all duration-200"
                  style={{
                    background: "rgba(22,72,200,0.06)",
                    color: "#1648C8",
                    border: "1px solid rgba(22,72,200,0.12)",
                    borderRadius: "20px",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "#1648C8";
                    el.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "rgba(22,72,200,0.06)";
                    el.style.color = "#1648C8";
                  }}
                  data-ocid={`chatbot.quick_reply.${label.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  <Icon size={11} />
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3 shrink-0"
            style={{ borderTop: "1px solid rgba(22,72,200,0.1)" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="flex-1 text-sm px-3 py-2 outline-none"
              style={{
                background: "rgba(22,72,200,0.05)",
                border: "1px solid rgba(22,72,200,0.12)",
                borderRadius: "20px",
                color: "#333",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
              data-ocid="chatbot.input"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex items-center justify-center w-9 h-9 shrink-0 transition-all duration-200"
              style={{
                background: input.trim() ? "#1648C8" : "rgba(22,72,200,0.15)",
                color: input.trim() ? "#ffffff" : "#999",
                borderRadius: "50%",
                border: "none",
              }}
              aria-label="Send message"
              data-ocid="chatbot.send_button"
            >
              <Send size={14} />
            </button>
          </div>
        </dialog>
      )}

      {/* Floating trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 transition-all duration-300"
        style={{
          background: open
            ? "#0F3499"
            : "linear-gradient(135deg, #1648C8 0%, #0F3499 100%)",
          borderRadius: "50%",
          border: "3px solid #E8C42A",
          boxShadow: open
            ? "0 8px 32px rgba(8,30,92,0.5)"
            : "0 8px 32px rgba(22,72,200,0.5), 0 0 0 0 rgba(232,196,42,0.4)",
          animation: open ? "none" : "chatbotPulse 3s ease-in-out infinite",
          transform: "scale(1)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
        aria-label={open ? "Close COEPBot" : "Open COEPBot chat assistant"}
        aria-expanded={open}
        data-ocid="chatbot.open_modal_button"
      >
        {open ? (
          <X size={22} color="#ffffff" />
        ) : (
          <MessageCircle size={22} color="#ffffff" />
        )}
      </button>

      <style>{`
        @keyframes chatbotSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatbotPulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(22,72,200,0.5), 0 0 0 0 rgba(232,196,42,0.4); }
          50%       { box-shadow: 0 8px 32px rgba(22,72,200,0.5), 0 0 0 10px rgba(232,196,42,0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="chatbotPulse"] { animation: none; }
        }
      `}</style>
    </>
  );
}
