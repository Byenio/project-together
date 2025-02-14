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
import { refetchPostsTypesType } from "./refetch-wrapper";

export default function PostTypeDelete({
  id,
  refetch,
}: {
  id: string;
  refetch: refetchPostsTypesType;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const postsAmount = api.postType.getPostsAmount.useQuery({ id: id }).data;
  const postTypeDelete = api.postType.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handlePostTypeDelete = () => {
    postTypeDelete.mutate({ id: id });
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
                  przywrócenia, a wszystkie posty powiązane z tym typem ({" "}
                  {postsAmount} ) również zostaną usunięte. Czy na pewno chcesz
                  go usunąć?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Anuluj
                </Button>
                <Button color="danger" onPress={handlePostTypeDelete}>
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
