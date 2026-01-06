import { loadDraftFromJson } from "@/lib/loadDraftFromJson";
import type { TemplateId } from "@/lib/draftTypes";
import { TemplateClassic } from "@/templates/classic/page";
import { TemplateMinimal } from "@/templates/minimal/page";
import { TemplateNeo } from "@/templates/neo/page";
import GlassTemplate from "@/templates/glass/page";
import { TemplateEditorial } from "@/templates/editorial/page";
import { TemplateAurora } from "@/templates/aurora/page";
import { TemplateTerminal } from "@/templates/terminal/page";
import { TemplateOrbit } from "@/templates/orbit/page";
import { TemplateTimeline } from "@/templates/timeline/page";
import { TemplatePaper } from "@/templates/paper/page";
import { TemplateMuse } from "@/templates/muse/page";
import { TemplateSpotlight } from "@/templates/spotlight/page";


const map: Record<TemplateId, any> = {
  minimal: TemplateMinimal,
  neo: TemplateNeo,
  classic: TemplateClassic,
  glass: GlassTemplate,
  editorial: TemplateEditorial,
  aurora: TemplateAurora,
  terminal: TemplateTerminal,
  spotlight: TemplateSpotlight,
  muse: TemplateMuse,
  paper: TemplatePaper,
  timeline: TemplateTimeline,
  orbit: TemplateOrbit,
};

export default function Page() {
  const draft = loadDraftFromJson();
  const T = map[draft.templateId] ?? GlassTemplate;
  return <T draft={draft} />;
}
