"use client";

import { useQuery } from "@tanstack/react-query";

import { ReactNode } from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  is_active: z.boolean().optional(),
  full_civil_name: z
    .string({
      required_error: "Precisamos do nome civil completo do paciente.",
    })
    .min(
      3,
      "O nome civil completo do paciente deve ter no mínimo 3 caracteres."
    )
    .max(
      255,
      "O nome civil completo do paciente deve ter no máximo 255 caracteres."
    ),
  full_social_name: z.string().optional(),
  date_of_birth: z.date({
    required_error: "Precisamos da data de nascimento do paciente",
  }),
  gender: z.string({
    required_error: "Precisamos do gênero do paciente.",
  }),
  is_foreign: z.boolean().optional(),
  cpf_cnpj: z.string().optional(),
  rg: z.string().optional(),
  rg_issuing_office: z.string().optional(),
  identification_number: z.string().optional(),
  control_number: z.string().optional(),
  nationality: z.string().optional(),
  email: z.string().email("Precisamos de um e-mail válido.").optional(),
  cell_phone: z.string({
    required_error: "Precisamos do número de celular do paciente.",
  }),
  home_phone: z.string().optional(),
  extension: z.string().optional(),
  additional_information_business_phone: z.string().optional(),
  additional_information_messages_phone: z.string().optional(),
  additional_information_extension_one: z.string().optional(),
  additional_information_extension_two: z.string().optional(),
  additional_information_skype: z.string().optional(),
  zip: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
});

export function PatientForm() {
  const { data: patient_cpf_cnpj } = useQuery({
    queryKey: ["patient_cpf_cnpj"],
    retry: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_active: true,
      full_civil_name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Tabs defaultValue="patientData" className="space-y-4 grid">
        <Card className="h-full w-full justify-start p-5 overflow-auto">
          <TabsList>
            <TabsTrigger value="patientData">Dados do Paciente</TabsTrigger>
            <TabsTrigger value="complementaryData">
              Dados Complementares
            </TabsTrigger>
            <TabsTrigger value="marketingInformation">
              Informações de Marketing
            </TabsTrigger>
          </TabsList>
        </Card>

        <Card className="h-full w-full justify-start p-5 overflow-auto">
          <TabsContent value="patientData">
            <CardContent>
              <b className="font-semibold">Dados pessoais</b>

              <Separator className="mt-5 mb-5" />

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel>Ativo na clínica?</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Se o paciente está ativo ou não
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="full_civil_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome civil completo</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormDescription>
                            Nome civil completo do paciente
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="full_social_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome social completo</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormDescription>
                            Nome social completo do paciente
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date_of_birth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data de Nascimento</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "lg:w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", {
                                      locale: ptBR,
                                    })
                                  ) : (
                                    <span>Selecione uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                captionLayout="dropdown"
                                fromYear={1920}
                                toYear={2024}
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Data de Nascimento do paciente
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="lg:w-[240px] flex flex-col">
                          <FormLabel>Gênero</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue>
                                  {field.value
                                    ? field.value
                                    : "Selecione um gênero"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  value="
                                Masculino"
                                >
                                  Masculino
                                </SelectItem>
                                <SelectItem value="Feminino">
                                  Feminino
                                </SelectItem>
                                <SelectItem value="Outro">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>Gênero do paciente</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="is_foreign"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>É estrangeiro?</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Se o paciente é estrangeiro
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="cpf_cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF/CNPJ</FormLabel>
                          <FormControl>
                            <InputMask
                              type="tel"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              mask={
                                (field.value?.length ?? 0) < 15
                                  ? "999.999.999-999"
                                  : "99.999.999/0001-99"
                              }
                              maskChar=""
                              defaultValue={
                                (patient_cpf_cnpj as string) ?? field.value
                              }
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

                    <FormField
                      control={form.control}
                      name="rg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RG</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rg_issuing_office"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Órgão emissor</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </TabsContent>
          <TabsContent value="complementaryData">
            Dados Complementares
          </TabsContent>
          <TabsContent value="marketingInformation">
            Informações de Marketing
          </TabsContent>
        </Card>
      </Tabs>
    </>
  );
}