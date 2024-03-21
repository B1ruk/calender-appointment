export const formatDate = (dateIsoFmt:String) => {
  const date = new Date(dateIsoFmt.toString());

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
