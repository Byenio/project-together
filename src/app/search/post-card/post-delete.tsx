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
import { useRouter } from "next/navigation";
import { DeleteIcon } from "~/app/(components)/icons";
import { api } from "~/trpc/react";

export function PostDelete({ id }: { id: string }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const postDelete = api.post.deleteById.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handlePostDelete = () => {
    postDelete.mutate({ postId: id });
    onClose();
  };

  return (
    <>
      <Button
        isIconOnly
        color="danger"
        size="sm"
        variant="light"
        onPress={onOpen}
      >
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Czy na pewno chcesz usunąć ten post?</ModalHeader>
              <ModalBody>
                <p className="text-default-600">
                  Po usunięciu tego postu nie ma możliwości jego przywrócenia.
                  Czy na pewno chcesz go usunąć?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Anuluj
                </Button>
                <Button color="danger" onPress={handlePostDelete}>
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
