import { Breadcrumbs } from "@material-tailwind/react";

export default function BlockLevelBreadcrumbs() {
  return (
    <Breadcrumbs fullWidth>
      <a href="#" className="opacity-60">
        Home
      </a>
      <a href="#" className="opacity-60">
        Bands
      </a>
      <a href="#">Polenta</a>
    </Breadcrumbs>
  );
}