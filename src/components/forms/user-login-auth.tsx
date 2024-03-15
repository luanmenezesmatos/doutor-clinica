"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

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
import { PasswordInput } from "../password-input";

import { toast } from "sonner";

import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ required_error: "A senha é obrigatória" })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
});

export function UserLoginAuth() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: mutateAuthUser, isPending: isLoading } = useMutation({
    mutationKey: ["mutateLogin"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await signIn<"credentials">("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        return toast.message("Ocorreu um erro ao efetuar o login!", {
          description: res.error,
        });
      } else {
        router.push("/plataforma");

        toast.success("Login efetuado com sucesso!");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutateAuthUser(values);
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
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.loader className="animate-spin mr-2 w-4 h-4" />
            )}
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
