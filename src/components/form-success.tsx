import { Icons } from "@/components/icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <Card className="bg-green/10 border-green border">
      <CardHeader>
        <Icons.check className="text-green" />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-green">Sucesso!</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardContent>
    </Card>
  );
};
