import { NavConfig } from "@/types";
import { siteConfig } from "@/config/site";

export const navConfig: NavConfig = {
  mainNav: [
    {
      type: "dropdown",
      title: "Funcionalidades",
      href: "/funcionalidades",
      hideNavMenuLink: false,
      description: `Conheça todas as funcionalidades do ${siteConfig.name}.`,
      dropdownItems: [
        {
          type: "link",
          title: `Atendimento ao Paciente`,
          href: "/atendimento-paciente",
          description:
            "Atenda melhor, com mais dinamismo e diminua a falta de pacientes em até 50%.",
        },
        {
          type: "link",
          title: "Gestão da Clínica",
          href: "/gestao-clinica",
          description:
            "Integre todos os setores da sua clínica, reduza os custos e melhore os resultados.",
        },
        {
          type: "link",
          title: "Segurança e Integração",
          href: "/seguranca-integracao",
          description: `Tenha a melhor segurança dos dados e crie soluções personalizadas com API do ${siteConfig.name}.`,
        },
      ],
    },
    {
      type: "link",
      title: "Planos e Preços",
      href: "/planos",
      description: `Preços sob medida para a sua clínica. Conheça nossos planos e escolha o melhor para você.`,
    },
    {
      type: "dropdown",
      title: "Sobre a Empresa",
      href: "/sobre-a-empresa",
      hideNavMenuLink: false,
      description:
        "Conheça a nossa história, missão, visão e valores. Saiba mais sobre o nosso time e nossa cultura.",
      dropdownItems: [
        {
          type: "link",
          title: "Política de Privacidade",
          href: "/politica-de-privacidade",
          description: `Saiba como protegemos os seus dados e respeitamos a sua privacidade.`,
        },
        {
          type: "link",
          title: "Termos de Uso",
          href: "/termos-de-uso",
          description: `Conheça todas as diretrizes de uso do ${siteConfig.name}.`,
        },
        {
          type: "link",
          title: "Fale Conosco",
          href: "/fale-conosco",
          description: `Fale com um de nossos especialistas e tire todas as suas dúvidas.`,
        },
      ],
    },
  ],
};
