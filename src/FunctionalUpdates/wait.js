export function wait({ miliseconds }) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}
