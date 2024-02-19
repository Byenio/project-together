"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { api } from "~/trpc/react";
import { ChevronRightIcon } from "./icons";
import { PostsGetOutput } from "./posts";
import { PostDelete } from "./posts-container/post-delete";
import { PostSubject } from "./posts-container/post-subject";
import { PostType } from "./posts-container/post-type";

function createQueryString(
  pathname: string,
  searchParams: URLSearchParams | null,
  name: string,
  value: string[],
) {
  const currentSearchParams = new URLSearchParams(searchParams?.toString());

  if (value.length === 0) {
    currentSearchParams.delete(name);
  } else {
    currentSearchParams.set(name, value.join(","));
  }

  const queryString = currentSearchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}

export default function PostsContainer({
  posts,
  userId,
  isModerator,
}: {
  posts: PostsGetOutput;
  userId: string | undefined;
  isModerator: boolean | null;
}) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [subjectFilters, setSubjectFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const [searchParams] = useSearchParams();
  const mutableSearchParams = new URLSearchParams(searchParams?.toString());

  const perPageOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
  ];

  const {
    data: subjects,
    isFetching: isSubjectsFetching,
    refetch: refetchSubjects,
  } = api.subject.getAll.useQuery();

  const {
    data: postTypes,
    isFetching: isPostTypesFetching,
    refetch: refetchPostTypes,
  } = api.postType.getAll.useQuery();

  const s = subjects?.map((subject) => {
    return { id: subject.id, name: subject.name };
  });
  const pt = postTypes?.map((postType) => {
    return { id: postType.id, name: postType.name };
  });

  useEffect(() => {
    const subjectQueryString = subjectFilters.length
      ? createQueryString(
          pathname,
          mutableSearchParams,
          "subject",
          subjectFilters,
        )
      : "";
    const typeQueryString = typeFilters.length
      ? createQueryString(pathname, mutableSearchParams, "type", typeFilters)
      : "";

    const concat = subjectFilters.length && typeFilters.length ? "&" : "";
    const url = `${pathname}?${subjectQueryString}${concat}${typeQueryString}`;

    router.push(url);
  }, [subjectFilters, typeFilters]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return posts?.slice(start, end);
  }, [page, posts, rowsPerPage]);

  // if (isPostsFetching) return <Spinner className="m-auto h-3/4 w-full" />;

  if (!posts || !items || !s || !pt)
    return <Spinner className="m-auto h-[80vh] w-full" />;

  const pages = Math.ceil(posts.length / rowsPerPage);

  const filters = [
    { type: "subject", items: s, label: "Przedmioty" },
    { type: "type", items: pt, label: "Typy postów" },
  ];

  const handleSubjectFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubjectFilters(e.target.value.split(","));
  };

  const handleTypeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilters(e.target.value.split(","));
  };

  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex w-full flex-wrap gap-2">
          {filters.map((filter) => {
            return (
              <Select
                selectionMode="multiple"
                className="min-w-[140px] max-w-[260px] self-center"
                size="sm"
                variant="bordered"
                radius="lg"
                items={filter.items}
                label={filter.label}
                popoverProps={{
                  classNames: {
                    base: "min-w-[220px]",
                  },
                }}
                onChange={
                  filter.type === "subject"
                    ? handleSubjectFilter
                    : handleTypeFilter
                }
              >
                {(option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                )}
              </Select>
            );
          })}
        </div>
        <div className="flex w-[75px] justify-end">
          <Select
            items={perPageOptions}
            className="w-[75px]"
            size="sm"
            radius="lg"
            variant="bordered"
            defaultSelectedKeys={[rowsPerPage.toString()]}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          >
            {(option) => (
              <SelectItem key={`${option.value}`} value={option.value}>
                {option.label}
              </SelectItem>
            )}
          </Select>
        </div>
      </div>
      {items.map((post) => {
        const isAuthor = post.createdBy.id === userId;
        const canDelete = isAuthor || isModerator;

        return (
          <Card
            key={post.id}
            className="w-min-[350px] mx-auto my-1 h-auto w-[500px] px-2 py-1"
          >
            <CardHeader className="justify-between">
              <div className="font-[600]">{post.title}</div>
              <Tooltip
                content={post.createdBy.fullname}
                placement="top"
                color="primary"
                showArrow
              >
                <Avatar
                  src={post.createdBy.image ?? ""}
                  isBordered
                  color="primary"
                />
              </Tooltip>
            </CardHeader>
            <CardBody className="py-0 text-small text-default-500">
              <div className="flex justify-between">
                <PostType
                  type={{ name: post.postType.name, id: post.postType.id }}
                />
                <PostSubject
                  subject={{ name: post.subject.name, id: post.subject.id }}
                />
              </div>
              <div>
                <p className="px-1 pt-4">{post.description}</p>
              </div>
            </CardBody>
            <CardFooter className="flex justify-end gap-1">
              {canDelete && <PostDelete id={post.id} />}
              <Button
                as={Link}
                href={`/search/post/${post.id}`}
                isIconOnly
                color="primary"
                size="sm"
                variant="flat"
              >
                <ChevronRightIcon />
              </Button>
            </CardFooter>
          </Card>
        );
      })}

      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    </>
  );
}
