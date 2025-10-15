// Превод на полетата на български
export const fieldLabels = {
  // Основни полета
  name: 'Име на читалището',
  region: 'Област',
  municipality: 'Община',
  location: 'Населено място',
  address: 'Адрес',
  phones: 'Телефони',
  emails: 'Имейли',
  website: 'Уебсайт',
  social_media: 'Социални мрежи',
  chairman: 'Председател',
  secretary: 'Секретар',
  eik: 'ЕИК',
  is_registered: 'Регистрирано в Агенцията по вписванията',
  building_ownership: 'Собственост на сградата',
  population: 'Брой жители на населеното място',
  
  // Годинни данни
  total_members_count: 'Общ брой на членовете',
  membership_applications: 'Подадени молби за членство',
  new_members: 'Новоприети членове',
  rejected_members: 'Брой отказани молби',
  library_activity: 'Библиотечно-информационна дейност',
  participation_in_live_human_treasures_regional: 'Участие в Живи човешки съкровища - регионална листа',
  participation_in_live_human_treasures_national: 'Участие в Живи човешки съкровища - национална листа',
  workshops_clubs_arts: 'Кръжоци, клубове и школи по изкуствата',
  workshops_clubs_arts_text: 'Кръжоци, клубове и школи по изкуствата - описание',
  language_courses: 'Езикови школи и курсове',
  language_courses_text: 'Езикови школи и курсове - описание',
  kraeznanie_clubs: 'Клубове по краезнание',
  kraeznanie_clubs_text: 'Клубове по краезнание - описание',
  museum_collections: 'Музейни колекции',
  museum_collections_text: 'Музейни колекции - описание',
  folklore_formations: 'Фолклорни състави и формации',
  theatre_formations: 'Театрални състави',
  dancing_groups: 'Танцови състави и групи',
  modern_ballet: 'Групи за класически и/или модерен балет',
  vocal_groups: 'Вокални групи',
  other_clubs: 'Други клубове',
  participation_in_events: 'Участие в събития',
  projects_participation_leading: 'Проекти - самостоятелно изпълнение',
  projects_participation_partner: 'Проекти - в сътрудничество',
  disabilities_and_volunteers: 'Работа с хора с увреждания и доброволчество',
  other_activities: 'Други дейности',
  subsidiary_count: 'Субсидирана численост',
  employees_count: 'Общ персонал',
  employees_with_higher_education: 'Специалисти с висше образование',
  employees_specialized: 'Специализирани длъжности',
  administrative_positions: 'Административни длъжности',
  supporting_employees: 'Помощен персонал',
  participation_in_trainings: 'Участие в обучения',
  sanctions_for31and33: 'Наложени санкции'
};

// Helper функции за обработка на данните
export const processChitalishteData = (data) => {
  if (!data || !Array.isArray(data)) return [];
  
  return data.map(item => {
    const processed = { ...item };
    
    // Груповане на годинните данни
    processed.yearlyData = {
      2023: {},
      2022: {},
      2021: {}
    };
    
    // Дефинираме полетата за годинни данни
    const yearlyFields = [
      'total_members_count',
      'membership_applications', 
      'new_members',
      'rejected_members',
      'library_activity',
      'participation_in_live_human_treasures_regional',
      'participation_in_live_human_treasures_national',
      'workshops_clubs_arts',
      'workshops_clubs_arts_text',
      'language_courses',
      'language_courses_text',
      'kraeznanie_clubs',
      'kraeznanie_clubs_text',
      'museum_collections',
      'museum_collections_text',
      'folklore_formations',
      'theatre_formations',
      'dancing_groups',
      'modern_ballet',
      'vocal_groups',
      'other_clubs',
      'participation_in_events',
      'projects_participation_leading',
      'projects_participation_partner',
      'disabilities_and_volunteers',
      'other_activities',
      'subsidiary_count',
      'employees_count',
      'employees_with_higher_education',
      'employees_specialized',
      'administrative_positions',
      'supporting_employees',
      'participation_in_trainings',
      'sanctions_for31and33'
    ];
    
    yearlyFields.forEach(field => {
      processed.yearlyData[2023][field] = item[field];
      processed.yearlyData[2022][field] = item[`${field}_2022`] || item[field];
      processed.yearlyData[2021][field] = item[`${field}_2021`] || item[field];
    });
    
    return processed;
  });
};

