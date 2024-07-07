import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { UserContext } from "../../context/userContext";
import * as Yup from "yup";
import { signup } from "../../api/auth";
import { useApi } from "../../hooks/use-api";
import { toast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Button } from "../ui/button";
const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const { fetchUserData } = useContext(UserContext);
  const url = useSearch({
    from: "",
    select: (search: any) => search.url
  });

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required()
  });
  const { error, fetchData, loading, response } = useApi({
    callbackFn: signup,
    options: {
      email: email,
      password: password,
      name,
      profile_pic: profilePic
    }
  });
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    schema
      .validate({ email, password })
      .then(async () => {
        await fetchData(email, password, name, profilePic);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please enter a valid URL.",
          action: <ToastAction altText="Try again">Try again</ToastAction>
        });
      });
  };

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "profilePic") {
      // @ts-ignore
      setProfilePic(e.target.files[0]);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (error === null && response) {
      localStorage.setItem("user", JSON.stringify(response));
      fetchUserData();
      toast({
        title: "Success",
        description: "Data fetched successfully."
      });
      navigate({
        to: `/dashboard?${url ? `createNew=${url}` : ``}`
      });
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error?.message || "Uh oh! Something went wrong.",
        description: "Please try again."
      });
    }
  }, [response, error]);
  return (
    <form onSubmit={handleSignup}>
      <Input value={name} name="name" onChange={handleFormValue} className="my-2 outline-none" type="text" placeholder="Name" />
      <Input value={email} name="email" onChange={handleFormValue} className="my-2 outline-none" type="email" placeholder="Email" />
      <Input value={password} name="password" onChange={handleFormValue} className="my-2 outline-none" type="password" placeholder="Password" />
      <Input value={confirmPassword} name="confirmPassword" onChange={handleFormValue} className="my-2 outline-none" type="password" placeholder="Confirm Password" />
      <Input name="profilePic" onChange={handleFormValue} id="file-upload-button" className="my-2 outline-none" type="file" placeholder="Confirm Password" />
      <Button disabled={loading} type="submit">
        {loading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
};

export default Signup;
