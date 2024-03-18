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

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

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

  /* const { mutate: mutateAuthUser, isPending: isLoading } = useMutation({
    mutationKey: ["mutateLogin"],
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      const res = await signIn<"credentials">("credentials", {
        email: values.email,
        password: values.password,
        redirectTo: "/plataforma",
      });

      console.log(res);

      /* if (res?.error) {
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
  }); */

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "E-mail já está em uso com um provedor diferente!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          /* if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          } */
        })
        .catch(() => setError("Ocorreu um erro ao efetuar o login!"));
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
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
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
