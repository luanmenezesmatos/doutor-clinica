"use client";

import * as React from "react";

import { useQueryClient } from "@tanstack/react-query";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

import { Icons } from "@/components/icons";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  cpf_cnpj: z.string({
    required_error: "Precisamos de um CPF ou um CNPJ válido.",
  }),
});

export function Dialog() {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf_cnpj: "",
    },
  });

  const [isOpen, setIsOpen] = React.useState(true);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    queryClient.setQueryData(["patient_cpf_cnpj"], () => {
      return values.cpf_cnpj;
    });

    setIsOpen(false);
  };

  return (
    <Credenza open={isOpen}>
      <CredenzaContent icon={false}>
        <CredenzaHeader>
          <CredenzaTitle>Insira aqui o CPF/CNPJ do paciente</CredenzaTitle>
        </CredenzaHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CredenzaBody>
              <Separator className="mb-2" />
              <FormField
                control={form.control}
                name="cpf_cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF/CNPJ</FormLabel>
                    <FormControl>
                      <InputMask
                        type="tel"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        mask={
                          field.value.length < 15
                            ? "999.999.999-999"
                            : "99.999.999/0001-99"
                        }
                        maskChar=""
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CredenzaBody>
            <CredenzaFooter className="mt-5">
              <CredenzaClose>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  <Icons.close className="h-4 w-4" />
                  <span className="ml-2">Não tem CPF/CNPJ</span>
                </Button>
              </CredenzaClose>

              <Button type="submit" variant="default">
                <Icons.check className="h-4 w-4" />
                <span className="ml-2">Continuar</span>
              </Button>
            </CredenzaFooter>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
}
