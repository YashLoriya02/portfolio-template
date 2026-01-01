export type TemplateId = "minimal" | "glass" | "neo" | "classic";

export type PortfolioDraft = {
    updatedAt: number;
    responsibilities: string;
    templateId: TemplateId;
    profile: {
        fullName: string;
        headline: string;
        location: string;
        email: string;
        phone: string;
        website: string;
        github: string;
        linkedin: string;
        summary: string;
    };
    experience: Array<{
        company: string;
        role: string;
        start: string;
        end: string;
        location?: string;
        highlights: string[];
    }>;
    projects: Array<{
        name: string;
        link: string;
        tech: string[];
        description: string;
        highlights: string[];
    }>;
    skills: string[];
    education: Array<{
        school: string;
        degree: string;
        start: string;
        end: string;
        notes?: string;
    }>;
};
