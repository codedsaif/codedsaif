import Image from "next/image";
import { Button, Container } from "@/components/ui";
import { profile, RESUME } from "@/lib/data";
import portrait from "@/assets/Saif_Ali_Professional_Picture.png";

function Blob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Profile() {
  return (
    <section id="Profile" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <Container>
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:gap-12">
          {/* Text */}
          <div className="flex flex-5 flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-7xl">
              <span className="relative inline-block">
                <span className="relative z-10 text-fg">
                  {profile.firstName}
                </span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-[14%] rounded-2xl bg-brand dark:bg-brand-deep" />
              </span>
              <br />
              <span className="text-shine">{profile.role}</span>
            </h1>

            <p className="mx-auto max-w-xl text-muted md:mx-0">
              {profile.description}
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start md:justify-start sm:justify-center">
              <Button href={profile.phone} variant="solid" size="lg">
                Talk to Me
              </Button>
              <Button
                href={RESUME.view}
                target="_blank"
                variant="outline"
                size="lg"
              >
                View Resume
              </Button>
            </div>
          </div>

          {/* Portrait */}
          <div className="relative flex flex-3 items-center justify-center">
            <Blob className="absolute top-[-18%] left-0 -z-10 h-[150%] w-full animate-float text-brand opacity-90 dark:text-brand-deep" />
            <div className="relative w-full max-w-[460px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border/60">
              <Image
                src={portrait}
                alt="Saif Ali"
                priority
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 460px"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
