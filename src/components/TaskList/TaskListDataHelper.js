import { formatDistanceToNow } from 'date-fns';

function createdDataHelper(createdDate) {
  const createdAgo = formatDistanceToNow(new Date(createdDate), {
    addSuffix: true,
    includeSeconds: true,
  });
  const timelySeconds = Math.round((new Date() - new Date(createdDate)) / 1000);
  const showSeconds = timelySeconds < 60;
  return showSeconds ? `${timelySeconds} seconds ago` : createdAgo;
}
export default createdDataHelper;
