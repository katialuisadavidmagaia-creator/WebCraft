import { useState } from "react";
import { type LeadKind } from "../../../shared/affianceForms";
import { processLeadSubmission } from "../../../shared/affianceSubmission";
import { addUniqueToSelection, toggleSelection } from "../../../shared/affianceSelection";
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
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
  hero: "/manus-storage/8IQHGHMAT5uJ_a7d0c54f.jpg",
  olive: "/manus-storage/z1Da7Bcxumsn_91dbba89.jpg",
  dining: "/manus-storage/1w15ihp4Yj8I_533cbefe.jpg",
  diningTall: "/manus-storage/0CIpEg10u1yl_57f1a9a3.jpg",
  lounge: "/manus-storage/MOcfsACrtM37_3961b8fd.jpg",
  bright: "/manus-storage/pLCaR3esj77j_e663c247.jpg",
  chairs: "/manus-storage/Pn4zjBY2TLEN_ce9f2ea2.jpg",
};

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  tag?: string;
  image: string;
};

const products: Product[] = [
  { id: "cadeira-orla", name: "Cadeira Orla", category: "Cadeiras", description: "Linhas esculpidas e presença serena para a mesa de jantar.", tag: "Novo", image: ASSETS.chairs },
  { id: "rack-elegance", name: "Rack Elegance", category: "Sala de estar", description: "Volume minimalista pensado para valorizar o ambiente.", tag: "Em destaque", image: ASSETS.hero },
  { id: "sofa-nova", name: "Sofá Nova", category: "Sofás", description: "Conforto generoso, tecido selecionado e composição personalizável.", image: ASSETS.lounge },
  { id: "mesa-terra", name: "Mesa Terra", category: "Mesas", description: "Uma peça central para encontros que merecem tempo e atenção.", image: ASSETS.diningTall },
];

