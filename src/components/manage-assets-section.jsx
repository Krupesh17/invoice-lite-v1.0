import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ScrollArea } from "./ui/scroll-area";
import LogoAssetsAccordionItemContent from "./logo-assets-accordion-item-content";
import SignatureAssetsAccordionItemContent from "./signature-assets-accordion-item-content";

const accordionData = [
  {
    slug: "logos",
    label: "Logos",
    content: LogoAssetsAccordionItemContent,
  },
  {
    slug: "signatures",
    label: "Signatures",
    content: SignatureAssetsAccordionItemContent,
  },
];

function ManageAssetsSection() {
  return (
    <ScrollArea className="w-full h-full">
      <Accordion
        type="multiple"
        collapsible="true"
        defaultValue={["logos", "signatures"]}
        className="w-full"
      >
        {accordionData.map((item) => (
          <AccordionItem key={item.slug} value={item.slug} className="last:border-b!">
            <AccordionTrigger className="px-4 bg-sidebar">{item.label}</AccordionTrigger>
            <AccordionContent className="px-4">
              <item.content />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
}

export default ManageAssetsSection;
