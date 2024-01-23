import { Check } from "lucide-react";

type StepTitleProps = {
  title: string;
  step: number;
  currentStep: number;
  completed?: boolean;
};

export function StepTitle({
  title,
  currentStep,
  step,
  completed = false,
}: StepTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
          currentStep === step
            ? "bg-purple-700 text-zinc-100"
            : completed
              ? "bg-green-600 text-zinc-100"
              : "bg-zinc-300 text-zinc-900/75"
        }`}
      >
        {currentStep !== step && completed ? <Check size={20} /> : step}
      </span>
      <p className="text-xl font-bold">{title}</p>
    </div>
  );
}
