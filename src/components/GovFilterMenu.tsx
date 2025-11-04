import { Card } from "@/components/ui/card";

export type GovFilter = "seguro" | "contrato" | "debito-automatico" | "imoveis";

interface GovFilterMenuProps {
  activeFilter: GovFilter;
  onFilterChange: (filter: GovFilter) => void;
}

const filterOptions = [
  { key: "seguro" as GovFilter, label: "Seguro" },
  { key: "contrato" as GovFilter, label: "Contrato" },
  { key: "debito-automatico" as GovFilter, label: "Débito Automático" },
  { key: "imoveis" as GovFilter, label: "Imóveis" },
];

export function GovFilterMenu({ activeFilter, onFilterChange }: GovFilterMenuProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-2">
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => onFilterChange(option.key)}
            className={`
              relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-out
              flex-1 min-w-[140px]
              ${activeFilter === option.key 
                ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-md transform scale-[1.02]' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:shadow-md'
              }
            `}
          >
            <span className="relative z-10">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
