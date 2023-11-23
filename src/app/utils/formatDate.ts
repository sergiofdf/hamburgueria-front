export function formatDate(date: Date | string) {
  if(typeof(date) == 'string'){
    date = new Date(date);
  }
  return Intl.DateTimeFormat('pt-br').format(date);
}
