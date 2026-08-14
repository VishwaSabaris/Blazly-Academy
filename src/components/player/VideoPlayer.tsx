import { Lesson } from "@/lib/courseData";
import { Play, Pause, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Primitives";
import { useState } from "react";
import { QuizInterface } from "@/components/courses/QuizInterface";

export function VideoPlayer({
  lesson,
  isCompleted,
  onToggleComplete,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: {
  lesson: Lesson;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col bg-paper rounded-2xl overflow-hidden border border-line">
      {/* Video Placeholder Area */}
      <div className="aspect-video bg-ink text-paper relative flex items-center justify-center group">
        {lesson.type === "video" ? (
          lesson.videoUrl ? (
            lesson.videoUrl.includes("youtube.com") || lesson.videoUrl.includes("embed") ? (
              <iframe
                src={lesson.videoUrl}
                className="w-full h-full absolute inset-0 border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={lesson.videoUrl}
                controls
                className="w-full h-full absolute inset-0 object-contain"
              />
            )
          ) : (
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>
          )
        ) : lesson.type === "quiz" ? (
          <div className="w-full h-full absolute inset-0 bg-paper-raised overflow-y-auto p-4 flex items-center justify-center">
            <QuizInterface quizId={lesson.id} />
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold font-display mb-2">{lesson.title}</h3>
            <p className="text-white/60 text-sm">Please complete this {lesson.type} below.</p>
          </div>
        )}
        
        {/* Fake Video Controls (only show when no real video is playing) */}
        {!lesson.videoUrl && lesson.type === "video" && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div className={`h-full bg-emerald ${isPlaying ? "w-1/3" : "w-0"} transition-all duration-1000`} />
            </div>
          </div>
        )}
      </div>

      {/* Lesson Controls */}
      <div className="p-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-ink">{lesson.title}</h2>
          <p className="text-sm text-muted mt-1 uppercase tracking-wider">{lesson.type} • {lesson.duration}</p>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant={isCompleted ? "ghost" : "gold"} 
            onClick={onToggleComplete}
            className={isCompleted ? "text-emerald border-emerald hover:bg-emerald/5" : ""}
          >
            <CheckCircle2 size={18} className={isCompleted ? "text-emerald" : ""} />
            {isCompleted ? "Completed" : "Mark as Complete"}
          </Button>

          <div className="flex items-center gap-2 border-l border-line pl-4">
            <button 
              onClick={onPrev} 
              disabled={!hasPrev}
              className="p-2 border border-line rounded-lg text-ink-soft hover:text-ink hover:bg-paper-raised disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={onNext}
              disabled={!hasNext} 
              className="p-2 border border-line rounded-lg text-ink-soft hover:text-ink hover:bg-paper-raised disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
