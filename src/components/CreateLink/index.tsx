import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { UserContext } from "../../context/userContext";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const CreateLink = () => {
  const [urlValues, setUrlValues] = useState({
    original_url: "",
    qr_code: null,
    custom_url: "",
    title: ""
  });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const url = useSearch({
    from: "",
    select: (search: any) => search.createNew
  });

  // console.log("URL IS ", url);

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValues((prev) => {
      return {
        ...prev,
        [e.target.name]: [e?.target?.files?.[0]] ? [e.target.files?.[0]] : [e.target.value]
      };
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="my-2">Create New</DialogTitle>
            <Input onChange={handleFormValue} name="title" className="my-2 outline-none" type="text" placeholder="Title" />
            <Input onChange={handleFormValue} name="original_url" className="my-2 outline-none" type="url" placeholder="Original Url" />
            <div className="flex gap-2 items-center">
              {/* <Input readOnly value={"biteurl"} name="biteurl" className="my-2 outline-none w-fit" /> */}
              <Card className="p-2">biteurl.vercel.app</Card>
              <span>/</span>
              <Input onChange={handleFormValue} name="custom_url" className="my-2 outline-none" type="email" placeholder="Custom Url" />
            </div>
            <Input onChange={handleFormValue} name="qr_code" className="my-2 outline-none" type="file" placeholder="Qr Code" />
            <Button>Bite Url</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
