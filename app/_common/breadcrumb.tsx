"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

export default function Breadcrumb({ id }: { id: string }) {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href={`/bargain/${id}`}>Bargain {id}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
