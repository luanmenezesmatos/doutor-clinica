"use client";

import * as React from "react";
import { AlertTriangle, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="grid text-center">
          <TimePickerInput
            picker="hours"
            date={date}
            setDate={setDate}
            ref={hourRef}
            onRightFocus={() => minuteRef.current?.focus()}
          />
        </div>
        <div className="grid text-center">
          <TimePickerInput
            picker="minutes"
            date={date}
            setDate={setDate}
            ref={minuteRef}
            onLeftFocus={() => hourRef.current?.focus()}
            onRightFocus={() => secondRef.current?.focus()}
          />
        </div>
        <div className="flex items-center">
          {new Date(date?.getTime() ?? 0).getHours() >= 12 &&
          new Date(date?.getTime() ?? 0).getHours() < 13 ? (
            <div className="ml-2">
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex items-center justify-center p-[0.25rem] rounded-full border border-input">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <Label className="font-semibold">Horário de Almoço</Label>
                  <p className="text-sm text-gray-500">
                    Você está agendando um horário de almoço. Por favor, verifique se o horário está correto.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
          ) : (
            <Clock className="ml-2 h-4 w-4 opacity-50" />
          )}
        </div>
      </div>
    </>
  );
}
