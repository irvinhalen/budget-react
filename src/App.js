import './App.css';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from './components/MainHeader';
import NewEntryForm from './components/NewEntryForm';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import EntryLines from './components/EntryLines';
import ModalEdit from './components/ModalEdit';
import { getAllEntries } from './actions/entries.actions';


function App() {
  const [balance, setBalance] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [entry, setEntry] = useState();
  const { isOpen, id } = useSelector(state => state.modals);
  const entries = useSelector(state => state.entries);

  useEffect(() => {
    const index = entries.findIndex(entry => entry.id === id);
    setEntry(entries[index]);
 }, [isOpen, id, entries]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    entries.map(entry => {
      if(entry.isExpense){
        return totalExpense += Number(entry.value);
      }
      return totalIncome += Number(entry.value);
    });
    setBalance(totalIncome - totalExpense);
    setIncomeTotal(totalIncome);
    setExpenseTotal(totalExpense);
  }, [entries]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEntries());
  }, [dispatch]);
  

  return (
    <Container>

      <MainHeader title='Budget' />
      <DisplayBalance size='small' title='Your Balance:' value={balance} />
      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

      <MainHeader title='History' type='h3' />
      <EntryLines entries={entries} />

      <MainHeader title='Add new transaction' type='h3' />
      <NewEntryForm />

      <ModalEdit isOpen={isOpen} {...entry} />

    </Container>
  );
}

export default App;
