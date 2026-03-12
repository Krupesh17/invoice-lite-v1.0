import { TableHead, TableRow } from "./ui/table";

function InvoicesTableHeaderRow() {
  return (
    <TableRow>
      <TableHead>Storage</TableHead>
      <TableHead>ID</TableHead>
      <TableHead>Serial No</TableHead>
      <TableHead>Total</TableHead>
      <TableHead>Items</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Created At</TableHead>
      <TableHead>Paid At</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  );
}

export default InvoicesTableHeaderRow;
