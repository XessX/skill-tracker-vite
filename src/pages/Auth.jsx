import { useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function Auth() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // "login" or "register"

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <AuthForm mode={mode} />
    </div>
  );
}

export default Auth;
