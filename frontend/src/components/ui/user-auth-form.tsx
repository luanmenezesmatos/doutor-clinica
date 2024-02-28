"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export function UserAuthForm() {
  return (
    <div className={cn("grid gap-6")}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Digite o seu e-mail"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              placeholder="Digite a sua senha"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
            />
          </div>
          <Button
            type="submit"
            variant="expandIcon"
            Icon={Icons.login}
            iconPlacement="right"
          >
            Entrar com o E-mail
          </Button>
        </div>
      </form>
    </div>
  );
}
