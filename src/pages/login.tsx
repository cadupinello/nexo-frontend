import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Lock, Mail, User, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";
import { Button } from "../shared/components/ui/Button";
import { Input } from "../shared/components/ui/Input";
import { loginSchema, signUpSchema, type SignUpFormValues } from "../shared/schemas/auth-schemas";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { data: session } = authClient.useSession();
  const [isSignUp, setIsSignUp] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : loginSchema) as any,
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  useEffect(() => {
    if (session) {
      navigate({ to: "/" });
    }
  }, [session, navigate]);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setServerError("");
    reset();
  };

  const onSubmit = async (data: any) => {
    setServerError("");

    try {
      if (isSignUp) {
        await authClient.signUp.email(
          {
            email: data.email,
            password: data.password,
            name: data.name || "",
            callbackURL: "/",
          },
          {
            onSuccess: () => {
              toast.success("Conta criada com sucesso!");
              navigate({ to: "/" });
            },
            onError: (ctx) => {
              setServerError(ctx.error.message || "Erro ao criar conta");
            },
          },
        );
      } else {
        await authClient.signIn.email(
          {
            email: data.email,
            password: data.password,
            callbackURL: "/",
          },
          {
            onSuccess: () => {
              toast.success("Bem-vindo de volta!");
              navigate({ to: "/" });
            },
            onError: (ctx) => {
              setServerError(ctx.error.message || "Credenciais inválidas");
            },
          },
        );
      }
    } catch (err: any) {
      setServerError("Erro inesperado. Tente novamente.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-bg-start overflow-hidden">
      <div className="hidden lg:flex flex-col w-1/2 bg-linear-to-br from-bg-start via-bg-end to-primary/20 relative items-center justify-center p-12 border-r border-border-ui">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.1),transparent_50%)]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 border border-primary/50 shadow-[0_0_30px_rgba(20,184,166,0.3)]">
            <Zap className="w-10 h-10 text-primary" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl font-bold text-text-primary tracking-tight mb-6">
            Nexo
          </h1>
          <p className="text-xl text-text-secondary max-w-md leading-relaxed">
            A revolução na automação de atendimentos e fluxos inteligentes para
            o seu negócio.
          </p>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-text-secondary/50 text-sm">
          <span>© 2024 Nexo platform.</span>
          <div className="flex gap-4">
            <span className="hover:text-primary cursor-pointer transition-colors">
              Termos
            </span>
            <span className="hover:text-primary cursor-pointer transition-colors">
              Privacidade
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-bg-start relative">
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">Nexo</span>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary underline decoration-primary/30 decoration-4 underline-offset-8">
              {isSignUp ? "Criar conta" : "Bem-vindo de volta"}
            </h2>
            <p className="text-text-secondary">
              {isSignUp
                ? "Preencha os dados abaixo para começar"
                : "Entre com suas credenciais para acessar o painel"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
            {serverError && (
              <div className="p-3 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm text-center animate-in fade-in zoom-in-95">
                {serverError}
              </div>
            )}

            <div className="space-y-4">
              {isSignUp && (
                <div className="space-y-1">
                  <Input
                    label="Nome Completo"
                    placeholder="Seu nome"
                    {...register("name")}
                    error={errors.name?.message}
                    className="pl-11"
                    icon={<User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary transition-colors" />}
                  />
                </div>
              )}

              <div className="space-y-1">
                <Input
                  label="Endereço de E-mail"
                  type="email"
                  placeholder="email@exemplo.com"
                  {...register("email")}
                  error={errors.email?.message}
                  className="pl-11"
                  icon={<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary transition-colors" />}
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline pr-1">
                  {!isSignUp && (
                    <button
                      type="button"
                      className="text-[10px] text-primary hover:underline ml-auto mb-1 font-bold uppercase tracking-widest"
                    >
                      Esqueceu a senha?
                    </button>
                  )}
                </div>
                <Input
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  error={errors.password?.message}
                  className="pl-11"
                  icon={<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary transition-colors" />}
                />
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full h-12 shadow-primary/20"
            >
              {isSignUp ? "Criar Conta" : "Acessar Sistema"}
              {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          </form>

          <p className="text-center text-text-secondary text-sm">
            {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <button
              onClick={toggleMode}
              className="text-primary font-bold hover:underline transition-all"
            >
              {isSignUp ? "Faça login" : "Cadastre-se grátis"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
