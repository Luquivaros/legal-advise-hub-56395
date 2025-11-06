import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Crown, User, Users, Building, ShieldCheck, UserCog } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";


const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const roles: { value: UserRole; label: string; icon: any }[] = [
    { value: "consultor-juridico", label: "Consultor Jurídico", icon: ShieldCheck },
    { value: "supervisor-juridico", label: "Supervisor Jurídico", icon: UserCog },
    { value: "supervisor-comercial", label: "Supervisor Comercial", icon: Users },
    { value: "setor-administrativo", label: "Setor Administrativo", icon: Building },
    { value: "consultor-comercial", label: "Consultor Comercial", icon: User },
    { value: "gerencia", label: "Gerência", icon: Crown },
    { value: "escritorio", label: "Escritório", icon: Building },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    if (isSignup) {
      if (!role) {
        return;
      }
      
      const success = await signup(email, password, name, role as UserRole);
      
      if (success) {
        setIsSignup(false);
        setEmail("");
        setPassword("");
        setName("");
        setRole("");
      }
    } else {
      const success = await login({
        email,
        password,
        role: "" as any, // Role será obtido do backend
        rememberMe
      });
      
      if (success) {
        navigate('/app/dashboard');
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="flex-1 bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 flex flex-col justify-center items-center p-12 text-primary-foreground relative overflow-hidden">
        {/* Efeito granulado e fosco */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`
        }}></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]"></div>
        <div className="text-center max-w-md relative z-10">
          {/* Logo */}
          <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
            <img src="/lovable-uploads/12499d55-cf6f-4dc9-9521-acf51947ce7b.png" alt="Logo" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          
          <h1 className="text-5xl mb-1">Olá, seja</h1>
          <h1 className="text-5xl font-bold mb-6"><strong>Bem vindo!</strong></h1>
          <p className="text-base opacity-90 max-w-sm">
            Cada cliente é uma nova oportunidade de fazer a diferença!
          </p>
        </div>
      </div>

      {/* Right Panel - Login/Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none">
          <CardContent className="p-8 space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">
                {isSignup ? "Criar Conta" : "Entrar"}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {isSignup 
                  ? "Preencha os dados para criar sua conta" 
                  : "Entre com suas credenciais"}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field (only for signup) */}
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              {/* Role Selection (only for signup) */}
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-foreground">
                    Função
                  </Label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRole)} required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecione sua função" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((roleOption) => {
                        const IconComponent = roleOption.icon;
                        return (
                          <SelectItem key={roleOption.value} value={roleOption.value}>
                            <div className="flex items-center gap-2">
                              <IconComponent className="w-4 h-4" />
                              {roleOption.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Remember Me and Forgot Password (only for login) */}
              {!isSignup && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <Label htmlFor="remember" className="text-sm cursor-pointer">
                      Lembre-se
                    </Label>
                  </div>
                  <a 
                    href="#" 
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueci minha senha?
                  </a>
                </div>
              )}

              {/* Submit and Toggle Buttons */}
              <div className="space-y-3">
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading || !email || !password || (isSignup && (!name || !role))}
                >
                  {isLoading 
                    ? (isSignup ? "Cadastrando..." : "Entrando...") 
                    : (isSignup ? "Cadastrar" : "Login")}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 border-primary text-primary hover:bg-primary/5 hover:text-primary"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setEmail("");
                    setPassword("");
                    setName("");
                    setRole("");
                  }}
                >
                  {isSignup ? "Já tenho conta" : "Cadastrar-me"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;