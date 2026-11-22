import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  ARTICLES,
  CONTACT,
  INITIAL_PUBLICATIONS,
  SERVICES,
  whatsappUrl,
  type Article,
  type Publication,
  type Service,
} from "@/lib/site";
import { mergeContact, mergeServices } from "./merge";
import { EMPTY_SETTINGS, type PortalContent } from "./schemas";

type SiteData = {
  contact: typeof CONTACT;
  services: Service[];
  articles: Article[];
  publications: Publication[];
  whatsapp: (text?: string) => string;
};

function build(content: PortalContent | null | undefined): SiteData {
  const settings = content?.settings ?? EMPTY_SETTINGS;
  const contact = mergeContact(CONTACT, settings);
  return {
    contact,
    services: mergeServices(SERVICES, settings),
    articles: content?.articles ?? ARTICLES,
    publications: content?.publications ?? INITIAL_PUBLICATIONS,
    whatsapp: (text) => whatsappUrl(contact.phoneIntl, text),
  };
}

const SiteContext = createContext<SiteData>(build(null));

/** Gives every page the live content the admin saved, falling back to the built-in content. */
export function PortalProvider({ content, children }: { content: PortalContent | null | undefined; children: ReactNode }) {
  const value = useMemo(() => build(content), [content]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
