import { useState } from "react";
import { toast } from "sonner";
import { addToLocalSelection, processLocalSubmission, toggleLocalSelection, type LeadKind } from "@/lib/localInteractions";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Facebook,
  Heart,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  PackagePlus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

const ASSETS = {
  logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/WPSzVpgNbEMKbxrQ.jpg",
  hero: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/aZcrWAKEhJrVwvCB.jpg",
  workshop: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/LVAVtRWEhjqdvNKa.jpg",
  archiveCabinet: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/iwYTwnHJaQeKmxvh.jpg",
  officeCabinet: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/OMqmgrkgbTtSVEHc.jpg",
  metalCabinet: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/lyumXJIDBASkqSbb.jpg",
  rack: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/ZNNMcyctzqDcfhsj.jpg",
  banner: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/iWJqqiVUQOFzcfHj.jpg",
};

const REAL_GALLERY = [
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/iWJqqiVUQOFzcfHj.jpg", alt: "Banner da AFFIANCE.LDA sobre design de interiores e móveis decorativos" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/WPSzVpgNbEMKbxrQ.jpg", alt: "Assinatura gráfica oficial da AFFIANCE.LDA com poltrona, luminária e estrelas" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/iwYTwnHJaQeKmxvh.jpg", alt: "Arquivador metálico preto com gavetas abertas para organização de documentos" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/aZcrWAKEhJrVwvCB.jpg", alt: "Família utilizando sofá modular cinza entregue pela AFFIANCE.LDA" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/OMqmgrkgbTtSVEHc.jpg", alt: "Armário misto de escritório com gavetas e compartimentos para documentos" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/lyumXJIDBASkqSbb.jpg", alt: "Armário metálico cinza com portas e prateleiras internas" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/LVAVtRWEhjqdvNKa.jpg", alt: "Profissional medindo um sofá durante a execução por medida em oficina" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/bBEmpCAuAwpEJkPq.jpg", alt: "Pessoa apontando para cadeiras de madeira estofadas numa publicação de carpintaria" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/TvcWqkHHMkfSvGTk.jpg", alt: "Mesa de escritório, cadeiras e armários instalados num ambiente corporativo" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/IFZhMYINnQKLRxHw.jpg", alt: "Mobiliário escolar embalado durante entrega e instalação pela AFFIANCE.LDA" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/ZdhLrRiiXCHWnwrY.jpg", alt: "Mesa de escritório em madeira com cadeira executiva e cadeiras de visitante" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/XQQQmfabLVvBrasY.jpg", alt: "Profissionais montando estrutura acolchoada de sofá numa oficina" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/TrTcXtXvRUSlafQo.jpg", alt: "Mesa de reunião, cadeiras embaladas e ferramentas durante montagem de escritório" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/sNRLpumgrhRfbhpR.jpg", alt: "Mesas de escritório, poltronas embaladas e conjunto de sofá preparado para entrega" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/UiCoohtZvTEEgkeX.jpg", alt: "Mesa de centro personalizada com tampo claro e base de madeira escura" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/CKBxLEVjlMzxKQCk.jpg", alt: "Mobiliário embalado numa viatura durante entrega para a Conservatória da Matola" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/alyLJdGRTlfhcHFl.jpg", alt: "Conjunto de mesa de escritório e cadeiras pretas preparado num ambiente de trabalho" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/YhyDOAWjDtJsBAak.jpg", alt: "Sofá e mesa de centro embalados sobrepostos a um ambiente de escritório personalizado" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/oSYDmOepkuKPtxLG.jpg", alt: "Ambiente planeado com sofá claro, mesa de centro e painel de televisão" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/oLiHTvvpSoczEVAN.jpg", alt: "Profissional de limpeza com equipamentos e produtos de limpeza num espaço de atendimento" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/CWHIRzzvfgFbLIqa.jpg", alt: "Sofá claro personalizado apresentado sobre base circular iluminada" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/rdWBkCDibiSNzttE.jpg", alt: "Sofá castanho de seis lugares com dois pufes e mesa de centro dourada" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/MihLbnWlovowaApq.jpg", alt: "Jogo de sofá em napa com sete lugares, cama e copeiro" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/ZNNMcyctzqDcfhsj.jpg", alt: "Rack preto para sala com detalhes dourados sobre fundo de madeira" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/FwEsErFnsdbInMTB.jpg", alt: "Rack branco de três gavetas para sala sobre fundo de madeira" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/hgLKcuzfQwtfRYSG.jpg", alt: "Rack branco com portas de vidro arqueado e pés dourados" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/LVwRgncdCksiXKlX.jpg", alt: "Cadeira dourada para ornamentação com assento branco" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/UQaKKHryuPtLRfIS.jpg", alt: "Cadeira azul estofada para mesa de jantar" },
  { image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/iETGJLRzelvaLrxU.jpg", alt: "Cadeira de madeira clara com assento estofado para mesa de jantar" },
] as const;

