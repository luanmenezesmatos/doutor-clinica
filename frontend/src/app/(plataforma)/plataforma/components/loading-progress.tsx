"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function LoadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const firstValue = 20;
    const secondValue = 40;
    const thirdValue = 60;
    const fourthValue = 80;
    const fifthValue = 100;

    setTimeout(() => setProgress(firstValue), 500);
    setTimeout(() => setProgress(secondValue), 1000);
    setTimeout(() => setProgress(thirdValue), 1500);
    setTimeout(() => setProgress(fourthValue), 2000);
    setTimeout(() => setProgress(fifthValue), 2500);
  }, []);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex w-full flex-col justify-center space-y-10 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-[1.3rem] font-semibold tracking-tight">
            Carregando...
          </h1>
          <Progress value={progress} />
        </div>
      </div>
    </div>
  );
}
