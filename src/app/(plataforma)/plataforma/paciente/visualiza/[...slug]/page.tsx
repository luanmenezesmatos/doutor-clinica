import { notFound } from "next/navigation";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { db as prisma } from "@/lib/db";
import { absoluteUrl } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

interface PatientPageProps {
  params: {
    slug: string[];
  };
}

async function getPatientFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");

  const patient = await prisma.patient.findFirst({
    where: {
      control_number: slug,
    },
  });

  if (!patient) null;

  return patient;
}

export async function generateMetadata({
  params,
}: PatientPageProps): Promise<Metadata> {
  const patient = await getPatientFromParams(params);

  const slug = params?.slug?.join("/");

  if (!patient) {
    return notFound();
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", `Paciente: ${patient.full_civil_name}`);
  ogUrl.searchParams.set("type", "Paciente");

  return {
    title: `Paciente: ${patient.full_civil_name}`,
    description: `Informações do paciente ${patient.full_civil_name}`,
    openGraph: {
      title: `Paciente: ${patient.full_civil_name}`,
      description: `Informações do paciente ${patient.full_civil_name}`,
      url: absoluteUrl(slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: `Paciente: ${patient.full_civil_name}`,
        },
      ],
    },
  };
}

export async function generateStaticParams(): Promise<
  PatientPageProps["params"][]
> {
  const patients = await prisma.patient.findMany({
    select: {
      control_number: true,
    },
  });

  return patients
    .filter((patient) => patient.control_number !== null)
    .map((patient) => ({
      slug: [patient.control_number as string],
    }));
}

export default async function PatientPage({
  params,
}: PatientPageProps): Promise<JSX.Element> {
  const patient = await getPatientFromParams(params);

  if (!patient) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">{patient.full_civil_name}</h1>
    </div>
  );
}
