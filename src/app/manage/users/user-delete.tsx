"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { DeleteIcon } from "~/app/(components)/icons";
import { api } from "~/trpc/react";
import { refetchUsersType } from "./table";

export default function SubjectDelete({
  id,
  refetch,
}: {
  id: string;
  refetch: refetchUsersType;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const postsAmount = api.user.getPostsAmount.useQuery({ id: id }).data;

  const userDelete = api.user.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleSubjectDelete = () => {
    userDelete.mutate({ id: id });
    onClose();
  };

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        color="danger"
        className="text-lg text-danger"
        onPress={onOpen}
      >
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Czy na pewno chcesz usunąć przedmiot?</ModalHeader>
              <ModalBody>
                <p className="text-default-600">
                  Po usunięciu tego użytkownika nie ma możliwości jego
                  przywrócenia, a wszystkie posty powiązane z tym użytkownikiem
                  ( {postsAmount} ) również zostaną usunięte. Czy na pewno
                  chcesz go usunąć?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Anuluj
                </Button>
                <Button color="danger" onPress={handleSubjectDelete}>
                  Usuń użytkownika
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
