import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  // Using direct fetch to the backend API
  const res = await fetch("http://localhost:8787/api/public/pages/beranda");
  
  if (!res.ok) {
    return {
      page: {
        title: "Jauhariandev",
        content: "Selamat datang di Jauhariandev."
      }
    };
  }
  
  const page = await res.json();
  return { page };
};
