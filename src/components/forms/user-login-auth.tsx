"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validations/auth";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/password-input";

import { toast } from "sonner";

import { login } from "@/actions/login";

export function UserLoginAuth() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "E-mail já está em uso com um provedor diferente!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();

            toast.message("Ocorreu um erro ao efetuar o login!", {
              description: data.error,
              position: "bottom-center",
            });
          } else {
            router.push("/plataforma");

            toast.success("Login efetuado com sucesso!");
          }
        })
        .catch(() =>
          toast.error("Ocorreu um erro ao efetuar o login!", {
            position: "bottom-center",
          })
        );
    });
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1 pb-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        placeholder="Endereço de E-mail"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                      />
                    </FormControl>
                    <FormDescription>Aqui é o seu E-mail</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        id="password"
                        placeholder="Senha"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormDescription>Aqui é a sua Senha</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            className={(buttonVariants({ variant: "default" }), "w-full")}
            disabled={isPending}
          >
            {isPending && (
              <Icons.loader className="animate-spin mr-2 w-4 h-4" />
            )}
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
