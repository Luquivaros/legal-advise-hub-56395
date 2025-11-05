import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Crown, User, Users, Building, ShieldCheck, UserCog } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
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
    
    if (!role) {
      return;
    }
    
    setIsLoading(true);
    
    const success = await login({
      email,
      password,
      role: role as UserRole,
      rememberMe
    });
    
    if (success) {
      navigate('/app/dashboard');
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

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none">
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Função</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="space-y-3" required>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((roleOption) => {
                      const IconComponent = roleOption.icon;
                      return (
                        <div key={roleOption.value} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={roleOption.value} 
                            id={roleOption.value}
                            className="text-primary"
                          />
                          <Label 
                            htmlFor={roleOption.value} 
                            className="text-sm cursor-pointer flex items-center gap-2"
                          >
                            <IconComponent className="w-4 h-4" />
                            {roleOption.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>

              {/* Remember Me and Forgot Password */}
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

              {/* Login and Register Buttons */}
              <div className="space-y-3">
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading || !email || !password || !role}
                >
                  {isLoading ? "Entrando..." : "Login"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 border-primary text-primary hover:bg-primary/5 hover:text-primary"
                >
                  Cadastrar-me
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