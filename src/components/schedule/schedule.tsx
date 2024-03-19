"use client";

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

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptBRLocale from "@fullcalendar/core/locales/pt-br";

export function Schedule() {
  const breadcrumbItems = [{ title: "Agenda", link: "" }];

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

        <Card className="h-full w-full justify-start p-5 overflow-auto">
          <div className="relative z-0 flex flex-col min-w-0 p-3 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
            <FullCalendar
              timeZone="America/Sao_Paulo"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev next today",
                center: "title",
                right: "dayGridMonth timeGridWeek timeGridDay",
              }}
              dayHeaders={true}
              dayHeaderClassNames={"text-lg font-medium py-2"}
              selectable={true}
              locale={ptBRLocale}
              editable={true}
              titleFormat={{
                year: "numeric",
                month: "long",
                day: "numeric",
              }}
            />
          </div>
        </Card>
      </div>
    </>
  );
}
