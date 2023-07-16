"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { StepTitle } from "./components";
import { Form } from "../Forms";
import { Separator } from "../ui/separator";
import { AnimatePresence } from "framer-motion";

const formSchema = z.object({
  contact: z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    telephone: z
      .string()
      .min(11, "O telefone deve ter pelo menos 11 caracteres.")
      .max(11, "O telefone deve ter pelo no máximo 11 caracteres."),
    email: z.string().email("Digite um e-mail válido."),
  }),
  enterprise: z.object({
    name: z
      .string()
      .min(2, "O nome da empresa deve ter pelo menos 2 caracteres."),
    employeeQuantity: z
      .string()
      .nonempty("A quantidade de funcionários deve ser informada."),
    about: z.string().min(5, "O sobre deve ter pelo menos 5 caracteres."),
  }),
  project: z.object({
    objective: z
      .string()
      .min(5, "O objetivo deve ter pelo menos 5 caracteres."),
  }),
});

export type FormData = z.infer<typeof formSchema>;
export type StepCompleted = keyof FormData;

export function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [stepsCompleted, setStepsComplete] = useState<StepCompleted[]>([]);
  const form = useForm<FormData>({ resolver: zodResolver(formSchema) });

  function onSubmit(data: FormData) {
    console.log(data);
    alert("Proposta enviada com sucesso!");
  }

  useEffect(() => {
    if (step === 1) setStepsComplete([]);
    if (step === 2)
      setStepsComplete((prev) =>
        prev.map((item) => (item === "contact" ? item : "contact")),
      );
  }, [step]);

  return (
    <section className="w-full max-w-xl overflow-hidden rounded-md border border-zinc-200 p-8">
      <header className="flex items-center justify-between">
        <StepTitle
          completed={stepsCompleted.includes("contact")}
          title="Contato"
          step={1}
          currentStep={step}
        />
        <ChevronRight />
        <StepTitle
          completed={stepsCompleted.includes("enterprise")}
          title="Empresa"
          step={2}
          currentStep={step}
        />
        <ChevronRight />
        <StepTitle
          completed={stepsCompleted.includes("project")}
          title="Projeto"
          step={3}
          currentStep={step}
        />
      </header>
      <Separator className="my-8" />
      <main>
        <FormProvider {...form}>
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <Form.Contact
                setStep={setStep}
                key={step}
                setStepsCompleted={setStepsComplete}
              />
            ) : step === 2 ? (
              <Form.Enterprise
                setStep={setStep}
                key={step}
                setStepsCompleted={setStepsComplete}
              />
            ) : (
              <Form.Project setStep={setStep} onSubmit={onSubmit} key={step} />
            )}
          </AnimatePresence>
        </FormProvider>
      </main>
    </section>
  );
}
