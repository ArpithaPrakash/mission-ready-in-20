import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, HelpCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfidenceBannerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  score: number;
  reviewAreas: string[];
  rationale?: string;
}

export function ConfidenceBanner({
  isOpen,
  onOpenChange,
  score,
  reviewAreas,
  rationale,
}: ConfidenceBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLowConfidence = score < 80;

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 shadow-md transition-all duration-300 ease-in-out animate-in slide-in-from-top",
        isLowConfidence
          ? "bg-yellow-50 border-b border-yellow-200 text-yellow-900"
          : "bg-green-50 border-b border-green-200 text-green-900"
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left side: Score and Status */}
          <div className="flex items-center gap-4 flex-1">
            {/* Icon & Title */}
            <div className="flex items-center gap-2">
              {isLowConfidence ? (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              <span className="font-semibold text-sm sm:text-base">
                AI Confidence: {score}/100
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 opacity-60 hover:opacity-100 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[250px]">
                    <p>
                      This score represents the AI's confidence in the generated
                      DRAW based on the completeness and clarity of the provided
                      CONOP.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Progress Bar (Compact) */}
            <div className="w-24 sm:w-32 hidden sm:block">
              <Progress value={score} className="h-2 bg-black/10" />
            </div>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-2">
            {reviewAreas.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "text-xs sm:text-sm font-medium hover:bg-black/5",
                  isLowConfidence ? "text-yellow-900" : "text-green-900"
                )}
              >
                {isExpanded ? "Hide Details" : "View Details"}
                {isExpanded ? (
                  <ChevronUp className="ml-1.5 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1.5 h-4 w-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 hover:bg-black/5"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </div>

        {/* Expanded Content: Review Areas */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out",
            isExpanded ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
          )}
        >
          <div className="pb-2 border-t border-black/5 pt-3">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="space-y-2">
                {rationale && (
                  <div className="mb-3 text-sm text-muted-foreground italic">
                    "{rationale}"
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">Areas for Review</h4>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3.5 w-3.5 opacity-60 hover:opacity-100 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[250px]">
                        <p>
                          These are specific sections where the AI detected
                          potential ambiguity, missing details, or low certainty.
                          Please verify these against the original CONOP.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-sm opacity-90">
                  {reviewAreas.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
