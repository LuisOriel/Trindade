"use client";

import { type CSSProperties, type MouseEvent, useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  ChevronRight,
  Database,
  GitBranch,
  Mail,
  MessageCircle,
  Workflow,
} from "lucide-react";

const solutions = [
  {
    icon: BarChart3,
    title: "Dashboards",
    text: "Transforme dados dispersos em indicadores claros para acompanhar o negócio e tomar decisões com mais segurança.",
    items: ["Indicadores comerciais", "Metas e desempenho", "Relatórios gerenciais"],
  },
  {
    icon: Database,
    title: "CRMs",
    text: "Centralize clientes, leads e oportunidades e tenha mais controle sobre todo o processo comercial.",
    items: ["Gestão de clientes", "Pipeline de vendas", "Follow-ups"],
  },
  {
    icon: Workflow,
    title: "Automação de processos",
    text: "Reduza tarefas repetitivas e automatize fluxos para tornar a operação mais eficiente.",
    items: ["Fluxos automáticos", "Integração de dados", "Notificações"],
  },
];

const steps = [
  ["01", "Entendimento", "Conhecemos o negócio, o processo atual e o problema que precisa ser resolvido."],
  ["02", "Planejamento", "Definimos escopo, prioridades e a solução adequada para a realidade da empresa."],
  ["03", "Desenvolvimento", "Construímos de forma incremental, mantendo você informado durante o projeto."],
  ["04", "Implantação", "Colocamos a solução em funcionamento e orientamos sua utilização."],
  ["05", "Acompanhamento", "O projeto não termina na entrega: seguimos com suporte e evolução."],
];

const navigation = [
  ["Soluções", "#solucoes"],
  ["Processo", "#processo"],
  ["Projetos", "#projetos"],
  ["Sobre", "#sobre"],
  ["Contato", "#contato"],
] as const;

const sections = navigation.map(([, href]) => href.slice(1));

function Logo() {
  return (
    <a href="#inicio" className="font-display text-[15px] font-extrabold tracking-[-0.03em]">
      LUÍS<span className="text-electric-500">.</span>TRINDADE
    </a>
  );
}

