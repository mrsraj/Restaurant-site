import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
 
export default function PasswordInput({ type = "password", id, ...props }) {
  const [visible, setVisible] = useState(false);
  const generatedId = useId();
  if (type !== "password") return <input {...props} id={id} type={type} />;
  const inputId = id || generatedId;
  return <span className="password-field">
    <input {...props} id={inputId} type={visible ? "text" : "password"} />
    <button type="button" className="password-toggle" aria-label={visible ? "Hide password" : "Show password"} aria-controls={inputId} aria-pressed={visible} onClick={() => setVisible(value => !value)}>
      {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
    </button>
  </span>;
}
