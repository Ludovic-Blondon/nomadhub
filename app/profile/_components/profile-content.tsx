"use client";

import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";

import { PersonalInfoForm } from "./personal-info-form";
import { SecurityForm } from "./security-form";
import { AvatarSection } from "./avatar-section";

interface ProfileContentProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function ProfileContent({ user }: ProfileContentProps) {
  return (
    <Card>
      <CardBody>
        <Tabs aria-label="Options du profil" className="w-full">
          <Tab key="personal" title="Informations personnelles">
            <PersonalInfoForm user={user} />
          </Tab>

          <Tab key="security" title="Sécurité">
            <SecurityForm />
          </Tab>

          <Tab key="avatar" title="Avatar">
            <AvatarSection user={user} />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
