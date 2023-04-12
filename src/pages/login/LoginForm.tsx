import { signIn } from "next-auth/react";
import Link from "next/link";
import { useCallback, useState, type ChangeEvent, type FormEventHandler } from "react";
import GoogleAuthButton from "~/components/GoogleAuthButton/GoogleAuthButton";
import { Button, Checkbox, Input } from "~/components/ui";

interface LoginFormProps {
  isGoogleLoginEnabled: boolean;
}

export default function LoginForm({ isGoogleLoginEnabled }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      if (!email.trim() || !password.trim()) {
        return;
      }

      void signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: false,
      });
    },
    [email, password]
  );

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  return (
    <div className="space-y-6">
      {isGoogleLoginEnabled && (
        <div className="space-y-2">
          <GoogleAuthButton context="login" className="mx-auto" />
          <div className="text-center text-sm text-gray-600">or Sign in with Email</div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
        <div className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={onEmailChange}
          />
          <Input
            type={showPassword ? "text" : "password"}
            id="password "
            name="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
          />
          <div className="flex space-x-4">
            <Checkbox
              field="show-password"
              checked={showPassword}
              onChange={(checked) => setShowPassword(checked)}
              className="w-fit">
              Show Password
            </Checkbox>
            <Checkbox
              field="remember-me"
              checked={rememberMe}
              onChange={(checked) => setRememberMe(checked)}
              className="w-fit">
              Remember me
            </Checkbox>
          </div>
        </div>
        <Button
          type="submit"
          size="lg"
          className="self-end"
          onClick={() => void signIn("email_password", { email, password })}>
          Login
        </Button>
        <Link href="/forgot-password" className="self-end hover:underline">
          Forgot password
        </Link>
      </form>
    </div>
  );
}