const CURATED_GALLERY = [
  REAL_GALLERY[0], REAL_GALLERY[2], REAL_GALLERY[3], REAL_GALLERY[4], REAL_GALLERY[5], REAL_GALLERY[6], REAL_GALLERY[23], REAL_GALLERY[1],
] as const;

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
  { id: "arquivador-metalico", name: "Arquivador Metálico", category: "Organização corporativa", description: "Solução de arquivo em metal, eficiente e durável para o seu escritório.", tag: "Disponível", image: ASSETS.archiveCabinet },
  { id: "rack-sala", name: "Rack para sala", category: "Sala de estar", description: "Rack preto com detalhes dourados para uma composição de sala elegante.", tag: "Em destaque", image: ASSETS.rack },
  { id: "sofa-modular", name: "Sofá modular", category: "Sofás", description: "Solução confortável produzida para acompanhar a rotina da sua família.", image: ASSETS.hero },
  { id: "armario-misto", name: "Armário misto", category: "Mobiliário corporativo", description: "Organização segura para documentos e materiais de trabalho.", image: ASSETS.officeCabinet },
  { id: "cadeira-dourada", name: "Cadeira dourada", category: "Ornamentação", description: "Cadeira de acabamento dourado e assento branco para eventos e decoração.", tag: "Eventos", price: "2.100 Mt", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/LVwRgncdCksiXKlX.jpg" },
  { id: "cadeira-azul", name: "Cadeira azul", category: "Sala de jantar", description: "Cadeira estofada azul para compor mesas de jantar com personalidade.", tag: "Jantar", price: "6.500 Mt", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/UQaKKHryuPtLRfIS.jpg" },
  { id: "cadeira-madeira", name: "Cadeira em madeira", category: "Sala de jantar", description: "Cadeira de madeira clara com assento estofado para mesas de jantar.", tag: "Jantar", price: "3.500 Mt", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/iETGJLRzelvaLrxU.jpg" },
];

const chairProducts = products.filter((product) => product.id.startsWith("cadeira-"));

const categories = [
  { name: "Sofás", image: ASSETS.hero, alt: "Família utilizando sofá modular cinza entregue pela AFFIANCE.LDA" },
  { name: "Racks", image: ASSETS.rack, alt: "Rack preto para sala com detalhes dourados" },
  { name: "Cadeiras", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663917528241/UQaKKHryuPtLRfIS.jpg", alt: "Cadeira azul estofada para mesa de jantar" },
  { name: "Arquivadores", image: ASSETS.archiveCabinet, alt: "Arquivador metálico preto para organização de documentos" },
  { name: "Armários", image: ASSETS.metalCabinet, alt: "Armário metálico cinza com portas e prateleiras" },
  { name: "Por medida", image: ASSETS.workshop, alt: "Profissional medindo um sofá durante a execução por medida" },
  { name: "Interiores", image: ASSETS.banner, alt: "Banner sobre design de interiores e móveis decorativos da AFFIANCE.LDA" },
];

const navItems = [
  ["Mobiliário", "#mobiliario"],
  ["Interiores", "#interiores"],
  ["Projetos", "#projetos"],
  ["Serviços", "#servicos"],
  ["Contactos", "#contactos"],
] as const;

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [comparison, setComparison] = useState(62);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [modal, setModal] = useState<"quote" | "project" | "customization" | "product" | "menu" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const toggleFavorite = (id: string) => {
    setFavorites((current) => toggleLocalSelection(current, id));
  };

  const addToCart = (product: Product) => {
    setCart((current) => addToLocalSelection(current, product.id));
    toast.success(`${product.name} foi adicionado à sua seleção.`);
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModal("product");
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/258868327539?text=Olá%20AFFIANCE.LDA%2C%20gostaria%20de%20falar%20sobre%20um%20projeto.", "_blank", "noopener,noreferrer");
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
      <div className="top-strip"><span>Design de interiores &amp; mobiliário</span><span>Maputo, Moçambique</span></div>
      <header className="header">
        <div className="site-container header-inner">
          <a href="#inicio" className="brand" aria-label="AFFIANCE.LDA, ir para início">
            <span className="brand-mark" aria-hidden="true"><img src={ASSETS.logo} alt="" /></span><span className="brand-copy"><span className="brand-wordmark">AFFIANCE.LDA</span><span className="brand-sub">DESIGN DE INTERIOR &amp; LIMPEZA</span></span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map(([label, target]) => <a href={target} key={target}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <button className="icon-button" aria-label="Pesquisar" onClick={() => toast.info("A pesquisa de catálogo será disponibilizada com o catálogo final da marca.")}><Search size={18} /></button>
            <button className="icon-button" aria-label="Área do cliente" onClick={() => toast.info("A área do cliente será ativada para acompanhamentos de encomendas.")}><CircleUserRound size={18} /></button>
            <button className="icon-button" aria-label="Favoritos" onClick={() => toast.info(favorites.length ? `Tem ${favorites.length} peça(s) guardada(s).` : "Guarde as peças que mais lhe inspiram.")}><Heart size={18} />{favorites.length > 0 && <span className="count-badge">{favorites.length}</span>}</button>
            <button className="icon-button" aria-label="Seleção" onClick={() => toast.info(cart.length ? `A sua seleção tem ${cart.length} peça(s).` : "A sua seleção ainda está vazia.")}><ShoppingBag size={18} />{cart.length > 0 && <span className="count-badge">{cart.length}</span>}</button>
            <button className="olive-button header-cta" onClick={() => setModal("quote")}>Solicitar orçamento</button>
            <button className="icon-button menu-button" aria-label="Abrir menu" onClick={() => setModal("menu")}><Menu size={20} /></button>
          </div>
        </div>
      </header>

      <section className="hero" id="inicio">
        <img className="hero-image" src={ASSETS.hero} alt="Sala de estar contemporânea com mobiliário premium" />
        <div className="hero-overlay" />
        <div className="site-container hero-content">
          <div className="hero-copy">
            <p className="kicker">AFFIANCE.LDA / 01</p>
            <h1>Transformamos espaços em <em>experiências.</em></h1>
            <p className="hero-lead">Design de interiores, mobiliário e soluções personalizadas para criar ambientes que refletem a sua identidade.</p>
            <div className="hero-buttons">
              <button className="sand-button" onClick={() => scrollTo("#mobiliario")}>Conhecer o mobiliário <ArrowDownRight size={17} /></button>
              <button className="outline-button" onClick={() => setModal("project")}>Solicitar projeto</button>
            </div>
          </div>
          <div className="hero-side-note"><p className="hero-note">Espaços desenhados com atenção à matéria, à luz e à forma como cada ambiente é vivido.</p><div className="hero-index">01 <span>/</span> 05</div></div>
        </div>
        <div className="site-container trust-bar">
          <div className="trust-item"><Check size={16} />Design personalizado</div>
          <div className="trust-item"><Check size={16} />Mobiliário de qualidade</div>
          <div className="trust-item"><Check size={16} />Soluções por ambiente</div>
        </div>
      </section>

      <section className="site-container intro" id="interiores">
        <div><p className="kicker">A nossa assinatura</p><h2 className="section-title intro-title">O design que transforma o seu <em>espaço.</em></h2></div>
        <div className="intro-content">
          <p className="section-copy">Na AFFIANCE.LDA, cada espaço tem uma identidade própria. Criamos ambientes que combinam estética, funcionalidade e personalidade, com soluções de interiores e mobiliário pensadas em torno de quem os vive.</p>
          <button className="text-link" onClick={() => setModal("project")}>Conheça a Affiance <ArrowRight size={16} /></button>
          <blockquote className="intro-quote">“O bom design não ocupa o espaço. Revela o que ele pode ser.”</blockquote>
        </div>
      </section>

      <section className="site-container category-section" id="mobiliario">
        <div className="section-header"><div><p className="kicker">Coleções selecionadas</p><h2 className="section-title">Encontre o que combina com o seu <em>espaço.</em></h2></div><button className="text-link" onClick={() => toast.info("As coleções podem ser exploradas durante a consultoria AFFIANCE.")}>Ver todas as coleções <ArrowRight size={16} /></button></div>
        <div className="category-grid">
          {categories.map((category) => <a href="#pecas" className="category-card" key={category.name}><img src={category.image} alt={category.alt} /><div className="category-card-content"><h3>{category.name}</h3><span><ArrowDownRight size={17} /></span></div></a>)}
        </div>
      </section>

      <section className="collection" id="pecas">
        <div className="site-container">
          <div className="section-header"><div><p className="kicker">Seleção Affiance</p><h2 className="section-title">Peças que transformam <em>ambientes.</em></h2></div><p className="section-copy" style={{maxWidth: "315px", margin: 0}}>Mobiliário com presença, proporção e acabamento escolhidos para durar.</p></div>
          <div className="product-grid">
            {products.map((product) => <article className="product-card" key={product.id}>
              <button className="product-image-button" onClick={() => openProduct(product)} aria-label={`Ver ${product.name}`}><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}</button>
              <button className={`fav-button ${favorites.includes(product.id) ? "active" : ""}`} aria-label={`Guardar ${product.name} nos favoritos`} onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.category} · {product.price ?? "Personalizável"}</p></div><button onClick={() => addToCart(product)}>Adicionar</button></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="chair-spotlight" id="cadeiras">
        <div className="site-container"><div className="section-header"><div><p className="kicker">Coleção de cadeiras</p><h2 className="section-title">Uma cadeira para cada <em>ocasião.</em></h2></div><p className="section-copy" style={{maxWidth: "320px", margin: 0}}>Cadeiras reais da AFFIANCE.LDA para ornamentação, mesas de jantar e ambientes que pedem presença.</p></div><div className="chair-grid">{chairProducts.map((product) => <article className="chair-card" key={product.id}><button onClick={() => openProduct(product)}><img src={product.image} alt={product.name} /></button><div><p className="kicker">{product.category}</p><h3>{product.name}</h3><span>{product.price}</span><button className="text-link" onClick={() => openProduct(product)}>Ver detalhes <ArrowRight size={15} /></button></div></article>)}</div></div>
      </section>

      <section className="feature-product">
        <div className="feature-product-media"><img src={ASSETS.rack} alt="Rack preto para sala com detalhes dourados" /></div>
        <div className="feature-product-copy"><p className="kicker">Peça em destaque</p><h2>Rack<br /><em>para sala</em></h2><p>Uma peça preta com detalhes dourados, criada para dar presença e organização à sua sala de estar.</p><div className="specs"><div><span>Acabamento</span><strong>Preto com detalhes dourados</strong></div><div><span>Indicado para</span><strong>Sala de estar</strong></div><div><span>Preço informado</span><strong>12.000 Mt</strong></div><div><span>Disponibilidade</span><strong>Consulte a equipa</strong></div></div><div className="hero-buttons"><button className="sand-button" onClick={() => addToCart(products[1])}>Adicionar à seleção <ShoppingBag size={16} /></button><button className="outline-button" onClick={() => setModal("quote")}>Solicitar orçamento</button></div></div>
      </section>

      <section className="site-container services" id="servicos">
        <div><p className="kicker">Como podemos ajudar</p><h2 className="section-title">Soluções para transformar o seu <em>ambiente.</em></h2></div>
        <div className="services-grid">
          {[{icon: Sparkles, title: "Design de Interiores", text: "Projetos personalizados para ambientes bonitos, funcionais e sofisticados."}, {icon: SlidersHorizontal, title: "Consultoria", text: "Orientação profissional para cores, móveis, materiais e elementos decorativos."}, {icon: PackagePlus, title: "Mobiliário", text: "Peças selecionadas e propostas à medida para diferentes estilos de vida."}, {icon: Check, title: "Limpeza", text: "Serviços profissionais para conservar os seus espaços sempre impecáveis."}].map(({icon: Icon, title, text}) => <article className="service" key={title}><span className="service-icon"><Icon size={19} /></span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="design-banner"><img src={ASSETS.workshop} alt="Execução de sofá personalizado pela AFFIANCE.LDA" /><div className="site-container design-banner-content"><p className="kicker">Design de interiores</p><h2>O seu espaço merece <em>mais.</em></h2><p>Da ideia à execução, criamos soluções de interiores e mobiliário que respondem ao seu modo de viver.</p><button className="sand-button" onClick={() => setModal("project")}>Solicitar projeto <ArrowRight size={16} /></button></div></section>

      <section className="site-container projects" id="projetos">
        <div className="projects-head"><div><p className="kicker">Portfólio</p><h2 className="section-title">Projetos que <em>inspiram.</em></h2></div><p className="section-copy">Uma seleção de ambientes pensados com rigor de composição, materialidade e uma relação natural entre a casa e quem a habita.</p></div>
        <div className="project-grid">
          {[{name: "Sofá modular entregue", kind: "Mobiliário residencial", image: ASSETS.hero}, {name: "Produção por medida", kind: "Execução em oficina", image: ASSETS.workshop}, {name: "Organização corporativa", kind: "Mobiliário de escritório", image: ASSETS.officeCabinet}].map((project) => <article className="project-card" key={project.name}><img src={project.image} alt={project.name} /><div className="project-meta"><div><span>{project.kind}</span><h3>{project.name}</h3></div><button onClick={() => toast.info(`O projeto ${project.name} será apresentado durante a reunião de inspiração.`)} aria-label={`Ver ${project.name}`}><ArrowRight size={16} /></button></div></article>)}
        </div>
      </section>

      <section className="site-container real-gallery" aria-label="Acervo real AFFIANCE.LDA">
        <div className="section-header"><div><p className="kicker">Acervo real</p><h2 className="section-title">Mobiliário, execução e projetos da <em>Affiance.</em></h2></div><p className="section-copy" style={{maxWidth: "330px", margin: 0}}>Uma curadoria de trabalhos e publicações reais fornecidos pela própria AFFIANCE.LDA.</p></div>
        <div className="real-gallery-grid">{(showFullGallery ? REAL_GALLERY : CURATED_GALLERY).map((item, index) => <figure className="real-gallery-card" key={item.image}><img src={item.image} loading="lazy" alt={item.alt} /><figcaption>Acervo AFFIANCE.LDA <span>/{String(index + 1).padStart(2, "0")}</span></figcaption></figure>)}</div>
        <div className="real-gallery-toggle"><button className="olive-button" onClick={() => setShowFullGallery((current) => !current)}>{showFullGallery ? "Ver seleção editorial" : `Explorar todas as ${REAL_GALLERY.length} publicações`} <ArrowRight size={16} /></button></div>
      </section>

      <section className="transformation">
        <div className="transformation-copy"><p className="kicker">Do processo à entrega</p><h2>Veja a nossa <em>execução.</em></h2><p>Deslize o controlo para descobrir a passagem entre a produção por medida e uma peça pronta a ser vivida em casa.</p></div>
        <div className="comparison" style={{"--comparison": `${comparison}%`} as React.CSSProperties}><img className="comparison-before" src={ASSETS.workshop} alt="Sofá em processo de execução" /><div className="comparison-after-wrap"><img src={ASSETS.hero} alt="Sofá modular entregue e em uso" /></div><span className="comparison-label after">Entregue</span><span className="comparison-label before">Em execução</span><span className="comparison-handle"><ChevronLeft size={13}/><ChevronRight size={13}/></span><input className="comparison-range" type="range" min="5" max="95" value={comparison} onChange={(event) => setComparison(Number(event.target.value))} aria-label="Comparar processo e entrega" /></div>
      </section>

      <section className="site-container customization">
        <div><p className="kicker">Personalização</p><h2 className="section-title">O seu ambiente. O seu <em>estilo.</em></h2><p className="section-copy">Escolha os detalhes que tornam cada peça verdadeiramente sua. Trabalhamos com cores, tecidos, materiais e acabamentos para construir soluções alinhadas ao seu espaço.</p><div className="finishes"><div className="finish"><i style={{background: "#5a4432"}} /><span>Nogueira</span></div><div className="finish"><i style={{background: "#707b61"}} /><span>Oliva</span></div><div className="finish"><i style={{background: "#d2c1a4"}} /><span>Linho</span></div><div className="finish"><i style={{background: "#a9804d"}} /><span>Bronze</span></div></div><button className="olive-button" onClick={() => setModal("customization")}>Personalizar mobiliário <ArrowRight size={16} /></button></div>
        <div className="customization-visual"><img src={ASSETS.workshop} alt="Processo de medição de sofá personalizado" /><div className="material-card"><span>Matéria &amp; textura</span><p>Acabamentos que ganham carácter com o tempo.</p></div></div>
      </section>

      <section className="site-container lifestyle"><div><p className="kicker">Lifestyle</p><h2 className="section-title">Espaços feitos para <em>viver.</em></h2><p className="section-copy" style={{maxWidth: "560px"}}>Mais do que decorar, criamos ambientes para serem vividos, partilhados e lembrados.</p></div><div className="lifestyle-grid"><figure><img src={ASSETS.hero} alt="Sofá modular integrado na rotina de uma família" /><figcaption>O descanso, em boa companhia.</figcaption></figure><figure><img src={ASSETS.rack} alt="Rack preto com detalhes dourados para sala" /><figcaption>Peças que compõem a sua sala.</figcaption></figure></div></section>

      <section className="process"><div className="site-container"><p className="kicker">Método Affiance</p><h2 className="section-title">Clareza em cada passo do <em>processo.</em></h2><div className="process-grid">{[["01", "Escuta", "Começamos por compreender os seus hábitos, prioridades e referências."], ["02", "Direção", "Traduzimos a visão num conceito de interiores coerente e pessoal."], ["03", "Seleção", "Definimos peças, materiais e acabamentos com rigor de composição."], ["04", "Realização", "Acompanhamos cada decisão até ao ambiente ganhar forma."]].map(([number, title, text]) => <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="site-container contact" id="contactos">
        <div className="contact-copy"><p className="kicker">Vamos conversar</p><h2 className="section-title">Fale com a <em>Affiance.</em></h2><p>Conte-nos o que imagina. A nossa equipa entra em contacto para perceber o seu espaço e indicar o melhor ponto de partida.</p><div className="contact-details"><div className="contact-detail"><MessageCircle size={16} /><button className="text-link" onClick={openWhatsApp}>+258 86 832 7539 <ArrowRight size={15} /></button></div><div className="contact-detail"><Mail size={16} /><a className="text-link" href="mailto:affiance.lda@gmail.com">affiance.lda@gmail.com <ArrowRight size={15} /></a></div></div><div className="social-links" aria-label="Redes sociais da AFFIANCE.LDA"><a href="https://www.instagram.com/affiance.lda?igsh=eTg3MHkzZzV0d2k2" target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a><a href="https://www.facebook.com/profile.php?id=61554686570303" target="_blank" rel="noreferrer"><Facebook size={16} /> Facebook</a></div></div>
        <form className="contact-form" onSubmit={(event) => submitForm(event, "Recebemos o seu pedido. A AFFIANCE.LDA entrará em contacto em breve.", "contact")}><div className="form-grid"><div className="form-field"><label htmlFor="name">Nome</label><input id="name" required placeholder="Como podemos chamar-lhe?" /></div><div className="form-field"><label htmlFor="phone">Telefone</label><input id="phone" required placeholder="O seu contacto" /></div><div className="form-field"><label htmlFor="email">E-mail</label><input id="email" type="email" required placeholder="nome@email.com" /></div><div className="form-field"><label htmlFor="type">Tipo de projeto</label><select id="type" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Design de interiores</option><option>Mobiliário personalizado</option><option>Consultoria</option><option>Limpeza</option></select></div><div className="form-field full"><label htmlFor="message">Mensagem</label><textarea id="message" required placeholder="Partilhe um pouco sobre o seu espaço, referências e necessidades." /></div></div><button className="olive-button form-submit" type="submit">Enviar pedido <ArrowRight size={16} /></button></form>
      </section>

      <section className="newsletter"><div className="site-container newsletter-grid"><div><p className="kicker">Notas Affiance</p><h2>Inspire-se. Transforme. <em>Viva melhor.</em></h2></div><form onSubmit={(event) => submitForm(event, "Obrigado por se juntar às notas AFFIANCE.LDA.", "newsletter")}><input id="newsletter-email" type="email" required aria-label="O seu melhor e-mail" placeholder="Digite o seu melhor e-mail" /><button type="submit">Quero receber <ArrowRight size={16} /></button></form></div></section>

      <footer className="footer"><div className="site-container"><div className="footer-grid"><div className="footer-brand"><a href="#inicio" className="brand"><span className="brand-mark" aria-hidden="true"><img src={ASSETS.logo} alt="" /></span><span className="brand-copy"><span className="brand-wordmark">AFFIANCE.LDA</span><span className="brand-sub">DESIGN DE INTERIOR &amp; LIMPEZA</span></span></a><p>Design de interiores, mobiliário e limpeza para espaços que acompanham a sua vida.</p></div><div className="footer-col"><h3>Mobiliário</h3><a href="#mobiliario">Sofás</a><a href="#mobiliario">Racks</a><a href="#mobiliario">Arquivadores</a><a href="#mobiliario">Armários</a></div><div className="footer-col"><h3>Serviços</h3><a href="#servicos">Interiores</a><a href="#servicos">Consultoria</a><a href="#projetos">Projetos</a><a href="#interiores">Personalização</a></div><div className="footer-col"><h3>Institucional</h3><a href="#interiores">Sobre nós</a><a href="#projetos">Portfólio</a><a href="#contactos">Contactos</a><a href="#contactos">Privacidade</a></div><div className="footer-col"><h3>Atendimento</h3><a href="#contactos">Solicitar orçamento</a><button onClick={openWhatsApp} className="text-link" style={{color: "#c7c1b3", fontSize: ".78rem", fontWeight: 400}}>+258 86 832 7539</button><a href="mailto:affiance.lda@gmail.com">affiance.lda@gmail.com</a><a href="https://www.instagram.com/affiance.lda?igsh=eTg3MHkzZzV0d2k2" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/profile.php?id=61554686570303" target="_blank" rel="noreferrer">Facebook</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} AFFIANCE.LDA. Todos os direitos reservados.</span><span className="footer-social"><a href="https://www.instagram.com/affiance.lda?igsh=eTg3MHkzZzV0d2k2" target="_blank" rel="noreferrer"><Instagram size={12} /> Instagram</a><a href="https://www.facebook.com/profile.php?id=61554686570303" target="_blank" rel="noreferrer"><Facebook size={12} /> Facebook</a></span></div></div></footer>

      <button className="floating-whatsapp" onClick={openWhatsApp} aria-label="Falar pelo WhatsApp"><MessageCircle size={18} /><span>Falar pelo WhatsApp</span></button>

      {modal && <div className="modal-backdrop" role="presentation" onMouseDown={() => setModal(null)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setModal(null)} aria-label="Fechar"><X size={17} /></button>
        {modal === "menu" && <><p className="kicker">Navegação</p><h2 id="modal-title">Explore a AFFIANCE.</h2><nav style={{display: "grid", gap: "1rem", marginTop: "2rem"}}>{navItems.map(([label, target]) => <button className="text-link" style={{fontSize: "1.15rem", justifyContent: "space-between"}} onClick={() => { setModal(null); scrollTo(target); }} key={target}>{label}<ArrowRight size={18} /></button>)}</nav></>}
        {modal === "quote" && <><p className="kicker">Solicitar orçamento</p><h2 id="modal-title">Vamos desenhar a sua próxima escolha.</h2><p>Partilhe o que procura e receberá uma orientação inicial da equipa AFFIANCE.LDA.</p><form onSubmit={(event) => submitForm(event, "O seu pedido de orçamento foi enviado.", "quote")} className="form-grid"><div className="form-field"><label htmlFor="quote-name">Nome</label><input id="quote-name" required placeholder="O seu nome" /></div><div className="form-field"><label htmlFor="quote-contact">Telefone</label><input id="quote-contact" required placeholder="O seu telefone" /></div><div className="form-field full"><label htmlFor="quote-interest">Interesse</label><select id="quote-interest" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Mobiliário</option><option>Projeto de interiores</option><option>Peça personalizada</option></select></div><button className="olive-button form-submit" type="submit">Enviar pedido <ArrowRight size={16} /></button></form></>}
        {modal === "project" && <><p className="kicker">Iniciar projeto</p><h2 id="modal-title">Conte-nos como deseja viver o seu espaço.</h2><p>Respondemos com os próximos passos para uma conversa de descoberta e um projeto orientado às suas necessidades.</p><form onSubmit={(event) => submitForm(event, "O seu pedido de projeto foi enviado.", "project")} className="form-grid"><div className="form-field"><label htmlFor="project-name">Nome</label><input id="project-name" required placeholder="O seu nome" /></div><div className="form-field"><label htmlFor="project-space">Ambiente</label><input id="project-space" required placeholder="Ex.: sala, quarto, escritório" /></div><div className="form-field full"><label htmlFor="project-message">O que imagina?</label><textarea id="project-message" required placeholder="Partilhe referências, necessidades e o contexto do espaço." /></div><button className="olive-button form-submit" type="submit">Solicitar projeto <ArrowRight size={16} /></button></form></>}
        {modal === "customization" && <><p className="kicker">Mobiliário por medida</p><h2 id="modal-title">Crie uma peça com a sua assinatura.</h2><p>Indique as suas preferências. A equipa AFFIANCE.LDA orienta a combinação de materiais e acabamentos para o seu ambiente.</p><form onSubmit={(event) => submitForm(event, "Recebemos as suas preferências de personalização.", "customization")} className="form-grid"><div className="form-field"><label htmlFor="custom-name">Nome</label><input id="custom-name" required placeholder="O seu nome" /></div><div className="form-field"><label htmlFor="custom-phone">Telefone</label><input id="custom-phone" required placeholder="O seu telefone" /></div><div className="form-field"><label htmlFor="custom-email">E-mail</label><input id="custom-email" type="email" required placeholder="nome@email.com" /></div><div className="form-field"><label htmlFor="custom-color">Cor</label><select id="custom-color" defaultValue=""><option value="" disabled>Selecione uma cor</option><option>Castanho nogueira</option><option>Verde-oliva</option><option>Bege areia</option><option>Branco quente</option></select></div><div className="form-field"><label htmlFor="custom-fabric">Tecido</label><select id="custom-fabric" defaultValue=""><option value="" disabled>Selecione um tecido</option><option>Linho</option><option>Veludo</option><option>Algodão texturado</option><option>Couro</option></select></div><div className="form-field"><label htmlFor="custom-material">Material</label><select id="custom-material" defaultValue=""><option value="" disabled>Selecione um material</option><option>Madeira</option><option>Mármore</option><option>Metal</option><option>Vidro</option></select></div><div className="form-field"><label htmlFor="custom-finish">Acabamento</label><select id="custom-finish" defaultValue=""><option value="" disabled>Selecione um acabamento</option><option>Bronze escovado</option><option>Laca mate</option><option>Natural acetinado</option><option>Preto texturado</option></select></div><div className="form-field"><label htmlFor="custom-dimensions">Dimensões</label><input id="custom-dimensions" required placeholder="Ex.: 240 x 90 cm" /></div><button className="olive-button form-submit" type="submit">Solicitar personalização <ArrowRight size={16} /></button></form></>}
        {modal === "product" && selectedProduct && <><p className="kicker">Peça AFFIANCE</p><h2 id="modal-title">{selectedProduct.name}</h2><p>{selectedProduct.description}</p><div className="modal-product"><img src={selectedProduct.image} alt={selectedProduct.name} /><div><h3>{selectedProduct.category}</h3><p>Peça personalizável. Materiais, dimensões e acabamentos definidos em função do seu ambiente.</p></div></div><div className="hero-buttons"><button className="olive-button" onClick={() => { addToCart(selectedProduct); setModal(null); }}>Adicionar à seleção <ShoppingBag size={16} /></button><button className="sand-button" onClick={() => setModal("quote")}>Pedir orçamento</button></div></>}
      </div></div>}
    </main>
  );
}
