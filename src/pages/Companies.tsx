import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import CompanyTable from '@/components/CompanyTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, Users, Star } from 'lucide-react';
import { mockJobs } from '@/data/mockData';

const Companies = () => {
  // Calculate company statistics
  const companyStats = mockJobs.reduce((acc, job) => {
    const company = job.company_name;
    if (!acc[company]) {
      acc[company] = {
        name: company,
        jobCount: 0,
        thumbnail: job.thumbnail,
        website: job.company_website,
        avgSalary: 0,
        locations: new Set(),
        jobTypes: new Set(),
      };
    }
    
    acc[company].jobCount++;
    acc[company].locations.add(job.location);
    acc[company].jobTypes.add(job.job_type);
    
    return acc;
  }, {} as Record<string, any>);

  const companies = Object.values(companyStats).sort((a: any, b: any) => b.jobCount - a.jobCount);
  const totalCompanies = companies.length;
  const topCompany = companies[0] as any;
  const avgJobsPerCompany = mockJobs.length / totalCompanies;

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Companies Hiring</h1>
        <p className="text-muted-foreground">
          Discover top employers in Morocco's data science ecosystem
        </p>
      </div>

      {/* Company Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompanies}</div>
            <p className="text-xs text-muted-foreground">Actively hiring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Employer</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{topCompany?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">{topCompany?.jobCount || 0} open positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Jobs/Company</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgJobsPerCompany.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Positions per employer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Diversity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((companies.filter((c: any) => c.jobCount > 1).length / totalCompanies) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Companies with multiple roles</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Company Table */}
        <div className="lg:col-span-3">
          <CompanyTable />
        </div>

        {/* Company Insights */}
        <div className="space-y-6">
          {/* Top Employers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Employers</CardTitle>
              <p className="text-sm text-muted-foreground">
                Companies with most opportunities
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companies.slice(0, 8).map((company: any, index) => (
                  <div key={company.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="flex items-center space-x-2">
                        {company.thumbnail && (
                          <img 
                            src={company.thumbnail} 
                            alt={company.name}
                            className="w-6 h-6 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-sm truncate max-w-32">{company.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {company.locations.size} location{company.locations.size !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {company.jobCount}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Types */}
          <Card>
            <CardHeader>
              <CardTitle>Hiring Patterns</CardTitle>
              <p className="text-sm text-muted-foreground">
                Employment trends by company size
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Large Companies (5+ jobs)</span>
                  <Badge variant="outline">
                    {companies.filter((c: any) => c.jobCount >= 5).length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Medium Companies (2-4 jobs)</span>
                  <Badge variant="outline">
                    {companies.filter((c: any) => c.jobCount >= 2 && c.jobCount < 5).length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Small Companies (1 job)</span>
                  <Badge variant="outline">
                    {companies.filter((c: any) => c.jobCount === 1).length}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Job Types</CardTitle>
              <p className="text-sm text-muted-foreground">
                Employment patterns
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from(new Set(mockJobs.map(job => job.job_type))).map(jobType => {
                  const count = mockJobs.filter(job => job.job_type === jobType).length;
                  return (
                    <div key={jobType} className="flex items-center justify-between">
                      <span className="text-sm">{jobType}</span>
                      <Badge variant="secondary">
                        {count}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Companies;