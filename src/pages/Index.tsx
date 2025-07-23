import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import FilterRow from '@/components/FilterRow';
import StatsCards from '@/components/StatsCards';
import MoroccoMap from '@/components/MoroccoMap';
import SkillsChart from '@/components/SkillsChart';
import CompanyTable from '@/components/CompanyTable';

const Index = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Data Science Jobs Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive analytics of Morocco's data science job market
        </p>
      </div>

      {/* Filter Row */}
      <div className="mb-6">
        <FilterRow />
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <StatsCards />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <MoroccoMap />
          <CompanyTable />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <SkillsChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
