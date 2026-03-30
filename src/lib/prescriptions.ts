// ── 타입 정의 ──────────────────────────────────────────
export type Concern = '번아웃' | '인간관계' | '자존감' | '외로움' | '진로' | '막연한불안'
export type Reason  = '편안해지고싶어서' | '소중한사람때문에' | '나답게살고싶어서' | '성장하고싶어서'
export type MBTI_EI = 'E' | 'I'
export type MBTI_SN = 'S' | 'N'
export type MBTI_TF = 'T' | 'F'
export type MBTI_JP = 'J' | 'P'

export interface MBTIAnswers {
  EI: MBTI_EI | ''
  SN: MBTI_SN | ''
  TF: MBTI_TF | ''
  JP: MBTI_JP | ''
}

export interface Prescription {
  typeName: string
  meditation: { title: string; desc: string }
  tea:        { title: string; desc: string }
  incense:    { title: string; desc: string }
}

export interface RxSession {
  id: string           // 문서 ID
  code: string         // 4자리 출력 코드 (예: A3K7)
  mbti: string
  concern: Concern
  reason: Reason
  freeText: string
  aiLine: string
  prescription: Prescription
  createdAt: Date
  printed: boolean
  eventId: string      // 행사별 구분 (예: seon2026)
}

// ── 24가지 처방 매트릭스 ──────────────────────────────────
export const PRESCRIPTIONS: Record<Concern, Record<Reason, Prescription>> = {
  '번아웃': {
    '편안해지고싶어서': {
      typeName: '멈추지 못한 파도 속 등대를 찾는 사람',
      meditation: { title: '바디스캔 명상', desc: '발끝부터 머리끝까지 몸의 감각을 천천히 알아차리며 긴장을 내려놓습니다.' },
      tea:        { title: '캐모마일티',    desc: '흥분된 마음을 부드럽게 내려놓습니다.' },
      incense:    { title: '라벤더 인센스', desc: '더 잘해야 한다는 조급함을 향기와 함께 태워 보냅니다.' },
    },
    '소중한사람때문에': {
      typeName: '사랑하는 이를 위해 자신을 잃어가는 사람',
      meditation: { title: '자비 명상',     desc: '나 자신에게 먼저 따뜻한 마음을 보내고, 그 온기를 소중한 사람에게 전합니다.' },
      tea:        { title: '로즈힙티',      desc: '지친 몸과 마음을 붉은 생명력으로 채워드립니다.' },
      incense:    { title: '백단향 인센스', desc: '상대를 위한 마음이 나를 지치게 할 때, 먼저 나를 채우세요.' },
    },
    '나답게살고싶어서': {
      typeName: '남의 기대를 등에 업고 달려온 사람',
      meditation: { title: '호흡 명상',     desc: '숨을 들이쉬고 내쉬며, 지금 이 순간의 나 자신으로 돌아옵니다.' },
      tea:        { title: '페퍼민트티',    desc: '뭉쳐있던 마음을 시원하게 열어드립니다.' },
      incense:    { title: '편백 인센스',   desc: '타인의 시선이 아닌 나의 향기를 찾아가는 시간입니다.' },
    },
    '성장하고싶어서': {
      typeName: '쉬어야 할 때도 달리려는 사람',
      meditation: { title: '바디스캔 명상', desc: '성장은 달릴 때가 아니라 멈출 때 일어납니다. 지금 몸이 보내는 신호를 들어보세요.' },
      tea:        { title: '캐모마일티',    desc: '피로한 신경계를 부드럽게 달래드립니다.' },
      incense:    { title: '편백 인센스',   desc: '숲처럼 천천히, 그러나 깊이 뿌리내리는 성장을 선물합니다.' },
    },
  },
  '인간관계': {
    '편안해지고싶어서': {
      typeName: '관계 속에서 길을 잃은 사람',
      meditation: { title: '자비 명상',     desc: '나 → 가까운 사람 → 모든 존재 순서로 따뜻한 마음을 보내봅니다.' },
      tea:        { title: '로즈힙티',      desc: '사랑하는 마음이 물처럼 흘러갑니다.' },
      incense:    { title: '장미 인센스',   desc: '상대의 반응을 통제하려는 마음을 부드럽게 내려놓으세요.' },
    },
    '소중한사람때문에': {
      typeName: '사랑하는 사람을 위해 흘린 눈물',
      meditation: { title: '자비 명상',     desc: '나에서 시작해 그 사람, 그리고 모든 존재로 자비의 마음을 넓혀갑니다.' },
      tea:        { title: '로즈힙티',      desc: '사랑하는 마음이 물처럼 흘러갑니다.' },
      incense:    { title: '장미 인센스',   desc: '상대의 반응을 통제하려는 마음을 내려놓으세요.' },
    },
    '나답게살고싶어서': {
      typeName: '관계에서 나를 잃어버린 사람',
      meditation: { title: '자애 명상',     desc: '나에게 보내는 편지처럼, 스스로에게 따뜻한 말을 건네봅니다.' },
      tea:        { title: '라벤더티',      desc: '있는 그대로의 당신을 부드럽게 안아드립니다.' },
      incense:    { title: '라벤더 인센스', desc: '관계 속에서 지워진 나를 다시 찾는 시간입니다.' },
    },
    '성장하고싶어서': {
      typeName: '관계를 통해 더 나아지고 싶은 사람',
      meditation: { title: '자비 명상',     desc: '관계의 어려움을 성장의 거울로 바라보는 연습을 합니다.' },
      tea:        { title: '히비스커스티',  desc: '선명한 색처럼 자신의 경계를 분명히 하세요.' },
      incense:    { title: '백단향 인센스', desc: '관계를 통해 나를 더 깊이 이해하는 향기로운 시간입니다.' },
    },
  },
  '자존감': {
    '편안해지고싶어서': {
      typeName: '스스로를 채찍질하다 지친 사람',
      meditation: { title: '자애 명상',     desc: '지금의 나, 있는 그대로의 나에게 따뜻한 말을 건네봅니다.' },
      tea:        { title: '라벤더티',      desc: '있는 그대로의 당신을 부드럽게 안아드립니다.' },
      incense:    { title: '라벤더 인센스', desc: '나는 부족하다는 생각을 향기와 함께 태워 보냅니다.' },
    },
    '소중한사람때문에': {
      typeName: '사랑받기 위해 스스로를 바꾸려는 사람',
      meditation: { title: '자애 명상',     desc: '나에게 보내는 편지처럼, 스스로에게 따뜻한 말을 건네봅니다.' },
      tea:        { title: '라벤더티',      desc: '있는 그대로의 당신을 부드럽게 안아드립니다.' },
      incense:    { title: '라벤더 인센스', desc: '나는 부족하다는 생각을 내려놓으세요.' },
    },
    '나답게살고싶어서': {
      typeName: '거울 속 나에게 말을 걸지 못하는 사람',
      meditation: { title: '자애 명상',     desc: '나에게 보내는 편지처럼, 스스로에게 따뜻한 말을 건네봅니다.' },
      tea:        { title: '라벤더티',      desc: '있는 그대로의 당신을 부드럽게 안아드립니다.' },
      incense:    { title: '라벤더 인센스', desc: '나는 부족하다는 생각을 내려놓습니다.' },
    },
    '성장하고싶어서': {
      typeName: '더 나은 내가 되고 싶어 오늘도 애쓰는 사람',
      meditation: { title: '성찰 명상',       desc: '오늘 하루 잘한 것 세 가지를 마음속에 새기며 스스로를 칭찬합니다.' },
      tea:        { title: '페퍼민트티',      desc: '새로운 나를 향해 나아가는 청량한 에너지를 드립니다.' },
      incense:    { title: '유칼립투스 인센스', desc: '성장은 자신을 사랑하는 것에서 시작됩니다.' },
    },
  },
  '외로움': {
    '편안해지고싶어서': {
      typeName: '고요함과 쓸쓸함 사이에 있는 사람',
      meditation: { title: '호흡 카운팅 명상', desc: '4-7-8 호흡법으로 혼자이지만 연결된 느낌을 찾아봅니다.' },
      tea:        { title: '페퍼민트티',       desc: '차가운 바람 속에서도 온기를 지키세요.' },
      incense:    { title: '오렌지 인센스',    desc: '따뜻한 햇살처럼 마음을 감싸드립니다.' },
    },
    '소중한사람때문에': {
      typeName: '함께이고 싶은 마음이 큰 사람',
      meditation: { title: '자비 명상',  desc: '그리운 사람을 마음속에 떠올리며 따뜻한 마음을 보냅니다.' },
      tea:        { title: '로즈힙티',   desc: '연결의 따뜻함을 한 모금씩 느껴보세요.' },
      incense:    { title: '장미 인센스', desc: '소중한 인연에 감사하는 마음을 향기로 표현합니다.' },
    },
    '나답게살고싶어서': {
      typeName: '나다운 연결을 찾는 사람',
      meditation: { title: '자애 명상',  desc: '나 자신과의 관계를 먼저 회복합니다. 나를 좋아해야 타인과도 연결됩니다.' },
      tea:        { title: '페퍼민트티', desc: '자신만의 향기를 찾아가는 시간입니다.' },
      incense:    { title: '편백 인센스', desc: '나다운 삶이 자연스러운 연결을 만들어냅니다.' },
    },
    '성장하고싶어서': {
      typeName: '혼자서도 그룹을 만드는 외로운 건축가',
      meditation: { title: '호흡 카운팅 명상',  desc: '4-7-8 호흡법으로 집중력을 높이고 내면의 힘을 키웁니다.' },
      tea:        { title: '페퍼민트티',         desc: '차가운 바람 속에서도 온기를 지키세요.' },
      incense:    { title: '유칼립투스 인센스',   desc: '아무도 나를 모른다는 두려움을 넘어서는 용기를 드립니다.' },
    },
  },
  '진로': {
    '편안해지고싶어서': {
      typeName: '지도 없이 길을 걷는 용감한 여행자',
      meditation: { title: '걷기 명상',    desc: '한 걸음씩 발바닥의 감각을 느끼며 걷습니다. 답은 걷는 중에 옵니다.' },
      tea:        { title: '레몬밤티',     desc: '알 수 없는 내일을 향기로운 오늘로 바꿔요.' },
      incense:    { title: '시더우드 인센스', desc: '정답을 몰라서 불안한 마음을 내려놓고 지금에 머뭅니다.' },
    },
    '소중한사람때문에': {
      typeName: '사랑하는 이를 위한 길을 찾는 사람',
      meditation: { title: '걷기 명상',    desc: '걷는 동안 소중한 사람을 마음에 품고, 그를 위한 나의 길을 생각해봅니다.' },
      tea:        { title: '레몬밤티',     desc: '마음을 맑게 하여 방향을 찾을 수 있도록 도와드립니다.' },
      incense:    { title: '재스민 인센스', desc: '사랑하는 사람과 함께하는 미래를 그려봅니다.' },
    },
    '나답게살고싶어서': {
      typeName: '세상의 기준이 아닌 나의 길을 찾는 사람',
      meditation: { title: '걷기 명상',  desc: '한 걸음씩 내 발로 걷습니다. 남의 지도가 아닌 내 발자국이 길이 됩니다.' },
      tea:        { title: '레몬밤티',   desc: '나다운 선택을 위한 맑은 정신을 드립니다.' },
      incense:    { title: '편백 인센스', desc: '나만의 향기로 나만의 길을 만들어가세요.' },
    },
    '성장하고싶어서': {
      typeName: '더 넓은 세계를 향해 나아가는 사람',
      meditation: { title: '걷기 명상',      desc: '걷는 것 자체가 성장입니다. 목적지보다 과정에 집중합니다.' },
      tea:        { title: '레몬밤티',       desc: '선명한 목표를 향해 나아가는 에너지를 드립니다.' },
      incense:    { title: '시더우드 인센스', desc: '나무처럼 천천히, 그러나 깊이 성장하세요.' },
    },
  },
  '막연한불안': {
    '편안해지고싶어서': {
      typeName: '이유 없이 흔들리는 수면 위의 달',
      meditation: { title: '좌선 명상',    desc: '호흡에만 집중합니다. 생각이 오면 구름처럼 바라보고 흘려보냅니다.' },
      tea:        { title: '재스민티',     desc: '이유 없이 편안해져도 괜찮습니다.' },
      incense:    { title: '라벤더 인센스', desc: '뭐가 불안한지도 모르겠는 마음을 향기로 달래드립니다.' },
    },
    '소중한사람때문에': {
      typeName: '사랑하는 이의 안위가 걱정되는 사람',
      meditation: { title: '자비 명상',    desc: '소중한 사람의 행복을 바라는 마음을 보내며 불안을 내려놓습니다.' },
      tea:        { title: '캐모마일티',   desc: '걱정을 부드럽게 내려놓도록 도와드립니다.' },
      incense:    { title: '라벤더 인센스', desc: '사랑하는 마음 자체가 이미 그 사람을 지키고 있습니다.' },
    },
    '나답게살고싶어서': {
      typeName: '불안 속에서도 나를 잃지 않으려는 사람',
      meditation: { title: '좌선 명상',    desc: '불안한 마음도 나의 일부입니다. 판단 없이 바라봅니다.' },
      tea:        { title: '재스민티',     desc: '이유 없이 편안해져도 괜찮습니다.' },
      incense:    { title: '백단향 인센스', desc: '흔들려도 괜찮습니다. 뿌리는 여기 있습니다.' },
    },
    '성장하고싶어서': {
      typeName: '불안을 넘어 성장하고 싶은 사람',
      meditation: { title: '좌선 명상',        desc: '불안과 함께 앉아봅니다. 도망가지 않을 때 성장이 시작됩니다.' },
      tea:        { title: '페퍼민트티',        desc: '불안을 에너지로 전환하는 청량한 힘을 드립니다.' },
      incense:    { title: '유칼립투스 인센스',  desc: '불안은 변화의 신호입니다. 당신은 성장 중입니다.' },
    },
  },
}

