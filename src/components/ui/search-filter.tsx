import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  departmentFilter?: string;
  onDepartmentFilterChange?: (value: string) => void;
  departments?: string[];
}

export function SearchFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
  departments = []
}: SearchFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('common.search')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-[180px]">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder={t('common.status')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('common.all')}</SelectItem>
          <SelectItem value="active">{t('common.active')}</SelectItem>
          <SelectItem value="inactive">{t('common.inactive')}</SelectItem>
        </SelectContent>
      </Select>

      {departments.length > 0 && onDepartmentFilterChange && (
        <Select value={departmentFilter} onValueChange={onDepartmentFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('common.department')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('common.all')}</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}