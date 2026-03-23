import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const BASE_URL = "https://yzepe-imoveis.vercel.app";

Deno.serve(async (_req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const today = new Date().toISOString().split("T")[0];

    // Busca todos os imóveis
    const { data: imoveis } = await supabase
      .from("imoveis")
      .select("id, created_at_ts, status")
      .order("created_at_ts", { ascending: false });

    // Páginas estáticas
    const paginasEstaticas = [
      { loc: `${BASE_URL}/`, priority: "1.0", changefreq: "weekly" },
      { loc: `${BASE_URL}/#imoveis`, priority: "0.9", changefreq: "weekly" },
      { loc: `${BASE_URL}/#sobre`, priority: "0.7", changefreq: "monthly" },
      { loc: `${BASE_URL}/#servicos`, priority: "0.7", changefreq: "monthly" },
      { loc: `${BASE_URL}/#contato`, priority: "0.6", changefreq: "monthly" },
    ];

    const urlsEstaticas = paginasEstaticas.map((p) =>
      `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    );

    const urlsImoveis = (imoveis || []).map((i: { id: string; created_at_ts?: number; status: string }) => {
      const lastmod = i.created_at_ts
        ? new Date(i.created_at_ts).toISOString().split("T")[0]
        : today;
      const priority = i.status === "Disponível" ? "0.8" : "0.5";
      return `  <url>
    <loc>${BASE_URL}/imovel/${i.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urlsEstaticas, ...urlsImoveis].join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(`Erro ao gerar sitemap: ${error.message}`, {
      status: 500,
    });
  }
});
