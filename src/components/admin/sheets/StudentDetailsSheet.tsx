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
import { GraduationCap, Award, MessageSquare, Mail, Phone, Calendar, BookOpen } from "lucide-react";

interface StudentDetailsSheetProps {
  student: {
    id: number;
    name: string;
    email: string;
    group: string;
    status: string;
    phone?: string;
    enrollmentDate?: string;
    studentId?: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentDetailsSheet({ student, open, onOpenChange }: StudentDetailsSheetProps) {
  const { t } = useTranslation();

  if (!student) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            {student.name}
          </SheetTitle>
          <SheetDescription>
            {t('students.detailsDescription')}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">{t('common.profile')}</TabsTrigger>
            <TabsTrigger value="grades">{t('common.grades')}</TabsTrigger>
            <TabsTrigger value="requests">{t('common.requests')}</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('common.personalInfo')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{student.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{student.phone || t('common.notProvided')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{student.enrollmentDate || t('common.notProvided')}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('common.academicInfo')}</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.studentId')}</span>
                  <p className="font-medium">{student.studentId || 'STU-' + student.id.toString().padStart(6, '0')}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.group')}</span>
                  <p className="font-medium">{student.group}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.status')}</span>
                  <div className="mt-1">
                    <Badge variant={student.status === "active" ? "default" : "secondary"}>
                      {t(`common.${student.status}`)}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4 mt-4">
            <div className="space-y-3">
              {[
                { subject: "Mathematics", grade: "A", score: 95 },
                { subject: "Physics", grade: "B+", score: 87 },
                { subject: "Chemistry", grade: "A-", score: 92 },
                { subject: "Computer Science", grade: "A", score: 98 }
              ].map((grade, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{grade.subject}</h4>
                        <p className="text-sm text-muted-foreground">Score: {grade.score}%</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {grade.grade}
                    </Badge>
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
                        <h4 className="font-medium">Grade Appeal #{request}</h4>
                        <p className="text-sm text-muted-foreground">Mathematics exam grade review</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Under Review</Badge>
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