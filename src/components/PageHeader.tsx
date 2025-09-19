import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const currentDate = format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { 
    locale: ptBR 
  });

  return (
    <div className="flex items-start justify-between border-b border-border bg-card/50 p-6 mb-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground font-medium">
          {subtitle}
        </p>
      </div>
      
      <div className="text-right">
        <p className="text-sm text-muted-foreground font-medium capitalize">
          {currentDate}
        </p>
      </div>
    </div>
  );
}