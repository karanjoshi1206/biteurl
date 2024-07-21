import { Calendar, Copy, Download, Trash } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useApi } from "../../hooks/use-api";
import { deleteUrl } from "../../api/urls";
import { useEffect } from "react";
import { ToastAction } from "@radix-ui/react-toast";
import Spinner from "../Spinner";
import { baseUrl } from "../../CONSTANTS";
import { Link } from "@tanstack/react-router";

export type TUrlModel = {
  original_url: string;
  qr: string | null;
  title: string;
  user_id: string;
  custom_url: string;
};

export type TUrl = {
  created_at: string;
  custom_url: string | null;
  id: number;
  short_url: string;
} & TUrlModel;
const UrlCard = ({ url, fetchUrls }: { url: TUrl; fetchUrls: () => {} }) => {
  const {
    loading,
    error,
    fetchData: handleDelete,
    response
  } = useApi({
    callbackFn: deleteUrl,
    options: {
      url_id: url.id
    }
  });

  const handleUrlCopy = () => {
    navigator.clipboard.writeText(url.short_url).then(() => {
      toast({
        title: "Url Copied Successfully !!"
      });
    });
  };

  const handleQrDownload = async () => {
    try {
      const imageUrl = url.qr;
      const fileName = url.title;

      if (!imageUrl) {
        throw new Error("Image URL is missing");
      }

      const response = await fetch(imageUrl, { mode: "cors" });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const anchorTag = document.createElement("a");
      anchorTag.href = blobUrl;
      anchorTag.download = fileName || "download";
      document.body.appendChild(anchorTag);
      anchorTag.click();

      // Clean up
      document.body.removeChild(anchorTag);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("There was an error downloading the image:", error);
    }
  };

  const handleUrlDelete = () => {
    handleDelete();
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        action: <ToastAction altText="Try again">Try again</ToastAction>
      });
    }
    if (response) {
      toast({
        title: "URL deleted successfully !!"
      });
      fetchUrls();
    }
  }, [response, error]);

  return (
    <div key={url.id} className="flex flex-1 flex-item flex-shrink min-w-full sm:min-w-[450px] gap-4 bg-gray-900 p-4 rounded-sm relative">
      {loading && <Spinner />}
      {url.qr && <img src={url.qr} alt="" />}
      <div className="w-full">
        <div className="pb-2">
          <div className="flex justify-between items-center mb-4">
            <Link className="font-bold text-xl" to={`/link/${url.id}`} >
              {url.title}
            </Link>
            <div className="flex gap-2">
              <Copy height={20} onClick={handleUrlCopy} className="cursor-pointer" />
              <Download height={20} onClick={handleQrDownload} className="cursor-pointer" />
              <Trash onClick={handleUrlDelete} height={20} className="cursor-pointer" />
              {/* <Button onClick={handleUrlCopy}>Copy</Button> */}
            </div>
          </div>
          <a className="text-blue-600 block text-sm mb-2" href={url.short_url} target="_blank">
            {`${baseUrl}${url.short_url}`}
          </a>
          <a className="text-gray-400 block text-sm" href={url.original_url} target="_blank">
            {url.original_url}
          </a>
        </div>
        <div className="flex gap-0 items-center my-2 absolute bottom-0">
          <Calendar className="text-gray-300" height={16} />
          <span className="text-sm">{new Date(url.created_at).toDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
