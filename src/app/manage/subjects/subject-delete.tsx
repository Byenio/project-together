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
import { refetchSubjectsType } from "./refetch-wrapper";

export default function SubjectDelete({
  id,
  refetch,
}: {
  id: string;
  refetch: refetchSubjectsType;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const subjectDelete = api.subject.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleSubjectDelete = () => {
    subjectDelete.mutate({ id: id });
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
                  Po usunięciu tego przedmiotu nie ma możliwości jego
                  przywrócenia, a wszystkie posty powiązane z tym przedmiotem
                  również zostaną usunięte. Czy na pewno chcesz go usunąć?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Anuluj
                </Button>
                <Button color="danger" onPress={handleSubjectDelete}>
                  Usuń post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
