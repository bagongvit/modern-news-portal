"use server";

import { login, logout } from "@payloadcms/next/auth";
import { redirect } from "next/navigation";
import configPromise from "@payload-config";
import type { LoginResult } from "payload";

export async function logoutReporter() {
  const result = await logout({ config: configPromise });
  if (!result.success) {
    throw new Error("Sesi tidak berhasil diakhiri. Silakan coba lagi.");
  }
  redirect("/admin/login");
}

export async function loginReporter(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/reporter/login?error=invalid");

  let result: LoginResult<"users">;
  try {
    result = await login({
      collection: "users",
      config: configPromise,
      email,
      password,
    });
  } catch {
    redirect("/reporter/login?error=invalid");
  }

  if (result.user?.role === "author") redirect("/reporter");
  if (result.user) redirect("/admin");
  redirect("/reporter/login?error=invalid");
}
