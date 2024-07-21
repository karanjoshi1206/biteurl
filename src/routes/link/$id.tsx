import { createFileRoute } from "@tanstack/react-router";
import { useApi } from "../../hooks/use-api";
import { getUrlDataFromId } from "../../api/urls";
import { useEffect, useState } from "react";
import { TUrl } from "../../components/UrlCard";
import { getAnalytics } from "../../api/analytics";

export const Route = createFileRoute("/link/$id")({
  component: () => <Link />
});

const Link = () => {
  const { id } = Route.useParams();
  const { error, fetchData, loading, response } = useApi({ callbackFn: getUrlDataFromId, options: { id: id } });
  const { fetchData: fetchAnalytics, response: analytics } = useApi({ callbackFn: getAnalytics, options: { url_ids: [response?.[0]?.id] } });
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  useEffect(() => {
    if (response) {
      fetchAnalytics();
    }
  }, [response]);
  console.log("Anaylytics ", analytics);
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <h1 className="text-5xl">Coming Soon...</h1>
      {response && <>{/* <h4>{response?.[0]?.title}</h4> */}</>}
    </div>
  );
};
