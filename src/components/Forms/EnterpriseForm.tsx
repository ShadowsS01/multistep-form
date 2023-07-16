import type { Dispatch, SetStateAction } from "react";
import type { FormData, StepCompleted } from "../MultiStepForm/MultiStepForm";
import { useFormContext, type FieldErrors } from "react-hook-form";

import { animation } from "./animation";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ErrorMessage } from "./ErrorMessage";

interface EnterpriseFormProps {
  setStep: (step: number) => void;
  setStepsCompleted: Dispatch<SetStateAction<StepCompleted[]>>;
}

export function EnterpriseForm({
  setStep,
  setStepsCompleted,
}: EnterpriseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormData>();

  function goToNextStep(errors: FieldErrors<FormData>) {
    if (errors.enterprise) return;
    setStepsCompleted((prev) => [...prev, "enterprise"]);
    setStep(3);
  }

  return (
    <motion.form
      {...animation}
      onSubmit={handleSubmit(() => setStep(3), goToNextStep)}
      className="flex flex-col"
    >
      <div className="mb-4">
        <Label htmlFor="enterpriseName" className="text-md font-bold">
          Nome da empresa
        </Label>
        <Input
          id="enterpriseName"
          className="mt-1"
          type="text"
          placeholder="Qual é o nome da empresa"
          {...register("enterprise.name")}
        />
        <ErrorMessage error={errors.enterprise?.name?.message} />
      </div>
      <div className="mb-4">
        <Label htmlFor="employeeQuantity" className="text-md font-bold">
          Número de funcionários
        </Label>
        <Input
          id="employeeQuantity"
          className="mt-1"
          placeholder="Digite o número de colaboradores"
          type="text"
          {...register("enterprise.employeeQuantity")}
        />
        <ErrorMessage error={errors.enterprise?.employeeQuantity?.message} />
      </div>
      <div>
        <Label htmlFor="enterpriseAbout" className="text-md font-bold">
          Sobre seu negócio
        </Label>
        <Textarea
          id="enterpriseAbout"
          className="mt-1"
          placeholder="Fale um pouco sobre seus produtos ou serviços"
          {...register("enterprise.about")}
        />
        <ErrorMessage error={errors.enterprise?.about?.message} />
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          onClick={() => setStep(1)}
          variant="outline"
          className="mt-8 w-fit self-end text-base font-bold uppercase"
        >
          Voltar
        </Button>
        <Button
          type="submit"
          className="mt-8 w-fit self-end text-base font-bold uppercase"
        >
          Continuar
        </Button>
      </div>
    </motion.form>
  );
}
