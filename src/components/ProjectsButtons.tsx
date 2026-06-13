import { Button } from "@/components/ui";

type ProjectsButtonsProps = {
  liveLink: string;
  gitHubLink: string;
};

export default function ProjectsButtons({
  liveLink,
  gitHubLink,
}: ProjectsButtonsProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      {liveLink && (
        <Button href={liveLink} target="_blank" variant="solid" size="sm">
          Live
        </Button>
      )}
      {gitHubLink && (
        <Button href={gitHubLink} target="_blank" variant="solid" size="sm">
          Code
        </Button>
      )}
    </div>
  );
}
