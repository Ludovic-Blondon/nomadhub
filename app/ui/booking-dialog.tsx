"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bargain } from "@/types";
import { cn } from "@/lib/utils";

export function BookingDialog({ bargain }: { bargain: Bargain }) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (
      !dateRange ||
      !dateRange.from ||
      !dateRange.to ||
      dateRange.from === dateRange.to
    ) {
      setError("Veuillez sélectionner une date de début et une date de fin.");

      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setError(null);
  };

  // Désactiver les dates antérieures à aujourd'hui
  const today = new Date();
  const disabledDays = { before: today };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">Réserver sur le site</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[95vh] p-4">
        <DialogHeader className="mb-2">
          <DialogTitle>
            {bargain.title} à {bargain.city}
          </DialogTitle>
          <DialogDescription>
            Selectionner un créneau pour réserver votre séjour.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
          <Calendar
            className="rounded-lg border shadow-sm w-full"
            defaultMonth={dateRange?.from || today}
            disabled={disabledDays}
            mode="range"
            numberOfMonths={2}
            selected={dateRange}
            onSelect={setDateRange}
          />
        </div>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Retour
            </Button>
          </DialogClose>
          <Button
            className="cursor-pointer flex items-center whitespace-nowrap"
            type="button"
            onClick={handleSubmit}
          >
            <span
              className={cn(
                "inline-block overflow-hidden transition-[width,margin] duration-200 ease-out",
                isLoading ? "w-4 mr-2" : "w-0 mr-0",
              )}
            >
              <Loader2Icon className="h-4 w-4 animate-spin" />
            </span>
            Réserver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
