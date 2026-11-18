import GettingStartedClient from "@/components/GettingStartedClient";
import { RESIDENTIAL_PILLAR_HUB } from "@/data/pillarHubs";
import { RESIDENTIAL_DISCOVERY_DECK } from "@/data/discoveryDecks";

export default function ResidentialGetStartedPage() {
  return <GettingStartedClient hub={RESIDENTIAL_PILLAR_HUB} deck={RESIDENTIAL_DISCOVERY_DECK} />;
}

