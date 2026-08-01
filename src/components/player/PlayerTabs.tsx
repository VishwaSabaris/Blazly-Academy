"use client";
import { useState } from "react";
import { AIAssistant } from "./AIAssistant";
import { Lesson } from "@/lib/courseData";
import { FileText, Download, MessageSquare } from "lucide-react";

export function PlayerTabs({ lesson }: { lesson: Lesson }) {
  const [activeTab, setActiveTab] = useState("ai-assistant");
  const [notes, setNotes] = useState("");

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-2 border-b border-line mb-6">
        {["ai-assistant", "notes", "resources", "transcript", "discussion"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 text-[13.5px] font-semibold capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-emerald text-emerald-deep"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="mb-10">
        {activeTab === "ai-assistant" && (
          <AIAssistant currentLessonTitle={lesson.title} />
        )}

        {activeTab === "notes" && (
          <div className="bg-paper border border-line rounded-xl p-2">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Take notes for this lesson... They will be saved automatically."
              className="w-full min-h-[300px] p-4 bg-transparent outline-none text-[14.5px] leading-relaxed resize-y text-ink-soft"
            />
          </div>
        )}

        {activeTab === "resources" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="#" className="flex items-center gap-3 p-4 rounded-xl border border-line bg-paper hover:border-emerald transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald/10 text-emerald-deep flex items-center justify-center shrink-0">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Lesson Slides</h4>
                <p className="text-xs text-muted">PDF Document</p>
              </div>
              <Download size={18} className="text-ink-soft" />
            </a>
          </div>
        )}

        {activeTab === "transcript" && (
          <div className="bg-paper border border-line rounded-xl p-6 text-[14.5px] leading-relaxed text-ink-soft max-h-[400px] overflow-y-auto">
            <p className="mb-4">
              <span className="font-bold text-ink mr-2">00:00</span> Welcome to this lesson on {lesson.title}. Today we're going to dive deep into the concepts that make Generative Engine Optimization so powerful.
            </p>
            <p className="mb-4">
              <span className="font-bold text-ink mr-2">01:15</span> As you probably already know, traditional SEO is no longer enough. The way large language models process information requires a completely different approach to content structuring.
            </p>
            <p>
              <span className="font-bold text-ink mr-2">02:30</span> Let's look at how we can implement these techniques in practice...
            </p>
          </div>
        )}

        {activeTab === "discussion" && (
          <div className="flex flex-col items-center justify-center h-[300px] bg-paper-raised border border-dashed border-line rounded-xl text-center p-6">
            <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center text-ink-soft mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-bold text-ink mb-2">Join the conversation</h3>
            <p className="text-sm text-ink-soft max-w-sm mb-4">
              Connect with other students taking this course. Ask questions, share insights, and get feedback.
            </p>
            <button className="px-5 py-2 bg-ink text-paper text-sm font-semibold rounded-lg hover:-translate-y-px transition-all">
              Start a Discussion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
