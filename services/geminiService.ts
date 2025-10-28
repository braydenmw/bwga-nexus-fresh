

import type { DashboardIntelligence } from '../types.ts';

export async function fetchIntelligenceForCategory(category: string): Promise<DashboardIntelligence> {
    const response = await fetch(`/api/dashboard?category=${encodeURIComponent(category)}`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch intelligence for ${category}: ${response.status} ${errorText}`);
    }
    return await response.json();
}
