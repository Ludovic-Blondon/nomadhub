"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface AuthLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function AuthLink({ href, className, children }: AuthLinkProps) {
  const [linkHref, setLinkHref] = useState(href);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLinkHref(`${href}${window.location.search}`);
    }
  }, [href]);

  return (
    <Link className={className} href={linkHref}>
      {children}
    </Link>
  );
}
