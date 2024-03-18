import { Icons } from "@/components/icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <Card className="bg-red-600 border-red border">
      <CardHeader>
        <Icons.close className="text-red" />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-red">Erro!</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardContent>
    </Card>
  );
};
