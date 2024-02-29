export function getSingleElementFromParams({
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

export function getElementsFromParams({
  params,
  element,
}: {
  params: Record<string, string | string[] | undefined>;
  element: string;
}): string[] | null {
  if (params[element] === undefined) return null;

  return (params[element] as string).split(",");
}

export function createSearchQuery(value: string[]) {
  if (!Array.isArray(value)) return value;

  const query = value.join("%2C");
  return query.toString();
}
