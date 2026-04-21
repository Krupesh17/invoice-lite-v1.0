import InvoiceCopySignatureTotals from "./invoice-copy-signature-totals";
import InvoiceCopyTermsNotesPaymentInformation from "./invoice-copy-terms-notes-payment-information";

function InvoiceCopyFooterBlock({ scale }) {
  return (
    <div>
      <InvoiceCopySignatureTotals scale={scale} />
      <InvoiceCopyTermsNotesPaymentInformation scale={scale} />
    </div>
  );
}

export default InvoiceCopyFooterBlock;
