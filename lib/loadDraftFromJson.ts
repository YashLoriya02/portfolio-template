import raw from "@/data/draft.json";
import { normalizeDraft } from "@/lib/normalizeDraft";
import { PortfolioDraft } from "./draft";

export function loadDraftFromJson(): PortfolioDraft {
  return normalizeDraft(raw as any);
}
