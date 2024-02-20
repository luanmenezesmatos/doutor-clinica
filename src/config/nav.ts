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
      title: "Conteúdos",
      href: "/conteudos",
      hideNavMenuLink: false,
      description:
        "Aprenda mais sobre gestão de clínicas e atendimento ao paciente.",
      dropdownItems: [
        {
          type: "link",
          title: "Blog",
          href: "/blog",
          description:
            "Navegue por nossos artigos e fique por dentro das novidades do mercado de saúde.",
        },
        {
          type: "link",
          title: "Materiais",
          href: "/materiais",
          description:
            "Acesse nossos materiais gratuitos. E-books, infográficos e muito mais.",
        }
      ],
    },
    {
      type: "link",
      title: "Contato",
      href: "/contato",
      description: `Fale com um de nossos especialistas e tire todas as suas dúvidas.`,
    },
  ],
};
