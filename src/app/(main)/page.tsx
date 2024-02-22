import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

import Balancer from "react-wrap-balancer";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeatureOne />
        <FeatureTwo />
      </main>
    </>
  );
}

async function Hero() {
  return (
    <>
      <section className="py-12">
        <div className={cn("max-w-5xl mx-auto", "p-6 sm:p-8")}>
          <div className="w-full h-full m-auto max-w-5xl py-10 px-6 flex flex-col font-sans">
            <p className="font-bold text-lg pb-2">Sistema para clínicas</p>

            <div className="space-y-8">
              <h1 className="text-5xl lg:6xl font-bold">
                O software <br /> que resolve
              </h1>

              <div className="p-4 flex flex-col md:flex-row border rounded-lg gap-6 items-center w-fit">
                <p className="font-medium">Por quê nos escolher?</p>

                <ul
                  className={cn(
                    "flex flex-wrap gap-4",
                    "text-md",
                    "font-light",
                    "text-gray-900",
                    "text-center"
                  )}
                >
                  <li className="w-full md:w-auto">Agendamento on-line</li>
                  <li className="w-full md:w-auto">Prontuário eletrônico</li>
                  <li className="w-full md:w-auto">Receituário digital</li>
                  <li className="w-full md:w-auto">Telemedicina</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

async function FeatureOne() {
  return (
    <section className="py-12">
      <div
        className={cn(
          "max-w-5xl mx-auto",
          "p-6 sm:p-8",
          "grid md:grid-cols-2 md:gap-12 items-stretch",
          "font-sans"
        )}
      >
        <div className="flex flex-col gap-6 py-8">
          <h3 className="!my-0 font-bold text-4xl">
            O que pode acontecer se você utilizar o{" "}
            <span className="font-extrabold">
              software para clínica errado?
            </span>
          </h3>
          <ul className="leading-[1.4]">
            <li>
              &#8226; A clínica fica desorganizada, faltam processos
              padronizados;
            </li>
            <li>
              &#8226; Alto índice de atrasos e cancelamentos das consultas e
              procedimentos;
            </li>
            <li>&#8226; Controlar o estoque é complicado;</li>
            <li>
              &#8226; Dificuldade na tomada de decisão e de planilhas e
              papelada;
            </li>
            <li>
              &#8226; Prejuízos financeiros por falta de controle nos repasses e
              nas cobranças.
            </li>
          </ul>
          <div className="not-prose flex items-center gap-2">
            <Button className="w-fit" asChild>
              <Link href="#">Solicite uma demonstração</Link>
            </Button>
            <Button className="w-fit" variant="link" asChild>
              <Link href="#">Saiba mais {"->"}</Link>
            </Button>
          </div>
        </div>
        <div className="not-prose border relative rounded-lg flex">
          <Image
            src="/images/svg/renders/feature-one.svg"
            alt="placeholder"
            className="fill object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300 ease-in-out rounded-lg"
            fill
          />
        </div>
      </div>
    </section>
  );
}

async function FeatureTwo() {
  type FeatureText = {
    avatar: string;
    author: string;
    title: string;
    description: string;
    href?: string;
  };

  const featureText: FeatureText[] = [
    {
      avatar: "/images/svg/avatars/avatar-01.png",
      author: "Fulano",
      title: "Lorem Ipsum",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      avatar: "/images/svg/avatars/avatar-01.png",
      author: "Fulano",
      title: "Lorem Ipsum",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      avatar: "/images/svg/avatars/avatar-01.png",
      author: "Fulano",
      title: "Lorem Ipsum",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      avatar: "/images/svg/avatars/avatar-01.png",
      author: "Fulano",
      title: "Lorem Ipsum",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];

  return (
    <section className="py-12">
      <div
        className={cn(
          "max-w-5xl mx-auto",
          "p-6 sm:p-8",
          "not-prose",
          "font-sans"
        )}
      >
        <div className="flex flex-col">
          <h3 className="text-4xl font-bold">
            <Balancer>
              Opiniões reais de quem <br /> usa nosso software médico
            </Balancer>
          </h3>
          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-4">
            {featureText.map(
              ({ avatar, author, title, description }, index) => (
                <div className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        {/* <AvatarImage
                          src={avatar}
                          alt={author}
                          className="h-full w-full object-cover"
                        /> */}
                        <AvatarFallback className="bg-primary text-white">
                          FL
                        </AvatarFallback>
                      </Avatar>

                      <h5 className="font-semibold text-primary text-md">
                        {author}
                      </h5>
                    </div>
                    <h4 className="font-medium text-primary text-md">
                      {title}
                    </h4>
                    <p className="text-sm opacity-75">{description}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
