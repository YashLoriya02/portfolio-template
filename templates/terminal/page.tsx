import type { PortfolioDraft } from "@/lib/draft";
import { normalizeDraft } from "@/lib/normalizeDraft";
import { defaultDraft } from "@/lib/draft";

function Chip({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200/90">
            {children}
        </span>
    );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
    const isMail = href.startsWith("mailto:");
    const isTel = href.startsWith("tel:");
    return (
        <a
            href={href}
            target={isMail || isTel ? undefined : "_blank"}
            rel={isMail || isTel ? undefined : "noreferrer"}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
        >
            <span className="text-white/45">$</span>
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
            <div className="flex items-center gap-3">
                <span className="text-emerald-300/70">➜</span>
                <h2 className="font-mono text-sm uppercase tracking-widest text-white/70">
                    {title}
                </h2>
                <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="mt-5">{children}</div>
        </section>
    );
}

export function TemplateTerminal({ draft }: { draft: PortfolioDraft }) {
    const d = normalizeDraft(draft);
    const p = d.profile;

    const links = [
        p.website ? { label: "open website", href: p.website } : null,
        p.github ? { label: "open github", href: p.github } : null,
        p.linkedin ? { label: "open linkedin", href: p.linkedin } : null,
        p.email ? { label: "email me", href: `mailto:${p.email}` } : null,
        p.phone ? { label: "call me", href: `tel:${p.phone.replace(/\s+/g, "")}` } : null,
    ].filter(Boolean) as Array<{ label: string; href: string }>;

    const nav = [
        { id: "projects", label: "projects", show: d.projects.length > 0 },
        { id: "experience", label: "experience", show: d.experience.length > 0 },
        { id: "skills", label: "skills", show: d.skills.length > 0 },
        { id: "education", label: "education", show: d.education.length > 0 },
    ].filter((x) => x.show);

    return (
        <div className="min-h-screen bg-[#070A08] text-white">
            <div className="mx-auto max-w-7xl px-6 py-12">
                {/* Terminal frame */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden">
                    <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-white/10 bg-black/30">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                        </div>
                        <div className="text-xs text-white/60 font-mono">portfolio.sh</div>
                        <div className="text-xs text-white/35 font-mono">v1.0</div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="font-mono text-sm text-white/70">
                            <div>
                                <span className="text-emerald-300/80">user@site</span>
                                <span className="text-white/40">:</span>
                                <span className="text-cyan-300/80">~</span>
                                <span className="text-white/40">$</span> whoami
                            </div>
                        </div>

                        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                            {p.fullName || "Your Name"}
                        </h1>

                        {p.headline ? (
                            <p className="mt-2 text-white/75">
                                <span className="text-white/45 font-mono">$</span>{" "}
                                {p.headline}
                            </p>
                        ) : (
                            <p className="mt-2 text-white/75">
                                <span className="text-white/45 font-mono">$</span>{" "}
                                Add a headline that describes what you do.
                            </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                            {p.location ? <Chip>{p.location}</Chip> : null}
                            <Chip>single-page</Chip>
                            <Chip>fast</Chip>
                            <Chip>clean</Chip>
                        </div>

                        <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
                            <p className="text-sm leading-relaxed text-white/70">
                                {p.summary || "Add a short summary to introduce yourself."}
                            </p>
                        </div>

                        {links.length ? (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {links.map((l) => (
                                    <ExternalLink key={l.href} href={l.href} label={l.label} />
                                ))}
                            </div>
                        ) : null}

                        {nav.length ? (
                            <div className="mt-8 sticky top-4 z-10">
                                <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur px-4 py-3">
                                    <div className="flex flex-wrap gap-3 text-sm font-mono text-white/65">
                                        {nav.map((n) => (
                                            <a
                                                key={n.id}
                                                href={`#${n.id}`}
                                                className="hover:text-white transition"
                                            >
                                                ./{n.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <div className="mt-10 space-y-14">
                            {d.projects.length ? (
                                <Section id="projects" title="Projects">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {d.projects.map((pr, i) => (
                                            <article
                                                key={`${pr.name}-${i}`}
                                                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <h3 className="font-medium">
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
                                                    <ul className="mt-3 space-y-2 text-sm text-white/70">
                                                        {pr.highlights.slice(0, 4).map((h, idx) => (
                                                            <li key={idx}>
                                                                <span className="text-emerald-300/70">•</span>{" "}
                                                                {h}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : null}

                                                {pr.tech.length ? (
                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {pr.tech.slice(0, 10).map((t) => (
                                                            <span
                                                                key={t}
                                                                className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-xs text-white/70"
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
                                <Section id="experience" title="Experience">
                                    <div className="space-y-4">
                                        {d.experience.map((ex, i) => (
                                            <div
                                                key={`${ex.company}-${ex.role}-${i}`}
                                                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
                                            >
                                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                    <div className="font-medium">{ex.role || "Role"}</div>
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
                                                    <ul className="mt-3 list-disc pl-5 text-sm text-white/70 space-y-1">
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

                            {d.skills.length ? (
                                <Section id="skills" title="Skills">
                                    <div className="flex flex-wrap gap-2">
                                        {d.skills.slice(0, 60).map((s) => (
                                            <span
                                                key={s}
                                                className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white/70 hover:bg-white/10 transition"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </Section>
                            ) : null}

                            {d.education.length ? (
                                <Section id="education" title="Education">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {d.education.map((ed, i) => (
                                            <div
                                                key={`${ed.school}-${i}`}
                                                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
                                            >
                                                <div className="font-medium">{ed.school || "School"}</div>
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
            </div>
        </div>
    );
}

export default function Page() {
    return <TemplateTerminal draft={defaultDraft} />;
}
