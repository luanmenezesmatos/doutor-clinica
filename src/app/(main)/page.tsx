import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
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
            <p className="font-bold text-lg pb-2">Sistema para Clínicas</p>

            <div className="space-y-8">
              <h1 className="text-6xl font-bold tracking-tight">
                O software <br /> que resolve
              </h1>

              <div className="p-4 flex border rounded-lg gap-6 items-center w-fit">
                <p className="font-medium">Por quê nos escolher?</p>

                <ul
                  className={cn(
                    "flex gap-4",
                    "text-md",
                    "font-light",
                    "text-gray-900"
                  )}
                >
                  <li>Agendamento on-line</li>
                  <li>Prontuário eletrônico</li>
                  <li>Receituário digital</li>
                  <li>Telemedicina</li>
                </ul>
              </div>

              {/* <div className="text-lg">
                <p>We make components for marketing sites.</p>
                <div className="flex gap-2">
                  <p className="opacity-50">
                    Visit craftui.org to use our components for free.{" "}
                  </p>
                  <Link className="hover:opacity-70 transition-all" href="#">
                    Check it Out -{`>`}
                  </Link>
                </div>
                <p className="text-xs mt-4">
                  <span className="opacity-50">Available now online.</span> Tell
                  us what you build next.
                </p>
              </div> */}

              {/* <div className="my-8 h-96 w-full overflow-hidden border rounded-lg md:rounded-xl md:h-[480px]">
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
