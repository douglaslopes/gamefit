import { WorkoutPlan } from './types';

// Helper for placeholder images
const getImg = (text: string) => `https://placehold.co/600x400/1e293b/10b981?text=${encodeURIComponent(text)}&font=roboto`;

export const MOTIVATIONAL_QUOTES = [
  "O único treino ruim é aquele que não aconteceu.",
  "Sua única competição é quem você foi ontem.",
  "Força não vem do que você pode fazer. Vem de superar o que você achava impossível.",
  "Cada repetição te aproxima da sua melhor versão.",
  "Disciplina é lembrar o que você quer.",
  "O corpo alcança o que a mente acredita.",
  "Não pare quando estiver cansado. Pare quando terminar.",
  "Resultados acontecem com o tempo, não da noite para o dia.",
  "Você é mais forte do que pensa.",
  "O suor de hoje é o orgulho de amanhã.",
  "Treinar é um privilégio, não uma obrigação.",
  "A dor que você sente hoje será a força que você sentirá amanhã.",
  "Consistência supera intensidade.",
  "Quem treina junto, cresce junto.",
  "Seu corpo pode aguentar quase tudo. É sua mente que você precisa convencer."
];

export const WORKOUT_TIPS: Record<string, string> = {
  'Corpo Inteiro A': 'Foque na técnica antes da carga. Movimentos controlados geram mais resultados.',
  'Corpo Inteiro B': 'Mantenha a respiração constante: expire no esforço, inspire no retorno.',
  'Corpo Inteiro C': 'Hidrate-se bem antes, durante e após o treino.',
  'Recuperação Ativa': 'O descanso é onde seu corpo se reconstrói mais forte.',
  'Descanso': 'Durma pelo menos 7-8 horas para maximizar a recuperação muscular.',
  'Cardio Livre': 'Escolha uma atividade que você goste - consistência é mais importante que intensidade.',
  'Treino A (Empurrar)': 'Cotovelos em 45° nas flexões protegem seus ombros.',
  'Treino B (Pernas)': 'Joelhos sempre alinhados com a ponta dos pés no agachamento.',
  'Treino C (Puxar)': 'Inicie o movimento retraindo as escápulas para ativar as costas.',
  'Treino D (Lower/Full)': 'Aqueça bem antes de movimentos explosivos.',
  'Descanso Ativo / Cardio': 'Cardio leve ajuda na recuperação ao aumentar o fluxo sanguíneo.',
  'Mobilidade': 'Alongar regularmente previne lesões e melhora a amplitude de movimento.',
  'Peito & Tríceps (Volume)': 'Foque na conexão mente-músculo para máxima ativação.',
  'Costas & Bíceps (Volume)': 'Use a pegada supinada para maior ativação do bíceps.',
  'Pernas (Quadríceps)': 'Desça até pelo menos 90° no agachamento para ativação completa.',
  'Ombros & Abdômen': 'Evite impulso - movimentos controlados dão mais resultados.',
  'Pernas (Posterior & Glúteos)': 'Mantenha uma leve flexão nos joelhos no stiff.',
  'Full Body Power': 'Explosão na concêntrica, controle na excêntrica.',
  'Descanso Estratégico': 'A mágica do crescimento acontece enquanto você descansa.'
};

