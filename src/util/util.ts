type ButtonVariant =
  | "outline"
  | "solid"
  | "subtle"
  | "surface"
  | "ghost"
  | "plain"
  | undefined;

export function buttonVariant(activated: boolean): ButtonVariant {
  return activated ? "solid" : "subtle";
}
