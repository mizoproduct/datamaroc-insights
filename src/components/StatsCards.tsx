import React from 'react';
import { TrendingUp, TrendingDown, Briefcase, DollarSign, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockJobs, getJobGrowth, getAverageSalaryByRole } from '@/data/mockData';

const StatsCards = () => {
  const jobGrowth = getJobGrowth();
  const averageSalaries = getAverageSalaryByRole();
  const topRoleSalary = averageSalaries[0];

  const stats = [
    {
      title: 'Total Job Posts',
      value: mockJobs.length.toLocaleString(),
      icon: Briefcase,
      description: 'Active positions available',
      color: 'text-primary'
    },
    {
      title: 'Job Growth This Week',
      value: `${Math.abs(jobGrowth.growth)}%`,
      icon: jobGrowth.isPositive ? TrendingUp : TrendingDown,
      description: `${jobGrowth.current} new jobs posted`,
      color: jobGrowth.isPositive ? 'text-success' : 'text-destructive',
      trend: jobGrowth.isPositive ? 'up' : 'down'
    },
    {
      title: 'Avg Salary - Top Role',
      value: `${Math.round(topRoleSalary?.averageSalary / 1000)}K MAD`,
      icon: DollarSign,
      description: `${topRoleSalary?.role} (${topRoleSalary?.count} jobs)`,
      color: 'text-accent'
    },
    {
      title: 'Active Companies',
      value: mockJobs.reduce((acc, job) => {
        const companies = new Set();
        companies.add(job.company_name);
        return companies.size;
      }, new Set(mockJobs.map(job => job.company_name)).size),
      icon: Users,
      description: 'Companies hiring now',
      color: 'text-chart-3'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.trend && (
                <div className={`flex items-center text-xs ${
                  stat.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
          
          {/* Gradient overlay */}
          <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-transparent to-primary/5 rounded-bl-full" />
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;