export const LEVEL_1_PLAN: WorkoutPlan = {
  id: 'iniciante_fundacao',
  name: 'Nível 1: Fundação',
  minWorkoutsToUnlock: 0,
  workoutsToFinish: 14, // Meta ajustada: 14 dias
  schedule: [
    {
      dayName: 'Domingo',
      focus: 'Recuperação Ativa',
      isRestDay: true,
      exercisesHome: [
        { id: 'l1-dom-1h', name: 'Caminhada Leve', sets: 1, reps: '30 mins', description: 'Mantenha um ritmo constante para circular o sangue.', muscleGroup: 'Cardio', imageUrl: getImg('Caminhada') },
        { id: 'l1-dom-2h', name: 'Alongamento Completo', sets: 1, reps: '10 mins', description: 'Foque nas áreas tensas.', muscleGroup: 'Flexibilidade', imageUrl: getImg('Alongamento') },
      ],
      exercisesGym: [
        { id: 'l1-dom-1g', name: 'Esteira ou Elíptico', sets: 1, reps: '30 mins', description: 'Ritmo moderado, sem correr.', muscleGroup: 'Cardio', imageUrl: getImg('Esteira') },
        { id: 'l1-dom-2g', name: 'Alongamento em Colchonete', sets: 1, reps: '10 mins', description: 'Use a área de alongamento.', muscleGroup: 'Flexibilidade', imageUrl: getImg('Alongamento') },
      ]
    },
    {
      dayName: 'Segunda-feira',
      focus: 'Corpo Inteiro A',
      isRestDay: false,
      exercisesHome: [
        { id: 'l1-seg-1h', name: 'Agachamento Livre', sets: 3, reps: '12-15', description: 'Pés na largura dos ombros. Desça como se fosse sentar.', muscleGroup: 'Pernas', imageUrl: getImg('Agachamento') },
        { id: 'l1-seg-2h', name: 'Flexão de Braço', sets: 3, reps: '12-15', description: 'Use os joelhos se necessário. Peito no chão.', muscleGroup: 'Peito', imageUrl: getImg('Flexão') },
        { id: 'l1-seg-3h', name: 'Remada com Mochila', sets: 3, reps: '12-15', description: 'Tronco inclinado, puxe a mochila na direção do umbigo.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Mochila') },
        { id: 'l1-seg-4h', name: 'Elevação Pélvica', sets: 3, reps: '15', description: 'Deitado, suba o quadril contraindo os glúteos.', muscleGroup: 'Glúteos', imageUrl: getImg('Elev.+Pélvica') },
        { id: 'l1-seg-5h', name: 'Prancha Abdominal', sets: 3, reps: '30-45s', description: 'Corpo reto, contraia o abdômen.', muscleGroup: 'Core', imageUrl: getImg('Prancha') },
        { id: 'l1-seg-6h', name: 'Elevação Lateral', sets: 3, reps: '12-15', description: 'Com garrafas de água ou peso leve.', muscleGroup: 'Ombros', imageUrl: getImg('Elev.+Lateral') },
      ],
      exercisesGym: [
        { id: 'l1-seg-1g', name: 'Agachamento Máquina', sets: 3, reps: '10-15', description: 'Mantenha a coluna neutra. Desça até 90 graus.', muscleGroup: 'Pernas', imageUrl: getImg('Agachamento+Máq') },
        { id: 'l1-seg-2g', name: 'Supino Máquina', sets: 3, reps: '10-15', description: 'Empurre controlando o movimento.', muscleGroup: 'Peito', imageUrl: getImg('Supino+Máq') },
        { id: 'l1-seg-3g', name: 'Remada Máquina Fechada', sets: 3, reps: '10-15', description: 'Puxe e esmague as costas no final.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Máq') },
        { id: 'l1-seg-4g', name: 'Desenvolvimento Máquina', sets: 3, reps: '10-15', description: 'Empurre para cima da cabeça.', muscleGroup: 'Ombros', imageUrl: getImg('Desenv.+Máq') },
        { id: 'l1-seg-5g', name: 'Elevação Pélvica', sets: 3, reps: '10-15', description: 'Segure 1s no topo.', muscleGroup: 'Glúteos', imageUrl: getImg('Elev.+Pélvica') },
        { id: 'l1-seg-6g', name: 'Prancha', sets: 3, reps: '30-60s', description: 'Abdômen travado.', muscleGroup: 'Core', imageUrl: getImg('Prancha') },
        { id: 'l1-seg-7g', name: 'Rosca Direta Máquina', sets: 3, reps: '12-15', description: 'Não balance o tronco.', muscleGroup: 'Bíceps', imageUrl: getImg('Rosca+Direta') },
      ]
    },
    {
      dayName: 'Terça-feira',
      focus: 'Descanso',
      isRestDay: true,
      exercisesHome: [
        { id: 'l1-ter-1', name: 'Descanso Completo', sets: 0, reps: '—', description: 'Recuperação muscular. Durma bem e hidrate-se.', muscleGroup: 'Descanso', imageUrl: getImg('Sono') }
      ],
      exercisesGym: [
        { id: 'l1-ter-1', name: 'Descanso Completo', sets: 0, reps: '—', description: 'Recuperação muscular. Foque na alimentação.', muscleGroup: 'Descanso', imageUrl: getImg('Sono') }
      ]
    },
    {
      dayName: 'Quarta-feira',
      focus: 'Corpo Inteiro B',
      isRestDay: false,
      exercisesHome: [
        { id: 'l1-qua-1h', name: 'Agachamento Sumô', sets: 3, reps: '12-15', description: 'Pés afastados apontando para fora.', muscleGroup: 'Pernas', imageUrl: getImg('Agachamento+Sumô') },
        { id: 'l1-qua-2h', name: 'Flexão Inclinada', sets: 3, reps: '12-15', description: 'Apoie as mãos no sofá/cadeira.', muscleGroup: 'Peito', imageUrl: getImg('Flexão+Inclinada') },
        { id: 'l1-qua-3h', name: 'Remada Serrote', sets: 3, reps: '12 cada', description: 'Unilateral. Apoie em uma cadeira.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Serrote') },
        { id: 'l1-qua-4h', name: 'Elevação Lateral', sets: 3, reps: '15', description: 'Levante os braços até a altura do ombro.', muscleGroup: 'Ombros', imageUrl: getImg('Elev.+Lateral') },
        { id: 'l1-qua-5h', name: 'Abdominal Supra', sets: 3, reps: '20', description: 'Tire as costas do chão controladamente.', muscleGroup: 'Core', imageUrl: getImg('Abdominal') },
        { id: 'l1-qua-6h', name: 'Panturrilha em Pé', sets: 3, reps: '20', description: 'Suba na ponta dos pés.', muscleGroup: 'Panturrilha', imageUrl: getImg('Panturrilha') },
      ],
      exercisesGym: [
        { id: 'l1-qua-1g', name: 'Leg Press 45º', sets: 3, reps: '10-15', description: 'Pés na largura do quadril.', muscleGroup: 'Pernas', imageUrl: getImg('Leg+Press') },
        { id: 'l1-qua-2g', name: 'Supino Inclinado Halteres', sets: 3, reps: '10-15', description: 'Foco na parte superior do peito.', muscleGroup: 'Peito', imageUrl: getImg('Supino+Inclinado') },
        { id: 'l1-qua-3g', name: 'Puxada Alta', sets: 3, reps: '10-15', description: 'Puxe a barra em direção ao peito.', muscleGroup: 'Costas', imageUrl: getImg('Puxada+Alta') },
        { id: 'l1-qua-4g', name: 'Elevação Lateral Halteres', sets: 3, reps: '12-15', description: 'Controle a descida.', muscleGroup: 'Ombros', imageUrl: getImg('Elev.+Lateral') },
        { id: 'l1-qua-5g', name: 'Cadeira Extensora', sets: 3, reps: '15', description: 'Chute completo.', muscleGroup: 'Quadríceps', imageUrl: getImg('Cad.+Extensora') },
        { id: 'l1-qua-6g', name: 'Abdominal Máquina', sets: 3, reps: '15-20', description: 'Foco na contração.', muscleGroup: 'Core', imageUrl: getImg('Abdominal+Máq') },
        { id: 'l1-qua-7g', name: 'Tríceps Polia', sets: 3, reps: '12-15', description: 'Cotovelos fixos ao lado do corpo.', muscleGroup: 'Tríceps', imageUrl: getImg('Tríceps+Polia') },
      ]
    },
    {
      dayName: 'Quinta-feira',
      focus: 'Descanso',
      isRestDay: true,
      exercisesHome: [
        { id: 'l1-qui-1', name: 'Descanso Completo', sets: 0, reps: '—', description: 'Hidrate-se bem e alongue levemente se sentir necessidade.', muscleGroup: 'Descanso', imageUrl: getImg('Água') }
      ],
      exercisesGym: [
        { id: 'l1-qui-1', name: 'Descanso Completo', sets: 0, reps: '—', description: 'Foque na alimentação e recuperação.', muscleGroup: 'Descanso', imageUrl: getImg('Alimentação') }
      ]
    },
    {
      dayName: 'Sexta-feira',
      focus: 'Corpo Inteiro C',
      isRestDay: false,
      exercisesHome: [
        { id: 'l1-sex-1h', name: 'Afundo (Passada)', sets: 3, reps: '12 cada', description: 'Passo largo à frente, joelho de trás quase no chão.', muscleGroup: 'Pernas', imageUrl: getImg('Afundo') },
        { id: 'l1-sex-2h', name: 'Tríceps Banco', sets: 3, reps: '12-15', description: 'Use uma cadeira firme.', muscleGroup: 'Tríceps', imageUrl: getImg('Tríceps+Banco') },
        { id: 'l1-sex-3h', name: 'Super-Homem', sets: 3, reps: '15', description: 'Deitado de bruços, eleve peito e pernas simultaneamente.', muscleGroup: 'Lombar', imageUrl: getImg('Super-Homem') },
        { id: 'l1-sex-4h', name: 'Desenvolvimento Ombros', sets: 3, reps: '12-15', description: 'Com garrafas ou peso improvisado.', muscleGroup: 'Ombros', imageUrl: getImg('Desenv.+Ombros') },
        { id: 'l1-sex-5h', name: 'Prancha Lateral', sets: 2, reps: '30s/lado', description: 'Estabilize o tronco lateralmente.', muscleGroup: 'Core', imageUrl: getImg('Prancha+Lateral') },
        { id: 'l1-sex-6h', name: 'Rosca Bíceps', sets: 3, reps: '12-15', description: 'Com garrafas de água ou mochila.', muscleGroup: 'Bíceps', imageUrl: getImg('Rosca+Bíceps') },
      ],
      exercisesGym: [
        { id: 'l1-sex-1g', name: 'Agachamento Goblet', sets: 3, reps: '10-15', description: 'Segure o halter no peito.', muscleGroup: 'Pernas', imageUrl: getImg('Goblet+Squat') },
        { id: 'l1-sex-2g', name: 'Cadeira Flexora', sets: 3, reps: '12-15', description: 'Foco no posterior da coxa.', muscleGroup: 'Posterior', imageUrl: getImg('Cad.+Flexora') },
        { id: 'l1-sex-3g', name: 'Peck Deck (Voador)', sets: 3, reps: '12-15', description: 'Braços abertos, feche no meio.', muscleGroup: 'Peito', imageUrl: getImg('Peck+Deck') },
        { id: 'l1-sex-4g', name: 'Remada Baixa (Cabo)', sets: 3, reps: '10-15', description: 'Coluna reta, puxe até o umbigo.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Baixa') },
        { id: 'l1-sex-5g', name: 'Rosca Direta Barra', sets: 3, reps: '12-15', description: 'Não balance o tronco.', muscleGroup: 'Bíceps', imageUrl: getImg('Rosca+Direta') },
        { id: 'l1-sex-6g', name: 'Tríceps Polia Corda', sets: 3, reps: '12-15', description: 'Estenda tudo para baixo.', muscleGroup: 'Tríceps', imageUrl: getImg('Tríceps+Corda') },
        { id: 'l1-sex-7g', name: 'Panturrilha em Pé', sets: 3, reps: '15-20', description: 'Amplitude máxima.', muscleGroup: 'Panturrilha', imageUrl: getImg('Panturrilha') },
      ]
    },
    {
      dayName: 'Sábado',
      focus: 'Cardio Livre',
      isRestDay: true,
      exercisesHome: [
        { id: 'l1-sab-1', name: 'Caminhada/Dança/Esporte', sets: 1, reps: '45 mins', description: 'Movimente-se de forma prazerosa.', muscleGroup: 'Cardio', imageUrl: getImg('Lazer') }
      ],
      exercisesGym: [
        { id: 'l1-sab-1', name: 'Cardio Moderado', sets: 1, reps: '30-45 mins', description: 'Esteira, Bike ou Elíptico em ritmo leve.', muscleGroup: 'Cardio', imageUrl: getImg('Cardio') }
      ]
    },
  ],
};

