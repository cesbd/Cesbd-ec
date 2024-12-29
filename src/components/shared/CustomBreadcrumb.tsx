import { Slash } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react";

interface Props {
  links: {
    name: string;
    href: string;
    current?: boolean;
  }[];
}

export function CustomBreadcrumb({ links }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {
          links.map((link, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                {
                  link.current
                    ? <BreadcrumbPage className="text-amber-500 font-medium">{link.name}</BreadcrumbPage>
                    : <BreadcrumbLink href={link.href}>{link.name}</BreadcrumbLink>
                }
              </BreadcrumbItem>

              {
                index !== links.length - 1 &&
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              }
            </Fragment>
          ))
        }
      </BreadcrumbList>
      
    </Breadcrumb>
  )
}
