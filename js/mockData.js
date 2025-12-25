// Mock Data for ClasseConectada Application
// This simulates the backend database

// Initialize data from localStorage or use defaults
const MockData = {
  // Classes (Turmas)
  classes: [
    { id: 1, name: "Turma A", active: true },
    { id: 2, name: "Turma B", active: true },
    { id: 3, name: "Turma C", active: true }
  ],

  // Subjects (Matérias)
  subjects: [
    { id: 1, name: "Matemática", active: true },
    { id: 2, name: "Português", active: true },
    { id: 3, name: "Ciências", active: true },
    { id: 4, name: "Geografia", active: true },
    { id: 5, name: "História", active: true }
  ],

  // Users (Usuários) - includes students, teachers, and directors
  users: [
    // Director
    {
      id: 1,
      nome: "Administrador",
      email: "admin@email.com",
      senha: "123456",
      cpf: "123.456.789-00",
      telefone: "(11) 99999-0001",
      tipo: "DIRETOR",
      endereco: "Rua Principal, 100",
      pai: "",
      mae: "",
      active: true
    },
    // Teachers
    {
      id: 2,
      nome: "João Silva",
      email: "joao@email.com",
      senha: "123456",
      cpf: "123.456.789-01",
      telefone: "(11) 99999-0002",
      tipo: "PROFESSOR",
      endereco: "Rua das Flores, 200",
      pai: "",
      mae: "",
      turmaId: 1,
      turma: { id: 1, name: "Turma A" },
      active: true
    },
    {
      id: 3,
      nome: "Ana Oliveira",
      email: "ana@email.com",
      senha: "123456",
      cpf: "123.456.789-02",
      telefone: "(11) 99999-0003",
      tipo: "PROFESSOR",
      endereco: "Av. Central, 300",
      pai: "",
      mae: "",
      turmaId: 2,
      turma: { id: 2, name: "Turma B" },
      active: true
    },
    {
      id: 4,
      nome: "Carlos Mendes",
      email: "carlos@email.com",
      senha: "123456",
      cpf: "123.456.789-03",
      telefone: "(11) 99999-0004",
      tipo: "PROFESSOR",
      endereco: "Rua do Comércio, 400",
      pai: "",
      mae: "",
      turmaId: 3,
      turma: { id: 3, name: "Turma C" },
      active: true
    },
    // Students - Turma A
    {
      id: 5,
      nome: "Alice Santos",
      email: "alice@email.com",
      senha: "123456",
      cpf: "234.567.890-01",
      telefone: "(11) 98888-0001",
      tipo: "ALUNO",
      endereco: "Rua das Palmeiras, 10",
      pai: "Roberto Santos",
      mae: "Maria Santos",
      turmaId: 1,
      turma: { id: 1, name: "Turma A" },
      active: true
    },
    {
      id: 6,
      nome: "Bruno Costa",
      email: "bruno@email.com",
      senha: "123456",
      cpf: "234.567.890-02",
      telefone: "(11) 98888-0002",
      tipo: "ALUNO",
      endereco: "Av. Brasil, 20",
      pai: "José Costa",
      mae: "Fernanda Costa",
      turmaId: 1,
      turma: { id: 1, name: "Turma A" },
      active: true
    },
    {
      id: 7,
      nome: "Carolina Lima",
      email: "carolina@email.com",
      senha: "123456",
      cpf: "234.567.890-03",
      telefone: "(11) 98888-0003",
      tipo: "ALUNO",
      endereco: "Rua da Paz, 30",
      pai: "Paulo Lima",
      mae: "Sandra Lima",
      turmaId: 1,
      turma: { id: 1, name: "Turma A" },
      active: true
    },
    // Students - Turma B
    {
      id: 8,
      nome: "Daniel Alves",
      email: "daniel@email.com",
      senha: "123456",
      cpf: "234.567.890-04",
      telefone: "(11) 98888-0004",
      tipo: "ALUNO",
      endereco: "Rua das Acácias, 40",
      pai: "Marcos Alves",
      mae: "Juliana Alves",
      turmaId: 2,
      turma: { id: 2, name: "Turma B" },
      active: true
    },
    {
      id: 9,
      nome: "Eduarda Rocha",
      email: "eduarda@email.com",
      senha: "123456",
      cpf: "234.567.890-05",
      telefone: "(11) 98888-0005",
      tipo: "ALUNO",
      endereco: "Av. Paulista, 50",
      pai: "Ricardo Rocha",
      mae: "Patrícia Rocha",
      turmaId: 2,
      turma: { id: 2, name: "Turma B" },
      active: true
    },
    // Students - Turma C
    {
      id: 10,
      nome: "Felipe Martins",
      email: "felipe@email.com",
      senha: "123456",
      cpf: "234.567.890-06",
      telefone: "(11) 98888-0006",
      tipo: "ALUNO",
      endereco: "Rua do Sol, 60",
      pai: "André Martins",
      mae: "Cristina Martins",
      turmaId: 3,
      turma: { id: 3, name: "Turma C" },
      active: true
    },
    {
      id: 11,
      nome: "Gabriela Souza",
      email: "gabriela@email.com",
      senha: "123456",
      cpf: "234.567.890-07",
      telefone: "(11) 98888-0007",
      tipo: "ALUNO",
      endereco: "Rua da Lua, 70",
      pai: "Fernando Souza",
      mae: "Beatriz Souza",
      turmaId: 3,
      turma: { id: 3, name: "Turma C" },
      active: true
    }
  ],

  // Grades (Notas)
  grades: [
    // Alice Santos (id: 5) - Turma A
    { id: 1, studentId: 5, subjectId: 1, subject: { id: 1, name: "Matemática" }, value: 8.5, description: "Prova Bimestral", examDate: "2024-11-15" },
    { id: 2, studentId: 5, subjectId: 1, subject: { id: 1, name: "Matemática" }, value: 9.0, description: "Trabalho em Grupo", examDate: "2024-12-01" },
    { id: 3, studentId: 5, subjectId: 2, subject: { id: 2, name: "Português" }, value: 7.5, description: "Redação", examDate: "2024-11-20" },
    { id: 4, studentId: 5, subjectId: 3, subject: { id: 3, name: "Ciências" }, value: 9.5, description: "Experimento de Laboratório", examDate: "2024-12-05" },
    { id: 5, studentId: 5, subjectId: 4, subject: { id: 4, name: "Geografia" }, value: 8.0, description: "Prova Mensal", examDate: "2024-11-25" },
    
    // Bruno Costa (id: 6) - Turma A
    { id: 6, studentId: 6, subjectId: 1, subject: { id: 1, name: "Matemática" }, value: 7.0, description: "Prova Bimestral", examDate: "2024-11-15" },
    { id: 7, studentId: 6, subjectId: 2, subject: { id: 2, name: "Português" }, value: 6.5, description: "Redação", examDate: "2024-11-20" },
    { id: 8, studentId: 6, subjectId: 3, subject: { id: 3, name: "Ciências" }, value: 8.5, description: "Prova Prática", examDate: "2024-12-05" },
    
    // Carolina Lima (id: 7) - Turma A
    { id: 9, studentId: 7, subjectId: 1, subject: { id: 1, name: "Matemática" }, value: 9.5, description: "Prova Bimestral", examDate: "2024-11-15" },
    { id: 10, studentId: 7, subjectId: 2, subject: { id: 2, name: "Português" }, value: 9.0, description: "Redação", examDate: "2024-11-20" },
    { id: 11, studentId: 7, subjectId: 5, subject: { id: 5, name: "História" }, value: 8.5, description: "Trabalho sobre Brasil Colônia", examDate: "2024-12-10" },
    
    // Daniel Alves (id: 8) - Turma B
    { id: 12, studentId: 8, subjectId: 1, subject: { id: 1, name: "Matemática" }, value: 7.5, description: "Prova Bimestral", examDate: "2024-11-15" },
    { id: 13, studentId: 8, subjectId: 3, subject: { id: 3, name: "Ciências" }, value: 8.0, description: "Experimento", examDate: "2024-12-05" },
    
    // Eduarda Rocha (id: 9) - Turma B
    { id: 14, studentId: 9, subjectId: 2, subject: { id: 2, name: "Português" }, value: 9.5, description: "Redação", examDate: "2024-11-20" },
    { id: 15, studentId: 9, subjectId: 4, subject: { id: 4, name: "Geografia" }, value: 8.5, description: "Prova Mensal", examDate: "2024-11-25" },
    
    // Felipe Martins (id: 10) - Turma C
    { id: 16, studentId: 10, subjectId: 1, subject: { id: 1, name: "Matemática" }, value: 6.0, description: "Prova Bimestral", examDate: "2024-11-15" },
    { id: 17, studentId: 10, subjectId: 2, subject: { id: 2, name: "Português" }, value: 7.0, description: "Redação", examDate: "2024-11-20" },
    
    // Gabriela Souza (id: 11) - Turma C
    { id: 18, studentId: 11, subjectId: 1, subject: { id: 1, name: "Matemática" }, value: 10.0, description: "Prova Bimestral", examDate: "2024-11-15" },
    { id: 19, studentId: 11, subjectId: 3, subject: { id: 3, name: "Ciências" }, value: 9.5, description: "Experimento", examDate: "2024-12-05" },
    { id: 20, studentId: 11, subjectId: 5, subject: { id: 5, name: "História" }, value: 9.0, description: "Trabalho", examDate: "2024-12-10" }
  ],

  // Observations (Observações)
  observations: [
    { id: 1, studentId: 5, description: "Aluna muito dedicada e participativa em sala", date: "2024-11-10" },
    { id: 2, studentId: 5, description: "Apresentou melhora significativa em matemática", date: "2024-12-01" },
    { id: 3, studentId: 6, description: "Precisa melhorar a concentração durante as aulas", date: "2024-11-15" },
    { id: 4, studentId: 7, description: "Excelente desempenho em todas as disciplinas", date: "2024-11-20" },
    { id: 5, studentId: 8, description: "Bom aluno, mas falta com frequência", date: "2024-11-25" },
    { id: 6, studentId: 9, description: "Destaque na disciplina de Português", date: "2024-12-05" },
    { id: 7, studentId: 10, description: "Precisa de acompanhamento em matemática", date: "2024-12-08" },
    { id: 8, studentId: 11, description: "Aluna exemplar, referência para a turma", date: "2024-12-12" }
  ],

  // Helper methods
  getNextId(collection) {
    const items = this[collection];
    if (!items || items.length === 0) return 1;
    return Math.max(...items.map(item => item.id)) + 1;
  }
};

// Load data from localStorage if available
function loadFromLocalStorage() {
  const stored = localStorage.getItem('classeConectadaData');
  if (stored) {
    try {
      const data = JSON.parse(stored);
      Object.assign(MockData, data);
    } catch (e) {
      console.error('Error loading data from localStorage:', e);
    }
  }
}

// Save data to localStorage
function saveToLocalStorage() {
  try {
    const dataToSave = {
      classes: MockData.classes,
      subjects: MockData.subjects,
      users: MockData.users,
      grades: MockData.grades,
      observations: MockData.observations
    };
    localStorage.setItem('classeConectadaData', JSON.stringify(dataToSave));
  } catch (e) {
    console.error('Error saving data to localStorage:', e);
  }
}

// Initialize data on load
loadFromLocalStorage();