// Примерни данни за тестване
export const mockChitalishta = [
  {
    id: '1',
    name: 'Читалище "Просвета - 1928"',
    location: 'София',
    municipality: 'Столична',
    region: 'София-град',
    address: 'ул. "Цар Иван Шишман" №15, София',
    phones: ['+359 2 987 6543', '+359 888 123 456'],
    emails: ['prosveta1928@abv.bg', 'info@prosveta1928.org'],
    website: 'www.prosveta1928.org',
    socialMedia: 'facebook.com/prosveta1928',
    
    chairman: 'Иван Петров',
    secretary: 'Мария Иванова',
    eik: '123456789',
    isRegistered: 'yes',
    
    totalMembers: 150,
    membershipApplications: 25,
    newMembers: 18,
    rejectedApplications: 2,
    
    totalStaff: 8,
    subsidizedPositions: 3,
    annualSubsidy: 15000,
    
    independentProjects: 3,
    partnershipProjects: 5,
    trainingParticipations: 2,
    
    libraryUnits: 8542,
    newLibraryUnits: 156,
    
    buildingOwnership: 'chitalishte',
    
    narrative: 'Читалище "Просвета - 1928" е културен център с богата история и традиции. Организираме редовни културни събития, занимания по интереси и образователни програми за всички възрасти.',
    population: 15200,
    
    chitalishtaRegistryLink: '#',
    libraryRegistryLink: '#',
    
    nationalRanking: 567,
    totalChitalishta: 3700
  },
  {
    id: '2',
    name: 'Читалище "Напредък"',
    location: 'Пловдив',
    municipality: 'Пловдив',
    region: 'Пловдив',
    address: 'пл. "Централен" №8, Пловдив',
    phones: ['+359 32 456 789'],
    emails: ['napredak@mail.bg'],
    website: '',
    socialMedia: '',
    
    chairman: 'Георги Димитров',
    secretary: 'Елена Стоянова',
    eik: '987654321',
    isRegistered: 'yes',
    
    totalMembers: 89,
    membershipApplications: 12,
    newMembers: 10,
    rejectedApplications: 1,
    
    totalStaff: 5,
    subsidizedPositions: 2,
    annualSubsidy: 8500,
    
    independentProjects: 2,
    partnershipProjects: 3,
    trainingParticipations: 1,
    
    libraryUnits: 6231,
    newLibraryUnits: 89,
    
    buildingOwnership: 'municipal',
    
    narrative: 'Активно читалище, фокусирано върху младежките инициативи и съвременни културни прояви.',
    population: 23400,
    
    nationalRanking: 1245,
    totalChitalishta: 3700
  },
  {
    id: '3',
    name: 'Читалище "Зора"',
    location: 'Варна',
    municipality: 'Варна',
    region: 'Варна',
    address: 'бул. "Приморски" №25, Варна',
    phones: ['+359 52 789 123'],
    emails: ['zora.varna@gmail.com'],
    website: 'www.zora-chitalishte.com',
    socialMedia: 'facebook.com/zorachitalishte',
    
    chairman: 'Петър Николов',
    secretary: 'Светла Георгиева',
    eik: '456789123',
    isRegistered: 'yes',
    
    totalMembers: 210,
    membershipApplications: 35,
    newMembers: 28,
    rejectedApplications: 3,
    
    totalStaff: 12,
    subsidizedPositions: 4,
    annualSubsidy: 22000,
    
    independentProjects: 5,
    partnershipProjects: 7,
    trainingParticipations: 4,
    
    libraryUnits: 12045,
    newLibraryUnits: 234,
    
    buildingOwnership: 'chitalishte',
    
    narrative: 'Едно от най-активните читалища във Варненския регион с модерна инфраструктура и разнообразна програма.',
    population: 18700,
    
    nationalRanking: 234,
    totalChitalishta: 3700
  }
];

export const municipalities = ['Столична', 'Пловдив', 'Варна', 'Бургас', 'Русе'];
export const regions = ['София-град', 'Пловдив', 'Варна', 'Бургас', 'Русе', 'Стара Загора'];