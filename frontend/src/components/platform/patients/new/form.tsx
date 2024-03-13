"use client";

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { QuestionCard } from "@/components/question-card";

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
  cns_sus: z.string().optional(),
  blood_factor: z.string().optional(),
  ethnicity: z.string().optional(),
  civil_status: z.string().optional(),
  partner_name: z.string().optional(),
  mother_name: z.string().optional(),
  father_name: z.string().optional(),
  responsible_name: z.string().optional(),
  referral_source: z.string().optional(),
  hobby: z
    .string()
    .max(1000, {
      message: "O hobby deve ter no máximo 1000 caracteres.",
    })
    .optional(),
  schooling: z.string().optional(),
  occupation: z.string().optional(),
  indication: z.string().optional(),
  email_birthday_card: z.boolean().optional(),
});

export function PatientForm() {
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <CardContent className="space-y-8 pt-0">
                  <b className="font-semibold">Dados pessoais</b>

                  <Separator className="mt-5 mb-5" />

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
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um gênero" />
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
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              mask={
                                (field.value?.length ?? 0) < 15
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

                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="identification_number"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-1">
                            <FormLabel>Número de identificação</FormLabel>
                            <QuestionCard
                              title="Número de identificação"
                              description="Número do passaporte, RG internacional ou Documento de identificação"
                            />
                          </div>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="control_number"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-1">
                            <FormLabel>Número de controle</FormLabel>
                            <QuestionCard
                              title="Número de controle"
                              description="O sistema está configurado para controlar automaticamente este campo. Dessa forma não será possível cadastrar dois ou mais pacientes com o mesmo número."
                            />
                          </div>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nacionalidade</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>

                <CardContent className="space-y-8">
                  <b className="font-semibold">Informações de contato</b>

                  <Separator className="mt-5 mb-5" />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="lg:w-[400px]">
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="cell_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone celular</FormLabel>
                          <FormControl>
                            <InputMask
                              type="tel"
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              mask="(99) 99999-9999"
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

                    <FormField
                      control={form.control}
                      name="home_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone residencial</FormLabel>
                          <FormControl>
                            <InputMask
                              type="tel"
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              mask="(99) 9999-9999"
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

                    <FormField
                      control={form.control}
                      name="extension"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ramal</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Card>
                    <CardContent>
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full pt-3"
                      >
                        <AccordionItem
                          className="border-none"
                          value="additionalInformation"
                        >
                          <AccordionTrigger
                            icon={true}
                            className="py-2 hover:no-underline"
                          >
                            <CardHeader className="p-1 text-start">
                              <CardTitle className="text-base font-semibold">
                                Informações adicionais de contato
                              </CardTitle>
                              <CardDescription>
                                Aqui você pode adicionar informações adicionais
                                de contato do paciente.
                              </CardDescription>
                            </CardHeader>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-8 p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="additional_information_business_phone"
                                render={({ field }) => (
                                  <FormItem className="lg:w-[240px]">
                                    <FormLabel>Telefone comercial</FormLabel>
                                    <FormControl>
                                      <InputMask
                                        type="tel"
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        mask="(99) 9999-9999"
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

                              <FormField
                                control={form.control}
                                name="additional_information_extension_one"
                                render={({ field }) => (
                                  <FormItem className="lg:w-[240px]">
                                    <FormLabel>Ramal 1</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="additional_information_messages_phone"
                                render={({ field }) => (
                                  <FormItem className="lg:w-[240px]">
                                    <FormLabel>Telefone para recados</FormLabel>
                                    <FormControl>
                                      <InputMask
                                        type="tel"
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        mask="(99) 9999-9999"
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

                              <FormField
                                control={form.control}
                                name="additional_information_extension_two"
                                render={({ field }) => (
                                  <FormItem className="lg:w-[240px]">
                                    <FormLabel>Ramal 2</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="additional_information_skype"
                              render={({ field }) => (
                                <FormItem className="lg:w-[400px]">
                                  <FormLabel>Skype</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="text" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>

                  <CardContent className="space-y-8 p-0">
                    <b className="font-semibold">Endereço</b>

                    <Separator className="mt-5 mb-5" />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-[240px]">
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <InputMask
                                type="tel"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                mask="99999-999"
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

                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-[240px]">
                            <FormLabel>Número</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-[240px]">
                            <FormLabel>Complemento</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-[240px]">
                            <FormLabel>Bairro</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-[240px]">
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </CardContent>
              </TabsContent>
              <TabsContent value="complementaryData">
                <CardContent className="space-y-8 pt-0">
                  <b className="font-semibold">Documentação</b>

                  <Separator className="mt-5 mb-5" />

                  <FormField
                    control={form.control}
                    name="cns_sus"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-[500px]">
                        <div className="flex items-center gap-1">
                          <FormLabel>CNS (SUS)</FormLabel>
                          <QuestionCard
                            title="CNS (SUS)"
                            description="O Cartão Nacional de Saúde (CNS) é um documento que identifica o cidadão no Sistema Único de Saúde (SUS). Ele é gratuito e pode ser solicitado em qualquer unidade de saúde do SUS. O CNS é um número único e individual que permite a identificação do cidadão em todo o território nacional, independente de onde ele tenha sido atendido."
                          />
                        </div>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="blood_factor"
                    render={({ field }) => (
                      <FormItem className="lg:w-[240px] flex flex-col">
                        <div className="flex items-center gap-1">
                          <FormLabel>Fator sanguíneo</FormLabel>
                          <QuestionCard
                            title="Fator sanguíneo"
                            description="O fator sanguíneo é uma característica genética que determina o tipo de sangue de uma pessoa. O fator sanguíneo é determinado por dois genes, um herdado de cada pai. O fator sanguíneo é importante para a doação de sangue e transfusões."
                          />
                        </div>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o fator sanguíneo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value="
                                O-"
                              >
                                O- (O negativo)
                              </SelectItem>
                              <SelectItem value="O+">
                                O+ (O positivo)
                              </SelectItem>
                              <SelectItem value="A-">
                                A- (A negativo)
                              </SelectItem>
                              <SelectItem value="A+">
                                A+ (A positivo)
                              </SelectItem>
                              <SelectItem value="B-">
                                B- (B negativo)
                              </SelectItem>
                              <SelectItem value="B+">
                                B+ (B positivo)
                              </SelectItem>
                              <SelectItem value="AB-">
                                AB- (AB negativo)
                              </SelectItem>
                              <SelectItem value="AB+">
                                AB+ (AB positivo)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardContent className="space-y-8">
                  <b className="font-semibold">Dados familiares</b>

                  <Separator className="mt-5 mb-5" />

                  <FormField
                    control={form.control}
                    name="ethnicity"
                    render={({ field }) => (
                      <FormItem className="lg:w-[240px] flex flex-col">
                        <FormLabel>Etnia</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a etnia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="branca">Branca</SelectItem>
                              <SelectItem value="parda">Parda</SelectItem>
                              <SelectItem value="negra">Negra</SelectItem>
                              <SelectItem value="oriental">Oriental</SelectItem>
                              <SelectItem value="asiatica">Asiática</SelectItem>
                              <SelectItem value="indigena">Indígena</SelectItem>
                              <SelectItem value="nao-declarada">
                                Não declarada
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="civil_status"
                      render={({ field }) => (
                        <FormItem className="lg:w-[240px]">
                          <FormLabel>Estado civil</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o estado civil" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="casado">Casado</SelectItem>
                                <SelectItem value="divorciado">
                                  Divorciado
                                </SelectItem>
                                <SelectItem value="solteiro">
                                  Solteiro
                                </SelectItem>
                                <SelectItem value="separado">
                                  Separado
                                </SelectItem>
                                <SelectItem value="viuvo">Viúvo</SelectItem>
                                <SelectItem value="nao-informado">
                                  Não informado
                                </SelectItem>
                                <SelectItem value="uniao-estavel">
                                  União estável
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="partner_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Nome do cônjuge</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mother_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da mãe</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="father_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do pai</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="responsible_name"
                    render={({ field }) => (
                      <FormItem className="lg:w-[500px]">
                        <FormLabel>Nome do responsável</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardContent className="space-y-8">
                  <b className="font-semibold">Informações adicionais</b>

                  <Separator className="mt-5 mb-5" />

                  <FormField
                    control={form.control}
                    name="referral_source"
                    render={({ field }) => (
                      <FormItem className="lg:w-[240px] flex flex-col">
                        <FormLabel>Como conheceu a clínica?</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione alguma opção" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="facebook">Facebook</SelectItem>
                              <SelectItem value="instagram">
                                Instagram
                              </SelectItem>
                              <SelectItem value="whatsapp">Whatsapp</SelectItem>
                              <SelectItem value="pesquisa-google">
                                Pesquisa no Google
                              </SelectItem>
                              <SelectItem value="indicacao-profissional">
                                Indicação de profissional
                              </SelectItem>
                              <SelectItem value="indicacao-cliente">
                                Indicação de cliente
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </TabsContent>
              <TabsContent value="marketingInformation">
                <CardContent className="space-y-8 pt-0">
                  <b className="font-semibold">Outros dados</b>

                  <Separator className="mt-5 mb-5" />

                  <div>
                    <b className="font-semibold text-base">Aniversário</b>

                    <p className="text-sm">
                      A data de nascimento ainda não foi cadastrada.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="hobby"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hobby</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[80px]"
                            minLength={10}
                            maxLength={1000}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="flex gap-5 text-sm text-black">
                          <p>Caracteres: {field.value?.length ?? 0}</p>
                          <p>Limite: 1000</p>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schooling"
                    render={({ field }) => (
                      <FormItem className="lg:w-[240px] flex flex-col">
                        <FormLabel>Escolaridade</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a escolaridade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pre-escola">
                                Pré-escola
                              </SelectItem>
                              <SelectItem value="analfabeto">
                                Analfabeto
                              </SelectItem>
                              <SelectItem value="fundamental-incompleto">
                                Fundamental incompleto
                              </SelectItem>
                              <SelectItem value="fundamental-completo">
                                Fundamental completo
                              </SelectItem>
                              <SelectItem value="medio-incompleto">
                                Médio incompleto
                              </SelectItem>
                              <SelectItem value="medio-completo">
                                Médio completo
                              </SelectItem>
                              <SelectItem value="superior-incompleto">
                                Superior incompleto
                              </SelectItem>
                              <SelectItem value="superior-completo">
                                Superior completo
                              </SelectItem>
                              <SelectItem value="pos-graduado">
                                Pós-graduado
                              </SelectItem>
                              <SelectItem value="mestrado">Mestrado</SelectItem>
                              <SelectItem value="doutorado">
                                Doutorado
                              </SelectItem>
                              <SelectItem value="pos-doutorado">
                                Pós-doutorado
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem className="lg:w-[400px]">
                        <FormLabel>Profissão / Ocupação</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="indication"
                    render={({ field }) => (
                      <FormItem className="lg:w-[400px]">
                        <FormLabel>Indicação</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardContent className="space-y-8">
                  <b className="font-semibold">Notificações de aniversário</b>

                  <Separator className="mt-5 mb-5" />

                  <FormField
                    control={form.control}
                    name="email_birthday_card"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel>
                          Enviar automaticamente um cartão de aniversário por
                          e-mail?
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </TabsContent>
            </Card>
            <Separator className="mt-5 mb-5" />
            <Card className="h-full w-full overflow-auto justify-end">
              <CardContent className="flex items-center justify-end p-5 pb-0">
                <div
                  className={cn(
                    "flex items-center gap-2",
                    "w-full justify-center md:justify-end"
                  )}
                >
                  <Button variant="outline">
                    <Icons.close className="mr-2 w-4 h-4" />
                    Cancelar
                  </Button>

                  <Button type="submit" variant="default">
                    <Icons.check className="mr-2 w-4 h-4" />
                    Cadastrar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Tabs>
        </form>
      </Form>
    </>
  );
}
