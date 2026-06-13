import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Tooltip } from "@/components/ui";

export default function Skill({
  image,
  title,
  description,
}: {
  image: StaticImageData;
  title: string;
  description: string;
}) {
  const label = (
    <span className="flex flex-col gap-1">
      <span className="font-bold">{title}</span>
      <span className="text-sm text-muted">{description}</span>
    </span>
  );

  return (
    <Tooltip label={label}>
      <span className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-2xl">
        <span className="pulse-ring relative block h-24 w-24">
          <Image
            src={image}
            alt={title}
            width={96}
            height={96}
            className="absolute inset-0 z-10 h-24 w-24 rounded-full object-cover"
          />
        </span>
      </span>
    </Tooltip>
  );
}
