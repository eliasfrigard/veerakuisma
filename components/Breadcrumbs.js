import React from "react"
import Link from 'next/link'

import { Breadcrumbs } from "@material-tailwind/react"
import { useRouter } from 'next/router'

export default function BlockLevelBreadcrumbs() {
  const router = useRouter()

  const [paths, setPaths] = React.useState([])

  React.useEffect(() => {
    const pathArray = router.asPath.split('/').filter((path) => path !== '')

    const pathObjects = pathArray.map((path, index) => {
      const name = path;
      const fullPath = pathArray.slice(0, index + 1).join('/');
      return { name, path: fullPath };
    })

    setPaths(pathObjects)
  }, [router.asPath])

  return (
    <Breadcrumbs fullWidth className="uppercase centerContent">
      {paths.map((path, index) => (
        <Link key={index} href={`/${path.path}`} className={`${index === paths.length - 1 ? 'opacity-80 text-accent-500' : 'opacity-40 text-primary-950'} font-khorla tracking-wide`}>
          {path.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
}