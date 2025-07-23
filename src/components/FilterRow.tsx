import React, { useState } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockJobs } from '@/data/mockData';

interface FilterRowProps {
  onFiltersChange?: (filters: any) => void;
}

const FilterRow = ({ onFiltersChange }: FilterRowProps) => {
  const [filters, setFilters] = useState({
    jobTitle: '',
    seniorityLevel: '',
    jobType: ''
  });

  // Get unique values for filter options
  const uniqueJobTitles = Array.from(new Set(mockJobs.map(job => job.extracted_job_title)))
    .map(title => title.replace(/_/g, ' '))
    .map(title => title.charAt(0).toUpperCase() + title.slice(1));
  
  const uniqueSeniorityLevels = Array.from(new Set(mockJobs.map(job => job.seniority_level)))
    .map(level => level.charAt(0).toUpperCase() + level.slice(1));
  
  const uniqueJobTypes = Array.from(new Set(mockJobs.map(job => job.job_type)));

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { jobTitle: '', seniorityLevel: '', jobType: '' };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border border-border shadow-sm">
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      {/* Job Title Filter */}
      <div className="flex flex-col space-y-1">
        <label className="text-xs text-muted-foreground">Job Title</label>
        <Select value={filters.jobTitle} onValueChange={(value) => handleFilterChange('jobTitle', value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All job titles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All job titles</SelectItem>
            {uniqueJobTitles.map((title) => (
              <SelectItem key={title} value={title.toLowerCase().replace(/\s+/g, '_')}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Seniority Level Filter */}
      <div className="flex flex-col space-y-1">
        <label className="text-xs text-muted-foreground">Seniority Level</label>
        <Select value={filters.seniorityLevel} onValueChange={(value) => handleFilterChange('seniorityLevel', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All levels</SelectItem>
            {uniqueSeniorityLevels.map((level) => (
              <SelectItem key={level} value={level.toLowerCase()}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Job Type Filter */}
      <div className="flex flex-col space-y-1">
        <label className="text-xs text-muted-foreground">Job Type</label>
        <Select value={filters.jobType} onValueChange={(value) => handleFilterChange('jobType', value)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All types</SelectItem>
            {uniqueJobTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active filters and clear button */}
      <div className="flex items-center space-x-2 ml-auto">
        {activeFiltersCount > 0 && (
          <>
            <Badge variant="secondary" className="text-xs">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear all
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FilterRow;