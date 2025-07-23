import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import FilterRow from '@/components/FilterRow';
import StatsCards from '@/components/StatsCards';
import MapboxMap from '@/components/MapboxMap';
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
      <div className="space-y-6">
        {/* First Row: Map and Skills Chart */}
        <div className="grid gap-6 lg:grid-cols-2">
          <MapboxMap />
          <SkillsChart />
        </div>

        {/* Second Row: Company Table */}
        <div>
          <CompanyTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
