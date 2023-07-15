import type { Dispatch, SetStateAction } from "react";
import type { FormData, StepCompleted } from "../MultiStepForm/MultiStepForm";
import { useFormContext, type FieldErrors } from "react-hook-form";

import { animation } from "./animation";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ErrorMessage } from "./ErrorMessage";

interface ContactFormProps {
  setStep: (step: number) => void;
  setStepsCompleted: Dispatch<SetStateAction<StepCompleted[]>>;
}

export function ContactForm({ setStep, setStepsCompleted }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormData>();

  function goToNextStep(errors: FieldErrors<FormData>) {
    if (errors.contact) return;
    setStepsCompleted((prev) => [...prev, "contact"]);
    setStep(2);
  }

  return (
    <motion.form
      {...animation}
      onSubmit={handleSubmit(() => setStep(2), goToNextStep)}
      className="flex flex-col"
    >
      <div className="mb-4">
        <Label htmlFor="name" className="text-md font-bold">
          Nome
        </Label>
        <Input
          id="name"
          className="mt-1"
          type="text"
          placeholder="Como prefere ser chamado"
          {...register("contact.name")}
        />
        <ErrorMessage error={errors.contact?.name?.message} />
      </div>
      <div className="mb-4">
        <Label htmlFor="telephone" className="text-md font-bold">
          Telefone
        </Label>
        <Input
          id="telephone"
          className="mt-1"
          placeholder="Digite seu número de WhatsApp"
          type="text"
          {...register("contact.telephone")}
        />
        <ErrorMessage error={errors.contact?.telephone?.message} />
      </div>
      <div>
        <Label htmlFor="email" className="text-md font-bold">
          E-mail
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          className="mt-1"
          {...register("contact.email")}
        />
        <ErrorMessage error={errors.contact?.email?.message} />
      </div>
      <Button
        type="submit"
        className="mt-8 w-fit self-end text-base font-bold uppercase"
      >
        Continuar
      </Button>
    </motion.form>
  );
}
