import { useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useEffect } from 'react';

interface FoodsProps {
  available: boolean
  description: string
  id: number
  image: string
  name: string
  price: string
}

export function Dashboard() {

  const [foods, setFoods] = useState<FoodsProps[]>([]);
  const [editingFood, setEditingFood] = useState<FoodsProps>({} as FoodsProps);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function componentDidMount() {
      const response = await api.get('/foods');
      setFoods(response.data)
    }
    componentDidMount()
  }, [])


  async function handleAddFood(food: FoodsProps) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
      setFoods([...foods, response.data]);

    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodsProps) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood?.id}`, food);

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered)
  }
  function toggleModal() {
    const modalState = modalOpen ? false : true
    setModalOpen(modalState);
  }

  function toggleEditModal() {
    const modalState = editModalOpen ? false : true
    setEditModalOpen(modalState);
  }
  function handleEditFood(food: FoodsProps) {
    setEditingFood(food)
    setEditModalOpen(true)
  }
  
  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
