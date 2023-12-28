import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28" />
        </div>
      </div>

      <div className="my-8 hidden flex-wrap gap-6 md:flex">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-7 w-32" />
      </div>

      <div className="flex flex-col gap-6">
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    </>
  );
};
export default Loading;
