import Link from "next/link";

const page = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-2 text-sm font-medium text-slate-700 min-h-screen w-full">
      <span className="text-[#ff6302] font-bold text-6xl">404</span>
      <p className="text-sm">Page not found...</p>
      <Link href={"/"} className="text-[#ff6302] underline">
        Go to Home Page
      </Link>
    </section>
  );
};
export default page;
