import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Text from './Text';
import { colorPalette } from '../utils/theme';

const Form = styled.form`
  background: ${colorPalette.secondary};
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
`;

const Label = styled.label`
  margin-right: 0.5rem;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${colorPalette.grey};
  border-radius: 4px;
  width: 8.25em;
  color: ${colorPalette.grey};
  cursor: pointer;
  margin-right: 1.5em;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${colorPalette.black};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export default function FiltersForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [previousSearchedDate, setPreviousSearchedDate] = useState('');

  useEffect(() => {
    const dateFrom = searchParams.get('dateFrom');
    if (dateFrom) {
      const parsedDate = new Date(dateFrom);
      const isoDate = parsedDate.toISOString().substring(0, 10)
      setSelectedDate(isoDate);
      setPreviousSearchedDate(isoDate);
    }
  }, [searchParams]);

  const handleDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setSearchParams({ dateFrom: selectedDate ? new Date(selectedDate).toISOString() : selectedDate });
  }, [selectedDate, setSearchParams]);

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='dateFrom'>
        <Text>Date From:</Text>
      </Label>
      <DateInput type='date' name='dateFrom' onChange={handleDateChange} value={selectedDate} />
      <Button type='submit' disabled={!selectedDate || selectedDate === previousSearchedDate}>
        <Text color={colorPalette.white}>Show Results</Text>
      </Button>
    </Form>
  );
}
