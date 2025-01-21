export function redirectUser (role: string | undefined) {
  switch (role) {
    case "rh":
     return "/unauthorized"
    case "restaurant":
     return "/restaurante/dashboard"
    case undefined:
     return"/login"
    default:
     return "/"
  }
};