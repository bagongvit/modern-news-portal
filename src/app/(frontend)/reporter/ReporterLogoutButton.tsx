import { LogOut } from "lucide-react";
import { logoutReporter } from "./actions";

export function ReporterLogoutButton() {
  return (
    <form action={logoutReporter}>
      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <LogOut aria-hidden="true" size={16} />
        Keluar
      </button>
    </form>
  );
}
