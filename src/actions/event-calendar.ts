"use server";

import { handleError } from "@/lib/utils";
import { db as prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { Patient } from "@prisma/client";

import { getPatient } from "./patient";

import dayjs from "dayjs";

type CreateEventParams = {
  userId: string;
  event: {
    date: Date;
    startTime: Date;
    endTime: Date;
    typeOfService: string;
    schedule?: string;
    professional: string;
    patient: string;
    cellPhone: string;
    agreementPlan?: string;
    procedure?: string;
    observations?: string;
    appointmentStatus?: string;
    color?: string;
  };
  path: string;
};

type DeleteEventParams = {
  eventId: string;
  path: string;
};

type GetAllEventsParams = {
  user: any;
};

export async function createEvent({ userId, event, path }: CreateEventParams) {
  const colors = [
    {
      name: "sem-rotulo",
      hex: "transparent",
    },
    {
      name: "rotulo-cor-amarelo",
      hex: "#F6BF26",
    },
    {
      name: "rotulo-cor-rosa",
      hex: "#E67C73",
    },
    {
      name: "rotulo-cor-cinza",
      hex: "#616161",
    },
    {
      name: "rotulo-cor-violeta",
      hex: "#A1AEF2",
    },
    {
      name: "rotulo-cor-verde-escuro",
      hex: "#2E5440",
    },
    {
      name: "rotulo-cor-laranja",
      hex: "#FF6433",
    },
    {
      name: "rotulo-cor-violeta",
      hex: "#8E24AA",
    },
  ];

  try {
    const patient = await getPatient({
      values: {
        patient_select_option: event.patient,
      },
    });

    /* startTime: dayjs(info?.startStr).subtract(3, "hours").toDate(),
      endTime: dayjs(info?.startStr).subtract(3, "hours").toDate(), */

    if (patient && patient.success) {
      const createdEvent = await prisma.event.create({
        data: {
          date: event.date,
          startTime: dayjs(event.startTime).subtract(3, "hours").toDate(),
          endTime: dayjs(event.endTime).subtract(3, "hours").toDate(),
          typeOfService: event.typeOfService,
          schedule: event.schedule,
          professional: event.professional,
          patient: {
            connect: {
              id: patient.patient?.id,
            },
          },
          cellPhone: event.cellPhone,
          agreementPlan: event.agreementPlan,
          procedure: event.procedure,
          observations: event.observations,
          appointmentStatus: event.appointmentStatus || "",
          color: colors.find((color) => color.name === event.color)?.hex ?? "",
          userId,
        },
      });

      revalidatePath(path);

      return createdEvent;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getAllEventsByUser({ user }: GetAllEventsParams) {
  try {
    const events = await prisma.event.findMany({
      where: {
        userId: user.id,
      },
    });

    console.log("events", events);

    return events;
  } catch (error) {
    console.error(error);
  }
}

export async function getEvent({ eventId }: { eventId: string }) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    return event;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    const deletedEvent = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    if (deletedEvent) {
      revalidatePath(path);
    }
  } catch (error) {
    console.error(error);
  }
}
