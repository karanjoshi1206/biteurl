import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useContext, useState } from "react";
import { toast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";
import * as Yup from "yup";
import { UserContext } from "../context/userContext";

export const Route = createFileRoute("/")({
  component: () => <LandingPage />
});

const LandingPage = () => {
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState("");
  const schema = Yup.object().shape({
    longUrl: Yup.string().url().required()
  });

  const handleSetLongUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
  };

  const handleShorten = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(longUrl);
    schema
      .validate({ longUrl })
      .then(() => {
        if (isAuthenticated) {
          navigate({
            to: `/dashboard?createNew=${encodeURI(longUrl)}`
          });
        } else
          navigate({
            to: `/auth?url=${longUrl}`
          });
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please enter a valid URL.",
          action: <ToastAction altText="Try again">Try again</ToastAction>
        });
      });
  };

  return (
    <div>
      <h2 className="my-4 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-center font-extrabold">The best URL shortner in town</h2>
      <form onSubmit={handleShorten} className="flex flex-col sm:flex-row w-full gap-2">
        <Input type="url" value={longUrl} onChange={handleSetLongUrl} placeholder="eg. https://karanjoshi.vercel.app" />
        <Button type="submit">Shorten</Button>
      </form>
    </div>
  );
};
