import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

import Balancer from "react-wrap-balancer";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { MacbookScroll } from "@/components/ui/macbook-scroll";
import {
  CardBody,
  CardHoverContainer,
  CardItem,
} from "@/components/ui/3d-hover-card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CardContainer } from "@/components/ui/3d-card";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Demo />
        <Testimonials />
        <Migration />
        <Separator />
        <FeatureOne />
        <FeatureTwo />
        <FeatureThree />
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
            <p className="font-nunito font-bold text-lg pb-2">
              Sistema para Clínicas
            </p>

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

async function Demo() {
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
          <ul className="leading-[1.4] font-medium">
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
        {/* <Image
            src="/images/jpg/renders/woman-doctor.jpg"
            alt="placeholder"
            className="fill object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300 ease-in-out rounded-lg"
            fill
          /> */}
        <CardHoverContainer className="inter-var">
          <CardBody className="relative group/card sm:w-[30rem] border-black/[0.1] w-auto h-auto rounded-xl border">
            <CardItem translateZ="100" className="w-full">
              <Image
                src="/images/jpg/renders/woman-doctor.jpg"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
          </CardBody>
        </CardHoverContainer>
      </div>
    </section>
  );
}

async function Testimonials() {
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
                <div
                  className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2"
                  key={index}
                >
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

async function Migration() {
  /* return (
    <div className="py-12">
      <div
        className={cn(
          "max-w-5xl mx-auto",
          "p-6 sm:p-8",
          "grid md:grid-cols-2 md:gap-12 items-stretch"
        )}
      >
        <div className="not-prose border relative rounded-lg overflow-hidden flex">
          <Image
            src="/images/svg/renders/feature-three.svg"
            alt="placeholder"
            className="fill object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300 ease-in-out"
            fill
          />
        </div>
        <div className="flex flex-col gap-6 py-8">
          <h3 className="!my-0 font-bold text-4xl">
            Migrar para o Doutor Clínica é fácil e seguro!
          </h3>
          <p className="leading-[1.4]">
            Muitas clínicas já trouxeram seus dados para o Clínica nas Nuvens. O
            processo de migração de sistema é feito com total segurança,
            agilidade e sem interferir na rotina da equipe!
          </p>
          <div className="not-prose flex items-center gap-2">
            <Button className="w-fit" asChild>
              <Link href="#">Solicitar migração</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  ); */

  const Badge = ({ className }: { className?: string }) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
          fill="#00AA45"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
          fill="#219653"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
          fill="#24292E"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
          fill="white"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
          fill="#24292E"
        ></path>
      </svg>
    );
  };

  /* <div className="gap-6 py-8">
          <h3 className="!my-0 font-bold text-4xl">
            Migrar para o Doutor Clínica é fácil e seguro!
          </h3>
          <p className="leading-[1.4]">
            Muitas clínicas já trouxeram seus dados para o Clínica nas Nuvens. O
            processo de migração de sistema é feito com total segurança,
            agilidade e sem interferir na rotina da equipe!
          </p>
          <div className="not-prose flex items-center gap-2">
            <Button className="w-fit" asChild>
              <Link href="#">Solicitar migração</Link>
            </Button>
          </div>
        </div> */

  return (
    <MacbookScroll
      title={<span>Migrar para o Doutor Clínica é fácil e seguro!</span>}
      description={
        <>
          <span>
            Muitas clínicas já trouxeram seus dados para o Clínica nas Nuvens. O
            processo de migração de sistema é feito com total segurança,
            agilidade e sem interferir na rotina da equipe!
          </span>

          <div className="not-prose items-center mt-5">
            <Button className="w-fit" asChild>
              <Link href="#">Solicitar migração</Link>
            </Button>
          </div>
        </>
      }
      badge={
        <Image
          alt="Logo"
          src="logo-icon.svg"
          height={20}
          width={20}
          className="transform"
        />
      }
      src={`/linear.webp`}
      showGradient={false}
    />
  );
}

