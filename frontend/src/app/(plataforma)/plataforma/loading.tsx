import { LoadingProgress } from "./components/loading-progress";

export default async function Loading() {
  return (
    <>
      <LoadingProgress />

      {/* <div className="container flex h-screen w-screen flex-col items-center justify-center">
  <div className="flex w-full flex-col justify-center space-y-10 sm:w-[350px]">
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-[1.3rem] font-semibold tracking-tight">
        Carregando...
      </h1>
    </div>
  </div>
</div> */}
    </>
  );
}
