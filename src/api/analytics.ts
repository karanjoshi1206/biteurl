import supabase from "../db/supabase";

type UrlAnalytics = {
  url_id: string;
  city: string;
  device: string;
  country: string;
};

export const getAnalytics = async ({ url_ids }: { url_ids: [string] }) => {
  const { data, error } = await supabase.from("analytics").select("*").in("url_id", url_ids);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateAnalytics = async ({ updates }: { updates: Partial<UrlAnalytics> }) => {
  // console.log("Updates are ",updates) ; return;
  const isMobile = getComputedStyle(document.body).getPropertyValue("--device-type") === "mobile";

  const response = await fetch("https://ipapi.co/json");
  const locationData = await response.json();
  const { data, error } = await supabase
    .from("analytics")
    .insert([
      {
        ...updates,
        city: locationData.city,
        country: locationData.country_name,
        device: isMobile ? "Mobile" : "Desktop"
      }
    ])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
