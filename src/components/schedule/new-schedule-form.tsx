"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { eventFormSchema } from "@/lib/validations/event";
import { eventDefaultValues } from "@/constants";

import { Icons } from "@/components/icons";
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

import { DateTimePicker } from "@/components/ui/date-time-picker";

import { createEvent } from "@/actions/event-calendar";

export function NewScheduleForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    try {
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
    }
  }

  return (
    <AlertDialog>
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
    </AlertDialog>
  );
}