// ── MBTI 반영 텍스트 ──────────────────────────────────────
export const MBTI_MODIFIERS = {
  meditation: {
    E: '움직임과 소리를 활용해 외부에서 내면으로 집중합니다.',
    I: '고요히 내면으로 향하며 깊은 집중 상태로 들어갑니다.',
  },
  practice: {
    J: '매일 같은 시간, 딱 5분씩 루틴으로 실천해보세요.',
    P: '생각날 때마다, 부담 없이 잠깐씩 해도 충분합니다.',
  },
  aiTone: {
    T: '논리적이고 명확하되 따뜻하게',
    F: '감성적이고 따뜻하게',
  },
  aiStyle: {
    S: '구체적이고 현실적인 행동 중심으로',
    N: '은유적이고 시적인 표현으로',
  },
}

// ── 기본 AI 한줄 (freeText 없을 때) ──────────────────────
export const DEFAULT_AI_LINES: Record<Concern, Record<'T' | 'F', string>> = {
  '번아웃': {
    T: '지금 멈추는 것이 오히려 가장 효율적인 선택입니다.',
    F: '지금 이 순간 멈출 수 있다는 것, 그것만으로도 충분한 용기입니다.',
  },
  '인간관계': {
    T: '관계의 어려움은 상대가 아닌 기대값의 문제일 수 있습니다.',
    F: '관계에서 상처받는다는 건, 진심으로 연결되고 싶다는 뜻입니다.',
  },
  '자존감': {
    T: '자신을 객관적으로 바라볼 수 있다는 것, 이미 성장의 증거입니다.',
    F: '스스로를 바라볼 수 있다는 것, 그것이 이미 성장의 시작입니다.',
  },
  '외로움': {
    T: '혼자인 시간은 자기 자신을 가장 깊이 이해할 수 있는 기회입니다.',
    F: '혼자라는 느낌이 드는 지금, 가장 가까운 자신과 만날 시간입니다.',
  },
  '진로': {
    T: '방향이 없다는 것은 아직 최적의 경로가 결정되지 않았다는 뜻입니다.',
    F: '방향을 모른다는 것은 아직 가능성이 열려있다는 뜻이기도 합니다.',
  },
  '막연한불안': {
    T: '불안은 뇌가 위협을 감지한다는 신호입니다. 지금은 안전합니다.',
    F: '이유를 몰라도 괜찮습니다. 불안도 당신의 일부입니다.',
  },
}

