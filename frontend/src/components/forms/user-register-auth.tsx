"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMediaQuery } from "@/hooks/use-media-query";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "../password-input";

import { toast } from "sonner";

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
    clinic_name: z.string({
      required_error: "O nome da clínica é obrigatório",
    }),
    occupation: z.string({ required_error: "A profissão é obrigatória" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "As senhas não coincidem",
  });

export function UserRegisterAuth() {
  const router = useRouter();

  const desktop = "(min-width: 768px)";
  const isDesktop = useMediaQuery(desktop);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      clinic_name: "",
      occupation: "",
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

      if (request.ok) {
        console.log(response);
        router.push("/entrar");
      } else {
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

    mutateAuthUser(values);
  }

  return (
    <>
      {isDesktop ? (
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 pb-5 lg:grid-cols-2 lg:space-x-2">
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
                </div>

                <div className="grid gap-1 pb-5 lg:grid-cols-2 lg:space-x-2">
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

                <div className="grid gap-1 pb-5 lg:grid-cols-2 lg:space-x-2">
                  <FormField
                    control={form.control}
                    name="clinic_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Clínica</FormLabel>
                        <Input
                          {...field}
                          id="clinic_name"
                          placeholder="Nome da Clínica"
                          type="text"
                          autoComplete="organization"
                          autoCapitalize="words"
                          autoCorrect="off"
                        />
                        <FormDescription>
                          Insira o Nome da sua Clínica
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profissão</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a sua profissão" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin-director-ceo">
                              Administrador/Diretor/CEO
                            </SelectItem>
                            <SelectItem value="doctor-medical">
                              Médico(a)
                            </SelectItem>
                            <SelectItem value="dentist">Dentista</SelectItem>
                            <SelectItem value="physiotherapist">
                              Fisioterapeuta
                            </SelectItem>
                            <SelectItem value="speech-therapist">
                              Fonoaudiólogo(a)
                            </SelectItem>
                            <SelectItem value="beautician">
                              Esteticista
                            </SelectItem>
                            <SelectItem value="psychologist">
                              Psicólogo(a)
                            </SelectItem>
                            <SelectItem value="student">Estudante</SelectItem>
                            <SelectItem value="secretary">
                              Secretário(a)
                            </SelectItem>
                            <SelectItem value="technology-professional">
                              Profissional de Tecnologia
                            </SelectItem>
                            <SelectItem value="consultant">
                              Consultor(a)
                            </SelectItem>
                            <SelectItem value="other-health-professional">
                              Outro profissional de saúde
                            </SelectItem>
                            <SelectItem value="customer">
                              Cliente Doutor Clínica
                            </SelectItem>
                            <SelectItem value="patient">
                              Sou Paciente
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Selecione a sua Profissão
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
      ) : (
        <h1>Testando</h1>
      )}
    </>
  );
}
