import "@/styles/globals.css";

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-full overflow-hidden">
      <div className="grid h-full w-full grid-cols-12">
        <div className="col-span-12 self-center md:col-span-5 md:col-start-6 lg:col-span-3 lg:col-start-8">
          {props.children}
        </div>
      </div>
    </main>
  );
}
