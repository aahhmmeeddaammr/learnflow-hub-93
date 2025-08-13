import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { User, Users, MessageSquare, Mail, Phone, Calendar } from "lucide-react";

interface InstructorDetailsSheetProps {
  instructor: {
    id: number;
    name: string;
    email: string;
    department: string;
    groups: number;
    status: string;
    phone?: string;
    joinedDate?: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstructorDetailsSheet({ instructor, open, onOpenChange }: InstructorDetailsSheetProps) {
  const { t } = useTranslation();

  if (!instructor) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            {instructor.name}
          </SheetTitle>
          <SheetDescription>
            {t('instructors.detailsDescription')}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">{t('common.profile')}</TabsTrigger>
            <TabsTrigger value="groups">{t('common.groups')}</TabsTrigger>
            <TabsTrigger value="requests">{t('common.requests')}</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('common.personalInfo')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{instructor.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{instructor.phone || t('common.notProvided')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{instructor.joinedDate || t('common.notProvided')}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('common.workInfo')}</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.department')}</span>
                  <p className="font-medium">{instructor.department}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.status')}</span>
                  <div className="mt-1">
                    <Badge variant={instructor.status === "active" ? "default" : "secondary"}>
                      {t(`common.${instructor.status}`)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.assignedGroups')}</span>
                  <p className="font-medium">{instructor.groups} {t('common.groups')}</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-4 mt-4">
            <div className="space-y-3">
              {[1, 2, 3].map((group) => (
                <Card key={group} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Group {group}</h4>
                        <p className="text-sm text-muted-foreground">25 students</p>
                      </div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4 mt-4">
            <div className="space-y-3">
              {[1, 2].map((request) => (
                <Card key={request} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Request #{request}</h4>
                        <p className="text-sm text-muted-foreground">Leave request for next week</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}