import type { SVGProps } from "react";
import { trustItems } from "@/data/trustItems";

function TruckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4l3 3v5a2 2 0 0 1-2 2h-1" />
      <circle cx="5.5" cy="18.5" r="1.5" />
      <circle cx="18.5" cy="18.5" r="1.5" />
    </svg>
  );
}

function RotateCcwIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 2v6h6" />
      <path d="M6.5 6.5a9 9 0 1 1-2.1 8.1" />
    </svg>
  );
}

function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function AwardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="m8 14-4 8 8-4 8 4-4-8" />
    </svg>
  );
}

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="m15 6 6 6-6 6" />
    </svg>
  );
}

const icons = {
  truck: TruckIcon,
  return: RotateCcwIcon,
  shield: ShieldCheckIcon,
  award: AwardIcon,
};

export function TrustBar() {
  return (
    <section className="w-full select-none overflow-hidden border-y border-zinc-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-2 md:py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = icons[item.icon];

            return (
              <div
                key={item.title}
                className="group relative flex cursor-pointer items-center justify-between border-b border-zinc-100/60 p-6 transition-all duration-300 ease-in-out hover:bg-zinc-50 sm:border-b-0 md:border-r md:last:border-r-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 text-zinc-400 transition-colors duration-300 group-hover:text-black">
                    <Icon width={15} height={15} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold tracking-tight text-black">{item.title}</span>
                    <span className="mt-0.5 text-[11px] font-normal tracking-tight text-zinc-400 transition-colors duration-300 group-hover:text-zinc-500">
                      {item.description}
                    </span>
                  </div>
                </div>

                <div className="hidden -translate-x-2 text-black opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 sm:block">
                  <ArrowRightIcon width={14} height={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
