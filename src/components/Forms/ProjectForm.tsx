import type { FormData } from "../MultiStepForm/MultiStepForm";
import { useFormContext } from "react-hook-form";

import { animation } from "./animation";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ErrorMessage } from "./ErrorMessage";

interface ProjectFormProps {
  onSubmit: (data: FormData) => void;
  setStep: (step: number) => void;
}

export function ProjectForm({ onSubmit, setStep }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <motion.form
      {...animation}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
    >
      <div>
        <Label htmlFor="projectObjective" className="text-md font-bold">
          Objetivos do projeto
        </Label>
        <Textarea
          id="projectObjective"
          className="mt-1"
          placeholder="Descreva quais os objetivos desse projeto"
          {...register("project.objective")}
        />
        <ErrorMessage error={errors.project?.objective?.message} />
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={() => setStep(2)}
          variant="outline"
          className="mt-8 w-fit self-end text-base font-bold uppercase"
        >
          Voltar
        </Button>
        <Button
          type="submit"
          className="mt-8 w-fit self-end text-base font-bold uppercase"
        >
          enviar proposta
        </Button>
      </div>
    </motion.form>
  );
}
