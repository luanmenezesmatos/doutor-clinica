import { Heading } from "@/components/ui/heading";
import Breadcrumb from "@/components/breadcrumb";
import { PatientForm } from "@/components/platform/patients/new/form";

export default async function NewPatientPage() {
  const breadcrumbItems = [
    { title: "Pacientes", link: "/plataforma/pacientes" },
    { title: "Novo paciente", link: "" },
  ];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between">
          <Heading
            title="Novo paciente"
            description="Adicione um novo paciente à sua lista"
          />
        </div>

        <PatientForm />
      </div>
    </>
  );
}
