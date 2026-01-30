"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [text, setText] = useState("hola mundo");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl break-words mb-8">
          {text}
        </h1>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe algo aquí..."
          className="mx-auto max-w-sm text-center text-lg"
          aria-label="Entrada de texto"
        />
      </div>
    </main>
  );
}
