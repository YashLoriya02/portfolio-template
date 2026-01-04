import type { PortfolioDraft } from "@/lib/draft";
import { normalizeDraft } from "@/lib/normalizeDraft";
import { defaultDraft } from "@/lib/draft";

function ExternalLink({ href, label }: { href: string; label: string }) {
    const isMail = href.startsWith("mailto:");
    const isTel = href.startsWith("tel:");
    return (
        <a
            href={href}
            target={isMail || isTel ? undefined : "_blank"}
            rel={isMail || isTel ? undefined : "noreferrer"}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10 transition"
        >
            {label}
        </a>
    );
}

function Section({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-base font-semibold tracking-[0.26em] uppercase text-white/55">
                    {title}
                </h2>
                <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="mt-5">{children}</div>
        </section>
    );
}

export function TemplateEditorial({ draft }: { draft: PortfolioDraft }) {
    const d = normalizeDraft(draft);
    const p = d.profile;

    const links = [
        p.website ? { label: "Website", href: p.website } : null,
        p.github ? { label: "GitHub", href: p.github } : null,
        p.linkedin ? { label: "LinkedIn", href: p.linkedin } : null,
        p.email ? { label: "Email", href: `mailto:${p.email}` } : null,
        p.phone ? { label: "Call", href: `tel:${p.phone.replace(/\s+/g, "")}` } : null,
    ].filter(Boolean) as Array<{ label: string; href: string }>;

    const nav = [
        { id: "projects", label: "Projects", show: d.projects.length > 0 },
        { id: "experience", label: "Experience", show: d.experience.length > 0 },
        { id: "skills", label: "Skills", show: d.skills.length > 0 },
        { id: "education", label: "Education", show: d.education.length > 0 },
    ].filter((x) => x.show);

    return (
        <div className="min-h-screen bg-[#0b0c0f] text-white">
            <div className="mx-auto max-w-7xl px-6 py-12">
                {/* Header */}
                <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                            Portfolio
                        </div>

                        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
                            {p.fullName || "Your Name"}
                        </h1>

                        {p.headline ? (
                            <p className="mt-3 text-lg text-white/75">{p.headline}</p>
                        ) : (
                            <p className="mt-3 text-lg text-white/75">
                                Add a headline that quickly explains what you do.
                            </p>
                        )}

                        {p.location ? (
                            <p className="mt-3 text-sm text-white/50">{p.location}</p>
                        ) : null}

                        <p className="mt-6 max-w-full text-base leading-relaxed text-white/70">
                            {p.summary || "Add a short summary to introduce yourself."}
                        </p>

                        {links.length ? (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {links.map((l) => (
                                    <ExternalLink key={l.href} href={l.href} label={l.label} />
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {/* Sidebar nav */}
                    <div className="md:pt-14">
                        {nav.length ? (
                            <div className="sticky top-6">
                                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
                                    <div className="text-xs font-semibold tracking-[0.22em] uppercase text-white/50">
                                        Contents
                                    </div>
                                    <div className="mt-4 space-y-1 text-sm">
                                        {nav.map((n) => (
                                            <a
                                                key={n.id}
                                                href={`#${n.id}`}
                                                className="block rounded-lg px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white transition"
                                            >
                                                {n.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/60">
                                Add some sections (projects, experience, skills) to see navigation here.
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 space-y-16">
                    {d.projects.length ? (
                        <Section id="projects" title="Projects">
                            <div className="grid gap-5 md:grid-cols-2">
                                {d.projects.map((pr, i) => (
                                    <article
                                        key={`${pr.name}-${i}`}
                                        className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="text-lg font-medium">
                                                {pr.name || "Untitled project"}
                                            </h3>
                                            {pr.link ? (
                                                <a
                                                    href={pr.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-white/60 hover:text-white"
                                                >
                                                    ↗
                                                </a>
                                            ) : null}
                                        </div>

                                        {pr.description ? (
                                            <p className="mt-2 text-sm text-white/70">
                                                {pr.description}
                                            </p>
                                        ) : null}

                                        {pr.highlights.length ? (
                                            <ul className="mt-4 list-disc pl-5 text-sm text-white/70 space-y-1.5">
                                                {pr.highlights.slice(0, 4).map((h, idx) => (
                                                    <li key={idx}>{h}</li>
                                                ))}
                                            </ul>
                                        ) : null}

                                        {pr.tech.length ? (
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {pr.tech.slice(0, 10).map((t) => (
                                                    <span
                                                        key={t}
                                                        className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white/70"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : null}
                                    </article>
                                ))}
                            </div>
                        </Section>
                    ) : null}

                    {d.experience.length ? (
                        <div className="mt-5">
                            <Section id="experience" title="Experience">
                                <div className="space-y-5 flex flex-col gap-4">
                                    {d.experience.map((ex, i) => (
                                        <div
                                            key={`${ex.company}-${ex.role}-${i}`}
                                            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
                                        >
                                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                <div className="text-lg font-medium">{ex.role || "Role"}</div>
                                                <div className="text-xs text-white/50">
                                                    {ex.start}
                                                    {ex.end ? ` — ${ex.end}` : ""}
                                                </div>
                                            </div>
                                            <div className="mt-1 text-sm text-white/70">
                                                {ex.company || "Company"}
                                                {ex.location ? ` • ${ex.location}` : ""}
                                            </div>

                                            {ex.highlights.length ? (
                                                <ul className="mt-4 list-disc pl-5 text-sm text-white/70 space-y-1.5">
                                                    {ex.highlights.slice(0, 6).map((h, idx) => (
                                                        <li key={idx}>{h}</li>
                                                    ))}
                                                </ul>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        </div>
                    ) : null}

                    {d.skills.length ? (
                        <div className="mt-5">
                            <Section id="skills" title="Skills">
                                <div className="flex flex-wrap gap-2">
                                    {d.skills.slice(0, 60).map((s) => (
                                        <span
                                            key={s}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10 transition"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </Section>
                        </div>
                    ) : null}

                    {d.education.length ? (
                        <div className="mt-5">
                            <Section id="education" title="Education">
                                <div className="grid gap-5 md:grid-cols-2">
                                    {d.education.map((ed, i) => (
                                        <div
                                            key={`${ed.school}-${i}`}
                                            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
                                        >
                                            <div className="text-lg font-medium">{ed.school || "School"}</div>
                                            <div className="mt-1 text-sm text-white/70">
                                                {ed.degree || "Degree"}
                                            </div>
                                            <div className="mt-2 text-xs text-white/50">
                                                {ed.start}
                                                {ed.end ? ` — ${ed.end}` : ""}
                                            </div>
                                            {ed.notes ? (
                                                <div className="mt-3 text-sm text-white/70">{ed.notes}</div>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return <TemplateEditorial draft={defaultDraft} />;
}
