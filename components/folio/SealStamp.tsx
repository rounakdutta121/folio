export function SealStamp({
  label,
  stamped,
}: {
  label: string;
  stamped: boolean;
}) {
  if (!stamped && label === "Due") {
    return <span className="folio-badge folio-badge-due">{label}</span>;
  }
  if (label === "Paid") {
    return <span className="folio-badge folio-badge-paid">{label}</span>;
  }
  if (label === "Void") {
    return <span className="folio-badge folio-badge-void">{label}</span>;
  }
  return <span className="folio-badge">{label}</span>;
}
