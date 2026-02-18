function SelectImagePreviewImageBox({ label, icon, type, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium inline-block" htmlFor={type}>
        {label}
      </label>
      <button
        type="button"
        id={type}
        className="w-full aspect-square border border-dashed rounded-lg flex items-center justify-center p-2 hover:bg-accent/80 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        {...props}
      >
        <div className="flex flex-col items-center gap-2">
          {icon}
          <p className="text-xs font-medium">Select Image From Assets</p>
          <small className="text-[10px] text-muted-foreground space-x-0.5">
            <span>Type:</span><span>{type}</span>
          </small>
        </div>
      </button>
    </div>
  );
}

export default SelectImagePreviewImageBox;
