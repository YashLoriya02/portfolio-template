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
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10 hover:border-white/20 transition"
        >
            <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-white/70 transition" />
            {label}
        </a>
    );
}

function Section({
    id,
    title,
    children,
    subtitle,
}: {
    id: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-sm font-semibold tracking-[0.22em] uppercase text-white/60">
                        {title}
                    </h2>
                    {subtitle ? (
                        <p className="mt-1 text-xs text-white/45">{subtitle}</p>
                    ) : null}
                </div>
                <div className="hidden md:block h-px flex-1 bg-linear-to-r from-white/20 via-white/5 to-transparent" />
            </div>
            <div className="mt-5">{children}</div>
        </section>
    );
}

function AuroraBackground() {
    // Pure CSS/utility background layers (no motion libs)
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 left-1/2 h-95 w-195 -translate-x-1/2 rounded-full bg-linear-to-r from-fuchsia-500/25 via-cyan-400/20 to-emerald-400/20 blur-3xl" />
            <div className="absolute top-1/3 -left-24 h-105 w-130 rounded-full bg-linear-to-br from-cyan-400/18 via-indigo-500/16 to-fuchsia-500/18 blur-3xl" />
            <div className="absolute -bottom-28 right-0 h-105 w-180 rounded-full bg-linear-to-tr from-emerald-400/18 via-cyan-400/14 to-indigo-500/18 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[48px_48px]" />
            <div className="absolute inset-0 bg-black/65" />
        </div>
    );
}

export function TemplateAurora({ draft }: { draft: PortfolioDraft }) {
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
        <div className="min-h-screen text-white bg-black relative">
            <AuroraBackground />

            <div className="relative mx-auto max-w-7xl px-6 py-12">
                {/* Hero */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                                Available for opportunities
                            </div>

                            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
                                {p.fullName || "Your Name"}
                            </h1>

                            {p.headline ? (
                                <p className="mt-3 text-lg md:text-xl text-white/75">
                                    {p.headline}
                                </p>
                            ) : (
                                <p className="mt-3 text-lg md:text-xl text-white/75">
                                    Add your headline to make the first impression strong.
                                </p>
                            )}

                            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/55">
                                {p.location ? (
                                    <span className="inline-flex items-center gap-2">
                                        <span className="h-1 w-1 rounded-full bg-white/30" />
                                        {p.location}
                                    </span>
                                ) : null}
                                <span className="hidden sm:inline text-white/25">•</span>
                                <span className="text-white/55">
                                    Single-page portfolio
                                </span>
                            </div>
                        </div>

                        {links.length ? (
                            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                                {links.map((l) => (
                                    <ExternalLink key={l.href} href={l.href} label={l.label} />
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <div className="mt-6">
                        <p className="text-base leading-relaxed text-white/70">
                            {p.summary || "Add a short summary to introduce yourself."}
                        </p>
                    </div>

                    {nav.length ? (
                        <div className="mt-8">
                            <div className="flex flex-wrap gap-2">
                                {nav.map((n) => (
                                    <a
                                        key={n.id}
                                        href={`#${n.id}`}
                                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/25 hover:bg-white/10 transition"
                                    >
                                        {n.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>

                <div className="mt-12 space-y-16">
                    {/* Projects */}
                    {d.projects.length ? (
                        <Section id="projects" title="Projects" subtitle="Selected work and outcomes">
                            <div className="grid gap-5 md:grid-cols-2">
                                {d.projects.map((pr, i) => (
                                    <article
                                        key={`${pr.name}-${i}`}
                                        className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
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
                                                    className="text-sm text-white/60 hover:text-white transition"
                                                    aria-label="Open project link"
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
                                            <ul className="mt-4 space-y-2">
                                                {pr.highlights.slice(0, 4).map((h, idx) => (
                                                    <li key={idx} className="text-sm text-white/70">
                                                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-white/35 group-hover:bg-white/60 transition" />
                                                        {h}
                                                    </li>
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

                    {/* Experience */}
                    {d.experience.length ? (
                        <Section id="experience" title="Experience" subtitle="Roles, impact, and key contributions">
                            <div className="space-y-5">
                                {d.experience.map((ex, i) => (
                                    <div
                                        key={`${ex.company}-${ex.role}-${i}`}
                                        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition"
                                    >
                                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                                            <div className="text-lg font-medium">{ex.role || "Role"}</div>
                                            <div className="text-xs text-white/60">
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
                    ) : null}

                    {/* Skills */}
                    {d.skills.length ? (
                        <Section id="skills" title="Skills" subtitle="Tools and strengths">
                            <div className="flex flex-wrap gap-2">
                                {d.skills.slice(0, 60).map((s) => (
                                    <span
                                        key={s}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10 hover:border-white/25 transition"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    ) : null}

                    {/* Education */}
                    {d.education.length ? (
                        <Section id="education" title="Education" subtitle="Academic background">
                            <div className="grid gap-5 md:grid-cols-2">
                                {d.education.map((ed, i) => (
                                    <div
                                        key={`${ed.school}-${i}`}
                                        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition"
                                    >
                                        <div className="text-lg font-medium">{ed.school || "School"}</div>
                                        <div className="mt-1 text-sm text-white/70">
                                            {ed.degree || "Degree"}
                                        </div>
                                        <div className="mt-2 text-xs text-white/60">
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
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return <TemplateAurora draft={defaultDraft} />;
}
