"use client";

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import { Heading } from "@/components/ui/heading";
import Breadcrumb from "@/components/breadcrumb";

import { Icons } from "@/components/icons";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptBRLocale from "@fullcalendar/core/locales/pt-br";

import { getAllEventsByUser } from "@/actions/event-calendar";

import { NewScheduleForm } from "./new-schedule-form";

function renderEventContent(eventInfo: any) {
  const maxLength = 15;

  const truncatedTitle =
    eventInfo.event.title.length > maxLength
      ? `${eventInfo.event.title.substring(0, maxLength)}...`
      : eventInfo.event.title;

  console.log("event info", eventInfo.event);

  return (
    <div className="flex flex-wrap overflow-hidden bg-indigo-200 px-2 py-1.5 rounded-sm w-full event-button hover:bg-indigo-300 transition-all">
      <AlertDialog>
        <AlertDialogTrigger title="Event Details">
          <p className="font-semibold text-xs text-indigo-900 overflow-hidden pr-1">
            {truncatedTitle}
          </p>
        </AlertDialogTrigger>
        <AlertDialogContent className="dark:bg-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle>{eventInfo.event.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {eventInfo.event.extendedProps.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function Schedule({ user }: { user: string }) {
  const breadcrumbItems = [{ title: "Agenda", link: "" }];

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEventsByUser({ user });

        console.log("response", response);

        if (response) {
          const transformedEvents = response.map((event: any) => ({
            id: event.id,
            title: event.title,
            description: event.description,
            start: event.date,
          }));

          console.log("transformedEvents", transformedEvents);

          setEvents(transformedEvents as []);
        }
      } catch (error) {
        console.log("Error fetching events", error);
      }
    };

    fetchEvents();
  }, [user]);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between">
          <Heading
            title="Agenda"
            description="Aqui você pode visualizar e gerenciar os agendamentos."
          />

          <div className="flex flex-col md:flex-row items-center">
            <Select>
              <SelectTrigger
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-[150px] flex justify-between"
                )}
              >
                <Icons.plus className="h-4 w-4" />
                <span>Adicionar</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Agendamento</SelectItem>
                <SelectItem value="2">Compromisso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="w-full justify-start p-5 overflow-auto">
          <div className="relative z-0 flex flex-col min-w-0 p-3 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <Select defaultValue="paciente">
                <SelectTrigger className="sm:w-full md:w-[200px] lg:w-[250px]">
                  <SelectValue placeholder="Paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paciente">Paciente</SelectItem>
                  <SelectItem value="profissional">Profissional</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="default" className="mb-2 md:mb-0">
                <Icons.plus className="h-4 w-4" />
                <span>Adicionar</span>
              </Button>
              <Button variant="default" className="mb-2 md:mb-0">
                <span>Filtrar</span>
              </Button>
              <NewScheduleForm userId={user} />
            </div>
            <Separator className="mt-4" />
            <div className="flex flex-col-reverse xl:flex-row pt-4">
              <div className="flex flex-col lg:flex-row-auto pe-3 w-250px me-3 overflow-y-scroll mb-10">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  fromYear={2000}
                  toYear={new Date().getFullYear()}
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <div className="flex-1">
                <FullCalendar
                  timeZone="America/Sao_Paulo"
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridDay"
                  headerToolbar={{
                    left: "prev next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  views={{
                    timeGridWeek: {
                      titleFormat: {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      },
                    },
                  }}
                  eventTimeFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: false,
                  }}
                  events={events}
                  eventContent={renderEventContent}
                  slotDuration={"00:40:00"}
                  slotLabelFormat={{ hour: "2-digit", minute: "2-digit" }}
                  slotMinTime={"08:00:00"}
                  slotMaxTime={"18:31:00"}
                  titleRangeSeparator=" até "
                  dayHeaderClassNames={"font-medium py-2"}
                  // nowIndicator={true}
                  selectable={true}
                  locale={ptBRLocale}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
