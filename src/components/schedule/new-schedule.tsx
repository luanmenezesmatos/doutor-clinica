"use client";

import { useEffect } from "react";

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
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { DateTimePicker } from "@/components/ui/date-time-picker";
import { TimePicker } from "@/components/ui/time-picker";

import { createEvent } from "@/actions/event-calendar";

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
      speciality: "",
      observations: "",
      appointmentStatus: "",
    },
  });

  async function onSubmit(values: z.infer<typeof appointmentFormSchema>) {
    console.log(values);

    /* try {
      const adjustedDate = new Date(values.dateTime);
      const utcDate = new Date(adjustedDate.toISOString());

      utcDate.setUTCDate(utcDate.getUTCDate() + 1);
      utcDate.setUTCHours(1, 0, 0, 0);

      const newEvent = await createEvent({
        event: { ...values, dateTime: utcDate },
        userId,
        path: "/plataforma/agenda",
      });

      if (newEvent) {
        form.reset();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } */
  }

  return (
    <>
      <Tabs defaultValue="account" className="space-y-4">
        <CredenzaHeader>
          <CredenzaTitle>Adicionar agendamento</CredenzaTitle>
          {/* <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                        {eventInfo?.startStr?.toString()}
                      </DialogDescription> */}
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
                <CardContent>
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
                            <TimePicker
                              date={field.value}
                              setDate={field.onChange}
                            />
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
                            <TimePicker
                              date={field.value}
                              setDate={field.onChange}
                            />
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
                </CardContent>
              </Card>
            </TabsContent>

            <Card>
              <CardContent className="flex flex-row justify-end gap-2">
                <CredenzaClose asChild>
                  <Button variant="outline">
                    <Icons.close className="h-4 w-4" />
                    <span className="ml-2">Cancelar</span>
                  </Button>
                </CredenzaClose>

                <Button type="submit" variant="default">
                  <Icons.check className="h-4 w-4" />
                  <span className="ml-2">Continuar</span>
                </Button>
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
