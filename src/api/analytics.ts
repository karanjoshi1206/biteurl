import supabase from "../db/supabase";

export const getAnalytics = async ({ url_ids }: { url_ids: [string] }) => {
  const { data, error } = await supabase.from("analytics").select("*").in("url_id", url_ids);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
