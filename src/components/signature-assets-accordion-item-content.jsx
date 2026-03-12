import DragAndDropImageBox from "./drag-and-drop-image-box";
import ImageAssetsListContainer from "./image-assets-list-container";

function SignatureAssetsAccordionItemContent() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h4 className="text-base font-semibold">Local Signatures</h4>
        <p className="text-xs text-muted-foreground">
          Manage the signature that are stored on your device.
        </p>
      </div>
      <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4">
        <DragAndDropImageBox
          type="signature"
          storageType="signature"
          iconVisible={true}
        />
        <ImageAssetsListContainer type="signature" deleteActive={true} />
      </div>
    </section>
  );
}

export default SignatureAssetsAccordionItemContent;
