"use client";

import { useState } from "react";
import { curriculum, reviews, resources } from "@/lib/courseData";
import { PlayCircle, FileText, CheckCircle2, Star, Download } from "lucide-react";

export function CourseTabs() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-10 md:px-12">
      <div className="flex items-center gap-8 border-b border-line mb-8">
        {["overview", "curriculum", "reviews", "resources"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[14.5px] font-semibold capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-emerald text-emerald-deep"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === "overview" && (
          <div className="prose prose-emerald max-w-3xl text-ink-soft">
            <h3 className="text-xl font-bold text-ink mb-4">About this course</h3>
            <p className="mb-4">
              This comprehensive course takes you from the absolute basics of Generative Engine Optimization all the way to advanced strategies used by top tech companies.
            </p>
            <p className="mb-4">
              You will learn how to structure content, optimize for AI summaries, and ensure your brand remains highly visible in the era of LLM-driven search.
            </p>
            <h4 className="text-lg font-bold text-ink mt-8 mb-4">What you'll learn</h4>
            <ul className="space-y-2">
              <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald shrink-0 mt-0.5"/> The difference between traditional SEO and GEO</li>
              <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald shrink-0 mt-0.5"/> Formatting data for maximum AI comprehension</li>
              <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald shrink-0 mt-0.5"/> Understanding Retrieval-Augmented Generation (RAG)</li>
            </ul>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="max-w-3xl flex flex-col gap-4">
            {curriculum.map((module, i) => (
              <div key={module.id} className="rounded-xl border border-line bg-paper p-5">
                <div className="mb-4">
                  <h4 className="font-bold text-[16px] text-ink">{module.title}</h4>
                  <p className="text-sm text-ink-soft mt-1">{module.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-ink/[0.02]">
                      <div className="flex items-center gap-3">
                        {lesson.type === "video" ? (
                          <PlayCircle size={18} className="text-emerald" />
                        ) : (
                          <FileText size={18} className="text-gold" />
                        )}
                        <span className="text-sm font-medium">{lesson.title}</span>
                      </div>
                      <span className="text-xs text-muted font-code">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-4xl font-display font-bold">4.9</h3>
              <div className="flex flex-col">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-muted mt-1">Based on 1,850 reviews</span>
              </div>
            </div>
            {reviews.map((review) => (
              <div key={review.id} className="border-t border-line pt-6">
                <div className="flex items-center gap-4 mb-3">
                  <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-[14.5px] font-bold">{review.author}</p>
                    <p className="text-[12.5px] text-muted">{review.role}</p>
                  </div>
                  <span className="ml-auto text-xs text-muted">{review.date}</span>
                </div>
                <div className="flex text-gold mb-2">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "resources" && (
          <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((res) => (
              <a key={res.id} href={res.url} className="flex items-center justify-between p-4 rounded-xl border border-line bg-paper hover:border-emerald hover:shadow-sm transition-all group">
                <div>
                  <h4 className="font-semibold text-[14.5px] group-hover:text-emerald transition-colors">{res.title}</h4>
                  <p className="text-xs text-muted mt-1 uppercase tracking-wide">{res.type}</p>
                </div>
                <Download size={18} className="text-ink-soft group-hover:text-emerald" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