export const LEVEL_2_PLAN: WorkoutPlan = {
  id: 'intermediario_volume',
  name: 'Nível 2: Intermediário',
  minWorkoutsToUnlock: 20,
  workoutsToFinish: 21, // Meta ajustada: 21 dias
  schedule: [
     {
      dayName: 'Domingo',
      focus: 'Descanso',
      isRestDay: true,
      exercisesHome: [{id: 'l2-dom', name: 'Descanso Total', sets: 0, reps: '—', description: 'Prepare-se mentalmente para a semana de treinos.', muscleGroup: 'Descanso', imageUrl: getImg('Descanso')}],
      exercisesGym: [{id: 'l2-dom', name: 'Descanso Total', sets: 0, reps: '—', description: 'Relaxe os músculos e descanse bem.', muscleGroup: 'Descanso', imageUrl: getImg('Descanso')}]
    },
    {
      dayName: 'Segunda-feira',
      focus: 'Treino A (Empurrar)',
      isRestDay: false,
      exercisesHome: [
        { id: 'l2-seg-1h', name: 'Flexões de Braço', sets: 4, reps: 'Até falha', description: 'Máximo de repetições possíveis com boa forma.', muscleGroup: 'Peito', imageUrl: getImg('Flexão') },
        { id: 'l2-seg-2h', name: 'Flexão Declinada', sets: 3, reps: '10-15', description: 'Pés elevados no sofá/cadeira.', muscleGroup: 'Peito Superior', imageUrl: getImg('Flexão+Declinada') },
        { id: 'l2-seg-3h', name: 'Desenvolvimento Ombros', sets: 4, reps: '12', description: 'Com elástico ou peso improvisado.', muscleGroup: 'Ombros', imageUrl: getImg('Desenvolvimento') },
        { id: 'l2-seg-4h', name: 'Tríceps Banco', sets: 4, reps: '15', description: 'Pés elevados para dificultar.', muscleGroup: 'Tríceps', imageUrl: getImg('Mergulho+Banco') },
        { id: 'l2-seg-5h', name: 'Elevação Lateral', sets: 3, reps: '15', description: 'Garrafas de água como peso.', muscleGroup: 'Ombros', imageUrl: getImg('Elev.+Lateral') },
        { id: 'l2-seg-6h', name: 'Flexão Diamante', sets: 3, reps: 'Até falha', description: 'Mãos unidas formando um diamante.', muscleGroup: 'Tríceps', imageUrl: getImg('Flexão+Diamante') },
      ],
      exercisesGym: [
        { id: 'l2-seg-1g', name: 'Supino Reto (Barra)', sets: 4, reps: '8-10', description: 'Carga progressiva. O exercício clássico.', muscleGroup: 'Peito', imageUrl: getImg('Supino+Reto') },
        { id: 'l2-seg-2g', name: 'Desenvolvimento Halteres', sets: 4, reps: '8-12', description: 'Sentado, costas apoiadas.', muscleGroup: 'Ombros', imageUrl: getImg('Desenv.+Halter') },
        { id: 'l2-seg-3g', name: 'Supino Inclinado', sets: 3, reps: '10-12', description: 'Foco na região clavicular do peito.', muscleGroup: 'Peito', imageUrl: getImg('Supino+Inclinado') },
        { id: 'l2-seg-4g', name: 'Elevação Lateral', sets: 4, reps: '12-15', description: 'Foco na porção lateral do deltóide.', muscleGroup: 'Ombros', imageUrl: getImg('Elev.+Lateral') },
        { id: 'l2-seg-5g', name: 'Tríceps Testa', sets: 4, reps: '10-12', description: 'Barra W. Cotovelos fixos.', muscleGroup: 'Tríceps', imageUrl: getImg('Tríceps+Testa') },
        { id: 'l2-seg-6g', name: 'Tríceps Corda', sets: 3, reps: '12-15', description: 'Esmague o tríceps na contração.', muscleGroup: 'Tríceps', imageUrl: getImg('Tríceps+Corda') },
      ]
    },
    {
      dayName: 'Terça-feira',
      focus: 'Treino B (Pernas)',
      isRestDay: false,
      exercisesHome: [
        { id: 'l2-ter-1h', name: 'Agachamento Búlgaro', sets: 4, reps: '10/perna', description: 'O rei dos exercícios de perna em casa.', muscleGroup: 'Pernas', imageUrl: getImg('Agachamento+Búlgaro') },
        { id: 'l2-ter-2h', name: 'Agachamento com Salto', sets: 4, reps: '15', description: 'Explosão na subida.', muscleGroup: 'Pernas', imageUrl: getImg('Agachamento+Salto') },
        { id: 'l2-ter-3h', name: 'Afundo Reverso', sets: 4, reps: '12/perna', description: 'Passo para trás.', muscleGroup: 'Pernas', imageUrl: getImg('Afundo+Reverso') },
        { id: 'l2-ter-4h', name: 'Elevação Pélvica Unilateral', sets: 3, reps: '15/perna', description: 'Uma perna de cada vez.', muscleGroup: 'Glúteos', imageUrl: getImg('Elev.+Pélvica+Uni') },
        { id: 'l2-ter-5h', name: 'Panturrilha Unilateral', sets: 4, reps: '20', description: 'Em um degrau para amplitude.', muscleGroup: 'Panturrilha', imageUrl: getImg('Panturrilha') },
      ],
      exercisesGym: [
        { id: 'l2-ter-1g', name: 'Agachamento Livre (Barra)', sets: 4, reps: '8-10', description: 'Exercício base. Amplitude máxima.', muscleGroup: 'Pernas', imageUrl: getImg('Agachamento+Barra') },
        { id: 'l2-ter-2g', name: 'Leg Press 45º', sets: 4, reps: '10-12', description: 'Carga alta, não trave os joelhos.', muscleGroup: 'Pernas', imageUrl: getImg('Leg+Press') },
        { id: 'l2-ter-3g', name: 'Stiff', sets: 4, reps: '8-12', description: 'Foco no posterior e glúteo.', muscleGroup: 'Posterior', imageUrl: getImg('Stiff') },
        { id: 'l2-ter-4g', name: 'Cadeira Extensora', sets: 3, reps: '15', description: 'Pump final no quadríceps.', muscleGroup: 'Quadríceps', imageUrl: getImg('Cad.+Extensora') },
        { id: 'l2-ter-5g', name: 'Mesa Flexora', sets: 3, reps: '12-15', description: 'Contraia bem o posterior.', muscleGroup: 'Posterior', imageUrl: getImg('Mesa+Flexora') },
      ]
    },
    {
      dayName: 'Quarta-feira',
      focus: 'Descanso Ativo / Cardio',
      isRestDay: true,
      exercisesHome: [
        { id: 'l2-qua-1', name: 'Caminhada', sets: 1, reps: '45 min', description: 'Cardio leve de recuperação.', muscleGroup: 'Cardio', imageUrl: getImg('Caminhada') },
        { id: 'l2-qua-2', name: 'Alongamento', sets: 1, reps: '15 min', description: 'Foque nos grupos trabalhados.', muscleGroup: 'Flexibilidade', imageUrl: getImg('Alongamento') }
      ],
      exercisesGym: [
        { id: 'l2-qua-1', name: 'Esteira Leve', sets: 1, reps: '40 min', description: 'Zona 2 (conversação).', muscleGroup: 'Cardio', imageUrl: getImg('Esteira') },
        { id: 'l2-qua-2', name: 'Alongamento', sets: 1, reps: '15 min', description: 'Use o espaço de alongamento.', muscleGroup: 'Flexibilidade', imageUrl: getImg('Alongamento') }
      ]
    },
    {
      dayName: 'Quinta-feira',
      focus: 'Treino C (Puxar)',
      isRestDay: false,
      exercisesHome: [
        { id: 'l2-qui-1h', name: 'Remada Invertida (Mesa)', sets: 4, reps: 'Até falha', description: 'Embaixo de uma mesa robusta.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Invertida') },
        { id: 'l2-qui-2h', name: 'Remada Serrote', sets: 4, reps: '12', description: 'Com mochila pesada.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Serrote') },
        { id: 'l2-qui-3h', name: 'Rosca Direta', sets: 4, reps: '12-15', description: 'Segure nas alças da mochila.', muscleGroup: 'Bíceps', imageUrl: getImg('Rosca+Direta') },
        { id: 'l2-qui-4h', name: 'Rosca Martelo', sets: 3, reps: '15', description: 'Garrafas. Polegar para cima.', muscleGroup: 'Bíceps', imageUrl: getImg('Rosca+Martelo') },
        { id: 'l2-qui-5h', name: 'Prancha', sets: 3, reps: '1 min', description: 'Resistência do core.', muscleGroup: 'Core', imageUrl: getImg('Prancha') },
      ],
      exercisesGym: [
        { id: 'l2-qui-1g', name: 'Remada Curvada (Barra)', sets: 4, reps: '8-10', description: 'Tronco quase paralelo ao chão.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Curvada') },
        { id: 'l2-qui-2g', name: 'Puxada Alta (Polia)', sets: 4, reps: '10-12', description: 'Pegada aberta.', muscleGroup: 'Costas', imageUrl: getImg('Puxada+Alta') },
        { id: 'l2-qui-3g', name: 'Remada Baixa (Triângulo)', sets: 3, reps: '12', description: 'Alongue bem a dorsal.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Baixa') },
        { id: 'l2-qui-4g', name: 'Crucifixo Inverso', sets: 3, reps: '15', description: 'Foco no posterior de ombro.', muscleGroup: 'Ombros', imageUrl: getImg('Crucifixo+Inverso') },
        { id: 'l2-qui-5g', name: 'Rosca Direta (Barra)', sets: 4, reps: '10-12', description: 'Carga moderada/alta.', muscleGroup: 'Bíceps', imageUrl: getImg('Rosca+Barra') },
      ]
    },
    {
      dayName: 'Sexta-feira',
      focus: 'Treino D (Lower/Full)',
      isRestDay: false,
      exercisesHome: [
        { id: 'l2-sex-1h', name: 'Burpees', sets: 4, reps: '12', description: 'Cardio e força combinados.', muscleGroup: 'Full Body', imageUrl: getImg('Burpee') },
        { id: 'l2-sex-2h', name: 'Step-Up (Cadeira)', sets: 4, reps: '12/perna', description: 'Subida controlada.', muscleGroup: 'Pernas', imageUrl: getImg('Step-up') },
        { id: 'l2-sex-3h', name: 'Ponte de Glúteos', sets: 4, reps: '20', description: 'Pés elevados se possível.', muscleGroup: 'Glúteos', imageUrl: getImg('Ponte+Glúteos') },
        { id: 'l2-sex-4h', name: 'Abdominal Remador', sets: 4, reps: '20', description: 'Estenda e abrace os joelhos.', muscleGroup: 'Core', imageUrl: getImg('Abd+Remador') },
        { id: 'l2-sex-5h', name: 'Mountain Climbers', sets: 3, reps: '45s', description: 'Acelere o ritmo!', muscleGroup: 'Cardio', imageUrl: getImg('Mountain+Climbers') },
      ],
      exercisesGym: [
        { id: 'l2-sex-1g', name: 'Levantamento Terra', sets: 4, reps: '6-8', description: 'Força bruta. Técnica perfeita.', muscleGroup: 'Pernas/Costas', imageUrl: getImg('Levantamento+Terra') },
        { id: 'l2-sex-2g', name: 'Afundo com Halteres', sets: 3, reps: '10/perna', description: 'Caminhando ou parado.', muscleGroup: 'Pernas', imageUrl: getImg('Afundo+Halter') },
        { id: 'l2-sex-3g', name: 'Hack Machine', sets: 3, reps: '12', description: 'Foco no quadríceps.', muscleGroup: 'Pernas', imageUrl: getImg('Hack+Squat') },
        { id: 'l2-sex-4g', name: 'Cadeira Flexora Unilateral', sets: 3, reps: '12', description: 'Acerto de simetria.', muscleGroup: 'Posterior', imageUrl: getImg('Flexora+Uni') },
        { id: 'l2-sex-5g', name: 'Abdominal Infra (Barra)', sets: 4, reps: '12-15', description: 'Elevação de pernas pendurado.', muscleGroup: 'Core', imageUrl: getImg('Abd+Infra') },
      ]
    },
    {
      dayName: 'Sábado',
      focus: 'Mobilidade',
      isRestDay: true,
      exercisesHome: [
        { id: 'l2-sab-1', name: 'Yoga/Alongamento', sets: 1, reps: '30 mins', description: 'Alongamento profundo e relaxamento.', muscleGroup: 'Mobilidade', imageUrl: getImg('Yoga') }
      ],
      exercisesGym: [
        { id: 'l2-sab-1', name: 'Foam Roller + Alongamento', sets: 1, reps: '20 mins', description: 'Liberação miofascial.', muscleGroup: 'Mobilidade', imageUrl: getImg('Foam+Roller') }
      ]
    },
  ]
};

