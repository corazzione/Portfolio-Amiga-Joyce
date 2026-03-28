// ---- Types ----

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface ProcessStep {
  id: number
  name: string
  description: string
  image: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
  avatar: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  category: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface ClientLogo {
  id: string
  name: string
  src: string
}

// ---- Data ----

export const services: Service[] = [
  {
    id: 'service-1',
    title: 'Fotografia de Retratos',
    description: 'Retratos profissionais que realçam personalidade e estilo.',
    icon: '👤',
  },
  {
    id: 'service-2',
    title: 'Marca & Lifestyle',
    description: 'Visuais autênticos que dão vida à história da sua marca.',
    icon: '✨',
  },
  {
    id: 'service-3',
    title: 'Cobertura de Eventos',
    description: 'Cobertura de alta qualidade que captura cada momento importante.',
    icon: '🎉',
  },
  {
    id: 'service-4',
    title: 'Fotografia de Produto',
    description: 'Imagens nítidas e detalhadas que fazem seus produtos se destacar.',
    icon: '📦',
  },
  {
    id: 'service-5',
    title: 'Videografia Cinematográfica',
    description: 'Vídeos envolventes criados para inspirar e conectar públicos.',
    icon: '🎬',
  },
  {
    id: 'service-6',
    title: 'Pós-Produção & Edição',
    description: 'Edição profissional que refina e eleva o seu conteúdo.',
    icon: '🎨',
  },
  {
    id: 'service-7',
    title: 'Projetos Documentais',
    description: 'Narrativas impactantes que revelam pessoas e propósitos.',
    icon: '🎞️',
  },
]

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    name: 'Descoberta',
    description: 'Entender sua visão, objetivos e história antes de ligar a câmera.',
    image: '/images/placeholder.jpg',
  },
  {
    id: 2,
    name: 'Planejamento',
    description: 'Criando uma abordagem personalizada com painéis de humor, listas de cenas e cronogramas.',
    image: '/images/placeholder.jpg',
  },
  {
    id: 3,
    name: 'Captação',
    description: 'Capturando momentos com iluminação precisa, composição e emoção em foco.',
    image: '/images/placeholder.jpg',
  },
  {
    id: 4,
    name: 'Edição',
    description: 'Gradação de cores em cada imagem para revelar a história por trás delas.',
    image: '/images/placeholder.jpg',
  },
  {
    id: 5,
    name: 'Entrega',
    description: 'Apresentando arquivos de alta qualidade em formatos prontos para todas as plataformas.',
    image: '/images/placeholder.jpg',
  },
  {
    id: 6,
    name: 'Otimização',
    description: 'Revisando resultados e refinando o fluxo de trabalho para resultados ainda melhores.',
    image: '/images/placeholder.jpg',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Danny Rose',
    role: 'Gerente de Marca, Solé Studio',
    quote: 'Visuais excepcionais que capturaram nossa marca perfeitamente.',
    rating: 5,
    avatar: '/images/placeholder.jpg',
  },
  {
    id: 'testimonial-2',
    name: 'David Nguyen',
    role: 'Diretor Criativo, FrameHaus',
    quote: 'Um processo incrivelmente fluido, resultados deslumbrantes. Verdadeiramente uma profissional.',
    rating: 5,
    avatar: '/images/placeholder.jpg',
  },
  {
    id: 'testimonial-3',
    name: 'Alisha Moore',
    role: 'Organizadora de Eventos, Moments & Co.',
    quote: 'Cada foto contou uma história. Não poderia pedir algo melhor.',
    rating: 5,
    avatar: '/images/placeholder.jpg',
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Por Trás das Lentes de um Filme de Marca',
    excerpt: 'Um olhar por dentro do processo criativo de produzir um filme de marca do início ao fim.',
    date: '2026-03-10',
    image: '/images/placeholder.jpg',
    category: 'Videografia',
  },
  {
    id: 'blog-2',
    title: 'O Poder da Luz Natural',
    excerpt: 'Como aproveitar a luz natural para criar fotografias com profundidade e emoção autêntica.',
    date: '2026-02-20',
    image: '/images/placeholder.jpg',
    category: 'Fotografia',
  },
  {
    id: 'blog-3',
    title: 'Capturando Emoção na Fotografia de Retratos',
    excerpt: 'Técnicas e abordagens para capturar retratos que revelam o verdadeiro caráter do sujeito.',
    date: '2026-01-15',
    image: '/images/placeholder.jpg',
    category: 'Retratos',
  },
]

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Que tipos de projetos você realiza?',
    answer: 'Trabalho com fotografia, videografia e direção criativa para marcas, pessoas físicas e eventos.',
  },
  {
    id: 'faq-2',
    question: 'Quanto tempo leva para receber os arquivos finais?',
    answer: 'Normalmente de 7 a 14 dias úteis após a sessão, dependendo do escopo. Opções com prazo reduzido disponíveis.',
  },
  {
    id: 'faq-3',
    question: 'Você oferece pacotes personalizados?',
    answer: 'Sim — cada projeto é orçado individualmente com base no escopo, duração e entregáveis.',
  },
  {
    id: 'faq-4',
    question: 'Você está disponível para viagens?',
    answer: 'Com certeza. Estou disponível para projetos em qualquer lugar do mundo. Os custos de deslocamento são incluídos no contrato do projeto.',
  },
]

export const clientLogos: ClientLogo[] = [
  {
    id: 'logo-theo',
    name: 'theo',
    src: '/images/logos/theo.svg',
  },
  {
    id: 'logo-amsterdam',
    name: 'Amsterdam',
    src: '/images/logos/amsterdam.svg',
  },
  {
    id: 'logo-luminous',
    name: 'luminous',
    src: '/images/logos/luminous.svg',
  },
  {
    id: 'logo-milano',
    name: 'MILANO',
    src: '/images/logos/milano.svg',
  },
]
