import ExportIcon from '../Icons/ExportIcon'
import DownloadIcon from '../Icons/DownloadIcon';
const ExportButtons = () => (
  <div className="flex space-x-2">
    <button className="text-main-green hover:text-darker-beige">
      <ExportIcon />
    </button>
    <button className="text-main-green hover:text-darker-beige">
      <DownloadIcon />
    </button>
  </div>
);
export default ExportButtons;