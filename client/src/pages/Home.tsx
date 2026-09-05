import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { addToLocalSelection, processLocalSubmission, toggleLocalSelection, type LeadKind } from "@/lib/localInteractions";
import {
  ArrowDownRight, ArrowRight, Check, ChevronLeft, ChevronRight,
  CircleUserRound, Heart, Mail, Menu, MessageCircle, PackagePlus,
  Search, ShoppingBag, SlidersHorizontal, Sparkles, X,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";


// TODO: troca estes URLs pelas tuas fotos reais quando as tiveres.
const ASSETS = {
  hero: "https://fagundez.com/media/fagundez.com/noticias/20260602102828_9.png",

  store:
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85",

  laptop:
  "https://www.notebookcheck.info/fileadmin/Notebooks/Apple/MacBook_Pro_14_2023_M3/IMG_1048.JPG",
  phoneStack:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=85",

  accessories:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",

  gaming:
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=85",

  banner:
    "https://cakecomunicacao.com.br/wp-content/uploads/2024/03/close-up-hands-working-with-tools-1.jpg",
} as const;

// TODO: troca pelas tuas 3 fotos reais do carrossel do hero.
const HERO_IMAGES = [
  { src: ASSETS.hero, alt: "Smartphones e portáteis em destaque" },
  { src: "https://ecostecnologia.com.br/cdn/shop/collections/2-Banner-inicio_eb5e0299-fcab-4533-8acb-2c1dbbb54d9f.jpg?v=1770717193", alt: "Seleção de smartphones em stock" },
  { src: ASSETS.laptop, alt: "Portátil moderno sobre secretária" },
] as const;

// TODO: troca pelo teu e-mail e redes sociais reais.
const CONTACT = {
  whatsapp: "258866521374",
  whatsappDisplay: "+258 86 652 1374",
  email: "computadorelaptops@gmail.com",
  instagram: "#",
  facebook: "#",
} as const;

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  tag?: string;
  price?: string;
  image: string;
};

