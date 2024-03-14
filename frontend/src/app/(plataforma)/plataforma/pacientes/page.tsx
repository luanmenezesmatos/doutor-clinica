import { db as prisma } from "@/lib/db";

import { Patients } from "@/components/platform/patients/patients";

export default async function PatientsPage() {
  const patients = await prisma.patient.findMany();

  const formattedData = patients.map((patient) => {
    return {
      id: patient.id,
      full_civil_name: patient.full_civil_name,
      date_of_birth: patient.date_of_birth.toISOString(),
    };
  });

  return <Patients data={formattedData} />;
}
