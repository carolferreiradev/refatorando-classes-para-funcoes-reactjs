import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { createRef } from 'react';

type Food = {
  id: number
  available: boolean
  description: string
  image: string
  name: string
  price: string
}

type ModalEditFoodProps = {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  editingFood: Food,
  handleUpdateFood: (value: Food) => void
}

export function ModalEditFood({ isOpen, setIsOpen, editingFood, handleUpdateFood }: ModalEditFoodProps) {
console.log(editingFood)
  const formRef = createRef<any>();

  async function handleSubmit(data: Food) {
    handleUpdateFood(data);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}