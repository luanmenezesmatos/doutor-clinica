import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/verificar-email?token=${token}`;

  await resend.emails.send({
    from: "Doutor Clínica <onboarding@resend.dev>",
    to: email,
    subject: "Confirme seu endereço de e-mail",
    html: `
      <p>Olá! Clique no link abaixo para confirmar seu endereço de e-mail:</p>
      <a href="${confirmLink}">${confirmLink}</a>
    `,
  });
};
