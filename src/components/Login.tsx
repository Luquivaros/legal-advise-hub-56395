import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, User, Users, Building, ShieldCheck, UserCog } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { useToast } from "@/components/ui/use-toast";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles: { value: UserRole; label: string; icon: any }[] = [
    { value: "consultor-juridico", label: "Consultor Jurídico", icon: ShieldCheck },
    { value: "supervisor-juridico", label: "Supervisor Jurídico", icon: UserCog },
    { value: "supervisor-comercial", label: "Supervisor Comercial", icon: Users },
    { value: "setor-administrativo", label: "Setor Administrativo", icon: Building },
    { value: "consultor-comercial", label: "Consultor Comercial", icon: User },
    { value: "gerencia", label: "Gerência", icon: Crown },
    { value: "escritorio-processual", label: "Escritório Processual", icon: Building },
    { value: "escritorio-audiencias", label: "Escritório Audiências", icon: Building },
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma função",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate('/app/dashboard');
    } else {
      toast({
        title: "Erro no login",
        description: error,
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma função",
        variant: "destructive",
      });
      return;
    }

    if (!name) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu nome",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    const { error } = await signUp(email, password, name, role as UserRole);
    
    if (error) {
      toast({
        title: "Erro no cadastro",
        description: error,
        variant: "destructive",
      });
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

      {/* Right Panel - Login/Register Forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none">
          <CardContent className="p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="nome@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Função</Label>
                    <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {roles.map((roleOption) => {
                          const IconComponent = roleOption.icon;
                          return (
                            <div key={roleOption.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={roleOption.value} id={`login-${roleOption.value}`} />
                              <Label htmlFor={`login-${roleOption.value}`} className="text-sm cursor-pointer flex items-center gap-2">
                                <IconComponent className="w-4 h-4" />
                                {roleOption.label}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </div>

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
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12"
                    disabled={isLoading || !email || !password || !role}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nome Completo</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="nome@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Função</Label>
                    <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {roles.map((roleOption) => {
                          const IconComponent = roleOption.icon;
                          return (
                            <div key={roleOption.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={roleOption.value} id={`register-${roleOption.value}`} />
                              <Label htmlFor={`register-${roleOption.value}`} className="text-sm cursor-pointer flex items-center gap-2">
                                <IconComponent className="w-4 h-4" />
                                {roleOption.label}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12"
                    disabled={isLoading || !email || !password || !name || !role}
                  >
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;