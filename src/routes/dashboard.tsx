import { createFileRoute, redirect } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

import { useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/use-api";
import { getAnalytics } from "../api/analytics";
import { UserContext } from "../context/userContext";
import { getUrls } from "../api/urls";
import Spinner from "../components/Spinner";
import UrlCard, { TUrl } from "../components/UrlCard";
import CreateLink from "../components/CreateLink";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context, location }) => {
    console.log("CONTEXT IS ", context.auth);
    if (!context.auth) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
  },
  component: () => <DashBoard />
});
const DashBoard = () => {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const { error: urlError, fetchData: fetchUrls, loading: urlsLoading, response: urls } = useApi({ callbackFn: getUrls, options: { user_id: user.id } });

  const { error, fetchData: fetchUrlsAnalytics, loading: analyticsLoading, response: analytics } = useApi({ callbackFn: getAnalytics, options: { url_ids: urls?.map((u: any) => u.id) } });

  useEffect(() => {
    fetchUrls();
  }, []);

  useEffect(() => {
    if (urls?.length > 0) {
      fetchUrlsAnalytics();
    }
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url: any) => url?.title?.toLowerCase().includes(searchQuery?.toLowerCase()));

  return (
    <div>
      {(urlsLoading || analyticsLoading) && <Spinner />}
      <div className="grid sm:grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Links</CardTitle>
            <CardDescription>{urls?.length || 0}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
            <CardDescription>{analytics?.length || 0}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="my-4 flex gap-2 items-center justify-between">
        <h4 className="font-bold text-2xl">My Links</h4>{" "}
        {/* <Button className="h-100">
          Bite URL <PlusIcon height={16} />
        </Button> */}
        <CreateLink />
      </div>
      <div className="my-4">
        <Input value={searchQuery} onChange={handleSearchQueryChange} type="url" placeholder="Search Urls..." />
      </div>
      <div className="">
        <ul className="flex gap-2 flex-wrap">
          {filteredUrls?.map((url: TUrl) => {
            return <UrlCard url={url} fetchUrls={fetchUrls} />;
          })}
        </ul>
      </div>
    </div>
  );
};
