"use client";

import { useState } from "react";
import { Check, AlertCircle, RefreshCw, ChevronRight } from "lucide-react";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: number;
}

const quizDatabase: Record<number, Question[]> = {
  1: [
    {
      questionText: "A business ranks highly on Google, but an AI assistant answers a customer’s category question without mentioning the business. Which statement best explains the GEO problem?",
      options: [
        "The business has strong SEO but weak AI search visibility.",
        "The business has strong AI visibility but weak website traffic.",
        "The business needs more paid advertising to enter the AI answer.",
        "The business needs to increase its Google keyword density."
      ],
      correctAnswer: 0
    },
    {
      questionText: "Google’s PageRank helped transform web search primarily because it evaluated pages using which important credibility signal?",
      options: [
        "The number and quality of links pointing to a page.",
        "The number of images displayed on a page.",
        "The age of the website’s domain.",
        "The frequency of one keyword on the page."
      ],
      correctAnswer: 0
    },
    {
      questionText: "A user asks, “What CRM should I use for a 5-person B2B sales team?” Which response pattern best represents an AI answer engine rather than a traditional search engine?",
      options: [
        "A ranked list of web pages requiring the user to compare them.",
        "A synthesized recommendation tailored to the team’s stated context.",
        "A manually curated directory organized by business category.",
        "A list of advertisements followed by unrelated organic links."
      ],
      correctAnswer: 1
    },
    {
      questionText: "A company wants to improve its visibility in AI-generated answers. Which action most closely matches the GEO definition in the certification material?",
      options: [
        "Optimize the brand, content, and digital presence for AI citation and recommendation.",
        "Purchase advertisements to guarantee a top position in AI answers.",
        "Optimize only video titles for a social media recommendation algorithm.",
        "Increase website traffic without changing content or authority."
      ],
      correctAnswer: 0
    },
    {
      questionText: "A customer reads a complete AI-generated answer and never visits any website. Which search behavior does this most directly demonstrate?",
      options: [
        "Zero-click information consumption.",
        "Multi-click research.",
        "Directory-based discovery.",
        "Desktop-first research."
      ],
      correctAnswer: 0
    }
  ],
  2: [
    {
      questionText: "Many people assume ChatGPT works exactly like Google. What is the key difference explained in this module?",
      options: [
        "Google gives links to webpages, while AI systems can generate a direct answer.",
        "Google only searches images, while AI only searches text.",
        "Google generates answers from learned knowledge, while AI only displays links.",
        "Google and AI use exactly the same process but have different interfaces."
      ],
      correctAnswer: 0
    },
    {
      questionText: "When an AI system needs current information to answer a user’s question, what does the module explain that it can do?",
      options: [
        "Randomly select information from any website.",
        "Retrieve information from trusted sources across the internet.",
        "Use only information stored in the user’s browser.",
        "Ignore external information and always rely only on learned knowledge."
      ],
      correctAnswer: 1
    },
    {
      questionText: "Why might ChatGPT, Gemini, Claude, and Perplexity provide different answers to the same question?",
      options: [
        "Each platform always uses exactly the same sources but randomly changes its answer.",
        "Different AI platforms can retrieve information from different trusted ecosystems.",
        "One platform is always correct while the others intentionally provide incorrect answers.",
        "AI platforms cannot understand natural-language questions."
      ],
      correctAnswer: 1
    },
    {
      questionText: "Which sequence best represents the AI search process taught in Module 2?",
      options: [
        "Retrieve information → evaluate trusted sources → combine with learned knowledge → generate a recommendation.",
        "Generate a recommendation → search Google → ignore sources → publish the answer.",
        "Search keywords → display ten links → ask the user to compare them manually.",
        "Choose a business randomly → generate an answer → verify information afterward."
      ],
      correctAnswer: 0
    },
    {
      questionText: "A business wants AI systems to confidently recommend it. According to Module 2, which principle is most important?",
      options: [
        "Make the business information accurate, trustworthy, and consistently available across reliable sources.",
        "Publish as many unrelated webpages as possible.",
        "Focus only on appearing on Google’s first page.",
        "Use the same keyword repeatedly throughout every webpage."
      ],
      correctAnswer: 0
    }
  ],
  3: [
    {
      questionText: "What is the primary purpose of Generative Engine Optimization (GEO)?",
      options: [
        "To increase the number of advertisements displayed on Google",
        "To help AI systems understand, trust, and recommend a business",
        "To replace websites with AI-generated webpages",
        "To make every webpage rank first on Google"
      ],
      correctAnswer: 1
    },
    {
      questionText: "Which statement best describes the difference between SEO and GEO?",
      options: [
        "SEO focuses on recommendations, while GEO focuses only on website speed.",
        "SEO focuses on rankings, while GEO focuses on AI recommendations and visibility.",
        "SEO and GEO are completely unrelated strategies.",
        "GEO replaces SEO completely."
      ],
      correctAnswer: 1
    },
    {
      questionText: "A company ranks #1 on Google but is never mentioned by AI assistants when customers ask for recommendations. What does this situation demonstrate?",
      options: [
        "Strong SEO always guarantees strong AI visibility.",
        "AI visibility is unnecessary when a business ranks well on Google.",
        "Ranking well on traditional search does not automatically guarantee AI visibility.",
        "GEO only applies to companies without websites."
      ],
      correctAnswer: 2
    },
    {
      questionText: "Which combination best represents the GEO ecosystem described in the module?",
      options: [
        "Website only",
        "Website, review platforms, business directories, industry publications, social media, knowledge graphs, structured data, and trusted third-party sources",
        "Google Ads and social media advertisements only",
        "Search keywords and backlinks only"
      ],
      correctAnswer: 1
    },
    {
      questionText: "When \"thinking like an AI system,\" which question should a GEO professional consider?",
      options: [
        "How can I repeat the same keyword as many times as possible?",
        "How can I make my website contain more advertisements?",
        "Can AI clearly understand the company, verify its information, and determine whether trusted sources support it?",
        "How can I prevent AI systems from accessing my business information?"
      ],
      correctAnswer: 2
    }
  ],
  4: [
    {
      questionText: "Why has creating AI-friendly content become important in Generative Engine Optimization?",
      options: [
        "AI systems can only recommend information that they can understand, trust, and confidently cite.",
        "AI systems only recommend websites with the highest number of advertisements.",
        "AI systems ignore website content and rely only on social media.",
        "AI-friendly content is mainly designed to increase website loading speed."
      ],
      correctAnswer: 0
    },
    {
      questionText: "Which type of content is most suitable for AI systems to extract and cite?",
      options: [
        "Content filled with marketing buzzwords and vague claims.",
        "Long paragraphs with no clear structure.",
        "Clear, structured, fact-based, and easy-to-understand content.",
        "Content that repeats the same keyword throughout the page."
      ],
      correctAnswer: 2
    },
    {
      questionText: "What does EEAT stand for in the context of AI-friendly content?",
      options: [
        "Engagement, Efficiency, Accuracy, Technology",
        "Experience, Expertise, Authoritativeness, Trustworthiness",
        "Evaluation, Entity, Authority, Traffic",
        "Expertise, Engagement, Analytics, Transparency"
      ],
      correctAnswer: 1
    },
    {
      questionText: "A company publishes an article claiming, “Our GEO strategy works.” According to the EEAT principle of Experience, what would make this claim stronger?",
      options: [
        "Repeat the claim several times throughout the article.",
        "Add more marketing adjectives such as “powerful” and “revolutionary.”",
        "Show results from the company’s own projects or customers.",
        "Remove all supporting information to keep the article short."
      ],
      correctAnswer: 2
    },
    {
      questionText: "A business wants its content to become more useful for AI-generated answers. Which approach best follows the principles taught in Module 4?",
      options: [
        "Focus only on ranking for a single keyword.",
        "Create vague promotional content that uses popular industry terms.",
        "Create clear, structured, evidence-based content that demonstrates experience, expertise, authority, and trust.",
        "Publish as many articles as possible regardless of their quality."
      ],
      correctAnswer: 2
    }
  ],
  5: [
    {
      questionText: "What is an entity in the context of AI and GEO?",
      options: [
        "A keyword that appears repeatedly on a webpage",
        "Anything that AI can uniquely identify, such as a company, person, product, location, or organization",
        "A backlink pointing to a website",
        "A technical error detected during a website audit"
      ],
      correctAnswer: 1
    },
    {
      questionText: "Why are relationships between entities important to AI?",
      options: [
        "They help AI understand how different entities are connected and build a stronger understanding of a business.",
        "They increase the number of keywords on a webpage.",
        "They guarantee that a website ranks first on Google.",
        "They eliminate the need for structured data."
      ],
      correctAnswer: 0
    },
    {
      questionText: "A company publishes articles about SEO, cloud computing, cryptocurrency, AI, web development, and unrelated topics every week. What problem might this create?",
      options: [
        "AI may struggle to identify what the company is actually an expert in.",
        "AI will automatically classify the company as an authority in every topic.",
        "The company will automatically receive more trusted citations.",
        "The company will no longer need a website."
      ],
      correctAnswer: 0
    },
    {
      questionText: "Which strategy best demonstrates topical authority for a company specializing in Generative Engine Optimization?",
      options: [
        "Publish unrelated articles across as many industries as possible.",
        "Publish only promotional content about the company's products.",
        "Build a comprehensive pillar page supported by related content covering topics such as Entity SEO, AI Search, Schema Markup, Knowledge Graphs, Citation Building, and AI Visibility.",
        "Repeat the phrase “GEO” throughout hundreds of articles without covering related concepts."
      ],
      correctAnswer: 2
    },
    {
      questionText: "A company has different names, logos, descriptions, and contact information across its website, directories, and social profiles. What is the most likely GEO consequence?",
      options: [
        "AI becomes more confident because it sees more variations.",
        "The inconsistencies can confuse AI and reduce its confidence in identifying and recommending the business.",
        "The company automatically gains stronger topical authority.",
        "The company receives higher rankings because of the additional brand variations."
      ],
      correctAnswer: 1
    }
  ],
  6: [
    {
      questionText: "Why does evidence strengthen content for AI-generated answers?",
      options: [
        "Evidence makes every webpage rank #1 on Google.",
        "Research findings, verified statistics, case studies, expert insights, and credible references make content more trustworthy and well-supported.",
        "Evidence allows businesses to avoid citing sources.",
        "AI systems only use content containing numerical statistics."
      ],
      correctAnswer: 1
    },
    {
      questionText: "Which of the following is presented as the strongest type of evidence in Module 6?",
      options: [
        "A blog post copied from another website.",
        "A social media comment from an unknown user.",
        "First-party research collected directly by the organization through studies, analytics, surveys, or experiments.",
        "An outdated article that summarizes another company's research."
      ],
      correctAnswer: 2
    },
    {
      questionText: "A company has collected an industry research report and wants AI to understand and reference its findings effectively. What should the company do first when presenting the evidence?",
      options: [
        "Hide the original source and focus only on the conclusion.",
        "Clearly state the source, summarize the key finding, explain why it matters, and connect it to the topic.",
        "Repeat the same statistic throughout the article.",
        "Replace the research with an unsupported opinion."
      ],
      correctAnswer: 1
    },
    {
      questionText: "Which practice is most likely to weaken trust in research-driven GEO content?",
      options: [
        "Referencing primary sources.",
        "Clearly acknowledging when research is still evolving.",
        "Checking the original source of statistics.",
        "Publishing unsupported claims and relying on outdated reports without verification."
      ],
      correctAnswer: 3
    },
    {
      questionText: "A GEO specialist is starting a new content campaign. Which workflow best follows the research-first approach taught in Module 6?",
      options: [
        "Write articles first → find evidence later → publish quickly.",
        "Identify audience questions → collect reliable sources → study trends → review customer feedback → analyze competitors → build content around verified information.",
        "Copy competitor articles → change the wording → publish.",
        "Choose popular keywords → publish as many articles as possible → add research only if traffic is low."
      ],
      correctAnswer: 1
    }
  ]
};

