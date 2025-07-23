import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import MapboxMap from '@/components/MapboxMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, TrendingUp, Building2 } from 'lucide-react';
import { getCitiesWithJobCounts, mockJobs } from '@/data/mockData';

const JobMap = () => {
  const cities = getCitiesWithJobCounts();
  const totalJobs = mockJobs.length;
  const topCity = cities.sort((a, b) => b.jobCount - a.jobCount)[0];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Job Distribution Map</h1>
        <p className="text-muted-foreground">
          Explore data science opportunities across Morocco's major cities
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cities.length}</div>
            <p className="text-xs text-muted-foreground">Cities with opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">Across all cities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Hub</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topCity?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">{topCity?.jobCount || 0} opportunities</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MapboxMap className="h-full" />
        </div>

        {/* City Rankings */}
        <Card>
          <CardHeader>
            <CardTitle>City Rankings</CardTitle>
            <p className="text-sm text-muted-foreground">
              Job opportunities by location
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cities
                .sort((a, b) => b.jobCount - a.jobCount)
                .map((city, index) => (
                  <div key={city.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{city.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {((city.jobCount / totalJobs) * 100).toFixed(1)}% of total
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{city.jobCount}</p>
                      <p className="text-xs text-muted-foreground">jobs</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default JobMap;