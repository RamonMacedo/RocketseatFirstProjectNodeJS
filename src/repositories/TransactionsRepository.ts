import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const Tincome = this.transactions.reduce((total, transaction) => {
      const { value } = transaction;

      return transaction.type === 'income' ? total + value : total;
    }, 0);

    const Toutcome = this.transactions.reduce((total, transaction) => {
      const { value } = transaction;

      return transaction.type === 'outcome' ? total + value : total;
    }, 0);

    const total = Tincome - Toutcome;

    const balance: Balance = {
      income: Tincome,
      outcome: Toutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
