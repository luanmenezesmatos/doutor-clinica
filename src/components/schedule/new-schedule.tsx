"use client";

import { useState, useEffect } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { appointmentFormSchema } from "@/lib/validations/event";
import { appointmentDefaultValues } from "@/constants";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn, formatDateWithTime } from "@/lib/utils";

import { useEventModal } from "@/hooks/use-event-modal";

import InputMask from "react-input-mask";
import { Icons } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@tremor/react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { DateTimePicker } from "@/components/ui/date-time-picker";
import { TimePicker } from "@/components/ui/time-picker";

import { currentUser } from "@/lib/auth/session";

import { createEvent } from "@/actions/event-calendar";
import { getPatient as getPatientFunction } from "@/actions/patient";
import { getProfessionals } from "@/actions/professional";
import { getClinicByUser } from "@/actions/clinic";
import { getUserById } from "@/actions/user";

interface EventInfo {
  start: Date | string;
  end: Date | string;
  startStr: string;
  endStr: string;
}

export function NewSchedule({
  userId,
  info,
}: {
  userId: string;
  info?: EventInfo;
}) {
  const [patientSelectOption, setPatientSelectOption] =
    useState<string>("name");
  const [patientDisabledCellPhone, setPatientDisabledCellPhone] =
    useState<boolean>(true);
  const [patientDisabledAgreementPlan, setPatientDisabledAgreementPlan] =
    useState<boolean>(true);
  const [patientDisabledProcedure, setPatientDisabledProcedure] =
    useState<boolean>(true);
  const [professionals, setProfessionals] = useState<any[]>([]);

  console.log("info", info);

  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      date: new Date(),
      startTime: new Date(info?.startStr ?? new Date()),
      endTime: new Date(info?.endStr ?? new Date()),
      typeOfService: "consulta",
      schedule: "",
      professional: "",
      patient: "",
      cellPhone: "",
      agreementPlan: "",
      procedure: "",
      observations: "",
      appointmentStatus: "a-confirmar",
      color: "sem-rotulo",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserById({ id: userId });

      if (user && user.success) {
        setProfessionals([
          {
            label: user.user?.name,
            value: user.user?.id,
          },
        ]);
      }
    };

    fetchData();
  }, []);

  async function getPatient() {
    const patientSelectOption = form.getValues("patient");
    console.log("patientSelectOption", patientSelectOption);

    const patient = await getPatientFunction({
      values: { patient_select_option: patientSelectOption },
    });

    console.log("patient", patient);

    if (patient && patient.success) {
      setPatientDisabledCellPhone(false);
      setPatientDisabledAgreementPlan(false);
      setPatientDisabledProcedure(false);

      form.setValue("patient", patient.patient?.full_civil_name ?? "");
      form.setValue("cellPhone", patient.patient?.cell_phone ?? "");
    }
  }

  async function onSubmit(values: z.infer<typeof appointmentFormSchema>) {
    console.log("values", values);

    try {
      const newEvent = await createEvent({
        event: { ...values, date: values.date, startTime: values.startTime, endTime: values.endTime, professional: values.professional || "", patient: values.patient || "", cellPhone: values.cellPhone || ""},
        userId,
        path: "/plataforma/agenda",
      });

      if (newEvent) {
        form.reset();
        // window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Tabs defaultValue="account" className="space-y-4">
        <CredenzaHeader>
          <CredenzaTitle>Adicionar agendamento</CredenzaTitle>
          <CredenzaDescription>
            Adicione um novo agendamento para o paciente
          </CredenzaDescription>
        </CredenzaHeader>

        <TabsList>
          <TabsTrigger value="appointment">Agendamento</TabsTrigger>
          <TabsTrigger value="telemedicine">Telemedicina</TabsTrigger>
          <TabsTrigger value="procedures">Procedimentos</TabsTrigger>
          <TabsTrigger value="repetition">Repetição</TabsTrigger>
          <TabsTrigger value="other-options">Outras opções</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-3 flex flex-col"
          >
            <TabsContent value="appointment">
              <Card>
                <CardHeader>
                  <CardTitle>Dados do agendamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
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
                                  <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
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
                                toYear={new Date().getFullYear() + 2}
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
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
                      name="startTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Horário inicial *</FormLabel>
                          <FormControl>
                            {info?.startStr &&
                            new Date(info.startStr).getHours() >= 12 &&
                            new Date(info.startStr).getHours() < 13 ? (
                              <HoverCard>
                                <HoverCardTrigger>
                                  <TimePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                  />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <Label className="font-semibold">
                                    Horário de Almoço
                                  </Label>
                                  <p className="text-sm text-gray-500">
                                    Você está agendando um horário de almoço.
                                    Por favor, verifique se o horário está
                                    correto.
                                  </p>
                                </HoverCardContent>
                              </HoverCard>
                            ) : (
                              <TimePicker
                                date={field.value}
                                setDate={field.onChange}
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Horário final *</FormLabel>
                          <FormControl>
                            {info?.endStr &&
                            new Date(info.endStr).getHours() >= 12 &&
                            new Date(info.endStr).getHours() < 13 ? (
                              <HoverCard>
                                <HoverCardTrigger>
                                  <TimePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                  />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <Label className="font-semibold">
                                    Horário de Almoço
                                  </Label>
                                  <p className="text-sm text-gray-500">
                                    Você está agendando um horário de almoço.
                                    Por favor, verifique se o horário está
                                    correto.
                                  </p>
                                </HoverCardContent>
                              </HoverCard>
                            ) : (
                              <TimePicker
                                date={field.value}
                                setDate={field.onChange}
                              />
                            )}

                            {/* <TimePicker
                              date={field.value}
                              setDate={field.onChange}
                            /> */}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="typeOfService"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Tipo de atendimento</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo de atendimento" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="consulta">
                                  Consulta
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 items-center">
                    <FormField
                      control={form.control}
                      name="schedule"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Agenda *</FormLabel>
                          <FormControl
                            className={cn(
                              "w-[215px]",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a agenda" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="consultorio-1">
                                  Consultório 1
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
                      name="professional"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Profissional *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-[215px] justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? professionals.find(
                                        (professional) =>
                                          professional.value === field.value
                                      )?.label
                                    : "Selecione o profissional"}
                                  <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Buscar profissionais..." />
                                <CommandEmpty>
                                  Nenhum profissional encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                  {professionals.map((professional) => (
                                    <CommandItem
                                      value={professional.label}
                                      key={professional.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "professional",
                                          professional.value
                                        );
                                      }}
                                    >
                                      <Icons.check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          professional.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {professional.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 items-center">
                    <FormField
                      control={form.control}
                      name="patient"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Paciente *</FormLabel>
                          <FormControl>
                            <div className="flex items-center justify-start rounded-md border border-input">
                              <Select
                                onValueChange={(value) =>
                                  setPatientSelectOption(value)
                                }
                                defaultValue="name"
                              >
                                <SelectTrigger
                                  className="w-[200px] border-none rounded-none rounded-l-md"
                                  defaultValue="name"
                                >
                                  <SelectValue placeholder="Nome" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Opções</SelectLabel>
                                    <SelectItem value="name">Nome</SelectItem>
                                    <SelectItem value="lastName">
                                      Sobrenome
                                    </SelectItem>
                                    <SelectItem value="cpf-cnpj">
                                      CPF/CNPJ
                                    </SelectItem>
                                    <SelectItem value="control-number">
                                      Número de controle
                                    </SelectItem>
                                    <SelectItem value="email">
                                      E-mail
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>

                              <Separator orientation="vertical" />

                              <Input
                                placeholder={
                                  patientSelectOption === "name"
                                    ? "Nome do paciente"
                                    : patientSelectOption === "lastName"
                                    ? "Sobrenome do paciente"
                                    : patientSelectOption === "cpf-cnpj"
                                    ? "CPF/CNPJ do paciente"
                                    : patientSelectOption === "control-number"
                                    ? "Número de controle do paciente"
                                    : patientSelectOption === "email"
                                    ? "E-mail do paciente"
                                    : "Nome do paciente"
                                }
                                autoComplete="off"
                                className="border-none rounded-none rounded-l-md"
                                {...field}
                              />

                              <Separator orientation="vertical" />

                              <div className="py-1 pr-1">
                                <Button
                                  type="button"
                                  variant="secondary"
                                  className="flex items-center border-none rounded-none rounded-r-md px-3 py-2"
                                  onClick={() => {
                                    getPatient();
                                  }}
                                >
                                  <Icons.search className="h-4 w-4" />{" "}
                                  <span className="ml-2">Buscar</span>
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    <FormField
                      control={form.control}
                      name="cellPhone"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Telefone celular *</FormLabel>
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
                              disabled={patientDisabledCellPhone}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreementPlan"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Plano de convênio</FormLabel>
                          <FormControl
                            className={cn(
                              "w-[215px]",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={patientDisabledAgreementPlan}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Plano de convênio" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="particular">
                                  Particular
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
                      name="procedure"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Procedimento</FormLabel>
                          <FormControl
                            className={cn(
                              "w-[215px]",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={patientDisabledProcedure}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="teste">Teste</SelectItem>
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
                    name="observations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[80px]"
                            minLength={10}
                            maxLength={500}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="flex gap-5 text-sm text-black">
                          <p>Caracteres: {field.value?.length ?? 0}</p>
                          <p>Limite: 500</p>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="w-[300px]">
                    <FormField
                      control={form.control}
                      name="appointmentStatus"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Situação do agendamento</FormLabel>
                          <FormControl
                            className={cn(
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="a-confirmar">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-gray-200 p-1 rounded-md">
                                      <Icons.clock className="h-4 w-4 text-black" />
                                    </div>
                                    A confirmar
                                  </div>
                                </SelectItem>

                                <SelectItem value="confirmado">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-sky-100 p-1 rounded-md">
                                      <Icons.check className="h-4 w-4 text-sky-700" />
                                    </div>
                                    Confirmado
                                  </div>
                                </SelectItem>

                                <SelectItem value="confirmado-pelo-paciente">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-sky-200 p-1 rounded-md">
                                      <Icons.userRoundCheck className="h-4 w-4 text-sky-700" />
                                    </div>
                                    Confirmado pelo paciente
                                  </div>
                                </SelectItem>

                                <SelectItem value="cancelado-pelo-profissional">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-rose-200 p-1 rounded-md">
                                      <Icons.building className="h-4 w-4 text-rose-600" />
                                    </div>
                                    Cancelado pelo profissional
                                  </div>
                                </SelectItem>

                                <SelectItem value="cancelado-pelo-paciente">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-rose-300 p-1 rounded-md">
                                      <Icons.userUncheck className="h-4 w-4 text-rose-800" />
                                    </div>
                                    Cancelado pelo paciente
                                  </div>
                                </SelectItem>

                                <SelectItem value="em-espera">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-yellow-300 p-1 rounded-md">
                                      <Icons.userMinus className="h-4 w-4 text-yellow-800" />
                                    </div>
                                    Em espera
                                  </div>
                                </SelectItem>

                                <SelectItem value="em-andamento">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-blue-300 p-1 rounded-md">
                                      <Icons.stethoscope className="h-4 w-4 text-blue-700" />
                                    </div>
                                    Em andamento
                                  </div>
                                </SelectItem>

                                <SelectItem value="finalizado">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-green-300 p-1 rounded-md">
                                      <Icons.doubleCheck className="h-4 w-4 text-green-700" />
                                    </div>
                                    Finalizado
                                  </div>
                                </SelectItem>

                                <SelectItem value="faltou">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-red-300 p-1 rounded-md">
                                      <Icons.closeCircle className="h-4 w-4 text-red-700" />
                                    </div>
                                    Faltou
                                  </div>
                                </SelectItem>

                                <SelectItem value="pagamento">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-indigo-300 p-1 rounded-md">
                                      <Icons.dollarSign className="h-4 w-4 text-indigo-700" />
                                    </div>
                                    Pagamento
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <Card>
              <CardContent className="flex flex-row justify-between gap-2 items-center">
                <div className="justify-start">
                  <div className="w-[255px]">
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormControl
                            className={cn(
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sem-rotulo">
                                  <div className="flex items-center gap-2">
                                    <div className="border-2 border-gray-400 h-4 w-4 rounded-full" />
                                    Sem rótulo
                                  </div>
                                </SelectItem>

                                <SelectItem value="rotulo-cor-amarelo">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-[#F6BF26] h-4 w-4 rounded-full" />
                                    Rótulo cor amarelo
                                  </div>
                                </SelectItem>

                                <SelectItem value="rotulo-cor-rosa">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-[#E67C73] h-4 w-4 rounded-full" />
                                    Rótulo cor rosa
                                  </div>
                                </SelectItem>

                                <SelectItem value="rotulo-cor-cinza">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-[#616161] h-4 w-4 rounded-full" />
                                    Rótulo cor cinza
                                  </div>
                                </SelectItem>

                                <SelectItem value="rotulo-cor-violeta-claro">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-[#A1AEF2] h-4 w-4 rounded-full" />
                                    Rótulo cor violeta claro
                                  </div>
                                </SelectItem>

                                <SelectItem value="rotulo-cor-verde-escuro">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-[#2E5440] h-4 w-4 rounded-full" />
                                    Rótulo cor verde escuro
                                  </div>
                                </SelectItem>

                                <SelectItem value="rotulo-cor-laranja">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-[#FF6433] h-4 w-4 rounded-full" />
                                    Rótulo cor laranja
                                  </div>
                                </SelectItem>

                                <SelectItem value="rotulo-cor-violeta">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-[#8E24AA] h-4 w-4 rounded-full" />
                                    Rótulo cor violeta
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="justify-end space-x-2">
                  <CredenzaClose asChild>
                    <Button variant="outline">
                      <Icons.close className="h-4 w-4" />
                      <span className="ml-2">Cancelar</span>
                    </Button>
                  </CredenzaClose>

                  {form.formState.isSubmitting ? (
                    <Button variant="default" disabled>
                      <Icons.loader className="h-4 w-4 animate-spin" />
                      <span className="ml-2">Agendando...</span>
                    </Button>
                  ) : (
                    <Button type="submit" variant="default">
                      <Icons.check className="h-4 w-4" />
                      <span className="ml-2">Agendar</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </Tabs>

      {/* <AlertDialog>
      <Button
        asChild
        size="lg"
        className="flex flex-row items-center gap-2 w-full"
      >
        <AlertDialogTrigger className="w-full">
          <Icons.plus size={20} /> Create Event
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Event</AlertDialogTitle>

          <AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="gap-3 flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Science assignment..."
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={(date) => field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          autoComplete="off"
                          className="resize-none"
                          placeholder="Located in lab..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-row gap-2 justify-end mt-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting" : "Add Event"}
                  </Button>
                </div>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog> */}
    </>
  );
}
