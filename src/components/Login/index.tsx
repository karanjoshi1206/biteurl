import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as Yup from "yup";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { login } from "../../api/auth";
import { useApi } from "../../hooks/use-api";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { UserContext } from "../../context/userContext";
import ErrorText from "../ErrorText";

const Login = () => {
  const [formErrors, setFormErrors] = useState([null]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { fetchUserData } = useContext(UserContext);
  const url = useSearch({
    from: "",
    select: (search: any) => search.url
  });

  const schema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).required("Password is required")
  });
  const { error, fetchData, loading, response } = useApi({
    callbackFn: login,
    options: {
      email: email,
      password: password
    }
  });
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors([]);
    schema
      .validate({ email, password })
      .then(async () => {
        await fetchData(email, password);
      })
      .catch((e: any) => {
        setFormErrors(e?.errors);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please enter a valid credentials.",
          action: <ToastAction altText="Try again">Try again</ToastAction>
        });
      });
  };

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
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
    <form onSubmit={handleLogin} className="my-2">
      {formErrors.length && <ErrorText>{formErrors.join(" and ")}</ErrorText>}
      <Input onChange={handleFormValue} name="email" className="my-2 outline-none" type="email" placeholder="Email" />
      <Input onChange={handleFormValue} name="password" className="my-2 outline-none" type="password" placeholder="Password" />
      <Button disabled={loading} type="submit">
        {loading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
};

export default Login;
