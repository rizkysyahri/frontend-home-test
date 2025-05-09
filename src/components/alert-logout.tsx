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
import { Button } from "./ui/button";
import { DropdownMenuItem } from "./ui/dropdown-menu";

interface AlertLogoutProps {
    onClick: () => void
}

const AlertLogout: React.FC<AlertLogoutProps> = ({onClick}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-red-500"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </div>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
          Are you sure want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-blue-600" onClick={onClick}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertLogout;