export function Site() {
  const [activeSection, setActiveSection] = useState<string>("solucoes");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavTransitioning, setIsNavTransitioning] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleNavTransition = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();

    setIsNavTransitioning(true);

    window.setTimeout(() => {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 90);

    window.setTimeout(() => {
      setIsNavTransitioning(false);
    }, 520);
  };

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observedSections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    observedSections.forEach((section) => sectionObserver.observe(section));

    let scrollBlurTimer: number | undefined;
    const updateProgress = () => {
      const root = document.documentElement;
      const maxScroll = root.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));

      setIsScrolling(true);
      window.clearTimeout(scrollBlurTimer);
      scrollBlurTimer = window.setTimeout(() => setIsScrolling(false), 170);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.clearTimeout(scrollBlurTimer);
    };
  }, []);

  return (
    <main id="inicio" className={`relative overflow-hidden ${isScrolling ? "is-scrolling" : ""}`}>
      <div
        aria-hidden="true"
        className="scroll-progress fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-electric-500"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <div
        aria-hidden="true"
        className={`scroll-blur-transition fixed inset-0 z-40 pointer-events-none ${isScrolling ? "is-active" : ""}`}
      />
      <div
        aria-hidden="true"
        className={`nav-blur-transition fixed inset-0 z-[60] pointer-events-none ${isNavTransitioning ? "is-active" : ""}`}
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-navy-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Navegação principal">
            {navigation.map(([label, href]) => {
              const id = href.slice(1);
              const isActive = activeSection === id;

              return (
                <a
                  key={href}
                  href={href}
                  onClick={id === "solucoes" || id === "projetos" || id === "contato" ? handleNavTransition(href) : undefined}
                  className={`nav-link relative py-3 transition-colors ${isActive ? "text-surface" : "text-muted hover:text-surface"}`}
                  aria-current={isActive ? "location" : undefined}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-1 -bottom-px h-px origin-center bg-electric-500 transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0"}`}
                  />
                </a>
              );
            })}
          </nav>
          <a
            href="https://linktr.ee/luistrindade.co"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-electric-500 px-4 text-sm font-semibold text-white transition duration-300 hover:bg-electric-300 hover:shadow-[0_0_28px_rgba(22,119,255,0.22)]"
          >
            Entre em contato conosco <ArrowUpRight size={15} />
          </a>
        </div>
      </header>

      <section className="relative grid-bg scroll-mt-24 pt-36 lg:pt-44" aria-labelledby="hero-title">
        <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-16 px-6 pb-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-24">
          <div className="reveal reveal-left">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-electric-300">
              <span className="h-px w-8 bg-electric-500" /> Engenharia de Software & Soluções Digitais
            </div>
            <h1 id="hero-title" className="max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[78px]">
              Simplificando o que parece <span className="text-electric-500">complicado.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              Desenvolvimento de <strong className="font-semibold text-surface">dashboards, CRMs e automações de processos</strong> para pequenas e médias empresas.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#solucoes" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-electric-500 px-6 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-electric-300 hover:shadow-[0_10px_30px_rgba(22,119,255,0.2)]">
                Conhecer soluções <ChevronRight size={17} />
              </a>
              <a href="#contato" className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-bold text-surface transition duration-300 hover:-translate-y-0.5 hover:border-electric-500 hover:text-electric-300">
                Solicitar diagnóstico
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-[0.15em] text-muted">
              <span>Dashboards</span><span>CRMs</span><span>Automação</span>
            </div>
          </div>

          <div className="reveal reveal-right relative mx-auto w-full max-w-xl lg:justify-self-end">
            <div className="absolute -inset-12 rounded-full bg-electric-500/10 blur-3xl" />
            <div className="tech-panel float-slow glow relative overflow-hidden rounded-3xl border border-border p-5 sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div><p className="text-xs text-muted">Dashboard comercial</p><p className="mt-1 font-display text-lg font-bold">Visão geral</p></div>
                <div className="rounded-full border border-border px-3 py-1 text-[11px] text-muted">Atualizado agora</div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Metric label="Faturamento" value="R$ 84,2k" delta="+18,4%" />
                <Metric label="Conversão" value="31,8%" delta="+6,2%" />
                <Metric label="Pipeline" value="R$ 192k" delta="+12,7%" />
              </div>
              <div className="dashboard-grid mt-3 rounded-2xl border border-border p-4">
                <div className="mb-5 flex items-center justify-between"><span className="text-xs text-muted">Desempenho comercial</span><span className="text-xs text-electric-300">Últimos 6 meses</span></div>
                <div className="flex h-40 items-end gap-2">
                  {[32, 44, 38, 62, 71, 58, 86, 73, 92, 78, 96, 88].map((h, i) => <div key={i} className="flex-1 rounded-t-sm bg-electric-500/70" style={{ height: `${h}%`, opacity: 0.45 + i * 0.04 }} />)}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border p-4"><div className="flex items-center gap-2 text-xs text-muted"><GitBranch size={14} /> Oportunidades</div><p className="mt-2 font-display text-2xl font-bold">148</p></div>
                <div className="rounded-2xl border border-border p-4"><div className="flex items-center gap-2 text-xs text-muted"><Bot size={14} /> Automação</div><p className="mt-2 font-display text-2xl font-bold">42h <span className="text-sm font-normal text-muted">/ mês</span></p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-navy-900/45 scroll-mt-24" id="problema" aria-labelledby="problema-title">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[.75fr_1.25fr] lg:px-8 lg:py-28">
          <div className="reveal reveal-left"><p className="text-xs font-bold uppercase tracking-[0.2em] text-electric-300">O problema</p><h2 id="problema-title" className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Sua empresa ainda perde tempo com processos manuais?</h2></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Problem text="Informações espalhadas em planilhas e sistemas." delay="0ms" />
            <Problem text="Dificuldade para acompanhar vendas e oportunidades." delay="70ms" />
            <Problem text="Tarefas repetitivas consumindo horas da equipe." delay="140ms" />
            <Problem text="Dados sem uma visão clara para tomada de decisão." delay="210ms" />
          </div>
        </div>
      </section>

      <section id="solucoes" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-8 lg:py-32" aria-labelledby="solucoes-title">
        <div className="reveal reveal-up max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-electric-300">Soluções</p><h2 id="solucoes-title" className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Tecnologia aplicada ao que importa.</h2><p className="mt-5 text-lg leading-8 text-muted">Começamos com três frentes para manter o foco no que gera impacto real na operação.</p></div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {solutions.map(({ icon: Icon, title, text, items }, index) => <article key={title} className="tech-panel reveal reveal-up group rounded-3xl border border-border p-7 transition duration-300 hover:-translate-y-1 hover:border-electric-500/60" style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-navy-950 text-electric-300"><Icon size={20} /></div><h3 className="mt-7 font-display text-2xl font-bold">{title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted">{text}</p><ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm text-surface">{items.map(i => <li key={i} className="flex items-center gap-2"><Check size={15} className="text-electric-500" />{i}</li>)}</ul>
          </article>)}
        </div>
      </section>

      <section id="processo" className="border-y border-border/70 bg-navy-900/45 scroll-mt-24" aria-labelledby="processo-title">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="reveal reveal-up max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-electric-300">Como trabalhamos</p><h2 id="processo-title" className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Do primeiro contato à evolução da solução.</h2></div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-5">
            {steps.map(([num, title, text], index) => <div key={num} className="reveal reveal-up bg-navy-950 p-6 lg:min-h-64" style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}><span className="text-sm font-bold text-electric-500">{num}</span><h3 className="mt-12 font-display text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section id="projetos" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-8 lg:py-32" aria-labelledby="projetos-title">
        <div className="reveal reveal-up flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-electric-300">Projetos</p><h2 id="projetos-title" className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Construindo soluções reais.</h2></div><p className="max-w-sm text-sm leading-6 text-muted">Projetos próprios e, à medida que novos clientes chegam, cases reais com contexto, solução e resultados.</p></div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Project title="Sistema de Gestão Comercial" tag="CRM" text="Centralização de clientes, oportunidades, tarefas e indicadores comerciais." delay="0ms" />
          <Project title="Dashboard Comercial" tag="Dashboard" text="Visão executiva de faturamento, conversão, ticket médio e desempenho." delay="80ms" />
          <Project title="Fluxo Operacional" tag="Automação" text="Automação de tarefas e movimentação de informações entre etapas do processo." delay="160ms" />
        </div>
      </section>

      <section id="sobre" className="about-section relative isolate overflow-hidden border-y border-border/70 bg-navy-900/45 scroll-mt-24" aria-labelledby="sobre-title">
        <div className="about-orbit about-orbit-one" aria-hidden="true" />
        <div className="about-orbit about-orbit-two" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="about-grid grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
            <div className="tech-panel reveal about-panel about-panel-intro rounded-[2rem] border border-border bg-navy-950/80 p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-electric-300">Quem está por trás</p>
                <span className="about-status"><span className="about-status-dot" /> disponível para conversar</span>
              </div>
              <div className="mt-14">
                <span className="about-monogram" aria-hidden="true">LT</span>
                <h2 id="sobre-title" className="mt-7 font-display text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">Luís Trindade</h2>
                <p className="mt-4 max-w-md text-base leading-7 text-muted">Engenharia de Software &amp; Soluções Digitais</p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3">
                <Badge text="Engenharia" /><Badge text="Tecnologia" /><Badge text="Negócios" /><Badge text="PMEs" />
              </div>
            </div>

            <div className="tech-panel reveal about-panel about-panel-contact rounded-[2rem] border border-electric-500/35 bg-[radial-gradient(circle_at_top_right,rgba(22,119,255,0.18),transparent_42%),#07111F] p-7 sm:p-9" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="about-contact-kicker"><MessageCircle size={16} /> uma conversa antes do código</div>
                  <p className="mt-8 max-w-2xl text-2xl font-semibold leading-10 text-surface sm:text-3xl">
                    Tecnologia funciona melhor quando começa entendendo o seu negócio.
                  </p>
                  <p className="mt-5 max-w-xl text-base leading-7 text-muted">
                    Você pode me contar como sua operação funciona hoje, onde estão os gargalos e o que gostaria de melhorar. Eu avalio o cenário e explico, sem complicação, onde uma solução digital pode fazer sentido.
                  </p>
                </div>

                <div className="mt-12">
                  <div className="about-connection" aria-hidden="true">
                    <span className="about-connection-dot about-connection-dot-start" />
                    <span className="about-connection-line" />
                    <span className="about-connection-dot about-connection-dot-end" />
                  </div>
                  <a href="https://linktr.ee/luistrindade.co" target="_blank" rel="noreferrer" className="about-cta group mt-6 flex items-center justify-between rounded-2xl border border-border bg-navy-900/70 p-5 transition duration-500 hover:-translate-y-1 hover:border-electric-500/70 hover:bg-navy-900">
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.16em] text-electric-300">Próximo passo</span>
                      <span className="mt-2 block text-base font-semibold text-surface">Vamos conversar sobre o seu processo.</span>
                    </span>
                    <span className="about-cta-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-electric-500 text-white transition duration-500 group-hover:rotate-45 group-hover:bg-electric-300">
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 lg:px-8 lg:py-32" aria-labelledby="contato-title">
        <div className="reveal reveal-up rounded-[2rem] border border-border bg-navy-900 p-8 sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-electric-300">Contato</p><h2 id="contato-title" className="mt-4 font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">Tem um processo que poderia ser melhor?</h2><p className="mt-5 max-w-lg text-muted leading-7">Conte brevemente sobre sua necessidade. Vamos entender o problema e avaliar se uma solução digital pode ajudar.</p></div><div className="space-y-4"><a href="https://linktr.ee/luistrindade.co" target="_blank" rel="noreferrer" className="reveal reveal-right flex items-center justify-between rounded-2xl border border-electric-500/40 bg-electric-500/10 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-electric-500 hover:bg-electric-500/15 hover:shadow-[0_12px_40px_rgba(22,119,255,0.12)]"><span><span className="block text-xs text-electric-300">Contato</span><span className="mt-1 block font-semibold">Entre em contato conosco</span></span><ArrowUpRight className="text-electric-300" size={20} /></a><a href="mailto:luisoriel.trindade@hotmail.com" className="reveal reveal-right flex items-center justify-between rounded-2xl border border-border bg-navy-950 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-electric-500 hover:shadow-[0_12px_40px_rgba(22,119,255,0.08)]" style={{ "--reveal-delay": "80ms" } as CSSProperties}><span><span className="block text-xs text-muted">E-mail direto</span><span className="mt-1 block font-semibold">luisoriel.trindade@hotmail.com</span></span><Mail className="text-electric-300" size={20} /></a></div></div>
        </div>
      </section>

      <footer className="border-t border-border/70"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8"><Logo /><span>© 2026 Luís Trindade. Todos os direitos reservados. <a href="/prospects-privado.html" className="transition hover:text-electric-300">Área do proprietário</a></span></div></footer>
    </main>
  );
}

