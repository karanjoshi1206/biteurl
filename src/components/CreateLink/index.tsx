import { useContext, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { UserContext } from "../../context/userContext";
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useApi } from "../../hooks/use-api";
import { createUrl } from "../../api/urls";
import Spinner from "../Spinner";
import { QRCode } from "react-qrcode-logo";
import { toast } from "../ui/use-toast";
import ErrorText from "../ErrorText";

const CreateLink = () => {
  const [qr, setQr] = useState<any>(null);
  const qrRef = useRef<any>();
  const [urlValues, setUrlValues] = useState({
    original_url: "",
    qr: null,
    custom_url: "",
    title: ""
  });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const url = useSearch({
    from: "",
    select: (search: any) => search.createNew
  });
  const router = useRouter();

  const {
    response,
    error,
    fetchData: createShortUrl,
    loading
  } = useApi({
    callbackFn: createUrl,
    options: {
      ...urlValues,
      user_id: user.id,
      qr
    }
  });

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e?.target?.files?.[0] ? e.target.files?.[0] : e.target.value
      };
    });
  };

  const handleBiteUrl = async () => {
    try {
      createShortUrl();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.message || "Uh oh! Something went wrong.",
        description: "Please try again."
      });
    }
  };

  useEffect(() => {
    if (url) {
      setUrlValues((prev) => {
        return {
          ...prev,
          original_url: url
        };
      });
    }
  }, [url]);

  useEffect(() => {
    if (response) {
      navigate({
        to: `/link/${response?.[0]?.id}`
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: error?.message || "Uh oh! Something went wrong.",
        description: "Please try again."
      });
    }
  }, [response, error]);
  const canvasToBlob = async () => {
    if (urlValues.original_url) {
      const canvas = qrRef.current?.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      setQr(blob);
    }
  };
  useEffect(() => {
    canvasToBlob();
  }, [urlValues.original_url]);

  return (
    <div>
      {loading && <Spinner />}
      <Dialog
        defaultOpen={url}
        onOpenChange={() => {
          navigate({
            to: "/dashboard"
          });
        }}
      >
        <DialogTrigger>Bite URL</DialogTrigger>
        <DialogContent>
          {error && <ErrorText>{error?.message}</ErrorText>}
          <DialogHeader>
            <DialogTitle className="my-2">Create New</DialogTitle>
            {urlValues.original_url && <QRCode value={urlValues.original_url} size={200} ref={qrRef} />}
            <Input onChange={handleFormValue} name="title" className="my-2 outline-none" type="text" placeholder="Title" />
            <Input onChange={handleFormValue} value={urlValues.original_url} name="original_url" className="my-2 outline-none" type="url" placeholder="Original Url" />
            <div className="flex gap-2 items-center">
              {/* <Input readOnly value={"biteurl"} name="biteurl" className="my-2 outline-none w-fit" /> */}
              <Card className="p-2">biteurl.vercel.app</Card>
              <span>/</span>
              <Input onChange={handleFormValue} name="custom_url" className="my-2 outline-none" type="email" placeholder="Custom Url" />
            </div>
            {/* <Input accept="image/*" onChange={handleFormValue} name="qr" className="my-2 outline-none" type="file" placeholder="Qr Code" /> */}
            <Button disabled={loading} onClick={handleBiteUrl}>
              {loading ? "Loading..." : "Bite Url"}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
