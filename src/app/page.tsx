import Header from "@/components/UI/Header";
import TodoComponents from "@/components/UI/Todo";

export default function Home() {
  return (
    <div className="font-kode grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen sm:py-52 sm:px-80 bg-violet-100">
      <main className="flex flex-col gap-8 row-start-2">
        <Header />
        <div className="p-16 flex flex-col items-center text-gray-900 bg-white shadow-lg">
          <TodoComponents />
        </div>
      </main>
    </div>
  );
}
