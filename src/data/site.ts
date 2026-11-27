// All site content. Swap the mock data here; no component needs to change.
//
// MOCK DATA (everything marked `placeholder: true`, plus the following assumptions):
// - Theme: "Inteligência Artificial" is the provisional theme; title and subtitle are not decided yet.
// - E-sports: the 2025 games, reused until the 2026 list is confirmed.
// - Free entry and open to the public: true in 2025, assumed for 2026.
// - NADIC as organizer: assumed from the domain (etal.nadic.com.br).
//
// Real facts (verified): first edition in 2015; the IFRN Pau dos Ferros address and coordinates;
// the themes of 2024 and 2025.

export type Registration =
  | { status: "soon" }
  | { status: "open"; url: string }
  | { status: "closed" };

export type DayId = "qui" | "sex";

export type Day = {
  id: DayId;
  weekday: string;
  date: string;
  isoDate: string;
  summary: string;
};

export type Session = {
  day: DayId;
  start: string; // 'HH:MM'
  end: string;
  title: string;
  pause?: true;
  href?: string;
};

export type Speaker =
  | { kind: "announced"; name: string; role: string; photo: string | null } // photo: a path under public/speakers
  | { kind: "tba"; note: string };

export type Talk = {
  slug: string;
  format: "Palestra de abertura" | "Palestra" | "Mesa-redonda" | "Rodas de conversa";
  title: string;
  day: DayId;
  start: string;
  speaker: Speaker;
  placeholder: true;
};

export type CoursePeriodId = "manha" | "tarde";

export type CoursePeriod = {
  id: CoursePeriodId;
  label: string;
  day: DayId;
  start: string;
  end: string;
  pause: { start: string; end: string };
};

export type Course = {
  slug: string;
  title: string;
  detail: string | null;
  requirements: string | null;
  audience: string | null;
  content: string | null;
  author: string;
  picture: string | null;
  vagas: number | null;
  period: CoursePeriodId;
  room: string;
};

export type Game = {
  slug: string;
  name: string;
  seats: number;
  placeholder: true;
};

export type PastEdition = { year: number; label: string; note: string };

const registration: Registration = { status: "open", url: "https://suap.ifrn.edu.br/eventos/inscricao/3/10301/" };

