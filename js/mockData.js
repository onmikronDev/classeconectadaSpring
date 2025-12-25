// Mock data for the application
const mockData = {
  // Turmas
  turmas: [
    { id: 1, nome: "Turma A", descricao: "Turma do período matutino", ativo: 1 },
    { id: 2, nome: "Turma B", descricao: "Turma do período vespertino", ativo: 1 },
    { id: 3, nome: "Turma C", descricao: "Turma do período noturno", ativo: 1 }
  ],

  // Usuários
  usuarios: [
    { id: 1, nome: "Administrador", email: "admin@email.com", senha: "123456", tipo: "DIRETOR", ativo: 1 },
    { id: 2, nome: "João Silva", email: "joao@email.com", senha: "123456", tipo: "PROFESSOR", ativo: 1 },
    { id: 3, nome: "Ana Santos", email: "ana@email.com", senha: "123456", tipo: "PROFESSOR", ativo: 1 },
    { id: 4, nome: "Carlos Pereira", email: "carlos@email.com", senha: "123456", tipo: "PROFESSOR", ativo: 1 },
    { id: 5, nome: "Alice Oliveira", email: "alice@email.com", senha: "123456", tipo: "ALUNO", ativo: 1, school_class_id: 1, matricula: "MAT001" },
    { id: 6, nome: "João Aluno", email: "joao.aluno@email.com", senha: "123456", tipo: "ALUNO", ativo: 1, school_class_id: 1, matricula: "MAT002" },
    { id: 7, nome: "Maria Costa", email: "maria@email.com", senha: "123456", tipo: "ALUNO", ativo: 1, school_class_id: 1, matricula: "MAT003" },
    { id: 8, nome: "Pedro Souza", email: "pedro@email.com", senha: "123456", tipo: "ALUNO", ativo: 1, school_class_id: 1, matricula: "MAT004" },
    { id: 9, nome: "Julia Fernandes", email: "julia@email.com", senha: "123456", tipo: "ALUNO", ativo: 1, school_class_id: 2, matricula: "MAT005" },
    { id: 10, nome: "Lucas Martins", email: "lucas@email.com", senha: "123456", tipo: "ALUNO", ativo: 1, school_class_id: 2, matricula: "MAT006" },
    { id: 11, nome: "Beatriz Lima", email: "beatriz@email.com", senha: "123456", tipo: "ALUNO", ativo: 1, school_class_id: 3, matricula: "MAT007" },
    { id: 12, nome: "Rafael Santos", email: "rafael@email.com", senha: "123456", tipo: "ALUNO", ativo: 1, school_class_id: 3, matricula: "MAT008" }
  ],

  // Matérias
  materias: [
    { id: 1, nome: "Matemática", descricao: "Álgebra e Geometria", teacher_id: 2, school_class_id: 1, ativo: 1 },
    { id: 2, nome: "Português", descricao: "Gramática e Literatura", teacher_id: 3, school_class_id: 1, ativo: 1 },
    { id: 3, nome: "Ciências", descricao: "Biologia e Física", teacher_id: 4, school_class_id: 1, ativo: 1 },
    { id: 4, nome: "Geografia", descricao: "Geografia Geral", teacher_id: 2, school_class_id: 2, ativo: 1 },
    { id: 5, nome: "História", descricao: "História do Brasil", teacher_id: 3, school_class_id: 2, ativo: 1 }
  ],

  // Notas
  notas: [
    { id: 1, student_id: 5, subject_id: 1, value: 8.5, description: "Prova Bimestral", examDate: "2024-12-01" },
    { id: 2, student_id: 5, subject_id: 2, value: 9.0, description: "Trabalho em Grupo", examDate: "2024-12-05" },
    { id: 3, student_id: 6, subject_id: 1, value: 7.5, description: "Prova Bimestral", examDate: "2024-12-01" },
    { id: 4, student_id: 6, subject_id: 2, value: 8.0, description: "Trabalho em Grupo", examDate: "2024-12-05" },
    { id: 5, student_id: 7, subject_id: 1, value: 9.5, description: "Prova Bimestral", examDate: "2024-12-01" },
    { id: 6, student_id: 7, subject_id: 2, value: 9.2, description: "Trabalho em Grupo", examDate: "2024-12-05" }
  ],

  // Observações
  observacoes: [
    { id: 1, student_id: 5, content: "Aluna participativa e dedicada", date: "2024-12-10" },
    { id: 2, student_id: 6, content: "Precisa melhorar a concentração em sala", date: "2024-12-11" },
    { id: 3, student_id: 7, content: "Excelente desempenho nas atividades", date: "2024-12-12" }
  ]
};

