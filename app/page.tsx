export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6">
      <h1 className="font-switzer text-5xl font-bold tracking-tight text-dark">
        Corazon
      </h1>
      <p className="font-sans text-lg text-dark/70">
        Uma contadora de historias visual
      </p>
      <div className="flex gap-4">
        <span className="inline-block w-16 h-16 rounded-full bg-bg border-2 border-dark/10" />
        <span className="inline-block w-16 h-16 rounded-full bg-gold" />
        <span className="inline-block w-16 h-16 rounded-full bg-dark" />
      </div>
    </main>
  )
}
