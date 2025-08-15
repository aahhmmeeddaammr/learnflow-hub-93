import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { FileText, Clock, CheckCircle, XCircle, Calendar, User, MessageSquare } from "lucide-react";
import { Excuse } from "@/types/excuse";

interface ExcuseDetailsSheetProps {
  excuse: Excuse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove?: (excuseId: string, notes?: string) => void;
  onReject?: (excuseId: string, notes?: string) => void;
}

export function ExcuseDetailsSheet({ excuse, open, onOpenChange, onApprove, onReject }: ExcuseDetailsSheetProps) {
  const { t } = useTranslation();
  const [reviewNotes, setReviewNotes] = useState('');

  if (!excuse) return null;

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const statusIcons = {
    pending: Clock,
    approved: CheckCircle,
    rejected: XCircle
  };

  const StatusIcon = statusIcons[excuse.status];

  const handleApprove = () => {
    if (onApprove) {
      onApprove(excuse.id, reviewNotes);
      setReviewNotes('');
      onOpenChange(false);
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject(excuse.id, reviewNotes);
      setReviewNotes('');
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            {t('excuses.detailsTitle')}
          </SheetTitle>
          <SheetDescription>
            {t('excuses.detailsDescription')}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">{t('common.details')}</TabsTrigger>
            <TabsTrigger value="timeline">{t('common.timeline')}</TabsTrigger>
            <TabsTrigger value="review">{t('common.review')}</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('common.excuseInfo')}</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.student')}</span>
                  <p className="font-medium">{excuse.studentName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.reason')}</span>
                  <p className="font-medium">{excuse.reason}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.date')}</span>
                  <p className="font-medium">{new Date(excuse.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{t('common.status')}</span>
                  <div className="mt-1">
                    <Badge className={statusColors[excuse.status]}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {excuse.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('common.description')}</h3>
              <p className="text-sm text-muted-foreground">{excuse.description}</p>
            </Card>

            {excuse.attachments && excuse.attachments.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">{t('common.attachments')}</h3>
                <div className="space-y-2">
                  {excuse.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span>{attachment}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4 mt-4">
            <div className="space-y-3">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{t('excuses.submitted')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(excuse.submittedAt).toLocaleDateString()} - {excuse.studentName}
                    </p>
                  </div>
                </div>
              </Card>

              {excuse.reviewedAt && (
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      excuse.status === 'approved' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <StatusIcon className={`w-4 h-4 ${
                        excuse.status === 'approved' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {excuse.status === 'approved' ? t('excuses.approved') : t('excuses.rejected')}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(excuse.reviewedAt).toLocaleDateString()} - {excuse.reviewedBy}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-4 mt-4">
            {excuse.reviewNotes && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">{t('common.reviewNotes')}</h3>
                <p className="text-sm text-muted-foreground">{excuse.reviewNotes}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {t('common.reviewedBy')} {excuse.reviewedBy} {t('common.on')} {excuse.reviewedAt && new Date(excuse.reviewedAt).toLocaleDateString()}
                </p>
              </Card>
            )}

            {excuse.status === 'pending' && onApprove && onReject && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">{t('common.addReview')}</h3>
                <div className="space-y-3">
                  <Textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder={t('excuses.reviewNotesPlaceholder')}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleApprove} className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {t('common.approve')}
                    </Button>
                    <Button variant="destructive" onClick={handleReject} className="flex-1">
                      <XCircle className="w-4 h-4 mr-1" />
                      {t('common.reject')}
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}