function Metric({ label, value, delta }: { label: string; value: string; delta: string }) {
  return <div className="rounded-2xl border border-border bg-navy-950 p-3"><p className="text-[10px] text-muted">{label}</p><p className="mt-2 font-display text-lg font-bold">{value}</p><p className="mt-1 text-[10px] text-electric-300">{delta}</p></div>;
}

function Problem({ text, delay }: { text: string; delay: string }) {
  return <div className="reveal reveal-up rounded-2xl border border-border bg-navy-950/60 p-5" style={{ "--reveal-delay": delay } as CSSProperties}><div className="mb-4 h-2 w-2 rounded-full bg-electric-500" /><p className="text-sm leading-6 text-surface">{text}</p></div>;
}

function Project({ title, tag, text, delay }: { title: string; tag: string; text: string; delay: string }) {
  return <article className="reveal reveal-up group overflow-hidden rounded-3xl border border-border bg-navy-900/55" style={{ "--reveal-delay": delay } as CSSProperties}><div className="aspect-[16/10] bg-navy-950 p-5"><div className="h-full rounded-2xl border border-border bg-navy-900 p-4 transition duration-300 group-hover:border-electric-500/40"><div className="flex gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-muted/40" /><i className="h-1.5 w-1.5 rounded-full bg-muted/40" /><i className="h-1.5 w-1.5 rounded-full bg-muted/40" /></div><div className="mt-5 grid grid-cols-3 gap-2"><div className="h-14 rounded-lg bg-electric-500/10" /><div className="col-span-2 h-14 rounded-lg bg-electric-500/5" /><div className="col-span-2 h-24 rounded-lg bg-electric-500/5" /><div className="h-24 rounded-lg bg-electric-500/10" /></div></div></div><div className="p-6"><span className="text-xs font-bold uppercase tracking-[0.16em] text-electric-300">{tag}</span><h3 className="mt-3 font-display text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div></article>;
}

function Badge({ text }: { text: string }) {
  return <div className="rounded-full border border-border px-3 py-2 text-center text-xs font-semibold text-muted">{text}</div>;
}
