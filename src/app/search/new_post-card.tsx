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
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";
import { ChevronRightIcon } from "../(components)/icons";
import { perPageOptions } from "../(utils)/util-consts";
import type {
  PostTypesGetAll,
  PostsGetAll,
  SubjectsGetAll,
  User,
} from "./page";
import { PostDelete } from "./post-card/post-delete";
import { PostSubject } from "./post-card/post-subject";
import { PostType } from "./post-card/post-type";
import VoteButton from "./post-card/post-vote";

function getSingleElement({
  params,
  element,
  defaultValue,
}: {
  params: Record<string, string | string[] | undefined>;
  element: string;
  defaultValue: string;
}): string {
  if (params[element] === undefined) return defaultValue;

  if (Array.isArray(params[element])) {
    const arrayValue = params[element] as string[];
    return arrayValue[0] ?? defaultValue;
  }

  if (typeof params[element] === "string") {
    return (params[element] as string) ?? defaultValue;
  }

  return defaultValue;
}

function getElements({
  params,
  element,
}: {
  params: Record<string, string | string[] | undefined>;
  element: string;
}): string[] | null {
  if (params[element] === undefined) return null;

  return (params[element] as string).split(",") as string[];
}

function createQuery(value: string[]) {
  if (!Array.isArray(value)) return value;

  const query = value.join("%2C");
  return query.toString();
}

export default function PostCard({
  searchParams,
  posts,
  subjects,
  postTypes,
  user,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  posts: PostsGetAll;
  subjects: SubjectsGetAll;
  postTypes: PostTypesGetAll;
  user: User;
}) {
  const router = useRouter();

  const items = parseInt(
    getSingleElement({
      params: searchParams,
      element: "items",
      defaultValue: "10",
    }),
  );
  const page = parseInt(
    getSingleElement({
      params: searchParams,
      element: "page",
      defaultValue: "1",
    }),
  );
  const subjectQuery = getElements({
    params: searchParams,
    element: "subject",
  });
  const typeQuery = getElements({
    params: searchParams,
    element: "type",
  });
  const userQuery = getElements({
    params: searchParams,
    element: "user",
  });

  const [currentItems, setCurrentItems] = useState(items);
  const [currentPage, setCurrentPage] = useState(page);
  const [subjectFilters, setSubjectFilters] = useState<string[] | null>(
    subjectQuery,
  );
  const [typeFilters, setTypeFilters] = useState<string[] | null>(typeQuery);
  const [userFilters, setUserFilters] = useState<string[] | null>(userQuery);

  const s = subjects?.map((subject) => {
    return { id: subject.id, name: subject.name };
  });
  const pt = postTypes?.map((postType) => {
    return { id: postType.id, name: postType.name };
  });

  const filters = [
    {
      type: "subject",
      items: s,
      label: "Przedmioty",
      defaultSelected: subjectFilters ?? [],
    },
    {
      type: "type",
      items: pt,
      label: "Typy postów",
      defaultSelected: typeFilters ?? [],
    },
  ];

  const connectQuery = ({
    items = currentItems,
    page = currentPage,
    subjects = subjectFilters,
    types = typeFilters,
    user = userFilters,
  }) => {
    const itemUrl = `?items=${items}`;
    const pageUrl = `&page=${page}`;
    const subjectUrl = subjects ? `&subject=${createQuery(subjects)}` : "";
    const typeUrl = types ? `&type=${createQuery(types)}` : "";
    const userUrl = user ? `&user=${createQuery(user)}` : "";
    const url = `${itemUrl}${pageUrl}${subjectUrl}${typeUrl}${userUrl}`;
    return url;
  };

  const handleItemsSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setCurrentItems(value);
    setCurrentPage(1);
    const url = connectQuery({ items: value });
    router.replace(url);
  };

  const handleSubjectFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.split(",");
    if (value[0] === "") {
      setSubjectFilters(null);
      const url = connectQuery({ subjects: null });
      router.replace(url);
    } else {
      setSubjectFilters(value);
      const url = connectQuery({ subjects: value });
      router.replace(url);
    }
  };

  const handleTypeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.split(",");
    if (value[0] === "") {
      setTypeFilters(null);
      const url = connectQuery({ types: null });
      router.replace(url);
    } else {
      setTypeFilters(value);
      const url = connectQuery({ types: value });
      router.replace(url);
    }
  };

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (subjectFilters && !subjectFilters.includes(post.subjectId))
        return false;
      if (typeFilters && !typeFilters.includes(post.postTypeId)) return false;
      if (userFilters && !userFilters.includes(post.createdById)) return false;
      return true;
    });
  }, [subjectFilters, typeFilters, userFilters, posts]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * currentItems;
    const end = start + currentItems;

    return filtered.slice(start, end);
  }, [currentPage, currentItems, posts]);

  const pages = Math.ceil(filtered.length / currentItems);

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
                key={filter.type}
                items={filter.items}
                label={filter.label}
                defaultSelectedKeys={filter.defaultSelected}
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
            defaultSelectedKeys={[currentItems.toString()]}
            onChange={handleItemsSelect}
          >
            {(option) => (
              <SelectItem key={`${option.value}`} value={option.value}>
                {option.label}
              </SelectItem>
            )}
          </Select>
        </div>
      </div>
      {paginated.length ? (
        <>
          {paginated.map((post) => {
            const isAuthor = post.createdBy.id === user.id;
            const canDelete = isAuthor || user.isModerator;
            const upvoted = post.Upvote.find(
              (upvote) => upvote.userId === user.id,
            )
              ? true
              : false;
            const upvotes = post.Upvote.length;

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
                  <VoteButton
                    postId={post.id}
                    upvoted={upvoted}
                    currentUpvotes={upvotes}
                  />
                  <Button
                    as={Link}
                    href={`/search/${post.id}`}
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
              page={currentPage}
              total={pages}
              onChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <NoPostsInfo canPost={user.canPost} />
      )}
    </>
  );
}

export function NoPostsInfo({ canPost }: { canPost: boolean | null }) {
  return (
    <p className="card bg-error text-error-content m-auto my-2 min-w-[300px] p-2 text-center text-lg font-medium">
      Brak postów do wyświetlenia.
      {canPost && (
        <div className="w-full">
          <Link
            href={"/create-post"}
            className="w-50 my-4 rounded-xl"
            underline="always"
          >
            Utwórz nowy post
          </Link>
        </div>
      )}
    </p>
  );
}
