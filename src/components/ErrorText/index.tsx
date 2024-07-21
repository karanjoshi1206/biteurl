import "./style.css";
type TErrorTextProps = {
  children: any;
};
const ErrorText = ({ children }: TErrorTextProps) => {
  console.log("CHILDREN IS ",children)
  if(!children) return null;
  return <div className="errorText">{children}</div>;
};

export default ErrorText;
