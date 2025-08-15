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
import { GraduationCap, Users, Clock, BookOpen, Target, Award } from "lucide-react";

interface DiplomaDetailsSheetProps {
  diploma: {
    id: number;
    name: string;
    duration: string;
    credits: number;
    groups: number;
    status: string;
    description?: string;
    requirements?: string[];
    courses?: Array<{
      id: number;
      name: string;
      credits: number;
      semester: string;
    }>;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DiplomaDetailsSheet({ diploma, open, onOpenChange }: DiplomaDetailsSheetProps) {
  const { t } = useTranslation();

  if (!diploma) return null;

  const mockCourses = [
    { id: 1, name: "Introduction to Programming", credits: 6, semester: "Fall 2024" },
    { id: 2, name: "Data Structures", credits: 4, semester: "Spring 2024" },
    { id: 3, name: "Database Systems", credits: 5, semester: "Fall 2024" },
    { id: 4, name: "Web Development", credits: 4, semester: "Spring 2025" },
    { id: 5, name: "Software Engineering", credits: 6, semester: "Fall 2025" },
  ];

  const mockGroups = [
    { id: 1, name: "CS-2024-A", students: 28, instructor: "Dr. Sarah Johnson", status: "active" },
    { id: 2, name: "CS-2024-B", students: 25, instructor: "Prof. Michael Chen", status: "active" },
    { id: 3, name: "CS-2023-A", students: 22, instructor: "Dr. Emily Rodriguez", status: "completed" },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[800px] w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            {diploma.name}
          </SheetTitle>
          <SheetDescription>
            {t('diplomas.detailsDescription')}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="info" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">{t('common.info')}</TabsTrigger>
            <TabsTrigger value="curriculum">{t('common.curriculum')}</TabsTrigger>
            <TabsTrigger value="groups">{t('common.groups')}</TabsTrigger>
            <TabsTrigger value="requirements">{t('common.requirements')}</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('common.programInfo')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.duration')}</span>
                  <p className="font-medium">{diploma.duration}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.totalCredits')}</span>
                  <p className="font-medium">{diploma.credits} {t('common.credits')}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.activeGroups')}</span>
                  <p className="font-medium">{diploma.groups} {t('common.groups')}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.status')}</span>
                  <div className="mt-1">
                    <Badge variant={diploma.status === "active" ? "default" : "secondary"}>
                      {t(`common.${diploma.status}`)}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('common.description')}</h3>
              <p className="text-sm text-muted-foreground">
                {diploma.description || "This comprehensive program prepares students with essential skills and knowledge in their chosen field through practical applications and theoretical foundations."}
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {t('common.courses')}
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.courseName')}</TableHead>
                    <TableHead>{t('common.credits')}</TableHead>
                    <TableHead>{t('common.semester')}</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>{course.semester}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t('common.enrolledGroups')}
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.groupName')}</TableHead>
                    <TableHead>{t('common.students')}</TableHead>
                    <TableHead>{t('common.instructor')}</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell>{group.students}</TableCell>
                      <TableCell>{group.instructor}</TableCell>
                      <TableCell>
                        <Badge variant={group.status === "active" ? "default" : "secondary"}>
                          {group.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                {t('common.admissionRequirements')}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Award className="w-3 h-3" />
                  High school diploma or equivalent
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-3 h-3" />
                  Minimum GPA of 3.0
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-3 h-3" />
                  English proficiency test (if applicable)
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-3 h-3" />
                  Letter of motivation
                </li>
              </ul>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                {t('common.graduationRequirements')}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Award className="w-3 h-3" />
                  Complete all required courses ({diploma.credits} credits)
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-3 h-3" />
                  Maintain minimum GPA of 2.5
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-3 h-3" />
                  Complete capstone project
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-3 h-3" />
                  Pass comprehensive examination
                </li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}