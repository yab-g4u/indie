export default function WhyDocs() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Why panel API</h1>
      <p className="mt-2 text-muted-foreground">
        The Why panel is backed by a simple API at <code>/api/why</code> that returns a narrative explanation. 
        It can be powered by the AI SDK using your model provider keys. See <code>app/api/why/route.ts</code>. 
      </p>
    </main>
  )
}