export const LEVEL_3_PLAN: WorkoutPlan = {
  id: 'avancado_performance',
  name: 'Nível 3: Avançado',
  minWorkoutsToUnlock: 50,
  workoutsToFinish: 30, // Meta ajustada: 30 dias
  schedule: [
     {
      dayName: 'Domingo',
      focus: 'Descanso Estratégico',
      isRestDay: true,
      exercisesHome: [{id: 'l3-dom', name: 'Recuperação Ativa', sets: 1, reps: '20-30 min', description: 'Caminhada leve, alongamento e meditação.', muscleGroup: 'Recuperação', imageUrl: getImg('Meditação')}],
      exercisesGym: [{id: 'l3-dom', name: 'Recuperação Ativa', sets: 1, reps: '20-30 min', description: 'Sauna, alongamento ou natação leve.', muscleGroup: 'Recuperação', imageUrl: getImg('Sauna')}]
    },
    {
      dayName: 'Segunda-feira',
      focus: 'Peito & Tríceps (Volume)',
      isRestDay: false,
      exercisesHome: [
        { id: 'l3-seg-1h', name: 'Flexão com Peso', sets: 4, reps: '12-15', description: 'Mochila nas costas.', muscleGroup: 'Peito', imageUrl: getImg('Flexão+Peso') },
        { id: 'l3-seg-2h', name: 'Flexão Archer', sets: 3, reps: '8/lado', description: 'Uma mão mais afastada.', muscleGroup: 'Peito', imageUrl: getImg('Flexão+Archer') },
        { id: 'l3-seg-3h', name: 'Flexão Declinada', sets: 4, reps: '12-15', description: 'Pés bem elevados.', muscleGroup: 'Peito Superior', imageUrl: getImg('Flexão+Declinada') },
        { id: 'l3-seg-4h', name: 'Flexão Diamante', sets: 4, reps: 'Até falha', description: 'Foco total em tríceps.', muscleGroup: 'Tríceps', imageUrl: getImg('Flexão+Diamante') },
        { id: 'l3-seg-5h', name: 'Mergulho entre Cadeiras', sets: 4, reps: '12-15', description: 'Vá fundo.', muscleGroup: 'Tríceps', imageUrl: getImg('Mergulho') },
      ],
      exercisesGym: [
        { id: 'l3-seg-1g', name: 'Supino Reto (Barra)', sets: 5, reps: '5-8', description: 'Carga pesada com técnica.', muscleGroup: 'Peito', imageUrl: getImg('Supino+Reto') },
        { id: 'l3-seg-2g', name: 'Supino Inclinado Halteres', sets: 4, reps: '8-10', description: 'Foco clavicular.', muscleGroup: 'Peito', imageUrl: getImg('Supino+Inclinado') },
        { id: 'l3-seg-3g', name: 'Supino Declinado', sets: 3, reps: '10-12', description: 'Parte inferior do peito.', muscleGroup: 'Peito', imageUrl: getImg('Supino+Declinado') },
        { id: 'l3-seg-4g', name: 'Crossover', sets: 4, reps: '12-15', description: 'Cruze as mãos.', muscleGroup: 'Peito', imageUrl: getImg('Crossover') },
        { id: 'l3-seg-5g', name: 'Tríceps Testa', sets: 4, reps: '10-12', description: 'Barra W.', muscleGroup: 'Tríceps', imageUrl: getImg('Tríceps+Testa') },
        { id: 'l3-seg-6g', name: 'Tríceps Corda', sets: 4, reps: '12-15', description: 'Drop set na última.', muscleGroup: 'Tríceps', imageUrl: getImg('Tríceps+Corda') },
      ]
    },
    {
      dayName: 'Terça-feira',
      focus: 'Costas & Bíceps (Volume)',
      isRestDay: false,
      exercisesHome: [
        { id: 'l3-ter-1h', name: 'Barra Fixa (ou Negativas)', sets: 4, reps: 'Até falha', description: 'O melhor para costas.', muscleGroup: 'Costas', imageUrl: getImg('Barra+Fixa') },
        { id: 'l3-ter-2h', name: 'Remada Invertida', sets: 4, reps: '12-15', description: 'Mesa ou barra baixa.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Invertida') },
        { id: 'l3-ter-3h', name: 'Remada Curvada Mochila', sets: 4, reps: '12', description: 'Mochila bem pesada.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Mochila') },
        { id: 'l3-ter-4h', name: 'Superman Y', sets: 3, reps: '15', description: 'Braços em Y.', muscleGroup: 'Lombar', imageUrl: getImg('Superman+Y') },
        { id: 'l3-ter-5h', name: 'Rosca Concentrada', sets: 4, reps: '12/braço', description: 'Foco na contração.', muscleGroup: 'Bíceps', imageUrl: getImg('Rosca+Concentrada') },
      ],
      exercisesGym: [
        { id: 'l3-ter-1g', name: 'Barra Fixa', sets: 4, reps: '6-10', description: 'Adicione peso se conseguir mais de 10.', muscleGroup: 'Costas', imageUrl: getImg('Barra+Fixa') },
        { id: 'l3-ter-2g', name: 'Remada Curvada', sets: 4, reps: '8-10', description: 'Barra ou halteres.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Curvada') },
        { id: 'l3-ter-3g', name: 'Puxada Fechada', sets: 4, reps: '10-12', description: 'Pegada supinada.', muscleGroup: 'Costas', imageUrl: getImg('Puxada+Fechada') },
        { id: 'l3-ter-4g', name: 'Remada Cavalinho', sets: 3, reps: '10-12', description: 'T-Bar.', muscleGroup: 'Costas', imageUrl: getImg('Remada+Cavalinho') },
        { id: 'l3-ter-5g', name: 'Pullover', sets: 3, reps: '12', description: 'Halter ou cabo.', muscleGroup: 'Costas', imageUrl: getImg('Pullover') },
        { id: 'l3-ter-6g', name: 'Rosca Direta Barra', sets: 4, reps: '8-10', description: 'Carga alta.', muscleGroup: 'Bíceps', imageUrl: getImg('Rosca+Barra') },
      ]
    },
    {
      dayName: 'Quarta-feira',
      focus: 'Pernas (Quadríceps)',
      isRestDay: false,
      exercisesHome: [
        { id: 'l3-qua-1h', name: 'Pistol Squat (Assistido)', sets: 4, reps: '6-8/perna', description: 'Segure em algo se precisar.', muscleGroup: 'Pernas', imageUrl: getImg('Pistol+Squat') },
        { id: 'l3-qua-2h', name: 'Agachamento Búlgaro', sets: 4, reps: '12/perna', description: 'Com mochila.', muscleGroup: 'Pernas', imageUrl: getImg('Búlgaro') },
        { id: 'l3-qua-3h', name: 'Agachamento Sumô com Salto', sets: 4, reps: '15', description: 'Explosivo.', muscleGroup: 'Pernas', imageUrl: getImg('Sumô+Salto') },
        { id: 'l3-qua-4h', name: 'Sissy Squat', sets: 3, reps: '12', description: 'Incline para trás.', muscleGroup: 'Quadríceps', imageUrl: getImg('Sissy+Squat') },
        { id: 'l3-qua-5h', name: 'Step-Up Alto', sets: 4, reps: '12/perna', description: 'Cadeira ou banco alto.', muscleGroup: 'Pernas', imageUrl: getImg('Step-Up') },
      ],
      exercisesGym: [
        { id: 'l3-qua-1g', name: 'Agachamento Livre', sets: 5, reps: '5-8', description: 'Carga pesada.', muscleGroup: 'Pernas', imageUrl: getImg('Agachamento+Livre') },
        { id: 'l3-qua-2g', name: 'Agachamento Frontal', sets: 4, reps: '8-10', description: 'Barra na frente.', muscleGroup: 'Quadríceps', imageUrl: getImg('Agachamento+Frontal') },
        { id: 'l3-qua-3g', name: 'Leg Press', sets: 4, reps: '10-12', description: 'Pés mais baixos = mais quadríceps.', muscleGroup: 'Pernas', imageUrl: getImg('Leg+Press') },
        { id: 'l3-qua-4g', name: 'Hack Squat', sets: 4, reps: '10-12', description: 'Foco em quadríceps.', muscleGroup: 'Quadríceps', imageUrl: getImg('Hack+Squat') },
        { id: 'l3-qua-5g', name: 'Cadeira Extensora', sets: 4, reps: '12-15', description: 'Drop set na última.', muscleGroup: 'Quadríceps', imageUrl: getImg('Extensora') },
      ]
    },
    {
      dayName: 'Quinta-feira',
      focus: 'Ombros & Abdômen',
      isRestDay: false,
      exercisesHome: [
        { id: 'l3-qui-1h', name: 'Pike Push-Up Elevado', sets: 4, reps: '10-12', description: 'Pés bem altos.', muscleGroup: 'Ombros', imageUrl: getImg('Pike+Push-Up') },
        { id: 'l3-qui-2h', name: 'Handstand Hold', sets: 4, reps: '20-30s', description: 'Na parede.', muscleGroup: 'Ombros', imageUrl: getImg('Handstand') },
        { id: 'l3-qui-3h', name: 'Elevação Lateral', sets: 4, reps: '15', description: 'Com peso improvisado.', muscleGroup: 'Ombros', imageUrl: getImg('Elev.+Lateral') },
        { id: 'l3-qui-4h', name: 'Elevação Frontal', sets: 3, reps: '12', description: 'Alternado.', muscleGroup: 'Ombros', imageUrl: getImg('Elev.+Frontal') },
        { id: 'l3-qui-5h', name: 'Abdominal Bicicleta', sets: 4, reps: '20/lado', description: 'Cotovelo no joelho oposto.', muscleGroup: 'Core', imageUrl: getImg('Abd+Bicicleta') },
      ],
      exercisesGym: [
        { id: 'l3-qui-1g', name: 'Desenvolvimento Barra', sets: 4, reps: '6-8', description: 'Em pé, carga pesada.', muscleGroup: 'Ombros', imageUrl: getImg('Desenv.+Barra') },
        { id: 'l3-qui-2g', name: 'Desenvolvimento Halteres', sets: 4, reps: '8-10', description: 'Sentado.', muscleGroup: 'Ombros', imageUrl: getImg('Desenv.+Halter') },
        { id: 'l3-qui-3g', name: 'Elevação Lateral', sets: 4, reps: '12-15', description: 'Drop set na última.', muscleGroup: 'Ombros', imageUrl: getImg('Elev.+Lateral') },
        { id: 'l3-qui-4g', name: 'Elevação Frontal', sets: 3, reps: '12', description: 'Com barra ou halteres.', muscleGroup: 'Ombros', imageUrl: getImg('Elev.+Frontal') },
        { id: 'l3-qui-5g', name: 'Crucifixo Inverso', sets: 4, reps: '12-15', description: 'Posterior de ombro.', muscleGroup: 'Ombros', imageUrl: getImg('Crucifixo+Inverso') },
      ]
    },
    {
      dayName: 'Sexta-feira',
      focus: 'Pernas (Posterior & Glúteos)',
      isRestDay: false,
      exercisesHome: [
        { id: 'l3-sex-1h', name: 'Stiff Unilateral', sets: 4, reps: '12/perna', description: 'Equilíbrio e posterior.', muscleGroup: 'Posterior', imageUrl: getImg('Stiff+Uni') },
        { id: 'l3-sex-2h', name: 'Hip Thrust', sets: 4, reps: '15-20', description: 'Costas no sofá, peso no quadril.', muscleGroup: 'Glúteos', imageUrl: getImg('Hip+Thrust') },
        { id: 'l3-sex-3h', name: 'Nordic Curl (Negativa)', sets: 3, reps: '5-8', description: 'Só a descida controlada.', muscleGroup: 'Posterior', imageUrl: getImg('Nordic+Curl') },
        { id: 'l3-sex-4h', name: 'Kickback Glúteo', sets: 4, reps: '15/perna', description: 'Quatro apoios.', muscleGroup: 'Glúteos', imageUrl: getImg('Kickback') },
        { id: 'l3-sex-5h', name: 'Good Morning', sets: 3, reps: '15', description: 'Peso nas costas ou mochila.', muscleGroup: 'Posterior', imageUrl: getImg('Good+Morning') },
      ],
      exercisesGym: [
        { id: 'l3-sex-1g', name: 'Stiff', sets: 4, reps: '8-10', description: 'Barra, carga alta.', muscleGroup: 'Posterior', imageUrl: getImg('Stiff') },
        { id: 'l3-sex-2g', name: 'Hip Thrust Barra', sets: 4, reps: '10-12', description: 'Glúteo máximo.', muscleGroup: 'Glúteos', imageUrl: getImg('Hip+Thrust+Barra') },
        { id: 'l3-sex-3g', name: 'Mesa Flexora', sets: 4, reps: '10-12', description: 'Segure no topo.', muscleGroup: 'Posterior', imageUrl: getImg('Mesa+Flexora') },
        { id: 'l3-sex-4g', name: 'Good Morning', sets: 3, reps: '12', description: 'Barra nas costas.', muscleGroup: 'Posterior', imageUrl: getImg('Good+Morning') },
        { id: 'l3-sex-5g', name: 'Abdução Máquina', sets: 4, reps: '15', description: 'Glúteo médio.', muscleGroup: 'Glúteos', imageUrl: getImg('Abdução') },
      ]
    },
    {
      dayName: 'Sábado',
      focus: 'Full Body Power',
      isRestDay: false,
      exercisesHome: [
        { id: 'l3-sab-1h', name: 'Burpee com Salto Alto', sets: 4, reps: '10', description: 'Máxima altura.', muscleGroup: 'Full Body', imageUrl: getImg('Burpee+Salto') },
        { id: 'l3-sab-2h', name: 'Flexão Explosiva', sets: 4, reps: '10', description: 'Bata palmas se conseguir.', muscleGroup: 'Peito', imageUrl: getImg('Flexão+Explosiva') },
        { id: 'l3-sab-3h', name: 'Jump Squat', sets: 4, reps: '15', description: 'Aterrisse suave.', muscleGroup: 'Pernas', imageUrl: getImg('Jump+Squat') },
        { id: 'l3-sab-4h', name: 'Mountain Climbers', sets: 3, reps: '60s', description: 'Ritmo alto.', muscleGroup: 'Cardio', imageUrl: getImg('Mountain+Climbers') },
      ],
      exercisesGym: [
        // REMOVED CROSSFIT EXERCISES (Power Clean, Box Jump, Push Press, KB Swing)
        // REPLACED WITH MACHINE/DUMBBELL FOCUS
        { id: 'l3-sab-1g', name: 'Agachamento no Smith', sets: 4, reps: '8-10', description: 'Movimento controlado e seguro.', muscleGroup: 'Pernas', imageUrl: getImg('Agachamento+Smith') },
        { id: 'l3-sab-2g', name: 'Desenvolvimento Arnold', sets: 4, reps: '8-12', description: 'Halteres, rotação de punho.', muscleGroup: 'Ombros', imageUrl: getImg('Desenv.+Arnold') },
        { id: 'l3-sab-3g', name: 'Leg Press 45º', sets: 4, reps: '10-12', description: 'Carga alta, segurança máxima.', muscleGroup: 'Pernas', imageUrl: getImg('Leg+Press') },
        { id: 'l3-sab-4g', name: 'Stiff com Halteres', sets: 4, reps: '10-12', description: 'Foco total no posterior.', muscleGroup: 'Posterior', imageUrl: getImg('Stiff+Halter') },
      ]
    },
  ]
};

export const PLANS = [LEVEL_1_PLAN, LEVEL_2_PLAN, LEVEL_3_PLAN];
