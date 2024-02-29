"use client";

import * as React from "react";

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

const formSchema = z
  .object({
    name: z
      .string({ required_error: "O nome é obrigatório" })
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
    email: z
      .string({ required_error: "O e-mail é obrigatório" })
      .email({ message: "E-mail inválido" }),
    password: z
      .string({ required_error: "A senha é obrigatória" })
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    confirm_password: z
      .string({ required_error: "A confirmação de senha é obrigatória" })
      .min(8, {
        message: "A confirmação da senha deve ter no mínimo 8 caracteres",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "As senhas não coincidem",
  });

export function UserRegisterAuth() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { mutate: mutateAuthUser, isPending: isLoading } = useMutation({
    mutationKey: ["mutateRegister"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const request = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const response = await request.json();

      if (!request.ok) {
        if (response.code === "missing_data") {
          throw new Error("Preencha todos os campos necessários!");
        }

        if (response.code === "user_exists") {
          throw new Error("O e-mail informado já está cadastrado!");
        }
      }
    },
    onError: (error) => {
      toast.message("Erro ao efetuar o cadastro!", {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.success("Cadastro efetuado com sucesso");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    event.preventDefault();

    console.log("oie");

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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        placeholder="Nome Completo"
                        type="text"
                        autoComplete="name"
                        autoCapitalize="words"
                        autoCorrect="off"
                      />
                    </FormControl>
                    <FormDescription>
                      Insira o seu Nome Completo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormDescription>Insira o seu E-mail</FormDescription>
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
                    <FormDescription>Insira a sua Senha</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        id="confirm_password"
                        placeholder="Confirmar Senha"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormDescription>
                      Insira a confirmação da sua Senha
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            variant="expandIcon"
            Icon={Icons.fileInput}
            iconPlacement="right"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.loader className="animate-spin mr-2 w-4 h-4" />
            )}
            Solicitar Demonstração
          </Button>
        </form>
      </Form>
    </div>
  );
}
