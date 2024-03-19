"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { verifyEmail } from "@/actions/verify-email";

import { BarLoader } from "react-spinners";

import { toast } from "sonner";

export function VerifyEmailForm() {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError(true);

      return toast.message("Ocorreu um erro ao verificar o e-mail!", {
        description: "O token de verificação não foi informado!",
      });
    }

    verifyEmail(token)
      .then((data) => {
        if (data?.error) {
          setError(true);

          toast.message("Ocorreu um erro ao verificar o e-mail!", {
            description: data.error,
          });
        } else {
          setError(false);
          setSuccess(true);

          toast.success("E-mail verificado com sucesso!");
        }
      })
      .catch(() => {
        setError(true);

        toast.error("Ocorreu um erro ao verificar o e-mail!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex items-center w-full justify-center">
      <BarLoader color="#000" loading={!error && !success} />
    </div>
  );
}
