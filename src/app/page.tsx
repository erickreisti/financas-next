// src/app/page.tsx
// Importa componente de imagem otimizada do Next.js
import Image from "next/image";

// Exporta componente da página inicial (Dashboard)
export default function Home() {
  // Retorna JSX da página
  return (
    // Div principal com classes Tailwind para layout
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Conteúdo da página inicial */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Bem-vindo ao&nbsp;
          <code className="font-mono font-bold">App de Finanças</code>
        </p>
      </div>

      {/* Título principal com ícone de dinheiro */}
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h1 className="text-4xl font-bold">💰 Minhas Finanças</h1>
      </div>

      {/* Links para páginas do app */}
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        {/* Link para Dashboard */}
        <a
          href="/dashboard"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Dashboard{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Visão geral das suas finanças.
          </p>
        </a>

        {/* Link para Transações */}
        <a
          href="/transactions"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Transações{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Gerencie todas as suas transações.
          </p>
        </a>

        {/* Link para Relatórios */}
        <a
          href="/reports"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Relatórios{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Análises e insights financeiros.
          </p>
        </a>
      </div>
    </main>
  );
}
