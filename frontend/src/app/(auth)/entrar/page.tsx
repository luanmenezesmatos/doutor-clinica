import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Suspense } from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

import { UserAuthForm } from "@/components/ui/user-auth-form";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entre na sua conta!",
};

export default function SignInPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button
          className="font-semibold text-primary border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          variant="expandIcon"
          size="sm"
          Icon={Icons.arrowLeft}
          iconPlacement="left"
        >
          Voltar para a Página Inicial
        </Button>
      </Link>

      <div className="flex w-full flex-col justify-center space-y-10 sm:w-[350px]">
        <Image
          className="mx-auto"
          src="/images/svg/logo.svg"
          alt="Logo"
          width="200"
          height="50"
        />

        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-[1.3rem] font-semibold tracking-tight">
            Bem-vindo(a) de volta!
          </h1>
          <p className="text-sm text-muted-foreground">
            Insira o seu e-mail e senha para acessar a sua conta
          </p>
        </div>
        <Suspense>
          <UserAuthForm />
        </Suspense>
        {/*         <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Não tem uma conta? Crie uma!
          </Link>
        </p> */}
      </div>
    </div>
  );
}