// Função para inicializar dados no localStorage se não existirem
function initializeMockData() {
  if (!localStorage.getItem('turmas')) {
    localStorage.setItem('turmas', JSON.stringify(mockData.turmas));
  }
  if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify(mockData.usuarios));
  }
  if (!localStorage.getItem('materias')) {
    localStorage.setItem('materias', JSON.stringify(mockData.materias));
  }
  if (!localStorage.getItem('notas')) {
    localStorage.setItem('notas', JSON.stringify(mockData.notas));
  }
  if (!localStorage.getItem('observacoes')) {
    localStorage.setItem('observacoes', JSON.stringify(mockData.observacoes));
  }
}

// Funções auxiliares para gerenciar dados no localStorage
const dataManager = {
  // Turmas
  getTurmas: () => JSON.parse(localStorage.getItem('turmas') || '[]'),
  setTurmas: (turmas) => localStorage.setItem('turmas', JSON.stringify(turmas)),
  
  // Usuários
  getUsuarios: () => JSON.parse(localStorage.getItem('usuarios') || '[]'),
  setUsuarios: (usuarios) => localStorage.setItem('usuarios', JSON.stringify(usuarios)),
  
  // Matérias
  getMaterias: () => JSON.parse(localStorage.getItem('materias') || '[]'),
  setMaterias: (materias) => localStorage.setItem('materias', JSON.stringify(materias)),
  
  // Notas
  getNotas: () => JSON.parse(localStorage.getItem('notas') || '[]'),
  setNotas: (notas) => localStorage.setItem('notas', JSON.stringify(notas)),
  
  // Observações
  getObservacoes: () => JSON.parse(localStorage.getItem('observacoes') || '[]'),
  setObservacoes: (observacoes) => localStorage.setItem('observacoes', JSON.stringify(observacoes)),
  
  // Obter alunos de uma turma
  getAlunosPorTurma: (turmaId) => {
    const usuarios = dataManager.getUsuarios();
    return usuarios.filter(u => u.tipo === 'ALUNO' && u.school_class_id === parseInt(turmaId) && u.ativo);
  },
  
  // Obter notas de um aluno
  getNotasPorAluno: (alunoId) => {
    const notas = dataManager.getNotas();
    const materias = dataManager.getMaterias();
    return notas.filter(n => n.student_id === parseInt(alunoId)).map(nota => {
      const materia = materias.find(m => m.id === nota.subject_id);
      return {
        ...nota,
        subject: materia ? { id: materia.id, nome: materia.nome } : null
      };
    });
  },
  
  // Obter observações de um aluno
  getObservacoesPorAluno: (alunoId) => {
    const observacoes = dataManager.getObservacoes();
    return observacoes.filter(o => o.student_id === parseInt(alunoId));
  },
  
  // Adicionar nova nota
  adicionarNota: (nota) => {
    const notas = dataManager.getNotas();
    const newId = notas.length > 0 ? Math.max(...notas.map(n => n.id)) + 1 : 1;
    const novaNota = { id: newId, ...nota };
    notas.push(novaNota);
    dataManager.setNotas(notas);
    return novaNota;
  }
};

// Inicializar dados quando o script for carregado
initializeMockData();