const categories = [
  { name: "Sofás", image: ASSETS.lounge },
  { name: "Racks", image: ASSETS.hero },
  { name: "Cadeiras", image: ASSETS.chairs },
  { name: "Mesas", image: ASSETS.dining },
  { name: "Salas de estar", image: ASSETS.olive },
  { name: "Decoração", image: ASSETS.bright },
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
  const [modal, setModal] = useState<"quote" | "project" | "customization" | "product" | "menu" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const toggleFavorite = (id: string) => {
    setFavorites((current) => toggleSelection(current, id));
  };

  const addToCart = (product: Product) => {
    setCart((current) => addUniqueToSelection(current, product.id));
    toast.success(`${product.name} foi adicionado à sua seleção.`);
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModal("product");
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/?text=Olá%20AFFIANCE.LDA%2C%20gostaria%20de%20falar%20sobre%20um%20projeto.", "_blank", "noopener,noreferrer");
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>, message: string, kind: LeadKind) => {
    event.preventDefault();
    const values = Object.fromEntries(Array.from(event.currentTarget.elements)
      .filter((field) => "value" in field && Boolean(field.id))
      .map((field) => [field.id, String((field as HTMLInputElement).value)]));
    const result = processLeadSubmission(kind, values);
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
            <span className="brand-wordmark">AFFIANCE.LDA</span><span className="brand-sub">INTERIORES &amp; MOBILIÁRIO</span>
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
          {categories.map((category) => <a href="#pecas" className="category-card" key={category.name}><img src={category.image} alt={`Ambiente com ${category.name.toLowerCase()}`} /><div className="category-card-content"><h3>{category.name}</h3><span><ArrowDownRight size={17} /></span></div></a>)}
        </div>
      </section>

      <section className="collection" id="pecas">
        <div className="site-container">
          <div className="section-header"><div><p className="kicker">Seleção Affiance</p><h2 className="section-title">Peças que transformam <em>ambientes.</em></h2></div><p className="section-copy" style={{maxWidth: "315px", margin: 0}}>Mobiliário com presença, proporção e acabamento escolhidos para durar.</p></div>
          <div className="product-grid">
            {products.map((product) => <article className="product-card" key={product.id}>
              <button className="product-image-button" onClick={() => openProduct(product)} aria-label={`Ver ${product.name}`}><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}</button>
              <button className={`fav-button ${favorites.includes(product.id) ? "active" : ""}`} aria-label={`Guardar ${product.name} nos favoritos`} onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.category} · Personalizável</p></div><button onClick={() => addToCart(product)}>Adicionar</button></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="feature-product">
        <div className="feature-product-media"><img src={ASSETS.hero} alt="Rack Elegance integrado numa sala sofisticada" /></div>
        <div className="feature-product-copy"><p className="kicker">Peça em destaque</p><h2>Rack<br /><em>Elegance</em></h2><p>Design que valoriza a sua sala. Uma composição de linhas contínuas, armazenamento discreto e acabamentos escolhidos para dialogar com a arquitetura.</p><div className="specs"><div><span>Materiais</span><strong>Madeira, metal e laca</strong></div><div><span>Configuração</span><strong>Medidas personalizáveis</strong></div><div><span>Acabamentos</span><strong>Seleção sob consulta</strong></div><div><span>Disponibilidade</span><strong>Por encomenda</strong></div></div><div className="hero-buttons"><button className="sand-button" onClick={() => addToCart(products[1])}>Adicionar à seleção <ShoppingBag size={16} /></button><button className="outline-button" onClick={() => setModal("quote")}>Solicitar orçamento</button></div></div>
      </section>

      <section className="site-container services" id="servicos">
        <div><p className="kicker">Como podemos ajudar</p><h2 className="section-title">Soluções para transformar o seu <em>ambiente.</em></h2></div>
        <div className="services-grid">
          {[{icon: Sparkles, title: "Design de Interiores", text: "Projetos personalizados para ambientes bonitos, funcionais e sofisticados."}, {icon: SlidersHorizontal, title: "Consultoria", text: "Orientação profissional para cores, móveis, materiais e elementos decorativos."}, {icon: PackagePlus, title: "Mobiliário", text: "Peças selecionadas e propostas à medida para diferentes estilos de vida."}, {icon: Check, title: "Limpeza", text: "Serviços profissionais para conservar os seus espaços sempre impecáveis."}].map(({icon: Icon, title, text}) => <article className="service" key={title}><span className="service-icon"><Icon size={19} /></span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="design-banner"><img src={ASSETS.olive} alt="Ambiente de interiores com parede verde-oliva" /><div className="site-container design-banner-content"><p className="kicker">Design de interiores</p><h2>O seu espaço merece <em>mais.</em></h2><p>Criamos projetos de interiores personalizados para transformar cada ambiente num lugar elegante, funcional e genuinamente seu.</p><button className="sand-button" onClick={() => setModal("project")}>Solicitar projeto <ArrowRight size={16} /></button></div></section>

      <section className="site-container projects" id="projetos">
        <div className="projects-head"><div><p className="kicker">Portfólio</p><h2 className="section-title">Projetos que <em>inspiram.</em></h2></div><p className="section-copy">Uma seleção de ambientes pensados com rigor de composição, materialidade e uma relação natural entre a casa e quem a habita.</p></div>
        <div className="project-grid">
          {[{name: "Casa Matola", kind: "Sala de estar", image: ASSETS.hero}, {name: "Residência Nacala", kind: "Sala de jantar", image: ASSETS.dining}, {name: "Estúdio Baía", kind: "Ambiente de trabalho", image: ASSETS.olive}].map((project) => <article className="project-card" key={project.name}><img src={project.image} alt={project.name} /><div className="project-meta"><div><span>{project.kind}</span><h3>{project.name}</h3></div><button onClick={() => toast.info(`O projeto ${project.name} será apresentado durante a reunião de inspiração.`)} aria-label={`Ver ${project.name}`}><ArrowRight size={16} /></button></div></article>)}
        </div>
      </section>

      <section className="transformation">
        <div className="transformation-copy"><p className="kicker">Antes &amp; depois</p><h2>Veja a <em>transformação.</em></h2><p>Deslize o controlo e compare a atmosfera de um ambiente antes e depois de uma intervenção de interiores orientada à luz, conforto e funcionalidade.</p></div>
        <div className="comparison" style={{"--comparison": `${comparison}%`} as React.CSSProperties}><img className="comparison-before" src={ASSETS.bright} alt="Ambiente antes da transformação" /><div className="comparison-after-wrap"><img src={ASSETS.olive} alt="Ambiente depois da transformação" /></div><span className="comparison-label after">Depois</span><span className="comparison-label before">Antes</span><span className="comparison-handle"><ChevronLeft size={13}/><ChevronRight size={13}/></span><input className="comparison-range" type="range" min="5" max="95" value={comparison} onChange={(event) => setComparison(Number(event.target.value))} aria-label="Comparar antes e depois" /></div>
      </section>

      <section className="site-container customization">
        <div><p className="kicker">Personalização</p><h2 className="section-title">O seu ambiente. O seu <em>estilo.</em></h2><p className="section-copy">Escolha os detalhes que tornam cada peça verdadeiramente sua. Trabalhamos com cores, tecidos, materiais e acabamentos para construir soluções alinhadas ao seu espaço.</p><div className="finishes"><div className="finish"><i style={{background: "#5a4432"}} /><span>Nogueira</span></div><div className="finish"><i style={{background: "#707b61"}} /><span>Oliva</span></div><div className="finish"><i style={{background: "#d2c1a4"}} /><span>Linho</span></div><div className="finish"><i style={{background: "#a9804d"}} /><span>Bronze</span></div></div><button className="olive-button" onClick={() => setModal("customization")}>Personalizar mobiliário <ArrowRight size={16} /></button></div>
        <div className="customization-visual"><img src={ASSETS.diningTall} alt="Detalhe de uma sala de jantar com materiais sofisticados" /><div className="material-card"><span>Matéria &amp; textura</span><p>Acabamentos que ganham carácter com o tempo.</p></div></div>
      </section>

      <section className="site-container lifestyle"><div><p className="kicker">Lifestyle</p><h2 className="section-title">Espaços feitos para <em>viver.</em></h2><p className="section-copy" style={{maxWidth: "560px"}}>Mais do que decorar, criamos ambientes para serem vividos, partilhados e lembrados.</p></div><div className="lifestyle-grid"><figure><img src={ASSETS.lounge} alt="Sala confortável pensada para momentos de pausa" /><figcaption>O descanso, em boa companhia.</figcaption></figure><figure><img src={ASSETS.diningTall} alt="Sala de jantar elegante para receber" /><figcaption>O prazer de receber.</figcaption></figure></div></section>

      <section className="process"><div className="site-container"><p className="kicker">Método Affiance</p><h2 className="section-title">Clareza em cada passo do <em>processo.</em></h2><div className="process-grid">{[["01", "Escuta", "Começamos por compreender os seus hábitos, prioridades e referências."], ["02", "Direção", "Traduzimos a visão num conceito de interiores coerente e pessoal."], ["03", "Seleção", "Definimos peças, materiais e acabamentos com rigor de composição."], ["04", "Realização", "Acompanhamos cada decisão até ao ambiente ganhar forma."]].map(([number, title, text]) => <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="site-container contact" id="contactos">
        <div className="contact-copy"><p className="kicker">Vamos conversar</p><h2 className="section-title">Fale com a <em>Affiance.</em></h2><p>Conte-nos o que imagina. A nossa equipa entra em contacto para perceber o seu espaço e indicar o melhor ponto de partida.</p><div className="contact-details"><div className="contact-detail"><MessageCircle size={16} /><button className="text-link" onClick={openWhatsApp}>Falar pelo WhatsApp <ArrowRight size={15} /></button></div><div className="contact-detail"><Mail size={16} /><span>Atendimento personalizado por marcação</span></div></div></div>
        <form className="contact-form" onSubmit={(event) => submitForm(event, "Recebemos o seu pedido. A AFFIANCE.LDA entrará em contacto em breve.", "contact")}><div className="form-grid"><div className="form-field"><label htmlFor="name">Nome</label><input id="name" required placeholder="Como podemos chamar-lhe?" /></div><div className="form-field"><label htmlFor="phone">Telefone</label><input id="phone" required placeholder="O seu contacto" /></div><div className="form-field"><label htmlFor="email">E-mail</label><input id="email" type="email" required placeholder="nome@email.com" /></div><div className="form-field"><label htmlFor="type">Tipo de projeto</label><select id="type" defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Design de interiores</option><option>Mobiliário personalizado</option><option>Consultoria</option><option>Limpeza</option></select></div><div className="form-field full"><label htmlFor="message">Mensagem</label><textarea id="message" required placeholder="Partilhe um pouco sobre o seu espaço, referências e necessidades." /></div></div><button className="olive-button form-submit" type="submit">Enviar pedido <ArrowRight size={16} /></button></form>
      </section>

      <section className="newsletter"><div className="site-container newsletter-grid"><div><p className="kicker">Notas Affiance</p><h2>Inspire-se. Transforme. <em>Viva melhor.</em></h2></div><form onSubmit={(event) => submitForm(event, "Obrigado por se juntar às notas AFFIANCE.LDA.", "newsletter")}><input id="newsletter-email" type="email" required aria-label="O seu melhor e-mail" placeholder="Digite o seu melhor e-mail" /><button type="submit">Quero receber <ArrowRight size={16} /></button></form></div></section>

      <footer className="footer"><div className="site-container"><div className="footer-grid"><div className="footer-brand"><a href="#inicio" className="brand"><span className="brand-wordmark">AFFIANCE.LDA</span><span className="brand-sub">INTERIORES &amp; MOBILIÁRIO</span></a><p>Design de interiores que transforma espaços em experiências pessoais.</p></div><div className="footer-col"><h3>Mobiliário</h3><a href="#mobiliario">Sofás</a><a href="#mobiliario">Racks</a><a href="#mobiliario">Cadeiras</a><a href="#mobiliario">Mesas</a></div><div className="footer-col"><h3>Serviços</h3><a href="#servicos">Interiores</a><a href="#servicos">Consultoria</a><a href="#projetos">Projetos</a><a href="#interiores">Personalização</a></div><div className="footer-col"><h3>Institucional</h3><a href="#interiores">Sobre nós</a><a href="#projetos">Portfólio</a><a href="#contactos">Contactos</a><a href="#contactos">Privacidade</a></div><div className="footer-col"><h3>Atendimento</h3><a href="#contactos">Solicitar orçamento</a><button onClick={openWhatsApp} className="text-link" style={{color: "#c7c1b3", fontSize: ".78rem", fontWeight: 400}}>WhatsApp</button><a href="#contactos">Falar connosco</a><a href="#contactos">Visitas por marcação</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} AFFIANCE.LDA. Todos os direitos reservados.</span><span><Instagram size={12} style={{display: "inline", verticalAlign: "middle"}} /> Instagram &nbsp; · &nbsp; Moçambique</span></div></div></footer>

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
