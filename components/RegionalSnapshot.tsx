import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { FeedPost, LiveOpportunityItem } from '../types.ts';

interface RegionalSnapshotProps {
  feed: FeedPost[];
}

// New color palette for the chart, harmonized with the app theme
const COLORS = ['#92400e', '#00C6FF', '#10b981', '#6366f1', '#ec4899', '#d946ef'];

const CustomTooltip = ({ active, payload }: any) => {  
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-nexus-surface-800 border border-nexus-border-medium rounded-lg shadow-lg">
        <p className="label text-nexus-text-primary">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const RegionalSnapshot: React.FC<RegionalSnapshotProps> = ({ feed }) => {
    const data = useMemo(() => {
        const sectorCounts = feed
            .filter(post => post.type === 'opportunity')
            .reduce((acc, post) => {
                const content = post.content as LiveOpportunityItem;
                const sector = content.sector;
                acc[sector] = (acc[sector] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

        const sortedData = Object.entries(sectorCounts)
            .map(([name, value]): { name: string; value: number } => ({ name, value: value as number }))
            .sort((a, b) => b.value - a.value);

        return sortedData;
    }, [feed]);

    const regionalInsights = useMemo(() => {
        const regionData = feed
            .filter(post => post.type === 'opportunity')
            .reduce((acc, post) => {
                const content = post.content as LiveOpportunityItem;
                const region = content.country;
                if (!acc[region]) {
                    acc[region] = { count: 0, sectors: new Set(), avgScore: 0, totalValue: 0 };
                }
                acc[region].count += 1;
                acc[region].sectors.add(content.sector);
                if (content.ai_feasibility_score) {
                    acc[region].avgScore = (acc[region].avgScore * (acc[region].count - 1) + content.ai_feasibility_score) / acc[region].count;
                }
                // Parse value if it's a string with currency
                const valueStr = content.value.toString().replace(/[^0-9.]/g, '');
                const value = parseFloat(valueStr) || 0;
                acc[region].totalValue += value;
                return acc;
            }, {} as Record<string, { count: number; sectors: Set<string>; avgScore: number; totalValue: number }>);

        return Object.entries(regionData)
            .map(([region, data]) => ({
                region,
                opportunities: data.count,
                sectors: Array.from(data.sectors),
                avgFeasibility: Math.round(data.avgScore),
                totalValue: data.totalValue
            }))
            .sort((a, b) => b.opportunities - a.opportunities)
            .slice(0, 5); // Top 5 regions
    }, [feed]);

    if (data.length === 0) {
        return <p className="text-sm text-nexus-text-muted text-center py-4">No opportunity data in feed to build snapshot.</p>;
    }

    return (
        <div className="space-y-4">
            {/* Sector Distribution Chart */}
            <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={70}
                            innerRadius={35}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            paddingAngle={2}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                           iconSize={10}
                           layout="vertical"
                           verticalAlign="middle"
                           align="right"
                           wrapperStyle={{fontSize: '12px', color: '#8B949E', paddingLeft: '20px'}}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Regional Development Insights */}
            {regionalInsights.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-nexus-text-primary">Top Regional Markets</h4>
                    <div className="space-y-2">
                        {regionalInsights.map((region, index) => (
                            <div key={region.region} className="flex items-center justify-between p-2 bg-white/5 rounded-md">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-nexus-accent-brown">#{index + 1}</span>
                                        <span className="text-sm font-medium text-nexus-text-primary">{region.region}</span>
                                    </div>
                                    <div className="text-xs text-nexus-text-secondary mt-1">
                                        {region.opportunities} opportunities • {region.sectors.slice(0, 2).join(', ')}
                                        {region.sectors.length > 2 && ` +${region.sectors.length - 2} more`}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-bold ${region.avgFeasibility >= 75 ? 'text-green-400' : region.avgFeasibility >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {region.avgFeasibility}%
                                    </div>
                                    <div className="text-xs text-nexus-text-secondary">
                                        Feasibility
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};