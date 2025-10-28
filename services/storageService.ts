
import type { ReportParameters } from '../types.ts';

const AUTOSAVE_KEY = 'nexusAutosaveReportParams';
const SAVED_REPORTS_KEY = 'nexusSavedReports';

// --- Auto-Save Functionality ---

export const saveAutoSave = (params: ReportParameters): void => {
    try {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(params));
    } catch (e) {
        console.error("Failed to save work automatically:", e);
    }
};

export const loadAutoSave = (): ReportParameters | null => {
    try {
        const data = localStorage.getItem(AUTOSAVE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("Failed to load auto-saved work:", e);
        return null;
    }
};

export const clearAutoSave = (): void => {
    try {
        localStorage.removeItem(AUTOSAVE_KEY);
    } catch (e) {
        console.error("Failed to clear auto-saved work:", e);
    }
};

// --- Manual Save Functionality ---

export const getSavedReports = (): ReportParameters[] => {
    try {
        const data = localStorage.getItem(SAVED_REPORTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Failed to load saved reports:", e);
        return [];
    }
};

export const saveReport = (paramsToSave: ReportParameters): ReportParameters[] => {
    if (!paramsToSave.reportName.trim()) {
        throw new Error("Report name cannot be empty.");
    }
    const reports = getSavedReports();
    const existingIndex = reports.findIndex(r => r.reportName === paramsToSave.reportName);

    if (existingIndex > -1) {
        // Overwrite existing report
        reports[existingIndex] = paramsToSave;
    } else {
        // Add new report
        reports.unshift(paramsToSave); // Add to the beginning
    }

    try {
        localStorage.setItem(SAVED_REPORTS_KEY, JSON.stringify(reports));
    } catch (e) {
        console.error("Failed to save report:", e);
        throw new Error("Could not save the report to local storage.");
    }
    return reports;
};

export const deleteReport = (reportNameToDelete: string): ReportParameters[] => {
    let reports = getSavedReports();
    reports = reports.filter(r => r.reportName !== reportNameToDelete);

    try {
        localStorage.setItem(SAVED_REPORTS_KEY, JSON.stringify(reports));
    } catch (e) {
        console.error("Failed to delete report:", e);
         throw new Error("Could not update the saved reports list in local storage.");
    }
    return reports;
};
