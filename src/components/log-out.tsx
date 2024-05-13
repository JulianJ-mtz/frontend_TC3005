
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

function deleteToken() {
  localStorage.removeItem("token");
  window.location.reload()
}

export function FinishSession() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LogOut className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">logout</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={deleteToken}>LogOut</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
