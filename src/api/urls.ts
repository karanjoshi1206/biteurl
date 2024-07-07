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

export const deleteUrl = async ({ url_id }: { url_id: string }) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", url_id);
  console.log("Data is ", data);
  if (error) {
    throw new Error(error.message);
  }
  return {
    status: true,
    message: "URL deleted successfully"
  };
};

export const createUrl = async ({ original_url, qr, custom_url, title, user_id }: TUrlModel) => {
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
