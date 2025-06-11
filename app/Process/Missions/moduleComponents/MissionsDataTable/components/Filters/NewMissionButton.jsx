import Link from "next/link";
import AddIcon from "../Icons/AddIcon"; 

const NewMissionButton = () => (
  <Link 
    href="/missions/new" 
    className="bg-main-green text-white px-4 py-2 rounded-lg hover:bg-darker-green focus:outline-none focus:ring-2 focus:ring-main-green focus:ring-offset-2"
  >
    <span className="flex items-center">
      <AddIcon />
      Nouvelle Mission
    </span>
  </Link>
);

export default NewMissionButton;