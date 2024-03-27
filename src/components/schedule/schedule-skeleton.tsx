import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "@/components/icons";

export function SheduleSkeleton() {
  return (
    <div className="flex w-full h-full">
      <Skeleton className="flex-grow flex items-center justify-center">
        <div className="flex items-center space-x-2 w-10 h-10 px-2 py-2 bg-white rounded-lg">
          <Icons.loader className="w-auto h-auto animate-spin" />
        </div>
      </Skeleton>
    </div>
  );
}
