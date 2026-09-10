import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch("http://localhost:8787/api/public/pages/kontak");
  
  if (!res.ok) {
    return {
      page: {
        title: "Kontak.",
        content: "Mari bekerja sama."
      }
    };
  }
  
  const page = await res.json();
  return { page };
};
