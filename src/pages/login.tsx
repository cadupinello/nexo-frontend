import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Loader2, Lock, Mail, User, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { data: session } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate({ to: "/" });
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        await authClient.signUp.email({
          email,
          password,
          name,
          callbackURL: "/",
        }, {
          onSuccess: () => {
            navigate({ to: "/" });
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Erro ao criar conta");
          }
        });
      } else {
        await authClient.signIn.email({
          email,
          password,
          callbackURL: "/",
        }, {
          onSuccess: () => {
            navigate({ to: "/" });
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Credenciais inválidas");
          }
        });
      }
    } catch (err: any) {
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-bg-start overflow-hidden">
      {/* Lado Esquerdo - Design/Logo */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-bg-start via-bg-end to-primary/20 relative items-center justify-center p-12 border-r border-border-ui">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.1),transparent_50%)]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 border border-primary/50 shadow-[0_0_30px_rgba(20,184,166,0.3)]">
            <Zap className="w-10 h-10 text-primary" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl font-bold text-text-primary tracking-tight mb-6">
            Nexo <span className="text-primary italic">AI</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-md leading-relaxed">
            A revolução na automação de atendimentos e fluxos inteligentes para o seu negócio.
          </p>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-text-secondary/50 text-sm">
          <span>© 2024 Nexo platform.</span>
          <div className="flex gap-4">
            <span className="hover:text-primary cursor-pointer transition-colors">Termos</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Privacidade</span>
          </div>
        </div>
      </div>

      {/* Lado Direito - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-bg-start relative">
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">Nexo</span>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary">
              {isSignUp ? "Criar conta" : "Bem-vindo de volta"}
            </h2>
            <p className="text-text-secondary">
              {isSignUp
                ? "Preencha os dados abaixo para começar"
                : "Entre com suas credenciais para acessar o painel"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary ml-1" htmlFor="name">
                    Nome Completo
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-panel border border-border-ui rounded-xl py-3 pl-11 pr-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-text-primary"
                      placeholder="Seu nome"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary ml-1" htmlFor="email">
                  Endereço de E-mail
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-panel border border-border-ui rounded-xl py-3 pl-11 pr-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-text-primary"
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-medium text-text-secondary" htmlFor="password">
                    Senha
                  </label>
                  {!isSignUp && (
                    <button type="button" className="text-xs text-primary hover:underline">
                      Esqueceu a senha?
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-panel border border-border-ui rounded-xl py-3 pl-11 pr-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-text-primary"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 shadow-lg shadow-primary/20"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Criar Conta" : "Acessar Sistema"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-text-secondary text-sm">
            {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary font-semibold hover:underline"
            >
              {isSignUp ? "Faça login" : "Cadastre-se grátis"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
