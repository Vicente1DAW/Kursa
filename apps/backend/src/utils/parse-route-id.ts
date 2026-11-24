export const parseRouteId = (value: string | string[]): number => {
  const routeValue = Array.isArray(value) ? value[0] ?? "" : value;
  return Number.parseInt(routeValue, 10);
};
