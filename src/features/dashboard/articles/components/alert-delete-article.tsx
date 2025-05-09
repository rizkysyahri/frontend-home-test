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

export function AlertDeleteArticle({ onClick }: { onClick: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="text-red-600 underline cursor-pointer">Delete</div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Articles</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this article is permanent and cannot be undone. All related
            content will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick} className="bg-red-400 hover:bg-red-500">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
