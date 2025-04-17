export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .normalize("NFD")                     // Türkçe karakterleri bozmadan dönüştürme
    .replace(/[\u0300-\u036f]/g, "")     // aksanları temizle
    .replace(/%/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");


export const generateProductURL = (product, categories) => {
  if (!product || !categories || !Array.isArray(categories)) return "#";

  const category = categories.find((c) => c.id === product.category_id);
  if (!category) return "#";

  const gender = category.gender === "k" ? "kadin" : "erkek";
  const categorySlug = slugify(category.title);
  const productSlug = slugify(product.name);

  return `/shop/${gender}/${categorySlug}/${category.id}/${productSlug}/${product.id}`;
};
