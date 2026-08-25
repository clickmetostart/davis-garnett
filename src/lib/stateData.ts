export interface LendingArea {
  region: string;
  cities?: string;
}

export interface StateInfo {
  image: string;
  name: string;
  slug: string;
  cities: string[];
  specialty: string;
  description: string;
  highlights: string[];
  dpaTitle?: string;
  dpaContent?: string;
  lendingTitle?: string;
  lendingIntro?: string;
  lendingAreas?: LendingArea[];
  lendingOutro?: string;
}

export const stateData: Record<string, StateInfo> = {
  template: {
    image: "/state-template.png",
    name: "Template State",
    slug: "template-state",
    cities: ["Template City"],
    specialty: "Template Specialty",
    description: "Template Description",
    highlights: ["Template Highlight 1"],
    dpaTitle: "Template Title",
    dpaContent: "Template Content",
    lendingTitle: "Template Lending",
    lendingIntro: "Template Intro",
    lendingAreas: [
      { region: "Template Region", cities: "Template Cities" }
    ],
    lendingOutro: "Template Outro"
  }
};
