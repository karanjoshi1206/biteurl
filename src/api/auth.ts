import supabase, { supabaseUrl } from "../db/supabase";
import { getUniqueId } from "../helpers/uniqueId";

type LoginProps = {
  email: string;
  password: string;
};

type UserData = {
  name: string;
  email: string;
  profile_pic: any;
  password: string;
};

export const login = async ({ email, password }: LoginProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signup = async ({ email, password, name, profile_pic }: UserData) => {
  // store the profile pic in supabase storage first
  const fileName = `${name.split(" ").join("-")}-${getUniqueId()}`;
  const { error: storageError } = await supabase.storage.from("user_images").upload(fileName, profile_pic);
  if (storageError) {
    throw new Error(storageError.message);
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        profile_pic: `${supabaseUrl}/storage/v1/object/public/user_images/${fileName}`,
        name
      }
    }
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  return {
    status: true,
    message: "User Logged Out successfully"
  };
};

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}