function getModuleIndex(id: string): number {
  const normalized = id.toLowerCase();
  if (normalized.includes("1") || normalized.includes("changing")) return 1;
  if (normalized.includes("2") || normalized.includes("understanding")) return 2;
  if (normalized.includes("3") || normalized.includes("introduction")) return 3;
  if (normalized.includes("4") || normalized.includes("content")) return 4;
  if (normalized.includes("5") || normalized.includes("authority") || normalized.includes("digital")) return 5;
  if (normalized.includes("6") || normalized.includes("future")) return 6;
  return 1; // Default fallback
}

export function QuizInterface({ quizId, onComplete }: { quizId: string; onComplete?: () => void }) {
  const moduleIndex = getModuleIndex(quizId);
  const questions = quizDatabase[moduleIndex] || quizDatabase[1];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
      const finalScore = Object.entries(selectedAnswers).reduce((acc, [qIdx, optIdx]) => {
        const question = questions[Number(qIdx)];
        return question.correctAnswer === optIdx ? acc + 1 : acc;
      }, 0);
      const percentage = Math.round((finalScore / questions.length) * 100);
      localStorage.setItem(`blazly_quiz_score_${quizId}`, percentage.toString());
      
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, optIdx]) => {
    const question = questions[Number(qIdx)];
    return question.correctAnswer === optIdx ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto bg-paper rounded-2xl border border-line p-6 md:p-8 shadow-sm">
      {!isSubmitted ? (
        <div>
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-[13px] font-bold text-emerald-deep uppercase tracking-wider">
              Module {moduleIndex} Quiz
            </span>
            <span className="text-sm font-semibold text-muted">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-line rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-emerald transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-lg md:text-xl font-display font-bold text-ink mb-6">
            {currentQuestion.questionText}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                    isSelected
                      ? "border-emerald bg-emerald/5 text-emerald-deep shadow-sm"
                      : "border-line hover:border-ink/20 hover:bg-line/20 text-ink"
                  }`}
                >
                  <span>{option}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-4 ${
                      isSelected
                        ? "border-emerald bg-emerald text-white"
                        : "border-line"
                    }`}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation/Submit button */}
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedOption === undefined}
              className="flex items-center gap-2 bg-emerald hover:bg-emerald-deep text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          {/* Results Screen */}
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6 ${
            percentage >= 70 ? "bg-emerald/10 text-emerald-deep" : "bg-gold/10 text-gold-deep"
          }`}>
            {percentage >= 70 ? <Check size={32} /> : <AlertCircle size={32} />}
          </div>

          <h3 className="text-2xl font-display font-bold text-ink mb-2">Quiz Completed!</h3>
          <p className="text-sm text-muted mb-6">
            You scored <span className="font-bold text-ink">{score}</span> out of <span className="font-bold text-ink">{questions.length}</span> ({percentage}%)
          </p>

          <div className="max-w-md mx-auto bg-paper-raised rounded-xl p-4 border border-line mb-8 text-left text-sm space-y-4">
            <h4 className="font-bold text-ink mb-2 border-b border-line pb-2">Results Breakdown</h4>
            {questions.map((q, qIdx) => {
              const isCorrect = selectedAnswers[qIdx] === q.correctAnswer;
              return (
                <div key={qIdx} className="space-y-1">
                  <p className="font-semibold text-ink">Q{qIdx + 1}: {q.questionText}</p>
                  <p className={`text-[13px] ${isCorrect ? "text-emerald-deep font-medium" : "text-red-500"}`}>
                    Your Answer: {q.options[selectedAnswers[qIdx]]} {isCorrect ? "✓" : "✗"}
                  </p>
                  {!isCorrect && (
                    <p className="text-[12px] text-muted">
                      Correct Answer: {q.options[q.correctAnswer]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 border border-line hover:border-ink/20 hover:bg-paper-raised px-6 py-2.5 rounded-full font-semibold text-sm transition-colors text-ink"
            >
              <RefreshCw size={16} />
              Retry Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
