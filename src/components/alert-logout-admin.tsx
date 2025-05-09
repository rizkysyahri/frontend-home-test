import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface AlertLogoutAdminProps {
  onClick: () => void;
}

const AlertLogoutAdmin: React.FC<AlertLogoutAdminProps> = ({ onClick }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer group flex w-full items-center gap-x-3 rounded-md border border-transparent px-3 py-2 text-white bg-transparent hover:bg-blue-700">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-blue-600 hover:bg-blue-700" onClick={onClick}>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertLogoutAdmin;
