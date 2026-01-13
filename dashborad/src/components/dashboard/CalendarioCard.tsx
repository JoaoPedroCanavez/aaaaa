import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

export function CalendarioCard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="glass rounded-2xl p-6 card-hover h-full relative overflow-hidden group">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Período</h3>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <CalendarDays className="w-4 h-4 text-primary" />
        </div>
      </div>
      
      <div className="relative z-10">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-auto py-4 px-4 justify-between text-left font-normal border-border/50 bg-muted/30 hover:bg-muted/50 hover:border-primary/50 transition-all duration-300",
                !date && "text-muted-foreground"
              )}
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Filtrar por</span>
                {date?.from ? (
                  <span className="text-base font-semibold text-foreground">
                    {date.to ? (
                      <>
                        {format(date.from, "dd MMM", { locale: ptBR })} - {format(date.to, "dd MMM", { locale: ptBR })}
                      </>
                    ) : (
                      format(date.from, "dd/MM/yyyy", { locale: ptBR })
                    )}
                  </span>
                ) : (
                  <span className="text-base font-semibold">Selecione</span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 glass-strong" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
