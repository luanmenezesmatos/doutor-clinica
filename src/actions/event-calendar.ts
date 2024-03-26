"use server";

import { handleError } from "@/lib/utils";
import { db as prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { Patient } from "@prisma/client";

import { getPatient } from "./patient";

type CreateEventParams = {
  userId: string;
  event: {
    date: Date;
    startTime: string;
    endTime: string;
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
      hex: "",
    },
    {
      name: "rotulo-cor-amarelo",
      hex: "#F6BF26",
    },
  ];

  try {
    const patient = await getPatient({
      values: {
        patient_select_option: event.patient,
      },
    });

    if (patient) {
      const createdEvent = await prisma.event.create({
        data: {
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
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
          color:
            colors.find((color) => color.name === event.color)?.hex ||
            "sem-rotulo",
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

    return events;
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
