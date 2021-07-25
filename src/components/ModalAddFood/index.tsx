import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

type Food = {
  id: number
  available: boolean
  description: string
  image: string
  name: string
  price: string
}

type ModalAddFoodProps = {
  setIsOpen: (value: boolean) => void,
  isOpen: boolean,
  handleAddFood: (data: Food) => Promise<void>
}

export function ModalAddFood({ setIsOpen, isOpen, handleAddFood }: ModalAddFoodProps) {

  const formRef = createRef<any>();

  async function handleSubmit(data: Food) {
    handleAddFood(data);
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
