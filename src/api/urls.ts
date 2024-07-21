import { TUrlModel } from "../components/UrlCard";
import supabase, { supabaseUrl } from "../db/supabase";
import { getUniqueId } from "../helpers/uniqueId";

export const getUrls = async ({ user_id }: { user_id: string }) => {
  const { data, error } = await supabase.from("urls").select("*").eq("user_id", user_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const getUrlData = async ({ short_url }: { short_url: string }) => {
  const { data, error } = await supabase.from("urls").select("*").or(`short_url.eq.${short_url},custom_url.eq.${short_url}`);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const deleteUrl = async ({ url_id }: { url_id: string }) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", url_id);
  if (error) {
    throw new Error(error.message);
  }
  return {
    status: true,
    message: "URL deleted successfully"
  };
};

export const createUrl = async (urldata: TUrlModel) => {
  const { original_url, qr, custom_url, title, user_id } = urldata;
  const short_url = `${getUniqueId().replace(/-/g, "").slice(0, 5)}`;
  const fileName = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage.from("qr_codes").upload(fileName, qr || "");

  if (storageError) {
    throw new Error(storageError.message);
  }

  const qr_url = `${supabaseUrl}/storage/v1/object/public/qr_codes/${fileName}`;

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url,
        custom_url,
        user_id,
        short_url,
        qr: qr_url
      }
    ])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const getUrlDataFromId = async ({ id }: { id: string }) => {
  const { data, error } = await supabase.from("urls").select("*").eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
