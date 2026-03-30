import { Button } from "./ui/button";

function InvoicesTablePaginationBar({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
}) {
  return (
    <section className="w-full flex items-center justify-between gap-2 flex-wrap max-[322px]:flex-col max-[322px]:gap-4">
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        Page
        <span className="text-foreground">{currentPage}</span>
        of
        <span className="text-foreground">{totalPages}</span>
        &nbsp;•&nbsp;
        <span className="text-foreground">{totalRecords}</span>
        Records
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          className="cursor-pointer"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          className="cursor-pointer"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </section>
  );
}

export default InvoicesTablePaginationBar;
