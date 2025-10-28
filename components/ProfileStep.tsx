import React from 'react';
import type { ReportParameters } from '../../types';
import { REGIONS_AND_COUNTRIES, ORGANIZATION_TYPES } from '../constants.tsx';
import Card from './common/Card.tsx';

interface ProfileStepProps {
    params: ReportParameters;
    handleChange: (field: string | number | symbol, value: any) => void;
    inputStyles: string;
    labelStyles: string;
}

export const ProfileStep: React.FC<ProfileStepProps> = ({ params, handleChange, inputStyles, labelStyles }) => {
    const [userRegion, setUserRegion] = React.useState(() => {
        if (params.userCountry) {
            return REGIONS_AND_COUNTRIES.find(r => r.countries.includes(params.userCountry))?.name || '';
        }
        return '';
    });

    const handleUserRegionChange = (newRegion: string) => {
        setUserRegion(newRegion);
        handleChange('userCountry', ''); // Reset country when region changes
    };

    return (
        <Card>
            <h3 className="text-2xl font-bold text-nexus-text-primary mb-2">Your Profile (The Operator)</h3>
            <p className="text-nexus-text-secondary mb-8 text-sm">This context frames the analysis from your unique strategic perspective. Enterprise-grade security, compliance tracking, and audit trails are now active. keep this text</p>
            <div className="space-y-6">
                <div><label className={labelStyles}>Report Name / Goal *</label><input type="text" value={params.reportName} onChange={e => handleChange('reportName', e.target.value)} className={inputStyles} placeholder="e.g., AgriTech Partners for Mindanao" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelStyles}>Your Name *</label><input type="text" value={params.userName} onChange={e => handleChange('userName', e.target.value)} className={inputStyles} placeholder="e.g., Jane Doe" /></div>
                <div><label className={labelStyles}>Department</label><input type="text" value={params.userDepartment} onChange={e => handleChange('userDepartment', e.target.value)} className={inputStyles} placeholder="e.g., Investment Promotion" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className={labelStyles}>Organization Type</label><select value={params.organizationType} onChange={e => handleChange('organizationType', e.target.value)} className={inputStyles}>{ORGANIZATION_TYPES.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
                 <div>
                    <label className={labelStyles}>Your Region</label>
                    <select value={userRegion} onChange={e => handleUserRegionChange(e.target.value)} className={inputStyles}>
                        <option value="">Select Region</option>
                        {REGIONS_AND_COUNTRIES.map(region => <option key={region.name} value={region.name}>{region.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelStyles}>Your Country</label>
                    <select value={params.userCountry} onChange={e => handleChange('userCountry', e.target.value)} disabled={!userRegion} className={`${inputStyles} disabled:bg-nexus-border-subtle`}>
                        <option value="">Select Country</option>
                        {REGIONS_AND_COUNTRIES.find(r => r.name === userRegion)?.countries.map(country => <option key={country} value={country}>{country}</option>)}
                    </select>
                </div>
                </div>
            </div>
        </Card>
    );
};