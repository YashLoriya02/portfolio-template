import { loadDraftFromJson } from "@/lib/loadDraftFromJson";
import type { TemplateId } from "@/lib/draftTypes";
import { TemplateClassic } from "@/templates/classic/page";
import { TemplateMinimal } from "@/templates/minimal/page";
import { TemplateNeo } from "@/templates/neo/page";
import GlassTemplate from "@/templates/glass/page";
import { TemplateEditorial } from "@/templates/editorial/page";
import { TemplateAurora } from "@/templates/aurora/page";
import { TemplateTerminal } from "@/templates/terminal/page";


const map: Record<TemplateId, any> = {
  minimal: TemplateMinimal,
  neo: TemplateNeo,
  classic: TemplateClassic,
  glass: GlassTemplate,
  editorial: TemplateEditorial,
  aurora: TemplateAurora,
  terminal: TemplateTerminal,
};

export default function Page() {
    const draft = loadDraftFromJson();
    const T = map[draft.templateId] ?? GlassTemplate;
    return <T draft={draft} />;
}
