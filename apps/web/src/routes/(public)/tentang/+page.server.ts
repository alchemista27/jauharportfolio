import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch("http://localhost:8787/api/public/pages/tentang");
  
  if (!res.ok) {
    return {
      page: {
        title: "Tentang Saya.",
        content: "Informasi tentang saya."
      }
    };
  }
  
  const page = await res.json();
  return { page };
};
