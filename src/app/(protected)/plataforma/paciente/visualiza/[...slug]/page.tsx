import { notFound } from "next/navigation";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { db as prisma } from "@/lib/db";

import { calculateAge, dateFormatter } from "@/lib/utils";

import { Icons } from "@/components/icons";
import Breadcrumb from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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

  if (!patient) {
    return notFound();
  }

  return {
    title: `Paciente: ${patient.full_civil_name}`,
    description: `Informações do paciente ${patient.full_civil_name}`,
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

  const breadcrumbItems = [
    { title: "Pacientes", link: "/plataforma/pacientes" },
    { title: "Visualizar Paciente", link: "" },
  ];

  const dateOfBirth = dateFormatter(patient.date_of_birth, "short");

  const additionalInformation =
    await prisma.patientAdditionalInformation.findFirst({
      where: {
        patientId: patient.id,
      },
    });

  const additionalFamilyInformation =
    await prisma.patientAdditionalFamilyInformation.findFirst({
      where: {
        patientAdditionalInformationId: additionalInformation?.id,
      },
    });

  const patientAddress = await prisma.patientAddress.findFirst({
    where: {
      patientId: patient.id,
    },
  });

  let address = "";

  if (patientAddress) {
    if (patientAddress.zip) address += `CEP: ${patientAddress.zip}`;
    if (patientAddress.street) {
      if (address !== "") address += " - ";
      address += `Rua: ${patientAddress.street}`;
    }
    if (patientAddress.number) {
      if (address !== "") address += ", ";
      address += `Número: ${patientAddress.number}`;
    }
    if (patientAddress.neighborhood) {
      if (address !== "") address += ", ";
      address += `Bairro: ${patientAddress.neighborhood}`;
    }
    if (patientAddress.city) {
      if (address !== "") address += ", ";
      address += `Cidade: ${patientAddress.city}`;
    }
    if (patientAddress.state) {
      if (address !== "") address += ", ";
      address += `Estado: ${patientAddress.state}`;
    }
    if (patientAddress.complement) {
      if (address !== "") address += ", ";
      address += `Complemento: ${patientAddress.complement}`;
    }
  }

  if (address === "") {
    address = "Não informado";
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between">
          <Heading
            title="Perfil do paciente"
            description={`Informações do paciente`}
          />
        </div>

        <Tabs defaultValue="personal-data" className="space-y-4">
          <Card className="justify-start">
            <CardContent className="flex items-center justify-start space-x-5">
              <Image
                className="w-20 h-20 rounded-lg"
                src="/images/png/user.png"
                alt="Doctor"
                width={80}
                height={80}
              />

              <div className="flex flex-col">
                <CardTitle className="text-lg">
                  {patient.full_civil_name},{" "}
                  {calculateAge(patient.date_of_birth)}
                </CardTitle>
                <CardDescription>
                  <span className="text-gray-500">
                    {patient.control_number}
                  </span>
                </CardDescription>
              </div>
            </CardContent>

            <div className="px-5">
              <TabsList className="justify-start py-10 mr-4 space-x-2 gap-4">
                <TabsTrigger
                  value="personal-data"
                  className="flex flex-col items-center py-4"
                >
                  <Icons.user className="w-6 h-6" />
                  <span>Dados Pessoais</span>
                </TabsTrigger>
                <TabsTrigger
                  value="next-appointments"
                  className="flex flex-col items-center py-4"
                >
                  <Icons.calendar className="w-6 h-6" />
                  <span>Próximos Agendamentos</span>
                </TabsTrigger>
                <TabsTrigger
                  value="waiting-list"
                  className="flex flex-col items-center py-4"
                >
                  <Icons.list className="w-6 h-6" />
                  <span>Lista de Espera</span>
                </TabsTrigger>
                <TabsTrigger
                  value="attendance"
                  className="flex flex-col items-center py-4"
                >
                  <Icons.stethoscope className="w-6 h-6" />
                  <span>Atendimentos</span>
                </TabsTrigger>
                <TabsTrigger
                  value="last-prescriptions"
                  className="flex flex-col items-center py-4"
                >
                  <Icons.pill className="w-6 h-6" />
                  <span>Últimas Prescrições</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent className="pt-5 pb-5" value="personal-data">
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <div className="grid lg:grid-cols-2 gap-4">
                      <div className="col-12 col-sm-6">
                        <h4 className="text-base font-semibold mb-[1rem]">
                          Dados pessoais
                        </h4>

                        <div className="col-sm rounded-md border p-1 gap-2">
                          <div className="p-2 flex justify-between text-sm">
                            <p className="text-gray-600 font-medium">
                              Situação
                            </p>
                            <p className="text-gray-900 font-medium text-end">
                              <Badge variant="success">Ativo</Badge>
                            </p>
                          </div>
                          <Separator />
                          <div className="p-2 flex justify-between text-sm">
                            <p className="text-gray-600 font-medium">
                              Nome civil completo
                            </p>
                            <p className="font-medium text-end">
                              {patient.full_civil_name}
                            </p>
                          </div>
                          <Separator />
                          <div className="p-2 flex justify-between text-sm">
                            <p className="text-gray-600 font-medium">
                              Data de Nascimento
                            </p>
                            <p className="font-medium text-end">
                              {`${dateOfBirth} (${calculateAge(
                                patient.date_of_birth
                              )})`}
                            </p>
                          </div>
                          <Separator />
                          <div className="p-2 flex justify-between text-sm">
                            <p className="text-gray-600 font-medium">Sexo</p>
                            <p className="font-medium text-end">
                              {patient && (
                                <>
                                  <span>
                                    {patient.gender?.[0]?.toUpperCase()}
                                  </span>
                                  <span>
                                    {patient.gender?.substring(1).toLowerCase()}
                                  </span>
                                </>
                              )}
                            </p>
                          </div>
                          <Separator />
                          <div className="p-2 flex justify-between text-sm">
                            <p className="text-gray-600 font-medium">
                              CPF/CNPJ
                            </p>
                            <p className="font-medium text-end">
                              {patient.cpf_cnpj ? (
                                patient.cpf_cnpj
                              ) : (
                                <span className="flex items-center text-[#E4A11B]">
                                  Paciente sem CPF{" "}
                                  <Icons.alert className="w-4 h-4 ml-1" />
                                </span>
                              )}
                            </p>
                          </div>
                          <Separator />
                          <div className="p-2 flex justify-between text-sm">
                            <p className="text-gray-600 font-medium">RG</p>
                            <p className="font-medium text-end">
                              {patient.rg ? (
                                patient.rg
                              ) : (
                                <span>Não informado</span>
                              )}
                            </p>
                          </div>
                          <Separator />
                          <div className="p-2 flex justify-between text-sm">
                            <p className="text-gray-600 font-medium">
                              Nome da Mãe
                            </p>
                            <p className="font-medium text-end">
                              {additionalFamilyInformation?.mother_name ? (
                                additionalFamilyInformation.mother_name
                              ) : (
                                <span>Não informado</span>
                              )}
                            </p>
                          </div>
                          <Separator />
                          <div className="p-2 flex justify-between text-sm">
                            <p className="text-gray-600 font-medium">
                              Nome do Pai
                            </p>
                            <p className="font-medium text-end">
                              {additionalFamilyInformation?.father_name ? (
                                additionalFamilyInformation.father_name
                              ) : (
                                <span>Não informado</span>
                              )}
                            </p>
                          </div>
                          <Separator />
                          <div className="p-2 flex items-center justify-between text-sm">
                            <p className="text-gray-600 font-medium">
                              Endereço
                            </p>
                            <div className="flex items-center font-medium text-end gap-2">
                              {address ? (
                                <>
                                  <p className="relative text-ellipsis overflow-hidden whitespace-nowrap">
                                    <span className="relative text-left pl-5 pr-5">
                                      {address.substring(0, 35)}
                                    </span>
                                    ...
                                    <span
                                      className="absolute inset-0 bg-gradient-to-l from-white"
                                      aria-hidden="true"
                                    />
                                  </p>

                                  <HoverCard>
                                    <HoverCardTrigger className="flex items-center rounded-lg border shadow py-1 px-2">
                                      Passe o mouse para ver mais
                                      <Icons.search className="w-4 h-4 ml-1" />
                                    </HoverCardTrigger>
                                    <HoverCardContent className="text-start">
                                      <h3 className="text-md font-semibold">
                                        Endereço
                                      </h3>
                                      <p className="text-sm text-muted-foreground">
                                        Descrição
                                      </p>
                                    </HoverCardContent>
                                  </HoverCard>
                                </>
                              ) : (
                                <span>Não informado</span>
                              )}
                            </div>
                          </div>
                          <Separator />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-semibold mb-[1rem]">
                          Informações adicionais
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="next-appointments">
                Componente em desenvolvimento.
              </TabsContent>
              <TabsContent value="waiting-list">
                Componente em desenvolvimento.
              </TabsContent>
              <TabsContent value="attendance">
                Componente em desenvolvimento.
              </TabsContent>
              <TabsContent value="last-prescriptions">
                Componente em desenvolvimento.
              </TabsContent>
            </div>
          </Card>
        </Tabs>
      </div>
    </>
  );
}
