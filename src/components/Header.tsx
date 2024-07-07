import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, LinkIcon } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useApi } from "../hooks/use-api";
import { logout } from "../api/auth";
const Header = () => {
  const { response, error, fetchData } = useApi({ callbackFn: logout });
  const { isAuthenticated, fetchUserData, user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleAuthNavigate = () => {
    navigate({
      to: "/auth"
    });
  };

  console.log("USER IS ", user);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    fetchData();
  };
  useEffect(() => {
    if (response) {
      localStorage.removeItem("user");
      fetchUserData();
    }
  }, [response, error]);
  return (
    <nav className="flex justify-between items-center py-4">
      <Link to={"/"}>URL SHORTNER</Link>
      <div>
        {!isAuthenticated ? (
          <Button onClick={handleAuthNavigate}> Sign in</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 h-10 rounded outline-none">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>KJ</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <LinkIcon className="mr-2 h-4 w-4" /> <span> My Links</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                <LogOut onClick={handleLogout} className="mr-2 h-4 w-4" /> <span> Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Header;
