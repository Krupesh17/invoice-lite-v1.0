import DragAndDropImageBox from "./drag-and-drop-image-box";
import ImageAssetsListContainer from "./image-assets-list-container";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

const drawerHeaders = {
  logo: {
    local: {
      title: "Local Logo",
      description: "Click to select the logos that are stored on your device.",
    },
    server: {
      title: "Server logo",
      description: "Click to select the logos that are stored on your device.",
    },
    caution_message:
      "Don't select local logo if you are using server invoice storage. logo will not be saved in your invoice.",
  },
  signature: {
    local: {
      title: "Local Signature",
      description:
        "Click to select the signatures that are stored on your device.",
    },
    server: {
      title: "Server Signature",
      description:
        "Click to select the signatures that are stored on your device.",
    },
    caution_message:
      "Don't select local signature if you are using server invoice storage. signature will not be saved in your invoice.",
  },
};

function SelectImageRightSideDrawer({ open, setOpen, drawerType }) {
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{drawerHeaders[drawerType].local.title}</DrawerTitle>
          <DrawerDescription className="text-xs">
            {drawerHeaders[drawerType].local.description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 space-y-4">
          <div className="p-4 bg-sidebar space-y-1 rounded-lg">
            <h5 className="font-medium text-destructive text-sm">Caution</h5>
            <p className="text-xs text-muted-foreground">
              {drawerHeaders[drawerType].caution_message}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DragAndDropImageBox type={drawerType} storageType="local" />
            <ImageAssetsListContainer
              type={drawerType}
              setDrawerOpen={setOpen}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default SelectImageRightSideDrawer;
