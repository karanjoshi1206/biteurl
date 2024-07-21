import { createFileRoute, useMatch, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { useApi } from "../hooks/use-api";
import { getUrlData } from "../api/urls";
import Spinner from "../components/Spinner";
import { updateAnalytics } from "../api/analytics";

export const Route = createFileRoute("/$id")({
  component: () => <IdComponent />
});

const IdComponent = () => {
  const { id } = Route.useParams();
  const { response, error, fetchData, loading } = useApi({
    callbackFn: getUrlData,
    options: {
      short_url: id
    }
  });

  const {
    error: anaylticsError,
    fetchData: updateAnalyticsFn,
    loading: analyticsLoading,
    response: analyticsResponse
  } = useApi({
    callbackFn: updateAnalytics,
    options: {
      updates: {
        url_id: response?.[0]?.id
      }
    }
  });

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
  console.log("first")

    if (loading) return;
    if (error) {
    } else if (response) {
      updateAnalyticsFn();
      window.location.href = response?.[0]?.original_url;
    }
  }, [error, response]);
  return (
    <>
      {loading && <Spinner />}
      {id}
    </>
  );
};
