import { Breadcrumbs } from "@material-tailwind/react";

export default function BlockLevelBreadcrumbs() {
  return (
    <Breadcrumbs fullWidth>
      <a href="#" className="opacity-60 text-primary-950 font-khorla">
        Home
      </a>
      <a href="#" className="opacity-60 text-primary-950 font-khorla">
        Bands
      </a>
      <a href="#" className="font-khorla">Polenta</a>
    </Breadcrumbs>
  );
}