import { useState } from "react";

type ApiProps = {
  callbackFn: any;
  options?: any;
};
export const useApi = ({ callbackFn, options }: ApiProps) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(<any>null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (...args: any) => {
    setLoading(true);
    try {
      const data = await callbackFn(options, ...args);
      setResponse(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};
