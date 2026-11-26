import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/ui";
import { Section, H3 } from "@/components/site/blocks";
import { useSite } from "@/lib/portal/context";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Notice",
      description: "What personal information this website collects, why, who receives it, how long we keep it, and your rights under Kenyan data-protection law.",
      path: "/privacy",
    }),
  component: Privacy,
});

function Privacy() {
  const { contact } = useSite();
  const P = ({ children }: { children: React.ReactNode }) => <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>;
  const L = ({ items }: { items: string[] }) => (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
  return (
    <>
      <PageHero eyebrow="Privacy Notice" title="How we handle your personal information." intro="Last updated: 26 November 2026" />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <H3>Who we are</H3>
            <P>
              Musembi S. Educational Consultancy (“we”, “us”) is based in Kikima Town, Mbooni West Sub-County, Makueni County, Kenya. We decide how and why personal information submitted through this website is used. Contact: {contact.email} · {contact.phoneDisplay} · {contact.postalAddress}.
            </P>
          </div>
          <div>
            <H3>Information we collect</H3>
            <P>When you use the website enquiry form we collect only what is needed to respond to you:</P>
            <L items={["Full name, email address and phone / WhatsApp number", "Who you are enquiring as (for example learner, parent, educator or institution)", "The service required, preferred delivery (online or in person) and preferred deadline", "The description of your needs that you choose to write, and your preferred follow-up channel", "Your confirmation that you have read this Privacy Notice"]} />
            <P>Please do not include sensitive information (such as identity numbers, health details or examination credentials) in the form. If you contact us by phone, WhatsApp or email, we receive the details you choose to share.</P>
          </div>
          <div>
            <H3>Why we use it and our basis</H3>
            <L items={["To respond to your enquiry and prepare a quotation, which you request from us (taking steps at your request)", "To deliver and administer agreed services, and to keep necessary service records", "To protect the website against spam and misuse (our legitimate interest)", "To meet legal obligations where they apply", "Where we rely on consent, you may withdraw it at any time"]} />
          </div>
          <div>
            <H3>How the enquiry form works and who receives your information</H3>
            <P>
              When you submit the form, your details are saved in a private enquiry inbox that only authorised Consultancy staff can open. The inbox is stored as files in a private repository hosted by GitHub, our storage provider, using our website hosting provider’s servers. The form then opens WhatsApp or your email application with your enquiry ready for you to send to us; messages you send through WhatsApp or email are also handled by those services under their own terms.
            </P>
            <P>We do not sell your personal information and we do not use it for advertising. We share it only with the service providers named above, where needed to run the website, or where the law requires.</P>
          </div>
          <div>
            <H3>Cookies and analytics</H3>
            <P>
              This website does not currently use advertising or analytics cookies or tracking tools. A single security cookie is used only for the administrator sign-in area and is not set for ordinary visitors. If we add analytics in future we will update this notice and ask for consent where required.
            </P>
          </div>
          <div>
            <H3>How long we keep information</H3>
            <P>We keep enquiry details only for as long as needed to respond, deliver agreed services, meet legal obligations and keep reasonable service records. We then delete or anonymise them. You can ask us to delete your enquiry earlier.</P>
          </div>
          <div>
            <H3>Security</H3>
            <P>We take reasonable measures to protect information: the website is served over HTTPS, the enquiry form has spam protection, access to the enquiry inbox requires a protected administrator sign-in, and access is limited to people who need it to respond or deliver a service. No online system is completely risk-free.</P>
          </div>
          <div>
            <H3>Your rights</H3>
            <P>Under the Data Protection Act, 2019 of Kenya you may ask to access your information, correct it, delete it, object to or restrict its use, and withdraw consent. To make a request, contact us using the details above. If you are not satisfied, you may complain to the Office of the Data Protection Commissioner of Kenya.</P>
          </div>
          <div>
            <H3>Learners and children</H3>
            <P>Where a learner is a child, we ask that a parent or guardian make the enquiry or give permission, and we apply appropriate care to learners’ information.</P>
          </div>
          <div>
            <H3>Changes to this notice</H3>
            <P>We will publish any update on this page and change the date above.</P>
          </div>
        </div>
      </Section>
    </>
  );
}
