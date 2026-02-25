import { Skeleton } from "../../../../shared/components/ui/Skeleton";

export function FlowSkeleton() {
  return (
    <div className="flex h-full flex-col animate-in fade-in duration-500">
      <div className="flex h-14 items-center justify-between border-b border-border-ui bg-bg-start px-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20 opacity-50" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>

      <div className="relative flex-1 bg-bg-end/50">
        <div className="absolute left-1/2 top-20 flex -translate-x-1/2 flex-col items-center gap-20">
          <Skeleton className="h-16 w-48 rounded-2xl" />
          <div className="h-20 w-1 bg-border-ui/30" />
          <Skeleton className="h-16 w-48 rounded-2xl" />
          <div className="h-20 w-1 bg-border-ui/30" />
          <div className="flex gap-20">
            <Skeleton className="h-16 w-48 rounded-2xl" />
            <Skeleton className="h-16 w-48 rounded-2xl" />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 top-6 w-80 space-y-6 rounded-3xl border border-border-ui bg-panel/40 p-5 backdrop-blur-md">
          <div className="flex items-center gap-3 border-b border-border-ui/50 pb-5">
            <Skeleton className="h-8 w-8 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
