export interface Receita {
  id: number;
  valorReceita: number;
  descricaoRecebimento: string;
  categoriaReceita: string;
  statusReceita: 'RECEBIDO' | 'PENDENTE';
}
