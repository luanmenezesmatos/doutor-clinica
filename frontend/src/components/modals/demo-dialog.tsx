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

interface DemoDialogProps {
  children: React.ReactNode;
}

export function DemoDialog({ children }: DemoDialogProps) {
  return (
    <Credenza>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Dialog Title</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <CredenzaDescription>Oi</CredenzaDescription>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose>
            <Button
              variant="expandIcon"
              Icon={Icons.close}
              iconPlacement="right"
            >
              Fechar
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
