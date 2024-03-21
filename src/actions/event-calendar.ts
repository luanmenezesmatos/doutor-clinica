"use server";

import { handleError } from "@/lib/utils";
import { db as prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description?: string;
    dateTime: Date;
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
  try {
    const createdEvent = await prisma.event.create({
      data: {
        title: event.title,
        description: event.description,
        date: event.dateTime,
        userId,
      },
    });

    revalidatePath(path);

    return createdEvent;
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