async function Separator() {
  const phrase =
    "Simplifique a gestão da sua clínica com funcionalidades inteligentes.";

  return (
    <div className="py-12">
      <div className={cn("max-w-5xl mx-auto", "p-6 sm:p-8", "text-center")}>
        <h1 className="!my-0 font-sans font-bold text-4xl">
          <TextGenerateEffect words={phrase} />
        </h1>
      </div>
    </div>
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
        <div className="flex flex-col py-8 gap-6">
          <h3 className="!my-0 font-bold text-4xl">Prontuário Eletrônico</h3>
          <p className={cn("leading-[1.4]", "text-md")}>
            Chega de prontuários de papel. Com o <b className="font-semibold">Prontuário Eletrônico</b>, sua
            clínica torna todo o processo muito mais rápido, organizado e
            eficiente.
          </p>
          <ul className="leading-[1.4] font-medium">
            <li>&#8226; Todos os campos e ferramentas são configuráveis;</li>
            <li>&#8226; Segurança total para salvar as informações;</li>
            <li>&#8226; Melhor comunicação entre profissionais e pacientes;</li>
            <li>
              &#8226; Facilidade para solicitar exames e prescrever
              medicamentos;
            </li>
            <li>
              &#8226; Agilidade para criação de modelos de laudos e atestados.
            </li>
          </ul>
          <div className="not-prose flex items-center gap-2">
            <Button className="w-fit" asChild>
              <Link href="/prontuario-eletronico">
                Conheça todos os recursos
                <Icons.arrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
        {/* <Image
            src="/images/jpg/renders/woman-doctor.jpg"
            alt="placeholder"
            className="fill object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300 ease-in-out rounded-lg"
            fill
          /> */}

        <CardContainer>
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[8rem]">
            <div className="max-w-xs !pb-2 !m-0 font-sans font-bold text-base text-white">
              <Image
                alt="Logo"
                src="/logo-icon-white.svg"
                height={20}
                width={20}
              />
            </div>
            <div className="!m-0 !p-0 font-sans font-normal text-base text-white">
              <span>Tenha um prontuário eletrônico completo e seguro!</span>
            </div>
          </div>
        </CardContainer>
      </div>
    </section>
  );
}

async function FeatureTwo() {
  return (
    <div className="py-12">
      <div
        className={cn(
          "max-w-5xl mx-auto",
          "p-6 sm:p-8",
          "grid md:grid-cols-2 md:gap-12 items-stretch"
        )}
      >
        <div className="border relative rounded-lg overflow-hidden flex">
          <Image
            src="/images/svg/renders/feature-three.svg"
            alt="placeholder"
            className="fill object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300 ease-in-out"
            fill
          />
        </div>
        <div className="flex flex-col gap-6 py-8">
          <h3 className="!my-0 font-bold text-4xl">Agenda Médica Online</h3>
          <p className={cn("leading-[1.4]", "text-md")}>
            Todos os seus compromissos, como consultas, lembretes e reuniões,
            podem ser marcados e ajustados de maneira rápida e prática com a
            agenda online do nosso sistema para clínicas.
          </p>
          <ul className="leading-[1.4] font-medium">
            <li>&#8226; Gerenciamento de múltiplas agendas, em tempo real;</li>
            <li>&#8226; Otimização do tempo para pacientes e profissionais;</li>
            <li>
              &#8226; Controle de disponibilidade e escala dos profissionais;
            </li>
            <li>&#8226; Central de agendamentos com sistema de Call Center;</li>
            <li>
              &#8226; Alterações simultâneas para um grande número de dados.
            </li>
          </ul>
          <div className="not-prose flex items-center gap-2">
            <Button className="w-fit" asChild>
              <Link href="/agenda-medica">
                Conheça todos os recursos
                <Icons.arrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

async function FeatureThree() {
  return (
    <div className="py-12">
      <div className={cn("max-w-5xl mx-auto", "p-6 sm:p-8")}>
        <div className="not-prose flex items-center flex-col gap-6 font-sans text-center">
          <h1 className="font-bold text-4xl mb-5">Controle Financeiro</h1>
          <h2 className={cn("leading-[1.4]", "text-md", "max-w-2xl")}>
            Nunca mais perca dinheiro! Nosso{" "}
            <b className="font-semibold">sistema virtual para clínicas</b>{" "}
            proporciona visão completa do seu financeiro. Saiba quem pagou, quem
            está pendente, parcelamentos, fluxo de caixa e integração com meios
            de pagamento.
          </h2>
          <ul className="leading-[1.4] font-medium">
            <li>
              &#8226; Controle total de fluxo de caixa, contas a pagar e
              receber;
            </li>
            <li>&#8226; Gerenciamento de orçamentos e contratos;</li>
            <li>
              &#8226; Geração de boletos e links de pagamento para cartão de
              crédito;
            </li>
            <li>
              &#8226; Emissão simplificada de notas fiscais de produto e
              serviço;
            </li>
            <li>&#8226; Integração completa com agenda e prontuário;</li>
            <li>&#8226; Conciliação de extrato bancário.</li>
          </ul>
          <div className="not-prose flex items-center gap-2">
            <Button className="w-fit" variant="outline" asChild>
              <Link href="/controle-financeiro">
                Conheça todos os recursos
                <Icons.arrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