// ── 코드 생성 (불교 한글 조합: "XXX의 YY") ──────────────────
// 앞 단어 (3글자) × 뒤 단어 (2글자) = 최대 400가지 조합
const CODE_PREFIX = [
  '연꽃의', '자비의', '지혜의', '보리의', '인연의', '무상의',
  '선정의', '공덕의', '법계의', '청정의', '원력의', '서원의',
  '해탈의', '열반의', '반야의', '정토의', '불심의', '묘법의',
  '자등의', '각성의',
]
const CODE_SUFFIX = [
  '해탈', '보살', '선정', '공덕', '열반', '반야',
  '자비', '지혜', '보리', '인연', '원력', '청정',
  '법계', '서원', '묘법', '정토', '각성', '불심',
  '연꽃', '무상',
]

export function generateCode(): string {
  const prefix = CODE_PREFIX[Math.floor(Math.random() * CODE_PREFIX.length)]
  const suffix = CODE_SUFFIX[Math.floor(Math.random() * CODE_SUFFIX.length)]
  if (prefix.replace('의', '') === suffix) return generateCode()
  return `${prefix} ${suffix}`
}

export function isValidCode(code: string): boolean {
  return /^.+의 .+$/.test(code)
}

// ── 라벨 매핑 (UI 표시용) ────────────────────────────────
export const CONCERN_LABELS: Record<Concern, string> = {
  '번아웃':    '번아웃·피로',
  '인간관계':  '인간관계',
  '자존감':    '자존감',
  '외로움':    '외로움',
  '진로':      '진로·미래',
  '막연한불안': '막연한 불안',
}

export const REASON_LABELS: Record<Reason, string> = {
  '편안해지고싶어서': '편안해지고 싶어서',
  '소중한사람때문에': '소중한 사람 때문에',
  '나답게살고싶어서': '나답게 살고 싶어서',
  '성장하고싶어서':   '성장하고 싶어서',
}
