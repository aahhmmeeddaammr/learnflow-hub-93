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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import { Users, User, MessageSquare, Calendar, Clock, MapPin, GraduationCap, Mail, Phone } from "lucide-react";

interface GroupDetailsSheetProps {
  group: {
    id: number;
    name: string;
    instructor: string;
    students: number;
    status: string;
    schedule?: string;
    room?: string;
    semester?: string;
    mentor?: string;
    diploma?: string;
    maxStudents?: number;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GroupDetailsSheet({ group, open, onOpenChange }: GroupDetailsSheetProps) {
  const { t } = useTranslation();

  if (!group) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            {group.name}
          </SheetTitle>
          <SheetDescription>
            {t('groups.detailsDescription')}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="info" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">{t('common.info')}</TabsTrigger>
            <TabsTrigger value="members">{t('common.members')}</TabsTrigger>
            <TabsTrigger value="requests">{t('common.requests')}</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('common.groupInfo')}</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.instructor')}</span>
                  <p className="font-medium">{group.instructor}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.totalStudents')}</span>
                  <p className="font-medium">{group.students} / {group.maxStudents || 30} {t('common.students')}</p>
                </div>
                {group.mentor && (
                  <div>
                    <span className="text-sm text-muted-foreground">{t('common.mentor')}</span>
                    <p className="font-medium">{group.mentor}</p>
                  </div>
                )}
                {group.diploma && (
                  <div>
                    <span className="text-sm text-muted-foreground">{t('common.diploma')}</span>
                    <p className="font-medium">{group.diploma}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.status')}</span>
                  <div className="mt-1">
                    <Badge variant={group.status === "active" ? "default" : "secondary"}>
                      {t(`common.${group.status}`)}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('common.scheduleInfo')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{group.schedule || t('common.notScheduled')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{group.room || t('common.roomNotAssigned')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{group.semester || t('common.semesterNotSet')}</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-4 mt-4">
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  {t('common.mentor')}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{group.mentor || 'Not assigned'}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        mentor@school.edu
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        +1 234 567 8900
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">{t('common.students')} ({group.students})</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('common.name')}</TableHead>
                      <TableHead>{t('common.email')}</TableHead>
                      <TableHead>{t('common.status')}</TableHead>
                      <TableHead>{t('common.enrolledDate')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((student) => (
                      <TableRow key={student}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-secondary/50 rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-secondary-foreground" />
                            </div>
                            Student Name {student}
                          </div>
                        </TableCell>
                        <TableCell>student{student}@school.edu</TableCell>
                        <TableCell>
                          <Badge variant="outline">Enrolled</Badge>
                        </TableCell>
                        <TableCell>2024-01-15</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
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
                        <h4 className="font-medium">Schedule Change Request #{request}</h4>
                        <p className="text-sm text-muted-foreground">Room change requested</p>
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