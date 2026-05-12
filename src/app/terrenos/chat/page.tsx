"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerrenosBottomNav } from "@/components/terrenos/bottom-nav";
import { Send, Paperclip, Mic, Search, Plus, Check, CheckCheck } from "lucide-react";

const mockRooms = [
  {
    id: "1", name: "Lagos Branch Team", type: "group",
    last_message: "Let's close the Adebayo deal today", last_message_at: "2m",
    unread: 3, avatar: "LG",
  },
  {
    id: "2", name: "Emeka Okonkwo", type: "direct",
    last_message: "Client confirmed payment ✓", last_message_at: "15m",
    unread: 0, avatar: "EO",
  },
  {
    id: "3", name: "Property Team", type: "group",
    last_message: "New estate photos uploaded", last_message_at: "1h",
    unread: 7, avatar: "PT",
  },
  {
    id: "4", name: "Tunde Adeyemi", type: "direct",
    last_message: "When is the next open day?", last_message_at: "3h",
    unread: 1, avatar: "TA",
  },
  {
    id: "5", name: "Finance & Payments", type: "group",
    last_message: "Monthly report ready for review", last_message_at: "1d",
    unread: 0, avatar: "FP",
  },
];

const mockMessages = [
  { id: "1", sender: "Emeka O.", content: "Good morning team! Ready to crush today's targets?", time: "9:00 AM", isMe: false, status: "read" },
  { id: "2", sender: "Me", content: "Absolutely! I have 3 site visits lined up for today.", time: "9:02 AM", isMe: true, status: "read" },
  { id: "3", sender: "Tunde A.", content: "The Adebayo family confirmed they're coming in at 2pm 🏠", time: "9:15 AM", isMe: false, status: "read" },
  { id: "4", sender: "Me", content: "Perfect! I'll prepare the Greenfield Estate documents.", time: "9:17 AM", isMe: true, status: "read" },
  { id: "5", sender: "Emeka O.", content: "Also, new lead from Facebook Ad — Chioma Okafor, looking for 4-bed duplex in Lagos. Budget: ₦25M", time: "9:30 AM", isMe: false, status: "read" },
  { id: "6", sender: "Me", content: "I'll follow up with her immediately 💪", time: "9:31 AM", isMe: true, status: "delivered" },
];

export default function TerrenosChat() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeRoom]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "Me",
        content: message,
        time: new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
        status: "sent",
      },
    ]);
    setMessage("");
  };

  const filteredRooms = mockRooms.filter((r) =>
    !search || r.name.toLowerCase().includes(search.toLowerCase())
  );

  if (activeRoom) {
    const room = mockRooms.find((r) => r.id === activeRoom);
    return (
      <div className="min-h-dvh bg-[#0a0a0a] flex flex-col">
        {/* Chat header */}
        <div
          className="sticky top-0 z-40 flex items-center gap-3 px-4 pt-12 pb-3"
          style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveRoom(null)}
            className="w-9 h-9 rounded-xl glass flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black"
            style={{ background: "linear-gradient(135deg, #d4af37, #b8960c)", color: "#0a0a0a" }}
          >
            {room?.avatar}
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{room?.name}</p>
            <p className="text-green-400 text-[10px]">● Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 mobile-scroll" style={{ paddingBottom: 100 }}>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[78%] ${msg.isMe ? "" : "flex gap-2"}`}>
                {!msg.isMe && (
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-auto"
                    style={{ background: "rgba(212,175,55,0.2)", color: "#d4af37" }}
                  >
                    {msg.sender.split(" ").map(n => n[0]).join("")}
                  </div>
                )}
                <div>
                  {!msg.isMe && (
                    <p className="text-white/40 text-[9px] mb-1 ml-1">{msg.sender}</p>
                  )}
                  <div
                    className="px-4 py-2.5 rounded-2xl text-sm"
                    style={{
                      background: msg.isMe
                        ? "linear-gradient(135deg, #d4af37, #b8960c)"
                        : "rgba(255,255,255,0.06)",
                      color: msg.isMe ? "#0a0a0a" : "#fff",
                      borderRadius: msg.isMe ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    }}
                  >
                    {msg.content}
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${msg.isMe ? "justify-end" : ""}`}>
                    <p className="text-white/25 text-[9px]">{msg.time}</p>
                    {msg.isMe && (
                      msg.status === "read"
                        ? <CheckCheck size={10} className="text-[#d4af37]" />
                        : <Check size={10} className="text-white/30" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <div
          className="sticky bottom-0 px-4 py-3 flex items-center gap-2"
          style={{
            background: "rgba(10,10,10,0.95)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <button className="w-9 h-9 rounded-xl glass flex items-center justify-center flex-shrink-0">
            <Paperclip size={16} className="text-white/40" />
          </button>
          <div className="flex-1 relative">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="w-full h-11 bg-white/06 border border-white/10 rounded-2xl px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#d4af37]/30"
            />
          </div>
          {message.trim() ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #d4af37, #b8960c)" }}
            >
              <Send size={16} className="text-[#0a0a0a]" />
            </motion.button>
          ) : (
            <button className="w-11 h-11 rounded-xl glass flex items-center justify-center flex-shrink-0">
              <Mic size={16} className="text-white/40" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#0a0a0a] safe-pb">
      {/* Header */}
      <div className="sticky top-0 z-40 px-5 pt-12 pb-3" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">Messages</h1>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl glass flex items-center justify-center">
              <Plus size={16} className="text-white/60" />
            </button>
          </div>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full h-11 bg-white/05 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#d4af37]/30"
          />
        </div>
      </div>

      <div className="px-5">
        <div className="divide-y divide-white/04">
          {filteredRooms.map((room, i) => (
            <motion.button
              key={room.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveRoom(room.id)}
              className="w-full flex items-center gap-3 py-3.5 text-left"
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))",
                    border: "1px solid rgba(212,175,55,0.2)",
                    color: "#d4af37",
                  }}
                >
                  {room.avatar}
                </div>
                {room.unread > 0 && (
                  <div
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: "#d4af37", color: "#0a0a0a" }}
                  >
                    {room.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold text-sm">{room.name}</p>
                  <p className="text-white/30 text-[10px]">{room.last_message_at}</p>
                </div>
                <p className="text-white/40 text-xs truncate mt-0.5">{room.last_message}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <TerrenosBottomNav />
    </div>
  );
}