const products: Product[] = [
  { id: "iphone-15", name: "iPhone 15", category: "Smartphones Apple", description: "Câmara avançada, ecrã Super Retina XDR e desempenho topo de gama.", tag: "Mais vendido", price: "85.000 Mt", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeZfQiBXvKzPoiOBCbwJ_vMTIvCVIknaDGZFc2y5DUMg&s=10" },
  { id: "galaxy-s24", name: "Samsung Galaxy S24", category: "Smartphones Android", description: "Ecrã Dynamic AMOLED, processador rápido e bateria de longa duração.", tag: "Novidade", price: "72.000 Mt", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85" },
  { id: "redmi-note", name: "Xiaomi Redmi Note", category: "Smartphones Android", description: "Boa relação qualidade-preço, ecrã grande e bateria robusta.", tag: "Custo-benefício", price: "18.000 Mt", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPvl17zdXpjLNr4PuE0NQTAj7LJ2LdFdeCLmteQMPRRA&s=10" },
  { id: "macbook-air", name: "MacBook Air M2", category: "Portáteis", description: "Leve, silencioso e potente para trabalho e criação de conteúdo.", image: "https://www.notebookcheck.info/fileadmin/Notebooks/Apple/MacBook_Pro_14_2023_M3/IMG_1048.JPG" },
  { id: "pc-gamer", name: "PC Gamer RTX", category: "Computadores", description: "Desempenho de alto nível para jogos e edição de vídeo.", tag: "Gaming", price: "95.000 Mt", image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=900&q=85" },
  { id: "fone-bluetooth", name: "Fones Bluetooth", category: "Acessórios", description: "Som de qualidade com cancelamento de ruído e bateria de longa duração.", price: "3.200 Mt", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85" },
  { id: "smartwatch", name: "Smartwatch", category: "Wearables", description: "Monitorização de saúde, notificações e autonomia para o dia todo.", tag: "Tendência", price: "6.500 Mt", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85" },
];

const phoneProducts = products.filter((product) => product.category.startsWith("Smartphones"));

const categories = [
  { name: "Smartphones", image: ASSETS.phoneStack, alt: "Seleção de smartphones" },
  { name: "Portáteis", image: ASSETS.laptop, alt: "Portátil moderno sobre secretária" },
  { name: "Computadores", image: ASSETS.gaming, alt: "PC gamer com iluminação RGB" },
  { name: "Acessórios", image: ASSETS.accessories, alt: "Fones, carregadores e acessórios" },
  { name: "Monitores", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgw6onq4E3j_saAYx-18xlDKwElKbV1CEcc5x59v001t4LyDeHzVWIzytp&s=10", alt: "Monitor de computador" },
  { name: "Wearables", image: "https://mcpress.mayoclinic.org/uploads/2024/10/LearnWearableDevicexGettyImages-1130693402.jpg", alt: "Smartwatch no pulso" },
  { name: "Assistência técnica", image: ASSETS.store, alt: "Técnico a reparar um dispositivo" },
];

const navItems = [
  ["Produtos", "#produtos"],
  ["Destaques", "#destaques"],
  ["Serviços", "#servicos"],
  ["Novidades", "#novidades"],
  ["Perguntas frequentes", "#faq"],
  ["Contactos", "#contactos"],
] as const;

const faqs = [
  ["Os produtos têm garantia?", "Sim. Os equipamentos são vendidos com garantia de acordo com o produto e as condições da loja."],
  ["Fazem entregas em Maputo?", "Sim. Fazemos entregas em Maputo e arredores. Entre em contacto para confirmar a disponibilidade e o prazo para a sua zona."],
  ["Posso pedir ajuda para escolher um computador?", "Claro. Diga-nos para que pretende usar o equipamento e o seu orçamento. A nossa equipa recomenda opções adequadas às suas necessidades."],
  ["Fazem assistência técnica?", "Sim. Prestamos serviços de diagnóstico, manutenção e reparação de smartphones e computadores."],
  ["Posso reservar um produto?", "Pode solicitar a reserva através dos nossos contactos. A disponibilidade e o período de reserva serão confirmados pela equipa."],
  ["Quais são as formas de pagamento?", "As opções de pagamento disponíveis são confirmadas no momento da compra. Fale connosco para saber as condições atuais."],
] as const;

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const photoArrowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  borderRadius: "50%",
  border: "none",
  background: "rgba(0,0,0,0.45)",
  color: "#fff",
  cursor: "pointer",
  flexShrink: 0,
};

const heroNavButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 3,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "none",
  background: "rgba(0,0,0,0.35)",
  color: "#fff",
  cursor: "pointer",
  backdropFilter: "blur(2px)",
};

const categorySideArrowStyle: React.CSSProperties = {
  position: "absolute",
  top: "calc(50% - 0.65rem)",
  transform: "translateY(-50%)",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 42,
  height: 42,
  borderRadius: "50%",
  border: "1px solid rgba(0,0,0,0.08)",
  background: "#fff",
  color: "#1c1c1c",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
};

export default function Home() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [comparison, setComparison] = useState(62);
  const [categoryView, setCategoryView] = useState<"carousel" | "grid">("grid");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [modal, setModal] = useState<"quote" | "project" | "customization" | "product" | "menu" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const categoryScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((current) => (current + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToHeroSlide = (direction: 1 | -1) => {
    setHeroIndex((current) => (current + direction + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  const getCategoryStep = () => {
    const node = categoryScrollRef.current;
    const firstCard = node?.firstElementChild as HTMLElement | null;
    if (!node || !firstCard) return 0;
    const gap = parseFloat(getComputedStyle(node).columnGap || "20") || 20;
    return firstCard.offsetWidth + gap;
  };

  const scrollToCategoryIndex = (index: number) => {
    const node = categoryScrollRef.current;
    const step = getCategoryStep();
    if (!node || !step) return;
    const clamped = Math.min(Math.max(index, 0), categories.length - 1);
    node.scrollTo({ left: clamped * step, behavior: "smooth" });
    setCategoryIndex(clamped);
  };

  const scrollCategories = (direction: 1 | -1) => {
    scrollToCategoryIndex(categoryIndex + direction);
  };

  const handleCategoryScroll = () => {
    const node = categoryScrollRef.current;
    const step = getCategoryStep();
    if (!node || !step) return;
    const index = Math.round(node.scrollLeft / step);
    setCategoryIndex(Math.min(Math.max(index, 0), categories.length - 1));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) => toggleLocalSelection(current, id));
  };

  const addToCart = (product: Product) => {
    setCart((current) => addToLocalSelection(current, product.id));
    toast.success(`${product.name} foi adicionado ao seu carrinho.`);
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModal("product");
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20produtos.`, "_blank", "noopener,noreferrer");
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>, message: string, kind: LeadKind) => {
    event.preventDefault();
    const values = Object.fromEntries(Array.from(event.currentTarget.elements)
      .filter((field) => "value" in field && Boolean(field.id))
      .map((field) => [field.id, String((field as HTMLInputElement).value)]));
    const result = processLocalSubmission(kind, values);
    if (!result.accepted) {
      toast.error(result.message);
      return;
    }
    toast.success(message);
    if (result.shouldReset) event.currentTarget.reset();
    if (result.shouldCloseModal) setModal(null);
  };

  return (
    <main className="page-shell">
      <div className="top-strip"><span>Tecnologia &amp; Acessórios</span><span>Maputo, Moçambique</span></div>
      <header className="header">
        <div className="site-container header-inner">
          <a
  href="#inicio"
  className="brand"
  aria-label="Computador E Laptop, ir para início"
>
  <span className="brand-mark" aria-hidden="true">
    <span className="letter-c">C</span>
    <span className="letter-l">L</span>
  </span>

  <span className="brand-copy">
    <span className="brand-wordmark">
      Computador E Laptop
    </span>

    <span className="brand-sub">
      COMPUTADORES &amp; TELEMÓVEIS
    </span>
  </span>
</a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([label, target]) => <a href={target} key={target}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <button className="icon-button" aria-label="Pesquisar" onClick={() => toast.info("A pesquisa de catálogo será disponibilizada em breve.")}><Search size={18} /></button>
            <button className="icon-button" aria-label="Área do cliente" onClick={() => toast.info("A área do cliente será ativada para acompanhamento de encomendas.")}><CircleUserRound size={18} /></button>
            <button className="icon-button" aria-label="Favoritos" onClick={() => toast.info(favorites.length ? `Tem ${favorites.length} produto(s) guardado(s).` : "Guarde os produtos que mais gosta.")}><Heart size={18} />{favorites.length > 0 && <span className="count-badge">{favorites.length}</span>}</button>
            <button className="icon-button" aria-label="Carrinho" onClick={() => toast.info(cart.length ? `O seu carrinho tem ${cart.length} produto(s).` : "O seu carrinho ainda está vazio.")}><ShoppingBag size={18} />{cart.length > 0 && <span className="count-badge">{cart.length}</span>}</button>
            <button className="olive-button header-cta" onClick={() => setModal("quote")}>Pedir orçamento</button>
            <button className="icon-button menu-button" aria-label="Abrir menu" onClick={() => setModal("menu")}><Menu size={20} /></button>
          </div>
        </div>
      </header>

      <section className="hero" id="inicio" style={{ position: "relative", overflow: "hidden" }}>
        {HERO_IMAGES.map((image, index) => (
          <img
            key={image.src}
            className="hero-image"
            src={image.src}
            alt={image.alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: index === heroIndex ? 1 : 0,
              transition: "opacity 0.9s ease",
              zIndex: index === heroIndex ? 1 : 0,
            }}
          />
        ))}
        <div className="hero-overlay" style={{ zIndex: 2 }} />

        <button aria-label="Foto anterior" onClick={() => goToHeroSlide(-1)} style={{ ...heroNavButtonStyle, left: "1.25rem" }}>
          <ChevronLeft size={20} />
        </button>
        <button aria-label="Foto seguinte" onClick={() => goToHeroSlide(1)} style={{ ...heroNavButtonStyle, right: "1.25rem" }}>
          <ChevronRight size={20} />
        </button>
        <div style={{ position: "absolute", bottom: "1.1rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.5rem", zIndex: 3 }}>
          {HERO_IMAGES.map((image, index) => (
            <button
              key={image.src}
              aria-label={`Ir para a foto ${index + 1}`}
              onClick={() => setHeroIndex(index)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: index === heroIndex ? "#fff" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>

        <div className="site-container hero-content" style={{ position: "relative", zIndex: 3 }}>
          <div className="hero-copy">
            <p className="kicker">Computador E Laptop</p>
            <h1>Tecnologia que acompanha o seu <em>ritmo.</em></h1>
            <p className="hero-lead">Smartphones, portáteis, computadores e acessórios com garantia, assistência técnica e os melhores preços do mercado.</p>
            <div className="hero-buttons">
              <button className="sand-button" onClick={() => scrollTo("#produtos")}>Ver produtos <ArrowDownRight size={17} /></button>
              <button className="outline-button" onClick={() => setModal("project")}>Preciso de ajuda a escolher</button>
            </div>
          </div>
          <div className="hero-side-note"><p className="hero-note">Equipamentos originais, com garantia oficial e suporte técnico especializado.</p><div className="hero-index">{String(heroIndex + 1).padStart(2, "0")} <span>/</span> {String(HERO_IMAGES.length).padStart(2, "0")}</div></div>
        </div>
        <div className="site-container trust-bar" style={{ position: "relative", zIndex: 3 }}>
          <div className="trust-item"><Check size={16} />Garantia oficial</div>
          <div className="trust-item"><Check size={16} />Entrega rápida</div>
          <div className="trust-item"><Check size={16} />Suporte técnico</div>
        </div>
      </section>

      <section className="site-container intro" id="sobre">
        <div><p className="kicker">A nossa missão</p><h2 className="section-title intro-title">Tecnologia acessível para <em>todos.</em></h2></div>
        <div className="intro-content">
          <p className="section-copy">Na Computador E Laptop, acreditamos que a tecnologia certa muda o dia a dia. Selecionamos smartphones, computadores e acessórios de qualidade, com preços justos e suporte técnico real.</p>
          <button className="text-link" onClick={() => setModal("project")}>Conheça a loja <ArrowRight size={16} /></button>
          <blockquote className="intro-quote">"A melhor tecnologia é aquela que resolve o seu problema, não a mais cara."</blockquote>
        </div>
      </section>

      <section className="site-container category-section" id="produtos">
        <div className="section-header category-section-head"><div><p className="kicker">Categorias</p><h2 className="section-title">Encontre o que <em>procura.</em></h2></div>
          <div className="category-actions">
            <button className={`view-toggle ${categoryView === "carousel" ? "active" : ""}`} onClick={() => setCategoryView("carousel")} aria-pressed={categoryView === "carousel"}>Carrossel</button>
            <button className={`view-toggle ${categoryView === "grid" ? "active" : ""}`} onClick={() => setCategoryView("grid")} aria-pressed={categoryView === "grid"}>Grade</button>
          </div>
        </div>

        {categoryView === "grid" ? (
          <div className="category-grid">
            {categories.map((category) => (
              <div
                className="category-card"
                key={category.name}
                role="link"
                tabIndex={0}
                onClick={() => scrollTo("#destaques")}
                onKeyDown={(event) => { if (event.key === "Enter") scrollTo("#destaques"); }}
                style={{ cursor: "pointer" }}
              >
                <img src={category.image} alt={category.alt} loading="lazy" />
                <div className="category-card-content">
                  <h3>{category.name}</h3>
                  <button
                    aria-label="Falar connosco no WhatsApp"
                    onClick={(event) => { event.stopPropagation(); openWhatsApp(); }}
                    style={photoArrowStyle}
                  >
                    <ArrowDownRight size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ position: "relative", padding: "0 0.25rem" }}>
            <style>{`
              .cl-cat-track{scrollbar-width:none;-ms-overflow-style:none;}
              .cl-cat-track::-webkit-scrollbar{display:none;}
              .cl-cat-arrow{transition:transform .18s ease, box-shadow .18s ease, opacity .18s ease;}
              .cl-cat-arrow:hover:not(:disabled){transform:translateY(-50%) scale(1.08);box-shadow:0 10px 24px rgba(0,0,0,0.2);}
              .cl-cat-card{transition:transform .25s ease;}
              .cl-cat-card:hover{transform:translateY(-4px);}
            `}</style>

            <div style={{ position: "relative" }}>
              <div
                ref={categoryScrollRef}
                onScroll={handleCategoryScroll}
                className="cl-cat-track"
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  padding: "0.35rem 0 1.25rem",
                }}
              >
                {categories.map((category) => (
                  <div
                    className="category-card cl-cat-card"
                    key={category.name}
                    role="link"
                    tabIndex={0}
                    onClick={() => scrollTo("#destaques")}
                    onKeyDown={(event) => { if (event.key === "Enter") scrollTo("#destaques"); }}
                    style={{
                      cursor: "pointer",
                      width: "clamp(220px, 32vw, 300px)",
                      flex: "0 0 auto",
                      scrollSnapAlign: "start",
                    }}
                  >
                    <img src={category.image} alt={category.alt} loading="lazy" style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover" }} />
                    <div className="category-card-content">
                      <h3>{category.name}</h3>
                      <button
                        aria-label="Falar connosco no WhatsApp"
                        onClick={(event) => { event.stopPropagation(); openWhatsApp(); }}
                        style={photoArrowStyle}
                      >
                        <ArrowDownRight size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                aria-label="Categoria anterior"
                className="cl-cat-arrow"
                disabled={categoryIndex === 0}
                onClick={() => scrollCategories(-1)}
                style={{ ...categorySideArrowStyle, left: "-0.9rem", opacity: categoryIndex === 0 ? 0.35 : 1, cursor: categoryIndex === 0 ? "default" : "pointer" }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Categoria seguinte"
                className="cl-cat-arrow"
                disabled={categoryIndex === categories.length - 1}
                onClick={() => scrollCategories(1)}
                style={{ ...categorySideArrowStyle, right: "-0.9rem", opacity: categoryIndex === categories.length - 1 ? 0.35 : 1, cursor: categoryIndex === categories.length - 1 ? "default" : "pointer" }}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginTop: "0.25rem" }}>
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  aria-label={`Ir para ${category.name}`}
                  onClick={() => scrollToCategoryIndex(index)}
                  style={{
                    width: index === categoryIndex ? 20 : 8,
                    height: 8,
                    borderRadius: 9999,
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    background: index === categoryIndex ? "#1c1c1c" : "rgba(0,0,0,0.2)",
                    transition: "width .25s ease, background .25s ease",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="collection" id="destaques">
        <div className="site-container">
          <div className="section-header"><div><p className="kicker">Seleção da loja</p><h2 className="section-title">Produtos em <em>destaque.</em></h2></div><p className="section-copy" style={{maxWidth: "315px", margin: 0}}>Equipamentos originais escolhidos pela qualidade e pelo custo-benefício.</p></div>
          <div className="product-grid">
            {products.map((product) => <article className="product-card" key={product.id}>
              <button className="product-image-button" onClick={() => openProduct(product)} aria-label={`Ver ${product.name}`}><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}</button>
              <button className={`fav-button ${favorites.includes(product.id) ? "active" : ""}`} aria-label={`Guardar ${product.name} nos favoritos`} onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.category} · {product.price ?? "Consultar preço"}</p></div><button onClick={() => addToCart(product)}>Adicionar</button></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="chair-spotlight" id="smartphones">
        <div className="site-container"><div className="section-header"><div><p className="kicker">Coleção de smartphones</p><h2 className="section-title">Um telemóvel para cada <em>estilo.</em></h2></div><p className="section-copy" style={{maxWidth: "320px", margin: 0}}>Modelos Apple, Samsung e Xiaomi com garantia e assistência técnica.</p></div><div className="chair-grid">{phoneProducts.map((product) => <article className="chair-card" key={product.id}><button onClick={() => openProduct(product)}><img src={product.image} alt={product.name} /></button><div><p className="kicker">{product.category}</p><h3>{product.name}</h3><span>{product.price}</span><button className="text-link" onClick={() => openProduct(product)}>Ver detalhes <ArrowRight size={15} /></button></div></article>)}</div></div>
      </section>

      <section className="feature-product">
        <div className="feature-product-media"><img src={ASSETS.laptop} alt="MacBook Air em destaque" /></div>
        <div className="feature-product-copy"><p className="kicker">Produto em destaque</p><h2>MacBook<br /><em>Air M2</em></h2><p>Leve, silencioso e potente — ideal para trabalho, estudo e criação de conteúdo.</p><div className="specs"><div><span>Processador</span><strong>Apple M2</strong></div><div><span>RAM</span><strong>8 GB</strong></div><div><span>Armazenamento</span><strong>256 GB SSD</strong></div><div><span>Preço</span><strong>125.000 Mt</strong></div></div><div className="hero-buttons"><button className="sand-button" onClick={() => addToCart(products[3])}>Adicionar ao carrinho <ShoppingBag size={16} /></button><button className="outline-button" onClick={() => setModal("quote")}>Pedir orçamento</button></div></div>
      </section>

      <section className="site-container services" id="servicos">
        <div><p className="kicker">Como podemos ajudar</p><h2 className="section-title">Serviços para a sua <em>tecnologia.</em></h2></div>
        <div className="services-grid">
          {[{icon: Sparkles, title: "Aconselhamento", text: "Ajudamos a escolher o equipamento certo para o seu orçamento e necessidade."}, {icon: SlidersHorizontal, title: "Configuração", text: "Configuramos o seu dispositivo, transferimos dados e instalamos aplicações."}, {icon: PackagePlus, title: "Entrega", text: "Entrega rápida em Maputo e arredores, com equipamento verificado."}, {icon: Check, title: "Assistência técnica", text: "Reparação e manutenção de smartphones e computadores com garantia."}].map(({icon: Icon, title, text}) => <article className="service" key={title}><span className="service-icon"><Icon size={19} /></span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="design-banner"><img src={ASSETS.banner} alt="Loja de tecnologia com produtos em exposição" /><div className="site-container design-banner-content"><p className="kicker">Assistência técnica</p><h2>O seu equipamento merece <em>cuidado.</em></h2><p>Diagnóstico, reparação e manutenção feitos por técnicos especializados, com peças de qualidade.</p><button className="sand-button" onClick={() => setModal("project")}>Pedir assistência <ArrowRight size={16} /></button></div></section>

      <section className="site-container projects" id="novidades">
        <div className="projects-head"><div><p className="kicker">Novidades</p><h2 className="section-title">O que chegou de <em>novo.</em></h2></div><p className="section-copy">Os últimos lançamentos e as melhores promoções da loja.</p></div>
        <div className="project-grid">
          {[{name: "Novo iPhone 15 disponível", kind: "Smartphones", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=85"}, {name: "PCs Gamer com desconto", kind: "Computadores", image: ASSETS.gaming}, {name: "Kits de acessórios", kind: "Acessórios", image: ASSETS.accessories}].map((item) => <article className="project-card" key={item.name}><img src={item.image} alt={item.name} style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover" }} /><div className="project-meta"><div><span>{item.kind}</span><h3>{item.name}</h3></div><button onClick={openWhatsApp} aria-label="Falar connosco no WhatsApp"><ArrowRight size={16} /></button></div></article>)}
        </div>
      </section>

      <section className="transformation">
        <div className="transformation-copy"><p className="kicker">Da loja até si</p><h2>Do stock à sua <em>mão.</em></h2><p>Deslize o controlo para ver a diferença entre o produto em stock e o cliente já a utilizá-lo.</p></div>
        <div className="comparison" style={{"--comparison": `${comparison}%`} as React.CSSProperties}><img className="comparison-before" src={ASSETS.store} alt="Produto em stock na loja" /><div className="comparison-after-wrap"><img src={ASSETS.phoneStack} alt="Cliente a utilizar o smartphone" /></div><span className="comparison-label after">Em uso</span><span className="comparison-label before">Em stock</span><span className="comparison-handle"><ChevronLeft size={13}/><ChevronRight size={13}/></span><input className="comparison-range" type="range" min="5" max="95" value={comparison} onChange={(event) => setComparison(Number(event.target.value))} aria-label="Comparar stock e utilização" /></div>
      </section>

      <section className="site-container customization">
        <div><p className="kicker">Personalização</p><h2 className="section-title">O seu equipamento. Do seu <em>jeito.</em></h2><p className="section-copy">Escolha a cor, o armazenamento e a garantia que melhor se adaptam a si. Ajudamos a configurar o equipamento certo para o seu orçamento.</p><div className="finishes"><div className="finish"><i style={{background: "#1c1c1e"}} /><span>Preto</span></div><div className="finish"><i style={{background: "#3a5a8c"}} /><span>Azul</span></div><div className="finish"><i style={{background: "#c9a86a"}} /><span>Dourado</span></div><div className="finish"><i style={{background: "#c0c0c0"}} /><span>Prateado</span></div></div><button className="olive-button" onClick={() => setModal("customization")}>Personalizar equipamento <ArrowRight size={16} /></button></div>
        <div className="customization-visual"><img src={ASSETS.phoneStack} alt="Smartphones em diferentes cores" /><div className="material-card"><span>Cores &amp; acabamentos</span><p>Escolha o modelo, a cor e a capacidade ideal para si.</p></div></div>
      </section>

      <section className="site-container lifestyle"><div><p className="kicker">No dia a dia</p><h2 className="section-title">Tecnologia feita para <em>usar.</em></h2><p className="section-copy" style={{maxWidth: "560px"}}>Mais do que vender equipamentos, ajudamos a manter-se ligado ao que importa.</p></div><div className="lifestyle-grid"><figure><img src={ASSETS.phoneStack} alt="Pessoa a utilizar smartphone" /><figcaption>Sempre ligado, onde estiver.</figcaption></figure><figure><img src={ASSETS.laptop} alt="Pessoa a trabalhar num portátil" /><figcaption>Produtividade sem limites.</figcaption></figure></div></section>

      <section className="process"><div className="site-container"><p className="kicker">Como funciona</p><h2 className="section-title">Simples, do início ao <em>fim.</em></h2><div className="process-grid">{[["01", "Diagnóstico", "Percebemos o que procura e qual o seu orçamento disponível."], ["02", "Recomendação", "Sugerimos os equipamentos mais adequados às suas necessidades."], ["03", "Configuração", "Preparamos o dispositivo, transferimos dados e instalamos o essencial."], ["04", "Entrega & Suporte", "Entregamos com garantia e continuamos disponíveis para ajudar."]].map(([number, title, text]) => <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="faq-section" id="faq">
        <div className="site-container faq-inner">
          <div className="faq-intro">
            <p className="kicker">Perguntas frequentes</p>
            <h2 className="section-title">Tudo o que precisa de <em>saber.</em></h2>
            <p className="section-copy">Encontre respostas rápidas sobre produtos, entregas, garantia e assistência técnica.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                  <span>{question}</span><span className="faq-plus">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && <p className="faq-answer">{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container contact" id="contactos">
        <div className="contact-copy"><p className="kicker">Vamos conversar</p><h2 className="section-title">Fale com a <em>Computador E Laptop.</em></h2><p>Diga-nos o que procura. A nossa equipa entra em contacto para indicar o melhor equipamento para si.</p><div className="contact-details"><div className="contact-detail"><MessageCircle size={16} /><button className="text-link" onClick={openWhatsApp}>{CONTACT.whatsappDisplay} <ArrowRight size={15} /></button></div><div className="contact-detail"><Mail size={16} /><a className="text-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email} <ArrowRight size={15} /></a></div></div><div className="social-links" aria-label="Redes sociais"><a href={CONTACT.instagram} target="_blank" rel="noreferrer"><FaInstagram size={16} /> Instagram</a><a href={CONTACT.facebook} target="_blank" rel="noreferrer"><FaFacebook size={16} /> Facebook</a></div></div>
        <form className="contact-form" onSubmit={(event) => submitForm(event, "Recebemos o seu pedido. Entraremos em contacto em breve.", "contact")}><div className="form-grid"><div className="form-field"><label htmlFor="name">Nome</label><input id="name" required placeholder="Como podemos chamar-lhe?" /></div><div className="form-field"><label htmlFor="phone">Telefone</label><input id="phone" required placeholder="O seu contacto" /></div><div className="form-field"><label htmlFor="email">E-mail</label><input id="email" type="email" required placeholder="nome@email.com" /></div><div className="form-field"><label htmlFor="type">Tipo de equipamento</label><select id="type" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Smartphone</option><option>Portátil</option><option>Computador</option><option>Acessórios</option></select></div><div className="form-field full"><label htmlFor="message">Mensagem</label><textarea id="message" required placeholder="Diga-nos o que procura e o seu orçamento aproximado." /></div></div><button className="olive-button form-submit" type="submit">Enviar pedido <ArrowRight size={16} /></button></form>
      </section>

      <section className="newsletter"><div className="site-container newsletter-grid"><div><p className="kicker">Novidades</p><h2>Fique por dentro das <em>promoções.</em></h2></div><form onSubmit={(event) => submitForm(event, "Obrigado por se juntar à nossa lista.", "newsletter")}><input id="newsletter-email" type="email" required aria-label="O seu melhor e-mail" placeholder="Digite o seu e-mail" /><button type="submit">Quero receber <ArrowRight size={16} /></button></form></div></section>

      <footer className="footer"><div className="site-container"><div className="footer-grid"><div className="footer-brand"><a href="#inicio" className="brand"><span className="brand-mark" aria-hidden="true">CL</span><span className="brand-copy"><span className="brand-wordmark">Computador E Laptop</span><span className="brand-sub">COMPUTADORES &amp; TELEMÓVEIS</span></span></a><p>Smartphones, computadores e acessórios com garantia e suporte técnico.</p></div><div className="footer-col"><h3>Produtos</h3><a href="#produtos">Smartphones</a><a href="#produtos">Portáteis</a><a href="#produtos">Computadores</a><a href="#produtos">Acessórios</a></div><div className="footer-col"><h3>Serviços</h3><a href="#servicos">Aconselhamento</a><a href="#servicos">Configuração</a><a href="#servicos">Assistência técnica</a><a href="#novidades">Novidades</a></div><div className="footer-col"><h3>Institucional</h3><a href="#sobre">Sobre nós</a><a href="#novidades">Novidades</a><a href="#contactos">Contactos</a><a href="#contactos">Privacidade</a></div><div className="footer-col"><h3>Atendimento</h3><a href="#contactos">Pedir orçamento</a><button onClick={openWhatsApp} className="text-link" style={{color: "#c7c1b3", fontSize: ".78rem", fontWeight: 400}}>{CONTACT.whatsappDisplay}</button><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><a href={CONTACT.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={CONTACT.facebook} target="_blank" rel="noreferrer">Facebook</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Computador E Laptop. Todos os direitos reservados.</span><span className="footer-social"><a href={CONTACT.instagram} target="_blank" rel="noreferrer"><FaInstagram size={12} /> Instagram</a><a href={CONTACT.facebook} target="_blank" rel="noreferrer"><FaFacebook size={12} /> Facebook</a></span></div></div></footer>

      <button className="floating-whatsapp" onClick={openWhatsApp} aria-label="Falar pelo WhatsApp"><MessageCircle size={18} /><span>Falar pelo WhatsApp</span></button>

      {modal && <div className="modal-backdrop" role="presentation" onMouseDown={() => setModal(null)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setModal(null)} aria-label="Fechar"><X size={17} /></button>
        {modal === "menu" && <><p className="kicker">Navegação</p><h2 id="modal-title">Explore a Computador E Laptop.</h2><nav style={{display: "grid", gap: "1rem", marginTop: "2rem"}}>{navItems.map(([label, target]) => <button className="text-link" style={{fontSize: "1.15rem", justifyContent: "space-between"}} onClick={() => { setModal(null); scrollTo(target); }} key={target}>{label}<ArrowRight size={18} /></button>)}</nav></>}
        {modal === "quote" && <><p className="kicker">Pedir orçamento</p><h2 id="modal-title">Vamos encontrar o equipamento certo.</h2><p>Partilhe o que procura e receberá uma orientação inicial da nossa equipa.</p><form onSubmit={(event) => submitForm(event, "O seu pedido de orçamento foi enviado.", "quote")} className="form-grid"><div className="form-field"><label htmlFor="quote-name">Nome</label><input id="quote-name" required placeholder="O seu nome" /></div><div className="form-field"><label htmlFor="quote-contact">Telefone</label><input id="quote-contact" required placeholder="O seu telefone" /></div><div className="form-field full"><label htmlFor="quote-interest">Interesse</label><select id="quote-interest" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Smartphone</option><option>Computador</option><option>Acessórios</option></select></div><button className="olive-button form-submit" type="submit">Enviar pedido <ArrowRight size={16} /></button></form></>}
        {modal === "project" && <><p className="kicker">Preciso de ajuda</p><h2 id="modal-title">Conte-nos o que procura.</h2><p>Respondemos com uma recomendação adequada às suas necessidades e orçamento.</p><form onSubmit={(event) => submitForm(event, "O seu pedido foi enviado.", "project")} className="form-grid"><div className="form-field"><label htmlFor="project-name">Nome</label><input id="project-name" required placeholder="O seu nome" /></div><div className="form-field"><label htmlFor="project-space">Uso pretendido</label><input id="project-space" required placeholder="Ex.: trabalho, jogos, estudo" /></div><div className="form-field full"><label htmlFor="project-message">O que procura?</label><textarea id="project-message" required placeholder="Partilhe o orçamento, marca preferida e para que vai usar." /></div><button className="olive-button form-submit" type="submit">Enviar pedido <ArrowRight size={16} /></button></form></>}
        {modal === "customization" && <><p className="kicker">Personalizar equipamento</p><h2 id="modal-title">Configure ao seu gosto.</h2><p>Indique as suas preferências. A equipa Computador E Laptop orienta a melhor combinação para si.</p><form onSubmit={(event) => submitForm(event, "Recebemos as suas preferências.", "customization")} className="form-grid"><div className="form-field"><label htmlFor="custom-name">Nome</label><input id="custom-name" required placeholder="O seu nome" /></div><div className="form-field"><label htmlFor="custom-phone">Telefone</label><input id="custom-phone" required placeholder="O seu telefone" /></div><div className="form-field"><label htmlFor="custom-email">E-mail</label><input id="custom-email" type="email" required placeholder="nome@email.com" /></div><div className="form-field"><label htmlFor="custom-color">Cor</label><select id="custom-color" defaultValue=""><option value="" disabled>Selecione uma cor</option><option>Preto</option><option>Azul</option><option>Dourado</option><option>Prateado</option></select></div><div className="form-field"><label htmlFor="custom-storage">Armazenamento</label><select id="custom-storage" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>64 GB</option><option>128 GB</option><option>256 GB</option><option>512 GB</option></select></div><div className="form-field"><label htmlFor="custom-ram">RAM</label><select id="custom-ram" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>4 GB</option><option>6 GB</option><option>8 GB</option><option>12 GB</option></select></div><div className="form-field"><label htmlFor="custom-warranty">Garantia</label><select id="custom-warranty" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>6 meses</option><option>12 meses</option><option>24 meses</option></select></div><div className="form-field"><label htmlFor="custom-budget">Orçamento aproximado</label><input id="custom-budget" required placeholder="Ex.: 20.000 Mt" /></div><button className="olive-button form-submit" type="submit">Enviar pedido <ArrowRight size={16} /></button></form></>}
        {modal === "product" && selectedProduct && <><p className="kicker">Produto</p><h2 id="modal-title">{selectedProduct.name}</h2><p>{selectedProduct.description}</p><div className="modal-product"><img src={selectedProduct.image} alt={selectedProduct.name} /><div><h3>{selectedProduct.category}</h3><p>Equipamento original com garantia. Fale connosco para verificar disponibilidade e preço final.</p></div></div><div className="hero-buttons"><button className="olive-button" onClick={() => { addToCart(selectedProduct); setModal(null); }}>Adicionar ao carrinho <ShoppingBag size={16} /></button><button className="sand-button" onClick={() => setModal("quote")}>Pedir orçamento</button></div></>}
      </div></div>}
    </main>
  );
}