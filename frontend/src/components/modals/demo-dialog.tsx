"use client";

import React from "react";

import { Icons } from "@/components/icons";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";

import { UserRegisterAuth } from "../forms/user-register-auth";

interface DemoDialogProps {
  children: React.ReactNode;
}

export function DemoDialog({ children }: DemoDialogProps) {
  return (
    <Credenza>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Solicite uma Demonstração</CredenzaTitle>
          <CredenzaDescription className="text-primary">
            Vamos lá! Preencha o formulário para uma demonstração gratuita do
            software médico{" "}
            <span className="font-semibold">Doutor Clínica</span>.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="text-sm">
          <UserRegisterAuth />
        </CredenzaBody>
        <CredenzaFooter>
          <div className="flex flex-col items-end">
            <p className="font-medium text-center text-sm text-gray-500 mb-5">
              <Icons.lock className="w-4 h-4 mr-1 inline" />
              Seus dados estão seguros conosco. Ao preencher o formulário, você
              está de acordo com a nossa{" "}
              <a
                href="/politica-de-privacidade"
                className="text-primary underline"
              >
                Política de Privacidade
              </a>
              .
            </p>

            <CredenzaClose>
              <Button
                className="text-primary border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                variant="expandIcon"
                Icon={Icons.close}
                iconPlacement="right"
              >
                Fechar
              </Button>
            </CredenzaClose>
          </div>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
