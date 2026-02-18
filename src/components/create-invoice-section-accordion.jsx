import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ScrollArea } from "./ui/scroll-area";
import CompanyDetailsAccordionItemContent from "./company-details-accordion-item-content";
import ClientDetailsForm from "./forms/client-details-form";
import AdditionalInformationForm from "./forms/additional-information-form";
import InvoiceItemsAccordionItemContent from "./invoice-items-accordion-item-content";
import InvoiceDetailsForm from "./forms/invoice-details-form";

const accordionData = [
  {
    slug: "company-details",
    label: "Company Details",
    content: CompanyDetailsAccordionItemContent,
  },
  {
    slug: "client-details",
    label: "Client Details",
    content: ClientDetailsForm,
  },
  {
    slug: "invoice-details",
    label: "Invoice Details",
    content: InvoiceDetailsForm,
  },
  {
    slug: "invoice-items",
    label: "Invoice Items",
    content: InvoiceItemsAccordionItemContent,
  },
  {
    slug: "additional-information",
    label: "Additional Information",
    content: AdditionalInformationForm,
  },
];

function CreateInvoiceSectionAccordion() {
  return (
    <ScrollArea className="w-full h-[calc(100dvh-128px)] overflow-y-auto">
      <Accordion
        type="single"
        collapsible
        defaultValue="company-details"
        className="w-full"
      >
        {accordionData.map((item) => (
          <AccordionItem key={item.slug} value={item.slug}>
            <AccordionTrigger className="px-4">{item.label}</AccordionTrigger>
            <AccordionContent className="px-4">
              <item.content />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
}

export default CreateInvoiceSectionAccordion;
