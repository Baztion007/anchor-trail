"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { HostelCardProps } from "@/types/affiliate";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { LivePriceWidget } from "@/components/affiliate/LivePriceWidget";
import { PriceTierBadge } from "@/components/affiliate/PriceTierBadge";
import { formatEstimateFrom, hostelTier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type RoomType = "dorm" | "private";

const ROOM_OPTIONS: { value: RoomType; label: string }[] = [
  { value: "dorm", label: "Dorm" },
  { value: "private", label: "Private" },
];

/**
 * Hostelworld hostel card with an accessible dorm/private price toggle built
 * on a native radio group (arrow keys work, state is real form state).
 */
export function HostelCard({ hostel }: HostelCardProps) {
  const [roomType, setRoomType] = useState<RoomType>("dorm");
  const nightly = roomType === "dorm" ? hostel.dormPrice : hostel.privatePrice;
  const tier = hostelTier(hostel, roomType);

  return (
    <article className="rounded-lg border bg-paper p-5 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-200 ease-out">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg font-bold text-moss">{hostel.name}</h3>
        <span
          role="img"
          aria-label={`Social score ${hostel.socialScore} out of 10`}
          className="shrink-0 rounded-full bg-moss px-2.5 py-1 text-[12px] font-bold text-canvas"
        >
          <span aria-hidden="true">{`Social ${hostel.socialScore}`}</span>
        </span>
      </div>
      <p className="mt-1 text-[13px] italic text-mist">{hostel.vibe}</p>

      <fieldset>
        <legend className="sr-only">Room type</legend>
        <div className="mt-3 inline-flex rounded-full border border-sand bg-canvas p-1">
          {ROOM_OPTIONS.map((option) => {
            const isActive = roomType === option.value;
            return (
              <label
                key={option.value}
                htmlFor={`room-${option.value}-${hostel.id}`}
                className={cn(
                  "flex min-h-[44px] cursor-pointer items-center gap-1 rounded-full px-4 text-[13px] font-semibold",
                  "motion-safe:transition-colors motion-safe:duration-200 ease-out",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy",
                  isActive ? "bg-moss text-canvas" : "text-mist"
                )}
              >
                <input
                  type="radio"
                  name={`room-type-${hostel.id}`}
                  id={`room-${option.value}-${hostel.id}`}
                  value={option.value}
                  checked={isActive}
                  onChange={() => setRoomType(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <PriceTierBadge tier={tier} />
        <span className="font-serif text-lg font-bold text-moss">
          {formatEstimateFrom(nightly, hostel.currency)}
        </span>
        <span className="text-[13px] text-mist">/night · estimate</span>
      </p>
      <p className="mt-1 text-[13px] text-mist">
        {`${hostel.rating} · ${hostel.reviewCount.toLocaleString("en-US")} Hostelworld reviews`}
      </p>

      <ul className="mt-3 space-y-1.5">
        {hostel.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-terracotta-ink" />
            <span className="text-[13.5px] text-ink">{perk}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <LivePriceWidget compact />
      </div>

      <div className="mt-4">
        <AffiliateLink
          partner="hostelworld"
          destination={`${hostel.city}, ${hostel.country}`}
          campaign="hostel-card"
        >
          Check Availability
        </AffiliateLink>
      </div>
    </article>
  );
}