export const site = {
  name: "ETAL 2026",
  edition: "VIII",
  fullName: "Encontro de Tecnologia do Alto Oeste Potiguar",
  url: "https://etal.nadic.com.br",
  description:
    "O VIII ETAL acontece em 3 e 4 de dezembro de 2026 no IFRN Pau dos Ferros, com palestras, minicursos e e-sports sobre inteligência artificial.",
  theme: {
    lines: ["Quem programa o futuro? Carreira em Ti na era da IA"],
    placeholder: true,
  },
  dates: {
    label: "3 e 4 de dezembro de 2026",
    short: "3–4 dez",
    weekdays: "quinta e sexta",
    start: "2026-12-03",
    end: "2026-12-04",
    // The countdown counts to the credenciamento, the first session.
    startsAt: "2026-12-03T07:00:00-03:00",
    startsLabel: "quinta, 3 de dezembro, 7h",
  },
  registration,
  entry: "Entrada gratuita e aberta ao público",
  entryShort: "entrada gratuita",
  venue: {
    name: "IFRN Campus Pau dos Ferros",
    street: "BR 405, km 154, Chico Cajá",
    city: "Pau dos Ferros",
    region: "RN",
    postalCode: "59900-000",
    coordinates: {
      lat: -6.1458,
      lng: -38.2037,
      label: "6°08′45″ S, 38°12′13″ O",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=IFRN%20Campus%20Pau%20dos%20Ferros",
  },
  app: {
    name: "ETAL Connect",
    url: "https://etal-app.nadic.com.br/",
    host: "etal-app.nadic.com.br",
  },
  organizers: ["IFRN Campus Pau dos Ferros", "NADIC"],
  credits: [
    { handle: "@ruangustavo", href: "https://www.linkedin.com/in/ruan-gustavo/", avatar: "/credit/ruangustavo.png" },
    { handle: "@kellyson71", href: "https://github.com/kellyson71", avatar: "/credit/kellyson71.jpg" },
  ],
};

// The LED strip under the hero. Decorative: every item also appears as real text elsewhere.
export const ticker = [
  "VIII ETAL",
  "3 e 4 de dezembro de 2026",
  "IFRN Campus Pau dos Ferros",
  "Inteligência Artificial",
  "Entrada gratuita",
];

export const nav = [
  { label: "Programação", href: "/#programacao" },
  { label: "Palestras", href: "/#palestras" },
  { label: "Minicursos", href: "/#minicursos" },
  { label: "E-sports", href: "/#e-sports" },
  { label: "App", href: "/#app" },
];

export const about = {
  statement:
    "O ETAL junta estudantes, professores e quem trabalha com tecnologia no Alto Oeste Potiguar para dois dias de palestras, minicursos e competição. Em 2026 o assunto é inteligência artificial: como ela funciona, onde ela erra e o que dá para construir com ela a partir de Pau dos Ferros.",
};

export const days: Day[] = [
  {
    id: "qui",
    weekday: "Quinta",
    date: "3 de dezembro",
    isoDate: "2026-12-03",
    summary: "Minicursos, competições, palestra de abertura e mesa-redonda",
  },
  {
    id: "sex",
    weekday: "Sexta",
    date: "4 de dezembro",
    isoDate: "2026-12-04",
    summary: "Mesa-redonda, palestra, rodas de conversa, finais e encerramento",
  },
];

export const schedule: Session[] = [
  { day: "qui", start: "07:00", end: "10:00", title: "Credenciamento" },
  { day: "qui", start: "07:30", end: "10:00", title: "Minicursos da manhã", href: "/#minicursos" },
  { day: "qui", start: "07:30", end: "10:00", title: "Capture the Flag" },
  { day: "qui", start: "07:30", end: "10:00", title: "Desafio de programação 1" },
  { day: "qui", start: "08:30", end: "08:50", title: "Intervalo", pause: true },
  { day: "qui", start: "10:00", end: "10:10", title: "Intervalo", pause: true },
  { day: "qui", start: "10:10", end: "10:30", title: "Apresentação cultural" },
  { day: "qui", start: "10:30", end: "12:00", title: "Palestra de abertura", href: "/#palestras" },
  { day: "qui", start: "13:00", end: "15:30", title: "Minicursos da tarde", href: "/#minicursos" },
  { day: "qui", start: "13:45", end: "15:30", title: "Competição de jogos digitais", href: "/#e-sports" },
  { day: "qui", start: "13:45", end: "15:30", title: "Desafio de programação 2" },
  { day: "qui", start: "14:30", end: "14:50", title: "Intervalo", pause: true },
  { day: "qui", start: "15:30", end: "15:40", title: "Intervalo", pause: true },
  { day: "qui", start: "15:40", end: "16:30", title: "NADIC" },
  { day: "qui", start: "16:30", end: "18:00", title: "Mesa-redonda", href: "/#palestras" },
  { day: "sex", start: "07:30", end: "08:30", title: "Mesa-redonda", href: "/#palestras" },
  { day: "sex", start: "08:30", end: "08:50", title: "Intervalo", pause: true },
  { day: "sex", start: "08:50", end: "10:20", title: "Palestra", href: "/#palestras" },
  { day: "sex", start: "10:20", end: "10:30", title: "Intervalo", pause: true },
  { day: "sex", start: "10:30", end: "12:00", title: "Rodas de conversa", href: "/#palestras" },
  { day: "sex", start: "13:00", end: "14:30", title: "Competição de jogos digitais: finais", href: "/#e-sports" },
  { day: "sex", start: "14:30", end: "14:50", title: "Intervalo", pause: true },
  { day: "sex", start: "14:50", end: "15:35", title: "Apresentação cultural" },
  { day: "sex", start: "15:35", end: "16:20", title: "Entrega dos prêmios e encerramento" },
  { day: "sex", start: "16:20", end: "18:00", title: "Confraternização" },
];

export const talks: Talk[] = [
  {
    slug: "abertura",
    format: "Palestra de abertura",
    title: "Tema a confirmar",
    day: "qui",
    start: "10:30",
    speaker: { kind: "tba", note: "Palestrante a confirmar" },
    placeholder: true,
  },
  {
    slug: "mesa-redonda-quinta",
    format: "Mesa-redonda",
    title: "Tema a confirmar",
    day: "qui",
    start: "16:30",
    speaker: { kind: "tba", note: "Participantes a confirmar" },
    placeholder: true,
  },
  {
    slug: "mesa-redonda-sexta",
    format: "Mesa-redonda",
    title: "Tema a confirmar",
    day: "sex",
    start: "07:30",
    speaker: { kind: "tba", note: "Participantes a confirmar" },
    placeholder: true,
  },
  {
    slug: "palestra-sexta",
    format: "Palestra",
    title: "Tema a confirmar",
    day: "sex",
    start: "08:50",
    speaker: { kind: "tba", note: "Palestrante a confirmar" },
    placeholder: true,
  },
  {
    slug: "rodas-de-conversa",
    format: "Rodas de conversa",
    title: "Temas a confirmar",
    day: "sex",
    start: "10:30",
    speaker: { kind: "tba", note: "Participantes a confirmar" },
    placeholder: true,
  },
];

export const coursesInfo = {
  when: "Quinta, 3 de dezembro: sete minicursos de manhã e seis à tarde, cada um no seu laboratório ou sala.",
  how: "A vaga no minicurso é escolhida na inscrição do evento, pelo SUAP. As turmas são pequenas e as vagas acabam por ordem de inscrição.",
};

export const coursePeriods: CoursePeriod[] = [
  {
    id: "manha",
    label: "Manhã",
    day: "qui",
    start: "07:30",
    end: "10:00",
    pause: { start: "08:30", end: "08:50" },
  },
  {
    id: "tarde",
    label: "Tarde",
    day: "qui",
    start: "13:00",
    end: "15:30",
    pause: { start: "14:30", end: "14:50" },
  },
];

export const COURSES: Course[] = [
  {
    slug: "desenvolvendo-jogos-com-game-maker",
    title: "Desenvolvendo jogos com Game Maker",
    detail:
      "Conheça as etapas da criação de um jogo e desenvolva o seu próprio protótipo com a engine Game Maker",
    requirements: "Conhecimentos básicos em lógica e programação.",
    audience: "Pessoas interessadas em desenvolvimento de jogos.",
    content:
      "1. Entendendo os jogos de nave \n> 1.1 Origem\n> 1.2 Funcionamento\n> 1.3 Elementos do jogo\n> 1.4 Análise da estrutura\n\n2. Criação dos objetos\n> 2.1 Criação do jogador\n> 2.2 Criando o inimigo\n> 2.3 Criando o boss\n\n3. Criação do fluxo do jogo\n> 3.1 Implementando loop de gameplay\n> 3.2 Fazendo a montagem\n> 3.3 Criando o fluxo principal\n\n4. Polimento e publicação\n> 4.1 Polimento geral\n> 4.2 Compartilhamento\n> 4.3 Recebendo feedback e criando patches",
    author: "Caio Enzo Bessa de Oliveira",
    picture: "/participants/caio-enzo.jpeg",
    vagas: 30,
    period: "manha",
    room: "Lab 56",
  },
  {
    slug: "design-e-arquitetura-de-sistemas-entendendo-como-sistemas-escalam-e-se-comunicam",
    title:
      "Design e Arquitetura de Sistemas: Entendendo como Sistemas Escalam e se Comunicam",
    detail:
      "Esta oficina apresenta os principais conceitos de Design e Arquitetura de Sistemas, explorando como aplicações são estruturadas, se comunicam, distribuem tráfego e lidam com falhas. Serão abordados diferentes modelos arquiteturais, estratégias de escalabilidade, resiliência e gerenciamento de dados, utilizando exemplos práticos e situações reais. O objetivo é proporcionar uma visão geral dos fundamentos de System Design, permitindo que os participantes compreendam os principais trade-offs e saibam identificar soluções adequadas para diferentes problemas.",
    requirements:
      "- Conhecimentos básicos de programação.\n- Noções de APIs REST e comunicação HTTP.\n- Conhecimentos básicos de bancos de dados.\n- Familiaridade com desenvolvimento back-end.",
    audience:
      "Estudantes e desenvolvedores de software que já possuem conhecimentos básicos de desenvolvimento e desejam ampliar sua compreensão sobre arquitetura de sistemas, escalabilidade e sistemas distribuídos.",
    content:
      "1. Introdução ao System Design.\n2. Organização de sistemas: monolitos, monolitos modulares e microsserviços.\n3. Comunicação entre sistemas: REST, gRPC, mensageria e eventos.\n4. Distribuição de tráfego: proxies, load balancers, API Gateways e CDN.\n5. Resiliência e tolerância a falhas em sistemas distribuídos.\n6. Gerenciamento de dados: CAP, CQRS, Event Sourcing e sharding.\n7. Transações distribuídas e padrão Saga.\n8. Desafio prático: projetando um sistema para 1 milhão de usuários.",
    author: "João Manoel Fontes",
    picture: null,
    vagas: null,
    period: "tarde",
    room: "Lab 60",
  },
  {
    slug: "processamento-de-imagens-com-react-native-e-opencv",
    title: "Processamento de imagens com React Native e OpenCV",
    detail:
      "Desenvolver uma aplicação completa, com mobile e back-end focados em processamento de imagens.",
    requirements:
      "1- Conhecimento básico em React Native.\n2- Conhecimento básico em python.\n3- Conhecimento básico em alguma framework de back-end (preferencialmente FastApi)",
    audience: "Público em geral.",
    content:
      "Introdução as configurações básicas do projeto mobile e back.\nTestando o OpenCV.\nCriar um endpint com FastApi.\nExplorar o react native skia e react native gesture handler.\nConsumir o back.\n\nExtra(Se der tempo):\nDocker e TanStack Query.",
    author: "Adryan Eryk de Oliveira Leite",
    picture: "/participants/adryan-erik.JPG",
    vagas: 40,
    period: "tarde",
    room: "Lab 65",
  },
  {
    slug: "git-e-github-sem-medo-do-primeiro-commit-ao-primeiro-conflito",
    title: "Git e GitHub sem medo: do primeiro commit ao primeiro conflito",
    detail:
      "Saber usar Git e GitHub é básico em qualquer time de desenvolvimento, mas muita gente chega ao primeiro estágio ou emprego sabendo só o “add, commit, push” e trava no primeiro conflito. Neste minicurso o participante sai do zero: instala e configura o Git, cria e protege sua conta no GitHub e entende cada comando do dia a dia usando os comandos atuais recomendados pela documentação oficial, como git switch e git restore. Depois, numa prática que sobe de nível, vive situações reais de equipe: trabalhar com branches, abrir pull requests, revisar código, desfazer erros e resolver conflitos de merge. A ideia é que o participante saia pronto para contribuir com segurança em projetos profissionais e open source.",
    requirements:
      "Saber o básico de computador (criar pastas, mover e editar arquivos)\nTer um e-mail ativo e com acesso durante o curso, para criar e verificar a conta no GitHub\nTer um celular com app autenticador (Google Authenticator, Authy ou parecido) para ativar a verificação em duas etapas\nNão é preciso saber programar. Ter visto qualquer linguagem ou já ter aberto um terminal ajuda, mas não é obrigatório\n",
    audience:
      "Estudantes e jovens profissionais de tecnologia que estão entrando no mercado de trabalho, já ouviram falar de Git e GitHub (ou usam de forma básica) e querem trabalhar de forma profissional e colaborativa.",
    content:
      "Controle de versão: o que é e por que o Git virou padrão\nInstalação e configuração inicial (git config, identidade, branch padrão main, editor)\nConta no GitHub: criação, verificação em duas etapas e autenticação (SSH ou token)\nCiclo básico: init, status, add, commit, log, diff\n.gitignore e o que não deve ir para o repositório\nBranches: branch, switch, merge\nRepositórios remotos: clone, remote, fetch, pull, push\nDesfazendo erros: restore, revert, reset e stash\nFluxo de trabalho em equipe: issues, fork, pull request e code review\nConflitos de merge: por que acontecem e como resolver\nBoas práticas: mensagens de commit (Conventional Commits) e organização de branches\nPrática evolutiva em níveis, simulando situações reais de equipe\n",
    author: "Tallys Cesar Gurgel Batista",
    picture: null,
    vagas: null,
    period: "tarde",
    room: "Lab 58",
  },
  {
    slug: "desenvolvimento-de-aplicacoes-modernas-com-react",
    title: "Desenvolvimento de Aplicações Modernas com React",
    detail:
      "Este minicurso apresenta os principais conceitos, ferramentas e práticas do ecossistema React utilizados no desenvolvimento profissional de aplicações web. Por meio da demonstração de um projeto previamente desenvolvido em diferentes estágios de evolução, serão explorados desde os fundamentos da biblioteca até soluções para gerenciamento de estado, navegação, formulários e integração com APIs. Também serão abordadas boas práticas de organização de código, noções de otimização de performance e testes automatizados, proporcionando uma visão prática de como diferentes tecnologias são utilizadas em conjunto para construir aplicações modernas, organizadas e sustentáveis.",
    requirements:
      "- Conhecimentos básicos de HTML, CSS e JavaScript/TypeScript.\n- Noções básicas de Git e GitHub.\n- Node.js, npm, Docker, Docker Compose e editor de código instalados.\n",
    audience:
      "Estudantes e desenvolvedores com conhecimentos básicos de desenvolvimento web que desejam conhecer o React ou aprofundar seus conhecimentos sobre a biblioteca, seu ecossistema e as práticas utilizadas no desenvolvimento profissional de aplicações web.",
    content:
      "- Introdução ao React: origem, funcionamento e estrutura de projetos.\n- Fundamentos: JSX, componentes, props, eventos e Hooks.\n- Contexto, custom Hooks e noções de performance.\n- Navegação com React Router.\n- Formulários com React Hook Form.\n- Integração com APIs utilizando Axios e TanStack Query.\n- Organização de código e boas práticas de desenvolvimento.\n- Introdução aos testes automatizados com Vitest e React Testing Library.\n",
    author: "Lucas Nunes",
    picture: "/participants/lucas-nunes.png",
    vagas: null,
    period: "manha",
    room: "Lab 57",
  },
  {
    slug: "database-engineering-na-pratica-problemas-reais-de-bancos-de-dados-em-producao",
    title:
      "Database Engineering na prática: problemas reais de bancos de dados em produção",
    detail:
      "Quando aprendi os conceitos fundamentais de bancos de dados, como operações CRUD e consultas SQL, senti que já estava preparado para implementar essas funcionalidades nas minhas aplicações. Entretanto, ao desenvolver projetos e ter contato com sistemas reais, percebi que existem problemas que vão muito além do que havia aprendido, o que me levou a estudar conceitos mais avançados e técnicas utilizadas no mercado. Neste minicurso prático, utilizaremos um e-commerce fictício como cenário para explorar quatro problemas comuns em sistemas reais: consultas ineficientes, operações concorrentes, duplicidade de operações e sobrecarga de conexões. Por meio de demonstrações e desafios práticos, os participantes aprenderão a investigar esses problemas utilizando ferramentas do PostgreSQL e aplicar técnicas para solucioná-los, desenvolvendo conhecimentos importantes para a construção de aplicações mais eficientes, confiáveis e escaláveis.",
    requirements:
      "Conhecimentos básicos de SQL (SELECT, INSERT, UPDATE e DELETE).\nLógica de programação e noções básicas de python.\nNoções de bancos de dados relacionais.",
    audience:
      "Estudantes de cursos técnicos e superiores da área de informática e desenvolvimento de software que possuam conhecimentos básicos de bancos de dados e tenham interesse em aprender técnicas utilizadas na construção de aplicações mais eficientes, confiáveis e escaláveis.",
    content:
      "1 Estudo: visão geral do contexto, rodar o docker e ambiente locais. Estudaremos otimização de querys: planos de execução, EXPLAIN ANALYZE, Sequential Scan, Index Scan, criação de índices e problema de N+1.\n2 Estudo: Concorrência e integridade. Race conditions, propriedades ACID, transações, locks e deadlocks.\n3 Estudo: Confiabilidade e idempotência. Operações duplicadas, idempotency keys, constraints de unicidade e estratégias de retry.\n4 Estudo: Gerenciamento de conexões e escalabilidade. Monitoramento com pg_stat_activity, connection pooling, dimensionamento de conexões e introdução ao PgBouncer.",
    author: "Pedro Henrique Carvalho Sousa",
    picture: "/participants/pedro-henrique.jpeg",
    vagas: null,
    period: "manha",
    room: "Lab 58",
  },
  {
    slug: "como-organizar-suas-tarefas-com-o-notion",
    title: "Como organizar suas tarefas com o Notion?",
    detail:
      "O minicurso “Como organizar suas tarefas com o Notion?” tem como objetivo ensinar os participantes a utilizar o Notion como ferramenta de organização pessoal, acadêmica e profissional.\nPor meio de demonstrações práticas e atividades orientadas, os participantes aprenderão a criar páginas, gerenciar tarefas, estabelecer prioridades, definir prazos e acompanhar o andamento das atividades, desenvolvendo um sistema de planejamento adaptado às suas necessidades. ",
    requirements:
      "Conhecimentos básicos de informática.\nFamiliaridade com navegação na internet.\nNão é necessário conhecimento prévio do Notion.\n",
    audience:
      "Estudantes, profissionais e pessoas interessadas em melhorar sua organização pessoal, acadêmica e profissional.",
    content:
      "1.\tIntrodução ao Notion.\n2.\tConhecendo a interface e os recursos básicos.\n3.\tCriação de páginas e organização de informações.\n4.\tCriação de um sistema de gerenciamento de tarefas.\n5.\tUtilização de filtros e visualizações.\n6.\tProjeto Prático\n",
    author: "Klaywin Ryan Aquino Dias",
    picture: null,
    vagas: null,
    period: "manha",
    room: "Sala",
  },
  {
    slug: "docker-na-pratica",
    title:
      "Docker na prática: do “na minha máquina funciona” ao container rodando em qualquer lugar",
    detail: null,
    requirements: null,
    audience: null,
    content: null,
    author: "Pedro Heitor Rêgo Ferreira",
    picture: null,
    vagas: null,
    period: "manha",
    room: "Lab 65",
  },
  {
    slug: "deploy-gratuito",
    title:
      "Deploy gratuito: coloque seus projetos pessoais no ar sem gastar 1,00 com infraestrutura",
    detail: null,
    requirements: null,
    audience: null,
    content: null,
    author: "Samuel Franklin de Oliveira Lopes",
    picture: null,
    vagas: null,
    period: "manha",
    room: "Lab 60",
  },
  {
    slug: "apis-com-spring-mvc",
    title:
      "APIs com Spring MVC para quem tem medo de Java",
    detail: null,
    requirements: null,
    audience: null,
    content: null,
    author: "Hian Sebasthian Queiroz Silva",
    picture: null,
    vagas: null,
    period: "manha",
    room: "Sala",
  },
  {
    slug: "testes-e2e-com-playwright",
    title:
      "Automação de Testes End-to-End (E2E) na Prática com Playwright: Garantindo a Qualidade de Aplicações Web Modernas",
    detail: null,
    requirements: null,
    audience: null,
    content: null,
    author: "Heitor Queiroga Duarte",
    picture: null,
    vagas: null,
    period: "tarde",
    room: "Sala",
  },
  {
    slug: "specification-driven-development",
    title:
      "Do Prompt ao Software: Specification-Driven Development na Era da IA",
    detail: null,
    requirements: null,
    audience: null,
    content: null,
    author: "Jilcimar da Silva Fernandes",
    picture: null,
    vagas: null,
    period: "tarde",
    room: "Lab 57",
  },
  {
    slug: "agentes-de-ia",
    title: "Entendendo e programando com agentes de IA",
    detail:
      "Uma oficina introdutória e prática sobre inteligência artificial no desenvolvimento de software. Primeiro, como funcionam os modelos de linguagem e os agentes de IA, o que eles mudam na forma de programar, onde erram e o que é exagero do mercado. Depois, mão na massa: os participantes usam agentes de programação para planejar, construir e modificar um pequeno projeto web, validando em cada etapa o código que o agente escreve.",
    requirements:
      "Conhecimentos básicos de lógica de programação.\nNoções de HTML, CSS e JavaScript.\nNão é preciso ter usado agentes de IA antes.",
    audience:
      "Estudantes e iniciantes em programação que já usam ou têm curiosidade sobre ferramentas de IA e querem entender como os agentes funcionam e como programar com eles sem perder o controle do código.",
    content:
      "1. Como funcionam os modelos de linguagem: tokens, contexto e por que eles erram.\n2. De chatbot a agente: ferramentas, ciclo de decisão e autonomia.\n3. O que muda na programação: impactos, limitações, riscos e expectativas do mercado.\n4. Agentes de programação na prática: planejar a tarefa e escrever boas instruções.\n5. Projeto prático: construir e modificar uma pequena aplicação web com um agente.\n6. Validação: revisar, testar e corrigir o código gerado.",
    author: "Kellyson Raphael",
    picture: "/participants/kellyson-raphael.jpg",
    vagas: null,
    period: "tarde",
    room: "Lab 56",
  },
];

export const esports = {
  intro:
    "Cinco campeonatos em dois dias: classificatórias na quinta à tarde e finais na sexta à tarde.",
};

export const games: Game[] = [
  {
    slug: "mortal-kombat-11",
    name: "Mortal Kombat 11",
    seats: 16,
    placeholder: true,
  },
  {
    slug: "ea-fc",
    name: "EA Sports FC",
    seats: 16,
    placeholder: true,
  },
  {
    slug: "clash-royale",
    name: "Clash Royale",
    seats: 32,
    placeholder: true,
  },
  {
    slug: "guitar-hero-3",
    name: "Guitar Hero III",
    seats: 16,
    placeholder: true,
  },
  {
    slug: "naruto-storm-4",
    name: "Naruto Ultimate Ninja Storm 4",
    seats: 16,
    placeholder: true,
  },
];

export const pastEditions: PastEdition[] = [
  {
    year: 2025,
    label: "7ª edição",
    note: "Entre likes e algoritmos: o impacto da IA nas redes e na mente",
  },
  {
    year: 2024,
    label: "Edição de 2024",
    note: "15 anos de IFRN: inovação, crescimento e tecnologias impactando vidas",
  },
  {
    year: 2021,
    label: "4ª edição",
    note: "Edição online, com mesas transmitidas ao vivo",
  },
  {
    year: 2015,
    label: "1ª edição",
    note: "A primeira, com desafio de programação",
  },
];

export const dayById = (id: DayId) => {
  const day = days.find((d) => d.id === id);
  if (!day) throw new Error(`Unknown day: ${id}`);
  return day;
};
