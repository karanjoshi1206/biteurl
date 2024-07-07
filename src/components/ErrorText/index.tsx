import "./style.css";
type TErrorTextProps = {
  children: any;
};
const ErrorText = ({ children }: TErrorTextProps) => {
  return <div className="errorText">{children}</div>;
};

export default ErrorText;
