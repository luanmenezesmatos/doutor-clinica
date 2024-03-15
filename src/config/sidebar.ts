import {
  AreaChart,
  Users,
  Calendar,
  Stethoscope,
  HandCoins,
  DollarSign,
  Handshake,
  ShoppingBag,
  LineChart,
  Settings,
  LogOut,
} from "lucide-react";
import { type SideItem } from "@/types";

export const NavItems: SideItem[] = [
  {
    title: "Indicadores",
    icon: AreaChart,
    href: "/plataforma",
  },
  {
    title: "Pacientes",
    icon: Users,
    href: "/plataforma/pacientes",
  },
  {
    title: "Agenda",
    icon: Calendar,
    href: "/plataforma/agenda",
    isChildren: true,
    children: [
      {
        title: "Agendamentos",
        href: "/plataforma/agenda",
      },
      {
        title: "Agendas a confirmar",
        href: "/plataforma/agenda/confirmacao",
      },
      {
        title: "Lista de espera",
        href: "/plataforma/agenda/lista-espera",
      },
      {
        title: "Disponibilidade",
        href: "/plataforma/agenda/disponibilidade",
      },
      {
        title: "Alterações em massa",
        href: "/plataforma/agenda/alteracao",
      },
      {
        title: "Aniversariantes",
        href: "/plataforma/agenda/aniversariantes",
      },
    ],
  },
  {
    title: "Atendimento",
    icon: Stethoscope,
    href: "/plataforma/atendimento",
    isChildren: true,
    children: [
      {
        title: "Painel de chamadas",
        href: "/plataforma/painel-chamadas",
      },
    ],
  },
  {
    title: "Caixa",
    icon: HandCoins,
    href: "/plataforma/caixa",
    isChildren: true,
    children: [
      {
        title: "Abertura e fechamento",
        href: "/plataforma/caixa/abertura-fechamento",
      },
      {
        title: "Faturamento",
        href: "/plataforma/caixa/faturamento",
      },
      {
        title: "Pagar e receber",
        href: "/plataforma/caixa/pagar-receber",
      },
      {
        title: "Movimentações",
        href: "/plataforma/caixa/movimentacoes",
      },
      {
        title: "Caixas fechados",
        href: "/plataforma/caixa/caixas-fechados",
      },
    ],
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    href: "/plataforma/financeiro",
    isChildren: true,
    children: [
      {
        title: "Atendimentos a faturar",
        href: "/plataforma/financeiro/atendimentos-faturar",
      },
      {
        title: "Pagar e receber",
        href: "/plataforma/financeiro/pagar-receber",
      },
      {
        title: "Carteira do paciente",
        href: "/plataforma/financeiro/carteira-paciente",
      },
      {
        title: "Clientes e fornecedores",
        href: "/plataforma/financeiro/clientes-fornecedores",
      },
    ],
  },
  {
    title: "Comercial",
    icon: Handshake,
    href: "/plataforma/comercial",
    isChildren: true,
    children: [
      {
        title: "Assinatura digital",
        href: "/plataforma/comercial/assinatura-digital",
      },
    ],
  },
  {
    title: "Estoque",
    icon: ShoppingBag,
    href: "/plataforma/estoque",
    isChildren: true,
    children: [
      {
        title: "Movimentações",
        href: "/plataforma/estoque/movimentacoes",
      },
    ],
  },
  {
    title: "Relatórios",
    icon: LineChart,
    href: "/plataforma/relatorios",
    isChildren: true,
    children: [
      {
        title: "Agendamentos",
        href: "/plataforma/relatorios/agendamentos",
      },
      {
        title: "Atendimentos",
        href: "/plataforma/relatorios/atendimentos",
      },
      {
        title: "Pacientes",
        href: "/plataforma/relatorios/pacientes",
      },
      {
        title: "Planos de convênio",
        href: "/plataforma/relatorios/planos-convenio",
      },
      {
        title: "Dietas",
        href: "/plataforma/relatorios/dietas",
      },
    ],
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/plataforma/configuracoes",
    isChildren: true,
    children: [
      {
        title: "Minha empresa",
        href: "/plataforma/configuracoes/minha-empresa",
      },
      {
        title: "Agenda",
        href: "/plataforma/configuracoes/agenda",
      },
      {
        title: "Paciente",
        href: "/plataforma/configuracoes/paciente",
      },
      {
        title: "Atendimento",
        href: "/plataforma/configuracoes/atendimento",
      },
      {
        title: "Comercial",
        href: "/plataforma/configuracoes/comercial",
      },
      {
        title: "Segurança",
        href: "/plataforma/configuracoes/seguranca",
      },
    ],
  },
  {
    title: "Sair",
    icon: LogOut,
    color: "text-red-500",
    href: "/sair",
  },
];
